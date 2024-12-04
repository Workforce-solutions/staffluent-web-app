/* eslint-disable react-refresh/only-export-components */
import { ServiceRequestsProps } from '@/@types/services'
import { Layout } from '@/components/custom/layout'
import { initialPage } from '@/components/table/data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useApproveServiceRequestMutation,
  useDeclineServiceRequestMutation,
  useGetServiceRequestsQuery,
} from '@/services/servicesApi'
import { ColumnDef } from '@tanstack/react-table'
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  MoreHorizontal,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ThemeSwitch from '../../components/theme-switch'
import { UserNav } from '../../components/user-nav'
import { getStatusVariant } from '@/hooks/common/common-functions'

export enum StatusEnum {
  pending = 'Pending',
  scheduled = 'Scheduled',
  inProgres = 'In Progress',
  completed = 'Completed',
  cancelled = 'Cancelled',
}

export default function ServiceRequests() {
  const navigate = useNavigate()
  const [paginationProps, setPaginationProps] = useState(initialPage)
  const [tabValue, setTabValue] = useState('all')
  const venue_short_code = useShortCode()

  const [selectedRequest, setSelectedRequest] =
    useState<ServiceRequestsProps | null>(null)
  const [approveModalOpen, setApproveModalOpen] = useState(false)
  const [declineModalOpen, setDeclineModalOpen] = useState(false)
  const [declineReason, setDeclineReason] = useState('')

  const { toast } = useToast()
  const [approveRequest] = useApproveServiceRequestMutation()
  const [declineRequest] = useDeclineServiceRequestMutation()
  const [scheduledDate, setScheduledDate] = useState('')

  useEffect(() => {
    if (selectedRequest) {
      setScheduledDate(selectedRequest.requested_date ? new Date(selectedRequest.requested_date).toISOString().slice(0, -1) : '')
    }
  }, [selectedRequest])

  const handleApprove = async (id: number) => {
    try {
      await approveRequest({
        id,
        venue_short_code,
        scheduled_date: scheduledDate,
      }).unwrap()
      toast({
        title: 'Success',
        description: 'Service request approved successfully',
      })
      setScheduledDate('')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.data.errors.scheduled_date[0],
        variant: 'destructive',
      })
    }
  }

  const handleDecline = async (id: number) => {
    if (!declineReason) return
    try {
      await declineRequest({
        id,
        venue_short_code,
        reason: declineReason,
      }).unwrap()
      toast({
        title: 'Success',
        description: 'Service request declined successfully',
      })
      setDeclineReason('')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to decline service request',
        variant: 'destructive',
      })
    }
  }

  const { data, isFetching, isError } = useGetServiceRequestsQuery({
    venue_short_code,
    ...paginationProps,
    status: tabValue !== 'all' ? tabValue : undefined,
  })

  const columns: ColumnDef<ServiceRequestsProps>[] = [
    {
      header: 'Request ID',
      accessorKey: 'id',
      cell: ({ row }) => (
        <div className='font-medium'>REQ-{row.original.id}</div>
      ),
    },
    {
      header: 'Client',
      accessorKey: 'client',
    },
    {
      header: 'Service',
      accessorKey: 'service',
    },
    {
      header: 'Requested Date',
      accessorKey: 'requestedDate',
      cell: ({ row }) => (
        <div>{new Date(row.original.requested_date).toLocaleDateString()}</div>
      ),
    },
    {
      header: 'Schedule Date',
      accessorKey: 'scheduleDate',
      cell: ({ row }) => (
        <div>
          {new Date(row.original.scheduled_date ?? '').toLocaleDateString()}
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row: { original } }) => (
        <Badge variant={getStatusVariant(original?.status)}>
          {original?.status}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }) => {
        const status = row.original.status.toLowerCase()

        // Define which actions are available for each status
        const canApprove = ['pending'].includes(status)
        const canDecline = ['pending', 'scheduled'].includes(status)
        const canViewDetails = true // Always available

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {canViewDetails && (
                <DropdownMenuItem>
                  <div
                    className='flex cursor-pointer items-center gap-2'
                    onClick={() =>
                      navigate(`/admin/services/requests/${row.original.id}`)
                    }
                  >
                    <Eye className='mr-2 h-4 w-4' />
                    View Details
                  </div>
                </DropdownMenuItem>
              )}

              {canApprove && (
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedRequest(row.original)
                    setApproveModalOpen(true)
                  }}
                >
                  <CheckCircle className='mr-2 h-4 w-4' />
                  Approve Request
                </DropdownMenuItem>
              )}

              {canDecline && (
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedRequest(row.original)
                    setDeclineModalOpen(true)
                  }}
                >
                  <AlertCircle className='mr-2 h-4 w-4' />
                  Decline Request
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    }
  ]

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
              Service Requests
            </h2>
            <p className='text-sm text-muted-foreground'>
              Manage and process service requests from clients
            </p>
          </div>
        </div>
        {/* Request Stats */}
        <div className='grid gap-4 md:grid-cols-4'>
          {approveModalOpen && selectedRequest && (
            <ConfirmationModal
              open={approveModalOpen}
              setOpen={setApproveModalOpen}
              handleDelete={handleApprove}
              id={selectedRequest?.id}
              title='Approve Service Request'
              description='Please select a schedule date for this service request'
              label='Approve'
              labelLoading='Approving...'
              variant='default'
              extraType='date'
              extraContent={
                <Input
                  type='datetime-local'
                  min={new Date().toISOString().slice(0, 16)}
                  defaultValue={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              }
            />
          )}

          {selectedRequest && (
            <ConfirmationModal
              open={declineModalOpen}
              setOpen={setDeclineModalOpen}
              handleDelete={handleDecline}
              id={selectedRequest?.id}
              title='Decline Service Request'
              description='Please provide a reason for declining this request'
              label='Decline'
              labelLoading='Declining...'
              variant='destructive'
              extraContent={
                <Input
                  placeholder='Enter reason for declining'
                  defaultValue={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  className='mt-4'
                />
              }
            />
          )}

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                New Requests
              </CardTitle>
              <AlertCircle className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{data?.stats.new_requests}</div>
              <p className='text-xs text-muted-foreground'>Last 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>In Progress</CardTitle>
              <Clock className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{data?.stats.in_progress}</div>
              <p className='text-xs text-muted-foreground'>Active requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Completed Today
              </CardTitle>
              <CheckCircle className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{data?.stats.completed_today}</div>
              <p className='text-xs text-muted-foreground'></p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Avg. Response Time
              </CardTitle>
              <Clock className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{data?.stats.avg_response_time}</div>
              {/*<p className='text-xs text-muted-foreground'>-15min from avg</p>*/}
            </CardContent>
          </Card>
        </div>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <CardTitle>Service Requests</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  View and manage all service requests
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              value={tabValue}
              onValueChange={setTabValue}
              className='space-y-4'
            >
              <TabsList>
                <TabsTrigger value='all'>All Requests</TabsTrigger>
                {Object.entries(StatusEnum).map(([key, label]) => (
                  <TabsTrigger key={key} value={key.toLowerCase()}>
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={tabValue}>
                <GenericTableWrapper
                  columns={columns}
                  data={data?.requests.data || []}
                  isLoading={isFetching}
                  isError={isError}
                  paginationValues={paginationProps}
                  setPaginationValues={setPaginationProps}
                  total_pages={data?.requests.total_pages}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {data?.recent_activities.map((activity, i) => (
                <div key={i} className='flex items-start space-x-4'>
                  <div className='mt-2 h-2 w-2 rounded-full bg-primary' />
                  <div>
                    <p className='text-sm font-medium'>
                      {activity.description}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      {activity.time_ago}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
