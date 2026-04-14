import './loadEnv'
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { dbTools } from './tools'

const ollama = createOpenAI({
  baseURL: process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434/v1',
  apiKey: 'ollama'
})

const app = new Hono()

app.use('*', cors())

type PredictionItem = {
  label: string
  value: string
}

type TeamSide = 'home' | 'away'

type PredictionApiResponse = {
  response?: Array<{
    predictions?: {
      winner?: {
        name?: string
        comment?: string
      }
      under_over?: string | null
      goals?: {
        home?: string | null
        away?: string | null
      }
      advice?: string
      percent?: {
        home?: string
        draw?: string
        away?: string
      }
    }
    teams?: {
      home?: {
        name?: string
      }
      away?: {
        name?: string
      }
    }
  }>
}

type PredictionEntry = NonNullable<PredictionApiResponse['response']>[number]

const parsePercentNumber = (value?: string): number => {
  if (!value) return Number.NaN
  return Number.parseFloat(value.replace('%', '').trim())
}

const pickLikelyWinner = (
  homePercent?: string,
  awayPercent?: string
): TeamSide | null => {
  const home = parsePercentNumber(homePercent)
  const away = parsePercentNumber(awayPercent)

  if (Number.isNaN(home) && Number.isNaN(away)) return null
  if (Number.isNaN(home)) return 'away'
  if (Number.isNaN(away)) return 'home'

  return home >= away ? 'home' : 'away'
}

const buildPredictionItems = (predictionData?: PredictionEntry): PredictionItem[] => {
  const predictions = predictionData?.predictions
  const homeTeam = predictionData?.teams?.home?.name ?? 'Local'
  const awayTeam = predictionData?.teams?.away?.name ?? 'Visitante'

  const likelySide = pickLikelyWinner(predictions?.percent?.home, predictions?.percent?.away)
  const likelyWinnerText =
    likelySide === 'home'
      ? `${homeTeam} (${predictions?.percent?.home ?? 'N/D'})`
      : likelySide === 'away'
        ? `${awayTeam} (${predictions?.percent?.away ?? 'N/D'})`
        : predictions?.winner?.name
          ? `${predictions.winner.name} (${predictions?.winner?.comment ?? 'N/D'})`
          : predictions?.advice ?? 'Sin dato disponible'

  const predictedScore =
    predictions?.goals?.home != null && predictions?.goals?.away != null
      ? `${homeTeam}: ${predictions.goals.home} | ${awayTeam}: ${predictions.goals.away}`
      : predictions?.under_over
        ? `Under/Over ${predictions.under_over}`
        : predictions?.advice ?? 'Sin marcador estimado'

  const drawProbability =
    predictions?.percent?.draw ??
    (predictions?.winner?.comment ? `Basado en: ${predictions.winner.comment}` : 'Sin dato disponible')

  return [
    { label: 'Equipo con más probabilidad', value: likelyWinnerText },
    { label: 'Marcador estimado', value: predictedScore },
    { label: 'Probabilidad de empate', value: drawProbability }
  ]
}

// Endpoint aislado para obtener un partido en vivo desde API-Football
app.get('/api/watchparty/live-match', async (c) => {
  try {
    const apiKey = process.env.API_FOOTBALL_KEY

    if (!apiKey) {
      return c.json({ error: 'Missing API_FOOTBALL_KEY in environment' }, 500)
    }

    const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
      headers: {
        'x-apisports-key': apiKey
      }
    })

    if (!response.ok) {
      const body = await response.text()
      console.error('API-Football error:', response.status, body)
      return c.json({ error: 'API-Football request failed', status: response.status }, 502)
    }

    const data = await response.json() as { response?: unknown[] }
    const match = data.response?.[0] || null

    return c.json(match)
  } catch (err) {
    console.error('Error en /api/watchparty/live-match:', err)
    return c.json({ error: String(err) }, 500)
  }
})

