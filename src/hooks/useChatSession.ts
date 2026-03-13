import { useState, type FormEvent } from 'react'
import { useChat } from '@ai-sdk/react'
import { TextStreamChatTransport } from 'ai'
import { getMessageText } from '../lib/chat'
import type { ChatMessage } from '../interfaces/chat'

export const useChatSession = () => {
  const [input, setInput] = useState('')

  // Aquí se define que los mensajes del POST en modo streaming
  const {
    messages,
    sendMessage,
    status,
    error
  } = useChat({
    transport: new TextStreamChatTransport({ api: '/api/chat' })
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  // Envía el mensaje al backend y limpia el input (no hace nada si está vacío o ya está cargando)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return
    sendMessage({ text })
    setInput('')
  }

  const getTextFromMessage = (message: ChatMessage) => getMessageText(message)

  return {
    input,
    setInput,
    messages,
    error,
    isLoading,
    handleSubmit,
    getMessageText: getTextFromMessage
  }
}

