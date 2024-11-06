import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, Clock, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { format } from "date-fns"

interface ServiceRequest {
  id: number
  reference: string
  service_type: string
  requested_date: Date
  preferred_date: Date
  status: 'Pending' | 'Scheduled' | 'Completed' | 'Cancelled'
  priority: 'High' | 'Normal' | 'Low'
  description: string
}

export default function ServiceRequests() {
  const [searchTerm, setSearchTerm] = useState('')

  // Dummy data
  const requests: ServiceRequest[] = [
    {
      id: 1,
      reference: "SR-2024001",
      service_type: "Equipment Maintenance",
      requested_date: new Date('2024-01-20'),
      preferred_date: new Date('2024-02-01'),
      status: 'Pending',
      priority: 'High',
      description: "Monthly maintenance check for kitchen equipment"
    },
    {
      id: 2,
      reference: "SR-2024002",
      service_type: "Emergency Repair",
      requested_date: new Date('2024-01-19'),
      preferred_date: new Date('2024-01-21'),
      status: 'Scheduled',
      priority: 'High',
      description: "Urgent repair needed for refrigeration unit"
    },
    {
      id: 3,
      reference: "SR-2024003",
      service_type: "Installation",
      requested_date: new Date('2024-01-15'),
      preferred_date: new Date('2024-02-05'),
      status: 'Completed',
      priority: 'Normal',
      description: "New equipment installation request"
    }
  ]

  const filteredRequests = requests.filter(request =>
    request.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.service_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout>
      <Layout.Header className="min-h-fit border-b">
        <div className="flex w-full flex-col">
          <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
          <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
            <div>
              <h2 className='text-lg font-medium'>Service Requests</h2>
              <p className='text-sm text-muted-foreground'>
                View and manage service requests
              </p>
            </div>
          </div>
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6 p-6'>
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requests.filter(r => r.status === 'Pending').length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting processing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requests.filter(r => r.status === 'Scheduled').length}
              </div>
              <p className="text-xs text-muted-foreground">Confirmed appointments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requests.filter(r => r.status === 'Completed').length}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle>All Requests</CardTitle>
                <p className="text-sm text-muted-foreground">
                  View your service request history
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-[250px]"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Requested Date</TableHead>
                  <TableHead>Preferred Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.reference}</TableCell>
                    <TableCell>{request.service_type}</TableCell>
                    <TableCell>{format(request.requested_date, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{format(request.preferred_date, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <Badge variant={
                        request.status === 'Pending' ? 'warning' :
                        request.status === 'Scheduled' ? 'default' :
                        request.status === 'Completed' ? 'success' :
                        'destructive'
                      }>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        request.priority === 'High' ? 'destructive' :
                        request.priority === 'Normal' ? 'default' :
                        'secondary'
                      }>
                        {request.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {request.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}