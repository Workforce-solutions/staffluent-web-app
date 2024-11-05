// pages/client-portal/support/index.tsx
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
import {useGetSupportTicketsQuery} from "../../../services/clientPortalApi";
import {useState} from "react";
import {getStatusVariant} from "../../../utils/status";
import {formatDate} from "date-fns";

export default function Support() {
  const [openNewTicket, setOpenNewTicket] = useState(false)
  const { data: supportData } = useGetSupportTicketsQuery()

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6'>
        {/* Header with Stats */}
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Support</h2>
            <p className='text-muted-foreground'>
              Get help with your services
            </p>
          </div>
          <Button onClick={() => setOpenNewTicket(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Support Ticket
          </Button>
        </div>

        {/* Stats Cards */}
        <div className='grid gap-4 md:grid-cols-3'>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supportData?.active_count}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supportData?.resolved_count}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Response</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supportData?.avg_response_time}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tickets List */}
        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" className="space-y-4">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
                <TabsTrigger value="all">All Tickets</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {supportData?.active_tickets.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </TabsContent>

              <TabsContent value="resolved" className="space-y-4">
                {supportData?.resolved_tickets.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </TabsContent>

              <TabsContent value="all" className="space-y-4">
                {supportData?.all_tickets.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </Layout.Body>

      <NewTicketModal open={openNewTicket} setOpen={setOpenNewTicket} />
    </Layout>
  )
}

// @ts-ignore
function TicketCard({ ticket }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">#{ticket.number} - {ticket.subject}</h3>
            <p className="text-sm text-muted-foreground">
              {/*//@ts-ignore*/}
              Last updated {formatDate(ticket.updated_at)}
            </p>
          </div>
          <Badge variant={getStatusVariant(ticket.status)}>
            {ticket.status}
          </Badge>
        </div>
        <p className="mt-2 text-sm">{ticket.description}</p>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" className="space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>View Conversation</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
