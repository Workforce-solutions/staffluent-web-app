export interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
}

export interface Chat {
  id: number
  name: string
  avatar: string
  lastMessage: string
  messages: Message[]
  type: 'customer' | 'staff'
}

export interface ChatMessagesProps {
  messages: Message[]
}

export interface ChatListProps {
  chats: Chat[]
  onSelectChat: (chatId: number) => void
  selectedChatId?: number
}
