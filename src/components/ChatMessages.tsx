import type { FC } from 'react'
import type { ChatMessagesProps } from '../interfaces/chat'

export const ChatMessages: FC<ChatMessagesProps> = ({
  messages,
  isLoading,
  getMessageText
}) => {
  return (
    <div
      style={{
        height: '400px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px'
      }}
    >
      {messages.map(message => (
        <div key={message.id} style={{ marginBottom: '10px' }}>
          <strong>{message.role === 'user' ? 'Tú' : 'Qwen 2.5'}:</strong>
          <p>{getMessageText(message)}</p>
        </div>
      ))}
      {isLoading && <p>Pensando...</p>}
    </div>
  )
}

