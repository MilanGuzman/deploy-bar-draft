import type { FormEvent } from 'react'
import type { UseChatHelpers } from '@ai-sdk/react'

export type ChatMessage = UseChatHelpers<any>['messages'][number]

export interface ChatMessagesProps {
  messages: ChatMessage[]
  isLoading: boolean
  getMessageText: (message: ChatMessage) => string
}

export interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  isLoading: boolean
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
}

