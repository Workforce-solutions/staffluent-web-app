import { ColumnDef } from '@tanstack/react-table'
import { Clock, Filter, Search } from 'lucide-react'
import { useState } from 'react'
import { Layout } from '@/components/custom/layout'
import { initialPage } from '@/components/table/data'
import ThemeSwitch from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { UserNav } from '@/components/user-nav'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'

interface ServiceRequest {
  id: number
  reference: string
  service_type: string
  requested_date: string
  preferred_date: string
  status: string
  priority: string
  description: string
  status_variant: string
  priority_variant: string
}

interface StatsCard {
  title: string
  count: number
  label: string
}

const StatsCard = ({ title, count, label }: StatsCard) => (
  <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>{title}</CardTitle>
      <Clock className='h-4 w-4 text-muted-foreground' />
    </CardHeader>
    <CardContent>
      <div className='text-2xl font-bold'>{count}</div>
      <p className='text-xs text-muted-foreground'>{label}</p>
    </CardContent>
  </Card>
)

export default function ServiceRequests() {
  const [searchTerm, setSearchTerm] = useState('')
  const [paginationValues, setPaginationValues] = useState(initialPage)

  // Dummy data based on the provided response structure
  const responseData = {
    stats: {
      pending: { count: 3, label: 'Awaiting processing' },
      scheduled: { count: 0, label: 'Confirmed appointments' },
      completed: { count: 0, label: 'This month' },
      canceled: { count: 0, label: 'Cancelled requests' },
    },
    requests: {
      data: [
        {
          id: 3,
          reference: 'SR-20240003',
          service_type: 'Monthly Office Maintenance',
          requested_date: 'Nov 10, 2024',
          preferred_date: 'Nov 29, 2024',
          status: 'Pending',
          priority: 'Normal',
          description: 'Some other descriptionss',
          status_variant: 'warning',
          priority_variant: 'default',
        },
        {
          id: 2,
          reference: 'SR-20240002',
          service_type: 'Monthly Place Maintenance',
          requested_date: 'Nov 10, 2024',
          preferred_date: 'Nov 19, 2024',
          status: 'Pending',
          priority: 'Normal',
          description: 'Some description here',
          status_variant: 'warning',
          priority_variant: 'default',
        },
        {
          id: 1,
          reference: 'SR-20240001',
          service_type: 'Monthly Place Maintenance',
          requested_date: 'Nov 10, 2024',
          preferred_date: 'Nov 12, 2024',
          status: 'Pending',
          priority: 'Normal',
          description: 'super work',
          status_variant: 'warning',
          priority_variant: 'default',
        },
      ],
      current_page: 1,
      per_page: 15,
      total: 3,
      total_pages: 1,
    },
  }

  const columns: ColumnDef<ServiceRequest>[] = [
    {
      accessorKey: 'reference',
      header: 'Reference',
      cell: ({ row }) => (
        <span className='font-medium'>{row.original.reference}</span>
      ),
    },
    { accessorKey: 'service_type', header: 'Service Type' },
    { accessorKey: 'requested_date', header: 'Requested Date' },
    { accessorKey: 'preferred_date', header: 'Preferred Date' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.status_variant as
              | 'default'
              | 'secondary'
              | 'destructive'
              | 'outline'
          }
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => (
        <Badge
          variant={
            row.original.priority_variant as
              | 'default'
              | 'secondary'
              | 'destructive'
              | 'outline'
          }
        >
          {row.original.priority}
        </Badge>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <div className='max-w-[300px] truncate'>{row.original.description}</div>
      ),
    },
  ]

  return (
    <Layout>
      <Layout.Header className='min-h-fit border-b'>
        <div className='flex w-full flex-col'>
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
        <div className='grid gap-4 md:grid-cols-4'>
          <StatsCard
            title='Pending Requests'
            count={responseData.stats.pending.count}
            label={responseData.stats.pending.label}
          />
          <StatsCard
            title='Scheduled'
            count={responseData.stats.scheduled.count}
            label={responseData.stats.scheduled.label}
          />
          <StatsCard
            title='Completed'
            count={responseData.stats.completed.count}
            label={responseData.stats.completed.label}
          />
          <StatsCard
            title='Canceled'
            count={responseData.stats.canceled.count}
            label={responseData.stats.canceled.label}
          />
        </div>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <CardTitle>All Requests</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  View your service request history
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='relative'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='Search requests...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-[250px] pl-8'
                  />
                </div>
                <Button variant='outline' size='icon'>
                  <Filter className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <GenericTableWrapper
              columns={columns}
              data={responseData.requests.data}
              isLoading={false}
              isError={false}
              {...{ paginationValues, setPaginationValues }}
            />
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
