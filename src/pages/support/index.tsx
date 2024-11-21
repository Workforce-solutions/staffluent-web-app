import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Eye,
  MoreHorizontal,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGetAdminTicketsQuery } from '@/services/adminTicketApi'
import { useShortCode } from '@/hooks/use-local-storage'
import { format } from 'date-fns'
import { UpdateStatusModal } from './update-status'
import { AddAsigneModal } from './add-assign-agent'
import { UpdatePriorityModal } from './update-priority'
import { useNavigate } from 'react-router-dom'

const statusOptions = {
  open: 'Open',
  in_progress: 'In Progress',
  closed: 'Closed',
  resolved: 'Resolved',
}

const priorityOptions = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
}

export default function SupportTickets() {

  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: '',
    page: 1,
    per_page: 10
  });
  const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState(false);
  const [openAddAssignModal, setOpenAddAssignModal] = useState(false);
  const [openUpdatePriorityModal, setOpenUpdatePriorityModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<any | null>(null);
  const venue_short_code = useShortCode();

  const { data, isLoading } = useGetAdminTicketsQuery({
    venue_short_code,
    ...filters
  });

  const handleStatusChange = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status,
      page: 1
    }));
  };

  const handlePriorityChange = (priority: string) => {
    setFilters(prev => ({
      ...prev,
      priority,
      page: 1
    }));
  };

  const handleSearch = (search: string) => {
    setFilters(prev => ({
      ...prev,
      search,
      page: 1
    }));
  };

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
            <h2 className='text-2xl font-bold tracking-tight'>
              Support Tickets
            </h2>
            <p className='text-sm text-muted-foreground'>
              Manage and respond to support tickets
            </p>
          </div>
          {/* <div className='flex space-x-2'>
            <Button onClick={() => setOpenNewTicket(true)}>
              <MessageSquare className='mr-2 h-4 w-4' />
              Create Ticket
            </Button>
            <CreateTicketModal
              open={openNewTicket}
              onOpenChange={setOpenNewTicket}
            />
          </div> */}
        </div>
        {/* Stats Cards */}
        <div className='grid gap-4 md:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Open Tickets
              </CardTitle>
              <AlertCircle className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{data?.stats.open_tickets || 0}</div>
              <p className='text-xs text-muted-foreground'>
                Active support tickets
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Avg Response Time
              </CardTitle>
              <Clock className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{data?.stats.avg_response_time || 'N/A'}</div>
              <p className='text-xs text-muted-foreground'>Response time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Resolution Rate
              </CardTitle>
              <CheckCircle2 className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{data?.stats.resolution_rate || '0%'}</div>
              <p className='text-xs text-muted-foreground'>Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Active Agents
              </CardTitle>
              <Users className='h-4 w-4 text-muted-foreground'/>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{data?.stats.active_agents || 0}</div>
              <p className='text-xs text-muted-foreground'>Handling tickets</p>
            </CardContent>
          </Card>
        </div>

        {/* Tickets Table */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <CardTitle>Support Tickets</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  Manage and track all support tickets
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='relative'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                      placeholder='Search tickets...'
                      value={filters.search}
                      onChange={(e) => handleSearch(e.target.value)}
                      className='w-[250px] pl-8'
                  />
                </div>
                <Select
                    value={filters.priority}
                    onValueChange={handlePriorityChange}
                >
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Filter by priority' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Priorities</SelectItem>
                    {Object.entries(priorityOptions).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={filters.status} onValueChange={handleStatusChange}>
              <TabsList>
                <TabsTrigger value='all'>All Tickets</TabsTrigger>
                <TabsTrigger value='open'>Open</TabsTrigger>
                <TabsTrigger value='in_progress'>In Progress</TabsTrigger>
                <TabsTrigger value='resolved'>Resolved</TabsTrigger>
              </TabsList>

              <TabsContent value={filters.status}>
                {isLoading ? (
                    <div className="flex justify-center py-8">Loading...</div>
                ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ticket ID</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Assigned To</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data?.tickets.data.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={8} className="text-center">
                                No tickets found
                              </TableCell>
                            </TableRow>
                        ) : (
                            data?.tickets.data.map((ticket) => (
                                <TableRow key={ticket.id}>
                                  <TableCell className='font-medium'>
                                    {ticket.number}
                                  </TableCell>
                                  <TableCell>{ticket.subject}</TableCell>
                                  <TableCell>{ticket.client?.name}</TableCell>
                                  <TableCell>
                                    <Badge
                                        variant={
                                          ticket.priority === 'urgent' || ticket.priority === 'high'
                                              ? 'destructive'
                                              : ticket.priority === 'medium'
                                                  ? 'warning'
                                                  : 'default'
                                        }
                                    >
                                      {priorityOptions[ticket.priority]}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                        variant={
                                          ticket.status === 'open'
                                              ? 'destructive'
                                              : ticket.status === 'in_progress'
                                                  ? 'warning'
                                                  : 'success'
                                        }
                                    >
                                      {statusOptions[ticket.status]}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{ticket.assigned_to?.name || 'Unassigned'}</TableCell>
                                  <TableCell>{format(new Date(ticket.created_at), 'MMM dd, yyyy')}</TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant='ghost' size='icon'>
                                          <MoreHorizontal className='h-4 w-4' />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align='end'>
                                        <DropdownMenuItem onClick={() => navigate(`/admin/support/tickets/${ticket.id}`)}>
                                          <Eye className='mr-2 h-4 w-4' />
                                          View Details
                                        </DropdownMenuItem>
                                        {!ticket.assigned_to && (
                                            <DropdownMenuItem
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSelectedTicketId(ticket);
                                                  setOpenAddAssignModal(true);
                                                }}
                                            >
                                              Assign Agent
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSelectedTicketId(ticket);
                                              setOpenUpdateStatusModal(true);
                                            }}
                                        >
                                          Update Status
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSelectedTicketId(ticket);
                                              setOpenUpdatePriorityModal(true);
                                            }}
                                        >
                                          Update Priority
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </Layout.Body>

      {/* Modals */}
      <UpdateStatusModal
          open={openUpdateStatusModal}
          setOpen={setOpenUpdateStatusModal}
          ticket={selectedTicketId}
      />
      <AddAsigneModal
          open={openAddAssignModal}
          setOpen={setOpenAddAssignModal}
          ticket={selectedTicketId}
      />
      <UpdatePriorityModal
          open={openUpdatePriorityModal}
          setOpen={setOpenUpdatePriorityModal}
          ticket={selectedTicketId}
      />
    </Layout>
  );
}

