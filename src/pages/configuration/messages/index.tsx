import { useState } from 'react'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageCircle, Mail, Phone } from 'lucide-react'

const initialMessagesData = [
  {
    id: 1,
    title: 'New Message',
    description: 'You have received a new message from John.',
    date: '2024-10-14 12:30 PM',
    type: 'chat',
    sender: 'John Doe',
    avatar: '/path/to/john.jpg',
  },
  {
    id: 2,
    title: 'Order Update',
    description: 'Your order #12345 has been shipped.',
    date: '2024-10-13 10:15 AM',
    type: 'email',
    sender: 'Shop Support',
    avatar: '/path/to/shop.jpg',
  },
  {
    id: 3,
    title: 'Missed Call',
    description: 'You missed a call from Sarah at 3 PM today.',
    date: '2024-10-13 09:00 AM',
    type: 'call',
    sender: 'Sarah Smith',
    avatar: '/path/to/sarah.jpg',
  },
]

export default function Messages() {
  const [messages] = useState(initialMessagesData)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMessages = messages.filter(
    (message) =>
      (filter === 'all' || message.type === filter) &&
      (message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.sender.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'chat':
        return <MessageCircle className='h-4 w-4' />
      case 'email':
        return <Mail className='h-4 w-4' />
      case 'call':
        return <Phone className='h-4 w-4' />
      default:
        return <MessageCircle className='h-4 w-4' />
    }
  }

  return (
    <Layout>
      <Layout.Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6'>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Messages
          </h1>
          <div className='flex space-x-2'>
            <Input
              placeholder='Search messages...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='max-w-sm'
            />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Filter by type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='chat'>Chat</SelectItem>
                <SelectItem value='email'>Email</SelectItem>
                <SelectItem value='call'>Call</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='space-y-2'>
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className='flex items-center space-x-4 rounded-lg border p-4'
            >
              <Avatar>
                <AvatarImage src={message.avatar} alt={message.sender} />
                <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='flex-1 space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {message.sender}
                </p>
                <p className='text-sm text-muted-foreground'>{message.title}</p>
                <p className='text-xs text-muted-foreground'>{message.date}</p>
              </div>
              <Button variant='ghost' size='sm'>
                {getMessageIcon(message.type)}
              </Button>
            </div>
          ))}
          {filteredMessages.length === 0 && (
            <p className='text-center text-muted-foreground'>
              No messages found.
            </p>
          )}
        </div>
      </Layout.Body>
    </Layout>
  )
}
