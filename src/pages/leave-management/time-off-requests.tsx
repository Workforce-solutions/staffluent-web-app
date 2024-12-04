import { useState } from 'react'
import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import {
  Calendar as CalendarIcon,
  Plus,
  FileText,
  AlertCircle,
} from 'lucide-react'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

const TimeOffRequest = () => {
  const [open, setOpen] = useState(false)
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  })

  // Sample data - replace with actual API data
  const requests = [
    {
      id: 1,
      type: 'Annual Leave',
      startDate: '2024-12-01',
      endDate: '2024-12-05',
      days: 5,
      status: 'pending',
      reason: 'Family vacation',
    },
    {
      id: 2,
      type: 'Sick Leave',
      startDate: '2024-11-15',
      endDate: '2024-11-16',
      days: 2,
      status: 'approved',
      reason: "Doctor's appointment",
    },
    {
      id: 3,
      type: 'Personal Leave',
      startDate: '2024-10-20',
      endDate: '2024-10-20',
      days: 1,
      status: 'rejected',
      reason: 'Personal errands',
    },
  ]

  const RequestForm = () => (
    <div className='grid gap-4 py-4'>
      <div className='grid gap-2'>
        <label>Leave Type</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder='Select leave type' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='annual'>Annual Leave</SelectItem>
            <SelectItem value='sick'>Sick Leave</SelectItem>
            <SelectItem value='personal'>Personal Leave</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='grid gap-2'>
        <label>Date Range</label>
        <Calendar
          mode='range'
          selected={dateRange}
          onSelect={(range) => {
            if (range?.from && range?.to) {
              setDateRange({ from: range.from, to: range.to })
            }
          }}
          numberOfMonths={2}
          className='rounded-md border'
        />
      </div>
      <div className='grid gap-2'>
        <label>Reason for Leave</label>
        <Textarea placeholder='Please provide details about your leave request...' />
      </div>
      <div className='grid gap-2'>
        <label>Supporting Documents (Optional)</label>
        <Input type='file' />
      </div>
    </div>
  )

  const getStatusBadge = (status: string) => {
    const variants: any = {
      pending: 'warning',
      approved: 'success',
      rejected: 'destructive',
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }

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
              Time-off Requests
            </h2>
            <p className='text-muted-foreground'>
              Submit and manage your leave requests
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className='mr-2 h-4 w-4' />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[600px]'>
              <DialogHeader>
                <DialogTitle>New Time-off Request</DialogTitle>
                <DialogDescription>
                  Submit a new request for time off. Please provide all required
                  information.
                </DialogDescription>
              </DialogHeader>
              <RequestForm />
              <DialogFooter>
                <Button variant='outline' onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setOpen(false)}>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className='grid gap-6 md:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <FileText className='h-4 w-4' />
                Available Leave
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span>Annual Leave</span>
                  <span className='font-medium'>15 days</span>
                </div>
                <div className='flex justify-between'>
                  <span>Sick Leave</span>
                  <span className='font-medium'>8 days</span>
                </div>
                <div className='flex justify-between'>
                  <span>Personal Leave</span>
                  <span className='font-medium'>3 days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <CalendarIcon className='h-4 w-4' />
                Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                {requests
                  .filter((r) => r.status === 'pending')
                  .map((request) => (
                    <div
                      key={request.id}
                      className='flex items-center justify-between border-b pb-2'
                    >
                      <div>
                        <div className='font-medium'>{request.type}</div>
                        <div className='text-sm text-muted-foreground'>
                          {format(new Date(request.startDate), 'MMM dd')} -{' '}
                          {format(new Date(request.endDate), 'MMM dd')}
                        </div>
                      </div>
                      <Badge variant='warning'>{request.days} days</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <AlertCircle className='h-4 w-4' />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className='flex items-center justify-between border-b pb-2'
                  >
                    <div>
                      <div className='font-medium'>{request.type}</div>
                      <div className='text-sm text-muted-foreground'>
                        {format(new Date(request.startDate), 'MMM dd, yyyy')}
                      </div>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0'>
            <CardTitle>All Requests</CardTitle>
            <Select defaultValue='all'>
              <SelectTrigger className='w-[150px]'>
                <SelectValue placeholder='Filter by status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='approved'>Approved</SelectItem>
                <SelectItem value='rejected'>Rejected</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className='font-medium'>
                      {request.type}
                    </TableCell>
                    <TableCell>
                      {format(new Date(request.startDate), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      {format(new Date(request.endDate), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>{request.days}</TableCell>
                    <TableCell className='max-w-[300px] truncate'>
                      {request.reason}
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
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

export default TimeOffRequest
