import { ColumnDef } from '@tanstack/react-table'
import { Clock, Filter, PlusIcon, Search } from 'lucide-react'
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
import { useListMyRequestsQuery } from '@/services/clientPortalApi'
import { Alert } from '@/components/ui/alerts/Alert'
import { AlertDescription } from '@/components/ui/alerts/AlertDescription'
import { ServiceRequest } from '@/@types/clientPortal'
import { RequestServiceModal } from '@/components/client-portal/request-service-modal'
import {useNavigate} from "react-router-dom";

interface StatsCardProps {
  title: string
  count: number
  label: string
}

const StatsCard = ({ title, count, label }: StatsCardProps) => (
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

const getStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'Pending':
      return 'default'
    case 'Scheduled':
      return 'secondary'
    case 'Completed':
      return 'outline'
    case 'Cancelled':
      return 'destructive'
    default:
      return 'default'
  }
}

const getPriorityVariant = (priority: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (priority) {
    case 'High':
    case 'Urgent':
      return 'destructive'
    case 'Normal':
      return 'default'
    case 'Low':
      return 'secondary'
    default:
      return 'default'
  }
}

const ServiceRequests = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [paginationValues, setPaginationValues] = useState(initialPage)
  const [openRequestModal, setOpenRequestModal] = useState(false)

  const { data: responseData, isLoading, isError } = useListMyRequestsQuery()
  const navigate = useNavigate()


  const columns: ColumnDef<ServiceRequest>[] = [
    {
      accessorKey: 'reference',
      header: 'Reference',
      cell: ({ row }) => (
          <span
              className='font-medium cursor-pointer hover:text-primary'
              onClick={() => navigate(`/client-portal/service-requests/${row.original.id}`)}
          >
            {row.original.reference}
          </span>
      ),
    },
    {
      accessorKey: 'service_type',
      header: 'Service Type'
    },
    {
      accessorKey: 'requested_date',
      header: 'Requested Date',
      cell: ({ row }) => new Date(row.original.requested_date).toLocaleDateString()
    },
    {
      accessorKey: 'preferred_date',
      header: 'Preferred Date',
      cell: ({ row }) => row.original.preferred_date
          ? new Date(row.original.preferred_date).toLocaleDateString()
          : '-'
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
          <Badge variant={getStatusVariant(row.original.status)}>
            {row.original.status}
          </Badge>
      ),
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => (
          <Badge variant={getPriorityVariant(row.original.priority)}>
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

  // @ts-ignore
  const filteredData = responseData?.requests.data.filter(request =>
      request.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) ?? []

  if (isError) {
    return (
        <Layout>
          <Layout.Body className='p-6'>
            <Alert variant="error">
              <AlertDescription>
                Failed to load service requests. Please try again later.
              </AlertDescription>
            </Alert>
          </Layout.Body>
        </Layout>
    )
  }

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
              <div className='flex items-center space-x-2'>
                <Button onClick={() => setOpenRequestModal(true)}>
                  <PlusIcon className='mr-2 h-4 w-4' />
                  Request Service
                </Button>
              </div>
            </div>
          </div>
        </Layout.Header>

        <Layout.Body className='space-y-6 p-6'>
          <div className='grid gap-4 md:grid-cols-4'>
            <StatsCard
                title='Pending Requests'
                // @ts-ignore
                count={responseData?.stats.pending.count ?? 0}
                // @ts-ignore
                label={responseData?.stats.pending.label ?? 'Awaiting processing'}
            />
            <StatsCard
                title='Scheduled'
                // @ts-ignore
                count={responseData?.stats.scheduled.count ?? 0}
                // @ts-ignore
                label={responseData?.stats.scheduled.label ?? 'Confirmed appointments'}
            />
            <StatsCard
                title='Completed'
                // @ts-ignore
                count={responseData?.stats.completed.count ?? 0}
                // @ts-ignore
                label={responseData?.stats.completed.label ?? 'This month'}
            />
            <StatsCard
                title='Canceled'
                // @ts-ignore
                count={responseData?.stats.canceled.count ?? 0}
                // @ts-ignore
                label={responseData?.stats.canceled.label ?? 'Cancelled requests'}
            />
          </div>

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
                  data={filteredData}
                  isLoading={isLoading}
                  isError={isError}
                  {...{ paginationValues, setPaginationValues }}
              />
            </CardContent>
          </Card>
        </Layout.Body>

        <RequestServiceModal
            open={openRequestModal}
            setOpen={setOpenRequestModal}
        />
      </Layout>
  )
}

export default ServiceRequests