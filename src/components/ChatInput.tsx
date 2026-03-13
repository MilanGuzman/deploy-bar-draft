import type { FC } from 'react'
import type { ChatInputProps } from '../interfaces/chat'

// Linea 27: se deshabilitan el boton Enviar mientras el modelo está respondiendo para no enviar dos veces
export const ChatInput: FC<ChatInputProps> = ({
  input,
  setInput,
  isLoading,
  handleSubmit
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: '8px'
      }}
    >
      <input
        value={input}
        onChange={event => setInput(event.target.value)}
        placeholder="Haz una pregunta"
        style={{ flex: 1, padding: '8px' }}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        Enviar
      </button>
    </form>
  )
}

