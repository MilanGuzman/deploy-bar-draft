import { isTextUIPart } from 'ai'

// Convierte la respuesta del modelo al texto mostrado en pantalla
export const getMessageText = (message: any) => {
  const parts = message?.parts ?? []

  return parts
    .filter((part: any) => isTextUIPart(part)) // descarta tool-calls y otros tipos, deja solo texto
    .map((part: any) => part.text ?? '')
    .join('')
}

