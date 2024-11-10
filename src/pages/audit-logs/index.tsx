import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon, DownloadIcon, RefreshCwIcon } from 'lucide-react'
import { format } from 'date-fns'
import React from 'react'

// Mock data for audit logs
const auditLogs = [
  {
    id: 1,
    action: 'User Login',
    user: 'John Doe',
    timestamp: '2023-04-01 10:30:00',
    details: 'Successful login from 192.168.1.1',
  },
  {
    id: 2,
    action: 'Create Task',
    user: 'Jane Smith',
    timestamp: '2023-04-01 11:45:00',
    details: "Created task 'Implement new feature'",
  },
  {
    id: 3,
    action: 'Update User',
    user: 'Admin',
    timestamp: '2023-04-01 14:20:00',
    details: "Updated user profile for 'John Doe'",
  },
  // Add more mock data as needed
]

export default function AuditLogs() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  // @ts-ignore
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Audit Logs
          </h1>
          <div className='flex space-x-2'>
            <Button variant='outline' size='sm'>
              <RefreshCwIcon className='mr-2 h-4 w-4' />
              Refresh
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm'>
                  <DownloadIcon className='mr-2 h-4 w-4' />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Choose format</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                <DropdownMenuItem>Export as JSON</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Filters - Updated with more options */}
        <div className='space-y-4 md:flex md:items-center md:justify-between md:space-y-0'>
          <div className='space-y-2 md:flex md:flex-1 md:items-center md:space-x-2 md:space-y-0'>
            <Input
              placeholder='Filter logs...'
              className='w-full md:w-[250px]'
            />
            <Select defaultValue='all'>
              <SelectTrigger className='w-full md:w-[180px]'>
                <SelectValue placeholder='Select action' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Actions</SelectItem>
                <SelectItem value='login'>User Login</SelectItem>
                <SelectItem value='create'>Create Task</SelectItem>
                <SelectItem value='update'>Update User</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full justify-start text-left font-normal md:w-[180px]'
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button className='w-full md:w-auto'>Apply Filters</Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='mt-2 w-full md:mt-0 md:w-auto'
              >
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuCheckboxItem checked>
                Action
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>User</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>
                Timestamp
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>
                Details
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Summary Stats */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <div className='rounded-lg border p-3'>
            <div className='text-sm font-medium'>Total Logs</div>
            <div className='text-2xl font-bold'>1,234</div>
          </div>
          <div className='rounded-lg border p-3'>
            <div className='text-sm font-medium'>Unique Users</div>
            <div className='text-2xl font-bold'>56</div>
          </div>
          <div className='rounded-lg border p-3'>
            <div className='text-sm font-medium'>Actions Today</div>
            <div className='text-2xl font-bold'>78</div>
          </div>
          <div className='rounded-lg border p-3'>
            <div className='text-sm font-medium'>Critical Events</div>
            <div className='text-2xl font-bold'>3</div>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className='overflow-x-auto rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className='font-medium'>{log.action}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.details}</TableCell>
                  <TableCell>
                    <Badge
                      variant='outline'
                      className='bg-green-100 text-green-800'
                    >
                      Low
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className='flex items-center justify-between py-4'>
          <div className='flex-1 text-sm text-muted-foreground'>
            Showing <span className='font-medium'>1</span> to{' '}
            <span className='font-medium'>10</span> of{' '}
            <span className='font-medium'>100</span> results
          </div>
          <div className='flex items-center space-x-2'>
            <Button variant='outline' size='sm'>
              Previous
            </Button>
            <Button variant='outline' size='sm'>
              Next
            </Button>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
