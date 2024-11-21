import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, PlusCircle, Clock, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { format } from 'date-fns'
import { useGetClientTicketsQuery } from '@/services/clientTicketApi'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'
import { CreateTicketModal } from '@/components/client-portal/new-ticket-modal-client'

interface Ticket {
  id: number
  number: string
  subject: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'success'
  updated_at: Date
  created_at: Date
  priority: 'high' | 'medium' | 'low'
}

export default function Support() {
  const navigate = useNavigate()
  const [openNewTicket, setOpenNewTicket] = useState(false)
  const [filters, setFilters] = useState({
    status: 'active' as 'active' | 'resolved' | 'all',
    priority: 'all',
    search: '',
    page: 1,
    per_page: 10
  });

  // Update query to pass all filters
  const { data, isLoading } = useGetClientTicketsQuery(filters);

  // @ts-ignore
  const handleStatusChange = (status: string) => {
    // @ts-ignore
    setFilters(prev => ({
      // @ts-ignore
      ...prev,
      status,
      page: 1
    }))
  }

  const handlePriorityChange = (priority: string) => {
    setFilters(prev => ({
      ...prev,
      priority,
      page: 1
    }))
  }

  const handleSearch = (search: string) => {
    setFilters(prev => ({
      ...prev,
      search,
      page: 1
    }))
  }

  // @ts-ignore
  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Support</h2>
            <p className='text-sm text-muted-foreground'>
              Get help with your services
            </p>
          </div>
          <Button onClick={() => setOpenNewTicket(true)}>
            <PlusCircle className='mr-2 h-4 w-4' />
            New Support Ticket
          </Button>
        </div>

        {/* Stats Cards */}
        <div className='grid gap-4 md:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Active Tickets</CardTitle>
              <Clock className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{data?.stats.active_count}</div>
              <p className='text-xs text-muted-foreground'>Open support requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Resolved</CardTitle>
              <CheckCircle2 className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{data?.stats.resolved_count}</div>
              <p className='text-xs text-muted-foreground'>Total resolved tickets</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Average Response</CardTitle>
              <Clock className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{data?.stats.avg_response_time}</div>
              <p className='text-xs text-muted-foreground'>Response time</p>
            </CardContent>
          </Card>
        </div>

        {/* Tickets List */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <CardTitle>Support Tickets</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  View and manage your support requests
                </p>
              </div>
              <div className='flex space-x-2'>
                <Input
                  placeholder="Search tickets..."
                  value={filters.search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-[200px]"
                />
                <Select
                  value={filters.priority}
                  onValueChange={handlePriorityChange}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={filters.status} onValueChange={handleStatusChange}>
              <TabsList>
                <TabsTrigger value='active'>Active</TabsTrigger>
                <TabsTrigger value='resolved'>Resolved</TabsTrigger>
                <TabsTrigger value='all'>All Tickets</TabsTrigger>
              </TabsList>

              <TabsContent value={filters.status} className='space-y-4'>
                {isLoading ? (
                  <div className="flex justify-center py-8">Loading...</div>
                ) : (
                  <>
                    {data?.tickets.data.map((ticket) => (
                      <TicketCard
                        key={ticket.id}
                        // @ts-ignore
                        ticket={ticket}
                        onView={() => navigate(`/client-portal/support/tickets/${ticket.id}`)}
                      />
                    ))}
                    {data?.tickets.data.length === 0 && (
                      <p className='py-8 text-center text-muted-foreground'>
                        No tickets found
                      </p>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </Layout.Body>

      <CreateTicketModal open={openNewTicket} onOpenChange={setOpenNewTicket} />
    </Layout>
  )
}

function TicketCard({ ticket, onView }: { ticket: Ticket; onView: () => void }) {
  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex items-start justify-between'>
          <div className='space-y-1'>
            <h3 className='font-semibold'>
              #{ticket.number} - {ticket.subject}
            </h3>
            <p className='text-sm text-muted-foreground'>
              Last updated {format(new Date(ticket.updated_at), 'MMM dd, yyyy')}
            </p>
          </div>
          <Badge
            variant={
              ticket?.status == 'open'
                ? 'warning'
                : ticket?.status == 'in_progress'
                  ? 'default'
                  : 'success'
            }
          >
            {ticket.status?.toUpperCase()}
          </Badge>
        </div>
        <p className='mt-2 text-sm'>{ticket.description}</p>
        <div className='mt-4 flex items-center justify-between'>
          <Badge variant={
            ticket?.priority == 'high'
              ? 'destructive'
              : ticket?.priority == 'medium'
                ? 'warning'
                : 'default'
          }>
            {ticket.priority?.toUpperCase()}
          </Badge>
          <Button variant='outline' className='space-x-2' onClick={onView}>
            <MessageSquare className='h-4 w-4' />
            <span>View Conversation</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}