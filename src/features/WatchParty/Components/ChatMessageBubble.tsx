import type { ChatMessage } from "../Types/chatType";
import formatTime from "../Utils/formatTime";

type ChatMessageBubbleProps = {
  message: ChatMessage;
  currentUserName?: string;
};

const ChatMessageBubble = ({
  message,
  currentUserName,
}: ChatMessageBubbleProps) => {
  const isCurrentUser = message.user_name === currentUserName;
  return (
    <div
      className={`my-2 flex w-full items-start ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className="flex flex-col w-full">
        {!isCurrentUser && (
          <div className="text-xs opacity-75 pt-1 text-left text-white">
            {message.user_name}
          </div>
        )}

        <div
          className={`p-2 max-w-[70%] rounded-xl ${
            isCurrentUser
              ? "bg-blue-600 text-white ml-auto"
              : "bg-gray-300 text-gray-800 mr-auto"
          }`}
        >
          <p>{message.message}</p>
        </div>

        <div
          className={`text-xs opacity-75 pt-1 text-white ${
            isCurrentUser ? "text-right" : "text-left"
          }`}
        >
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageBubble;
