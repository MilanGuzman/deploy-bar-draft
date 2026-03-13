import { isTextUIPart } from 'ai'

export const getMessageText = (message: any) => {
  const parts = message?.parts ?? []

  return parts
    .filter((part: any) => isTextUIPart(part))
    .map((part: any) => part.text ?? '')
    .join('')
}

