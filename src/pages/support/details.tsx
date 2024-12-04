// pages/support/TicketDetails.tsx
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { format } from 'date-fns'
import { ArrowLeft, Clock, User, Building, Loader2 } from 'lucide-react'
import { IconPaperclip } from '@tabler/icons-react'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import {
  useGetTicketDetailsQuery,
  useReplyToTicketMutation,
} from '@/services/adminTicketApi'
import { useShortCode } from '@/hooks/use-local-storage'

interface TicketMessage {
  id: number
  message: string
  sender_type: 'client' | 'staff'
  sender: {
    id: number
    name: string
  }
  attachments: any[]
  created_at: string
}

interface TicketDetails {
  id: number
  number: string
  subject: string
  description: string
  status: string
  priority: string
  created_at: string
  updated_at: string
  assigned_to?: {
    id: number
    name: string
  }
  messages: TicketMessage[]
  related_to: {
    project?: { id: number; name: string } | null
    service?: { id: number; name: string } | null
    service_request?: { id: number; reference: string } | null
  }
}

export default function TicketDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  console.log(id)

  const [message, setMessage] = useState('')
  const venue_short_code = useShortCode()
  // @ts-ignore
  const { data, isLoading } = useGetTicketDetailsQuery({
    venue_short_code,
    id: Number(id),
  })
  const [replyToTicket, { isLoading: isReplying }] = useReplyToTicketMutation()

  const handleReply = async () => {
    if (!message.trim() || isReplying) return

    try {
      // @ts-ignore
      await replyToTicket({
        venue_short_code,
        ticket_id: Number(id),
        message,
      }).unwrap()

      setMessage('')
      toast({
        title: 'Success',
        description: 'Reply sent successfully',
      })
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to send reply',
        variant: 'destructive',
      })
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <Layout.Body>
          <div className='flex h-full items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin' />
          </div>
        </Layout.Body>
      </Layout>
    )
  }

  const ticket = data?.ticket as TicketDetails

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6'>
        {/* Header with Navigation */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => navigate('/admin/support/tickets')}
            >
              <ArrowLeft className='h-4 w-4' />
            </Button>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                Ticket #{ticket?.number}
              </h2>
              <p className='text-sm text-muted-foreground'>{ticket?.subject}</p>
            </div>
          </div>
          <Badge
            variant={
              ticket?.status === 'open'
                ? 'warning'
                : ticket?.status === 'in_progress'
                  ? 'default'
                  : 'success'
            }
          >
            {ticket?.status?.toUpperCase()}
          </Badge>
        </div>

        {/* Ticket Info */}
        <div className='grid gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Created</span>
                  <span className='flex items-center text-sm'>
                    <Clock className='mr-2 h-4 w-4 text-muted-foreground' />
                    {format(new Date(ticket?.created_at), 'MMM dd, yyyy HH:mm')}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Priority
                  </span>
                  <Badge
                    variant={
                      ticket?.priority === 'high'
                        ? 'destructive'
                        : ticket?.priority === 'medium'
                          ? 'warning'
                          : 'default'
                    }
                  >
                    {ticket?.priority?.toUpperCase()}
                  </Badge>
                </div>
                {ticket?.assigned_to && (
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-muted-foreground'>
                      Assigned To
                    </span>
                    <span className='flex items-center'>
                      <User className='mr-2 h-4 w-4 text-muted-foreground' />
                      {ticket.assigned_to.name}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Items</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {ticket?.related_to.project && (
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Project</span>
                  <span className='flex items-center'>
                    <Building className='mr-2 h-4 w-4 text-muted-foreground' />
                    {ticket.related_to.project.name}
                  </span>
                </div>
              )}
              {ticket?.related_to.service && (
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Service</span>
                  <span>{ticket.related_to.service.name}</span>
                </div>
              )}
              {ticket?.related_to.service_request && (
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Service Request
                  </span>
                  <span>{ticket.related_to.service_request.reference}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Messages */}
        <Card>
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {ticket?.messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex flex-col space-y-2 rounded-lg p-4',
                  msg.sender_type === 'client'
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'mr-auto bg-muted'
                )}
              >
                <div className='flex items-center justify-between space-x-4'>
                  <span className='font-medium'>{msg.sender?.name}</span>
                  <span className='text-xs'>
                    {format(new Date(msg.created_at), 'MMM dd, yyyy HH:mm')}
                  </span>
                </div>
                <p className='text-sm'>{msg.message}</p>
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className='mt-2 flex items-center space-x-2'>
                    <IconPaperclip className='h-4 w-4' />
                    <span className='text-xs'>
                      {msg.attachments.length} attachments
                    </span>
                  </div>
                )}
              </div>
            ))}

            <Separator className='my-4' />

            {/* Reply Section */}
            <div className='space-y-4'>
              <Textarea
                placeholder='Type your reply...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='min-h-[100px]'
              />
              <div className='flex justify-end'>
                <Button
                  onClick={handleReply}
                  disabled={isReplying || !message.trim()}
                >
                  {isReplying && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Send Reply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
