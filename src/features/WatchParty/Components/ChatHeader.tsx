type ChatHeaderProps = {
  fullName?: string;
  usersOnline: number;
};
const ChatHeader = ({ fullName, usersOnline }: ChatHeaderProps) => {
  return (
    <div className="flex justify-between h-20 border-b border-gray-700">
      <div className="p-4">
        <p className="text-gray-200">Sesión iniciada como {fullName}</p>
        <p className="text-gray-200 italic text-sm">
          {usersOnline} usuarios en línea
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
