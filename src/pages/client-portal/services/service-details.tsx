/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ExistingFeedback,
  FeedbackForm,
} from '@/components/client-portal/feedback-form'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Alert } from '@/components/ui/alerts/Alert'
import { AlertDescription } from '@/components/ui/alerts/AlertDescription'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { UserNav } from '@/components/user-nav'
import ContactModal from '@/pages/services/service-details/contact-modal'
import { useGetServiceDetailsQuery } from '@/services/clientPortalApi'
import { getStatusVariant } from '@/utils/status'
import { format } from 'date-fns'
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Tag,
} from 'lucide-react'
import { ReactNode, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface InfoItemProps {
  icon: ReactNode
  label: string
  value: string | null | undefined
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <div className='flex items-center space-x-4'>
    <div className='flex h-8 w-8 items-center justify-center rounded-lg border bg-muted'>
      {icon}
    </div>
    <div className='space-y-1'>
      <p className='text-sm text-muted-foreground'>{label}</p>
      <p className='font-medium'>{value || 'N/A'}</p>
    </div>
  </div>
)

export default function ServiceDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  // @ts-ignore
  const {
    data: service,
    isFetching,
    isError,
  } = useGetServiceDetailsQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: false,
    // @ts-ignore
    forceRefetch: refreshTrigger > 0,
  })

  if (isFetching) {
    return (
      <Layout>
        <Layout.Body className='space-y-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            <Card>
              <CardContent className='p-6'>
                <div className='space-y-4'>
                  <Skeleton className='h-4 w-[250px]' />
                  <Skeleton className='h-4 w-[200px]' />
                  <Skeleton className='h-4 w-[150px]' />
                </div>
              </CardContent>
            </Card>
          </div>
        </Layout.Body>
      </Layout>
    )
  } else if (isError) {
    return (
      <Layout>
        <Layout.Body className='p-6'>
          <Alert variant='error'>
            <AlertCircle className='h-4 w-4' />
            <AlertDescription>
              Failed to load service details. Please try again later.
            </AlertDescription>
          </Alert>
        </Layout.Body>
      </Layout>
    )
  } else if (!service) {
    return null
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
          <div className='space-y-1'>
            <div className='flex items-center space-x-4'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => navigate('/client-portal/services')}
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Services
              </Button>
            </div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {service.service_info.name}
            </h2>

            <p className='text-muted-foreground'>
              {service.service_info.description}
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <Badge variant={getStatusVariant(service.current_status?.status)}>
              {service.current_status?.status}
            </Badge>
            <ContactModal setOpen={setModalOpen} open={modalOpen} />
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Service Information</CardTitle>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <InfoItem
                icon={<Tag className='h-4 w-4' />}
                label='Service Type'
                // @ts-ignore
                value={service.service_info.type}
              />
              <InfoItem
                icon={<FileText className='h-4 w-4' />}
                label='Price Type'
                // @ts-ignore
                value={service.service_info.price.type}
              />
              <InfoItem
                icon={<Tag className='h-4 w-4' />}
                label='Base Price'
                // @ts-ignore
                value={`${service.service_info.price.currency} ${service.service_info.price.base_amount}`}
              />
              <InfoItem
                icon={<Clock className='h-4 w-4' />}
                label='Service Started'
                // @ts-ignore
                value={format(new Date(service.service_info.start_date), 'PPP')}
              />

              {service.current_status.next_scheduled_date && (
                <InfoItem
                  icon={<Calendar className='h-4 w-4' />}
                  label='Next Scheduled Date'
                  // @ts-ignore
                  value={format(
                    new Date(service.current_status?.next_scheduled_date ?? ''),
                    'PPP'
                  )}
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service History</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <InfoItem
                icon={<CheckCircle className='h-4 w-4' />}
                label='Total Completions'
                // @ts-ignore
                value={service.service_history.total_completions.toString()}
              />

              {service.service_history.first_request_date && (
                <InfoItem
                  icon={<Calendar className='h-4 w-4' />}
                  label='First Request'
                  // @ts-ignore
                  value={format(
                    new Date(service.service_history.first_request_date),
                    'PPP'
                  )}
                />
              )}

              {service.service_history.latest_completion_date && (
                <InfoItem
                  icon={<Calendar className='h-4 w-4' />}
                  label='Latest Completion'
                  // @ts-ignore
                  value={format(
                    new Date(service.service_history.latest_completion_date),
                    'PPP'
                  )}
                />
              )}
              <Separator className='my-4' />
              <div className='flex space-x-4'>
                <Button variant='outline' className='w-full'>
                  <MessageSquare className='mr-2 h-4 w-4' />
                  Contact Support
                </Button>
                <Button
                  className='w-full'
                  onClick={() => navigate('/client-portal/service-requests')}
                >
                  Request Service
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {service.current_request && (
          <Card>
            <CardHeader>
              <CardTitle>Current Request</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-lg font-medium'>
                    {service.current_request.reference}
                  </h3>
                  <Badge
                    variant={getStatusVariant(service.current_request.status)}
                  >
                    {service.current_request.status}
                  </Badge>
                </div>
                <div className='grid gap-4 md:grid-cols-2'>
                  <InfoItem
                    icon={<Clock className='h-4 w-4' />}
                    label='Requested Date'
                    value={format(
                      new Date(service.current_request.requested_date),
                      'PPP'
                    )}
                  />
                  {service.current_request.scheduled_date && (
                    <InfoItem
                      icon={<Calendar className='h-4 w-4' />}
                      label='Scheduled Date'
                      value={format(
                        new Date(service.current_request.scheduled_date),
                        'PPP'
                      )}
                    />
                  )}
                </div>
                <Separator />
                <div className='space-y-2'>
                  <h4 className='font-medium'>Progress Updates</h4>
                  <div className='space-y-3'>
                    {service.current_request.progress_updates.map((update) => (
                      <div
                        key={update.id}
                        className='flex items-start space-x-3'
                      >
                        <div className='mt-1'>
                          <div className='h-2 w-2 rounded-full bg-primary' />
                        </div>
                        <div>
                          <p className='text-sm'>{update.description}</p>
                          <p className='text-xs text-muted-foreground'>
                            {format(new Date(update.date), 'PPp')} by{' '}
                            {update.performed_by}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {service.current_request?.status === 'Completed' && (
                  <>
                    <Separator />
                    {service.current_request.has_feedback ? (
                      <ExistingFeedback
                        feedback={service.current_request.feedback_details} // renamed from feedback
                      />
                    ) : (
                      <FeedbackForm
                        serviceRequestId={service.current_request.id.toString()}
                        onSuccess={() => setRefreshTrigger((prev) => prev + 1)}
                      />
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </Layout.Body>
    </Layout>
  )
}
