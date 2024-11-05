import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge'
import {
  MessageSquare,
  PlusCircle,
  Clock,
  CheckCircle2
} from 'lucide-react'
import { NewTicketModal } from '@/components/client-portal/new-ticket-modal'
import { useState } from "react"
import { format } from "date-fns"

interface Ticket {
  id: number
  number: string
  subject: string
  description: string
  status: 'Open' | 'In Progress' | 'Resolved'
  updated_at: Date
  created_at: Date
  priority: 'High' | 'Medium' | 'Low'
}

export default function Support() {
  const [openNewTicket, setOpenNewTicket] = useState(false)

  // Dummy data
  const supportData = {
    active_count: 3,
    resolved_count: 12,
    avg_response_time: "2.4h",
    active_tickets: [
      {
        id: 1,
        number: "TK-2024001",
        subject: "Equipment Malfunction",
        description: "Main cooking equipment not maintaining proper temperature",
        status: "Open",
        priority: "High",
        updated_at: new Date('2024-01-20'),
        created_at: new Date('2024-01-20')
      },
      {
        id: 2,
        number: "TK-2024002",
        subject: "Software Issue",
        description: "POS system showing errors during peak hours",
        status: "In Progress",
        priority: "Medium",
        updated_at: new Date('2024-01-19'),
        created_at: new Date('2024-01-18')
      }
    ],
    resolved_tickets: [
      {
        id: 3,
        number: "TK-2024003",
        subject: "Training Request",
        description: "Need training session for new staff on equipment usage",
        status: "Resolved",
        priority: "Low",
        updated_at: new Date('2024-01-15'),
        created_at: new Date('2024-01-10')
      }
    ],
    all_tickets: [
      {
        id: 1,
        number: "TK-2024001",
        subject: "Equipment Malfunction",
        description: "Main cooking equipment not maintaining proper temperature",
        status: "Open",
        priority: "High",
        updated_at: new Date('2024-01-20'),
        created_at: new Date('2024-01-20')
      },
      {
        id: 2,
        number: "TK-2024002",
        subject: "Software Issue",
        description: "POS system showing errors during peak hours",
        status: "In Progress",
        priority: "Medium",
        updated_at: new Date('2024-01-19'),
        created_at: new Date('2024-01-18')
      },
      {
        id: 3,
        number: "TK-2024003",
        subject: "Training Request",
        description: "Need training session for new staff on equipment usage",
        status: "Resolved",
        priority: "Low",
        updated_at: new Date('2024-01-15'),
        created_at: new Date('2024-01-10')
      }
    ]
  }

  // @ts-ignore
  return (
    <Layout>
      <Layout.Header className="min-h-fit border-b">
        <div className="flex w-full flex-col">
          <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">Support</h2>
              <p className="text-sm text-muted-foreground">
                Get help with your services
              </p>
            </div>
            <Button onClick={() => setOpenNewTicket(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Support Ticket
            </Button>
          </div>
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6 p-6'>
        {/* Stats Cards */}
        <div className='grid gap-4 md:grid-cols-3'>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supportData.active_count}</div>
              <p className="text-xs text-muted-foreground">Open support requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supportData.resolved_count}</div>
              <p className="text-xs text-muted-foreground">Total resolved tickets</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Response</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supportData.avg_response_time}</div>
              <p className="text-xs text-muted-foreground">Response time</p>
            </CardContent>
          </Card>
        </div>

        {/* Tickets List */}
        <Card>
          <CardHeader>
            <div className="space-y-1">
              <CardTitle>Support Tickets</CardTitle>
              <p className="text-sm text-muted-foreground">
                View and manage your support requests
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" className="space-y-4">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
                <TabsTrigger value="all">All Tickets</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {supportData.active_tickets.map(ticket => (
                    // @ts-ignore
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
                {supportData.active_tickets.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No active tickets found
                  </p>
                )}
              </TabsContent>

              <TabsContent value="resolved" className="space-y-4">
                {supportData.resolved_tickets.map(ticket => (
                    // @ts-ignore
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
                {supportData.resolved_tickets.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No resolved tickets found
                  </p>
                )}
              </TabsContent>

              <TabsContent value="all" className="space-y-4">
                {supportData.all_tickets.map(ticket => (
                    // @ts-ignore
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
                {supportData.all_tickets.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No tickets found
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </Layout.Body>

      <NewTicketModal open={openNewTicket} setOpen={setOpenNewTicket} />
    </Layout>
  )
}

function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">#{ticket.number} - {ticket.subject}</h3>
            <p className="text-sm text-muted-foreground">
              Last updated {format(ticket.updated_at, 'MMM dd, yyyy')}
            </p>
          </div>
          <Badge variant={
            ticket.status === 'Open' ? 'warning' :
            ticket.status === 'In Progress' ? 'default' :
            'success'
          }>
            {ticket.status}
          </Badge>
        </div>
        <p className="mt-2 text-sm">{ticket.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <Badge variant={
            ticket.priority === 'High' ? 'destructive' :
            ticket.priority === 'Medium' ? 'warning' :
            'default'
          }>
            {ticket.priority} Priority
          </Badge>
          <Button variant="outline" className="space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>View Conversation</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}