app.get('/api/watchparty/predictions', async (c) => {
  try {
    const apiKey = process.env.API_FOOTBALL_KEY

    if (!apiKey) {
      return c.json({ error: 'Missing API_FOOTBALL_KEY in environment' }, 500)
    }

    const liveResponse = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
      headers: {
        'x-apisports-key': apiKey
      }
    })

    if (!liveResponse.ok) {
      const body = await liveResponse.text()
      console.error('API-Football live fixtures error:', liveResponse.status, body)
      return c.json({ error: 'Live fixtures request failed', status: liveResponse.status }, 502)
    }

    const liveData = await liveResponse.json() as {
      response?: Array<{ fixture?: { id?: number } }>
    }
    const fixtureId = liveData.response?.[0]?.fixture?.id

    if (!fixtureId) {
      return c.json({ fixtureId: null, predictions: buildPredictionItems() })
    }

    // User requested odds endpoint; if it doesn't provide the needed fields, fallback to predictions endpoint.
    const oddsResponse = await fetch(`https://v3.football.api-sports.io/odds?fixture=${fixtureId}`, {
      headers: {
        'x-apisports-key': apiKey
      }
    })

    if (!oddsResponse.ok) {
      const body = await oddsResponse.text()
      console.error('API-Football odds error:', oddsResponse.status, body)
    }

    const predictionsResponse = await fetch(
      `https://v3.football.api-sports.io/predictions?fixture=${fixtureId}`,
      {
        headers: {
          'x-apisports-key': apiKey
        }
      }
    )

    if (!predictionsResponse.ok) {
      const body = await predictionsResponse.text()
      console.error('API-Football predictions error:', predictionsResponse.status, body)
      return c.json({
        fixtureId,
        predictions: [
          { label: 'Equipo con más probabilidad', value: 'Sin dato disponible' },
          { label: 'Marcador estimado', value: 'Sin marcador estimado' },
          { label: 'Probabilidad de empate', value: 'Sin dato disponible' }
        ]
      })
    }

    const predictionData = await predictionsResponse.json() as PredictionApiResponse
    const predictionItems = buildPredictionItems(predictionData.response?.[0])

    return c.json({ fixtureId, predictions: predictionItems })
  } catch (err) {
    console.error('Error en /api/watchparty/predictions:', err)
    return c.json({ error: String(err) }, 500)
  }
})

// Devuelve usuarios directo de la BD, es para el recuadro debajo del chat
app.get('/api/usuarios', async (c) => {
  try {
    const executeGetUsuarios = dbTools.getUsuarios.execute as (args: { limit?: number }) => Promise<unknown>
    const data = await executeGetUsuarios({ limit: 3 })
    return c.json({ usuarios: data })
  } catch (err) {
    console.error('Error en /api/usuarios:', err)
    return c.json({ error: String(err) }, 500)
  }
})

// Recibe el historial de mensajes del frontend, llama al modelo (Ollama) con la herramienta getUsuarios y devuelve la respuesta en streaming
app.post('/api/chat', async (c) => {
  try {
    const { messages } = await c.req.json()
    console.log('Mensaje recibido:', messages)

    const modelName = process.env.OLLAMA_MODEL ?? 'qwen2.5:7b'

    // El modelo puede usar getUsuarios para consultar la BD y la respuesta se manda por chunks al navegador
    const result = streamText({
      model: ollama(modelName),
      system: 'Eres un asistente útil que puede consultar información de usuarios en la base de datos. Cuando el usuario pregunte sobre usuarios, usa la herramienta getUsuarios para obtener la información.',
      messages,
      tools: dbTools,
      maxSteps: 5,
      toolChoice: 'auto',
      onError: (error) => {
        console.error('Error del streamText:', error)
      },
      onFinish: ({ text, toolCalls, toolResults }) => {
        console.log('Finalizó respuesta:', text)
        console.log('Tool calls:', toolCalls)
        console.log('Tool results:', toolResults)
      }
    })

    result.text.then(t => console.log('Respuesta:', t))
    result.toolCalls.then(t => console.log('Tool calls:', t))

    return result.toTextStreamResponse()
  } catch (err) {
    console.error('Error en /api/chat:', err)
    return c.json({ error: String(err) }, 500)
  }
})


serve({
  fetch: app.fetch,
  port: 3000
}, () => {
  const model = process.env.OLLAMA_MODEL ?? 'qwen2.5:7b'
  console.log('Servidor corriendo en http://localhost:3000')
  console.log(`Modelo: ${model}`)
})