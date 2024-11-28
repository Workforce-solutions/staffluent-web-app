import { ChatMessagesProps } from '@/@types/chat'
import { ScrollArea } from '@/components/ui/scroll-area'

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <ScrollArea className='h-[calc(100vh-300px)] p-4'>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`mb-4 ${
            message.sender === 'You' ? 'text-right' : 'text-left'
          }`}
        >
          <div
            className={`inline-block rounded-lg p-2 ${
              message.sender === 'You'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            <p className='text-sm'>{message.content}</p>
          </div>
          <p className='mt-1 text-xs text-gray-500'>{message.timestamp}</p>
        </div>
      ))}
    </ScrollArea>
  )
}
