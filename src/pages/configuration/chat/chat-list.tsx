import { ChatListProps } from '@/@types/chat'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

export function ChatList({
  chats,
  onSelectChat,
  selectedChatId,
}: ChatListProps) {
  return (
    <ScrollArea className='h-[calc(100vh-300px)]'>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`flex cursor-pointer items-center space-x-4 p-4 hover:bg-accent ${
            selectedChatId === chat.id ? 'bg-accent' : ''
          }`}
          onClick={() => onSelectChat(chat.id)}
        >
          <Avatar>
            <AvatarImage src={chat.avatar} alt={chat.name} />
            <AvatarFallback>
              {chat.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className='flex-1 min-w-0'>
            <p className='truncate text-sm font-medium text-[#0A0A0A] dark:text-gray-100'>
              {chat.name}
            </p>
            <p className='text-sm text-gray-500 truncate dark:text-gray-400'>
              {chat.lastMessage}
            </p>
          </div>
        </div>
      ))}
    </ScrollArea>
  )
}
