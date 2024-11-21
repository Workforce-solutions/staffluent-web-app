import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserNav } from '@/components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetProjectQuery } from '@/services/projectApi'
import { ChevronLeft, Send, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProjectDetailsSkeleton } from '../project-details-sceleton'
import { mockChats } from './data'
import { ChatList } from './chat-list'
import { ChatMessages } from './chat-messages'

export default function ProjectChat() {
  const { id } = useParams()
  const short_code = useShortCode()
  const [selectedChatId, setSelectedChatId] = useState<number>()
  const [newMessage, setNewMessage] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'customers' | 'staff'>('customers')
  const navigate = useNavigate()

  const { data: project, isFetching } = useGetProjectQuery({
    id: Number(id),
    venue_short_code: short_code,
  })

  if (isFetching) {
    return <ProjectDetailsSkeleton />
  }

  if (!project) {
    return <div>Project not found</div>
  }

  const customerChats = mockChats.filter((chat) => chat.type === 'customer')
  const staffChats = mockChats.filter((chat) => chat.type === 'staff')
  const selectedChat = mockChats.find((chat) => chat.id === selectedChatId)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  return (
    <Layout>
      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-2'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-6 flex h-fit items-center gap-2'>
          <ChevronLeft
            className='cursor-pointer'
            onClick={() => navigate(`/projects/details/${project.id}`)}
          />
          <h1 className='text-2xl font-bold'>Project Chat: {project.name}</h1>
        </div>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <Card className='md:col-span-1'>
            <CardHeader>
              <CardTitle>Chats</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue='customers'
                value={activeTab}
                onValueChange={(value) =>
                  setActiveTab(value as 'customers' | 'staff')
                }
              >
                <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger value='customers'>Customers</TabsTrigger>
                  <TabsTrigger value='staff'>Staff</TabsTrigger>
                </TabsList>
                <TabsContent value='customers'>
                  <ChatList
                    chats={customerChats}
                    onSelectChat={setSelectedChatId}
                    selectedChatId={selectedChatId}
                  />
                </TabsContent>
                <TabsContent value='staff'>
                  <ChatList
                    chats={staffChats}
                    onSelectChat={setSelectedChatId}
                    selectedChatId={selectedChatId}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card className='md:col-span-2'>
            <CardContent>
              {selectedChat ? (
                <div className='relative'>
                  <X
                    className='absolute right-2 top-2 cursor-pointer'
                    onClick={() => setSelectedChatId(undefined)}
                  />
                  <CardHeader>
                    <CardTitle>{selectedChat.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChatMessages messages={selectedChat.messages} />
                    <form
                      onSubmit={handleSendMessage}
                      className='mt-4 flex space-x-2'
                    >
                      <Input
                        type='text'
                        placeholder='Type a message...'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className='flex-grow'
                      />
                      <Button type='submit'>
                        <Send className='h-4 w-4' />
                        <span className='sr-only'>Send message</span>
                      </Button>
                    </form>
                  </CardContent>
                </div>
              ) : (
                <CardContent className='flex h-full min-h-[60vh] items-center justify-center'>
                  <p className='text-muted-foreground'>
                    Select a chat to start messaging
                  </p>
                </CardContent>
              )}
            </CardContent>
          </Card>
        </div>
      </Layout.Body>
    </Layout>
  )
}
