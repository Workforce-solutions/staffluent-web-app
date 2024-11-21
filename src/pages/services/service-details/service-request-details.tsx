import EmptyBlock from '@/components/cards/empty-block'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { UserNav } from '@/components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useApproveServiceRequestMutation,
  useDeclineServiceRequestMutation,
  useGetServiceRequestDetailsQuery,
} from '@/services/service-requestApi'
import { format } from 'date-fns'
import { AlertCircle, Calendar, Clock } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ConnectProjectModal } from './connect-service-withproject'
import ContactModal from './contact-modal'

export default function ServiceRequestDetails() {
  const { id } = useParams()
  const shortCode = useShortCode()
  const [declineReason, setDeclineReason] = useState('')
  const [showDeclineDialog, setShowDeclineDialog] = useState(false)
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const { data: request, isLoading } = useGetServiceRequestDetailsQuery({
    venue_short_code: shortCode,
    id: Number(id),
  })

  const [approveRequest] = useApproveServiceRequestMutation()
  const [declineRequest] = useDeclineServiceRequestMutation()

  if (isLoading) return <ServiceRequestDetailsSkeleton />
  if (!request) return <div>Service request not found</div>

  const handleApprove = async () => {
    try {
      await approveRequest({
        venue_short_code: shortCode,
        id: Number(id),
      }).unwrap()
    } catch (error) {
      console.error('Failed to approve request:', error)
    }
  }

  const handleDecline = async () => {
    try {
      await declineRequest({
        venue_short_code: shortCode,
        id: Number(id),
        reason: declineReason,
      }).unwrap()
      setShowDeclineDialog(false)
    } catch (error) {
      console.error('Failed to decline request:', error)
    }
  }

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Header>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-3xl font-bold tracking-tight'>
              Service Request #{request.reference}
            </h2>
            <p className='text-muted-foreground'>Service Request Details</p>
          </div>
          <div className='flex items-center gap-4'>
            <Badge
              variant={
                request.status === 'Completed'
                  ? 'success'
                  : request.status === 'Cancelled'
                    ? 'destructive'
                    : request.status === 'In Progress'
                      ? 'warning'
                      : 'default'
              }
            >
              {request.status}
            </Badge>
            {request.status === 'Pending' && (
              <>
                <Button onClick={handleApprove}>Approve</Button>
                <Button
                  variant='destructive'
                  onClick={() => setShowDeclineDialog(true)}
                >
                  Decline
                </Button>
              </>
            )}
          </div>
          <div className='ml-5'>
            <ContactModal setOpen={setModalOpen} open={modalOpen} />
          </div>
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='grid gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Request Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className='space-y-4'>
                <div>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Service
                  </dt>
                  <dd className='text-sm'>{request.service.name}</dd>
                </div>
                <div>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Client
                  </dt>
                  <dd className='text-sm'>{request.client.name}</dd>
                </div>
                <div>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Priority
                  </dt>
                  <dd>
                    <Badge
                      variant={
                        request.priority === 'Urgent'
                          ? 'destructive'
                          : request.priority === 'High'
                            ? 'warning'
                            : request.priority === 'Normal'
                              ? 'default'
                              : 'secondary'
                      }
                    >
                      {request.priority}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Description
                  </dt>
                  <dd className='whitespace-pre-wrap text-sm'>
                    {request.description}
                  </dd>
                </div>
                <div>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Notes
                  </dt>
                  <dd className='whitespace-pre-wrap text-sm'>
                    {request.notes || 'No notes'}
                  </dd>
                </div>
                {request.assigned_to && (
                  <div>
                    <dt className='text-sm font-medium text-muted-foreground'>
                      Assigned To
                    </dt>
                    <dd className='text-sm'>{request.assignedStaff.name}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dates & Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <div>
                    <p className='text-sm font-medium'>Requested Date</p>
                    <p className='text-sm text-muted-foreground'>
                      {format(new Date(request.requested_date), 'PPP')}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <Clock className='h-4 w-4 text-muted-foreground' />
                  <div>
                    <p className='text-sm font-medium'>Preferred Date</p>
                    <p className='text-sm text-muted-foreground'>
                      {request.preferred_date
                        ? format(new Date(request.preferred_date), 'PPP')
                        : 'Not specified'}
                    </p>
                  </div>
                </div>

                {request.scheduled_date && (
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-muted-foreground' />
                    <div>
                      <p className='text-sm font-medium'>Scheduled Date</p>
                      <p className='text-sm text-muted-foreground'>
                        {format(new Date(request.scheduled_date), 'PPP')}
                      </p>
                    </div>
                  </div>
                )}

                {request.completed_at && (
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4 text-green-500' />
                    <div>
                      <p className='text-sm font-medium'>Completed Date</p>
                      <p className='text-sm text-muted-foreground'>
                        {format(new Date(request.completed_at), 'PPP')}
                      </p>
                    </div>
                  </div>
                )}

                {request.cancelled_at && (
                  <div className='flex items-center gap-2'>
                    <AlertCircle className='h-4 w-4 text-destructive' />
                    <div>
                      <p className='text-sm font-medium'>Cancelled Date</p>
                      <p className='text-sm text-muted-foreground'>
                        {format(new Date(request.cancelled_at), 'PPP')}
                      </p>
                      <p className='mt-1 text-sm text-destructive'>
                        Reason: {request.cancellation_reason}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className='md:col-span-2'>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {request.activities.map((activity) => (
                  <div
                    key={activity.id}
                    className='flex items-start gap-2 rounded-lg border p-3'
                  >
                    <div className='flex-1'>
                      <p className='text-sm font-medium'>
                        {activity.activity_type}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {activity.description}
                      </p>
                      <p className='mt-1 text-xs text-muted-foreground'>
                        {format(new Date(activity.created_at), 'PPP p')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {!request.app_project && (
            <EmptyBlock
              onClick={() => setOpen(true)}
              title='Add Project'
              description='There is no active project connected with this service. Please connect one.'
              topDescription='No active project'
            >
              <ConnectProjectModal
                setOpen={setOpen}
                open={open}
                serviceRequestId={Number(id)}
              />
            </EmptyBlock>
          )}
        </div>
      </Layout.Body>

      <AlertDialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Decline Service Request</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for declining this service request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            placeholder='Enter decline reason...'
            className='min-h-[100px]'
          />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeclineDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDecline}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Decline Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  )
}

function ServiceRequestDetailsSkeleton() {
  return (
    <Layout>
      <Layout.Header>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-48' />
          <Skeleton className='h-4 w-32' />
        </div>
      </Layout.Header>
      <Layout.Body>
        <div className='grid gap-6 md:grid-cols-2'>
          <Skeleton className='h-[400px]' />
          <Skeleton className='h-[400px]' />
          <Skeleton className='h-[200px] md:col-span-2' />
        </div>
      </Layout.Body>
    </Layout>
  )
}
