import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
  Calendar,
  MessageSquare,
  FileText,
  ArrowLeft,
  Clock,
  AlertCircle,
  CheckCircle,
  Tag
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetServiceDetailsQuery } from '@/services/clientPortalApi'
import { getStatusVariant } from '@/utils/status'
import { format } from 'date-fns'
import { Alert } from '@/components/ui/alerts/Alert'
import { AlertDescription } from '@/components/ui/alerts/AlertDescription'
import { Skeleton } from '@/components/ui/skeleton'

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: string | null | undefined
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
    <div className="flex items-center space-x-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-muted">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value || 'N/A'}</p>
      </div>
    </div>
)

export default function ServiceDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: service, isLoading, isError } = useGetServiceDetailsQuery(id)

  if (isLoading) {
    return (
        <Layout>
          <Layout.Body className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </Layout.Body>
        </Layout>
    )
  }

  if (isError) {
    return (
        <Layout>
          <Layout.Body className="p-6">
            <Alert variant="error">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load service details. Please try again later.
              </AlertDescription>
            </Alert>
          </Layout.Body>
        </Layout>
    )
  }

  if (!service) {
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
                {/*// @ts-ignore*/}
                {service.service_info.name}
              </h2>
              {/*// @ts-ignore*/}
              <p className="text-muted-foreground">{service.service_info.description}</p>
            </div>
            {/*// @ts-ignore*/}
            <Badge variant={getStatusVariant(service.current_status.status)}>
              {/*// @ts-ignore*/}
              {service.current_status.status}
            </Badge>
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
                {/*// @ts-ignore*/}
                {service.current_status.next_scheduled_date && (
                    <InfoItem
                        icon={<Calendar className='h-4 w-4' />}
                        label='Next Scheduled Date'
                        // @ts-ignore
                        value={format(new Date(service.current_status.next_scheduled_date), 'PPP')}
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
                {/*// @ts-ignore*/}
                {service.service_history.first_request_date && (
                    <InfoItem
                        icon={<Calendar className='h-4 w-4' />}
                        label='First Request'
                        // @ts-ignore
                        value={format(new Date(service.service_history.first_request_date), 'PPP')}
                    />
                )}
                {/*// @ts-ignore*/}
                {service.service_history.latest_completion_date && (
                    <InfoItem
                        icon={<Calendar className='h-4 w-4' />}
                        label='Latest Completion'
                        // @ts-ignore
                        value={format(new Date(service.service_history.latest_completion_date), 'PPP')}
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
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">
                        {service.current_request.reference}
                      </h3>
                      <Badge variant={getStatusVariant(service.current_request.status)}>
                        {service.current_request.status}
                      </Badge>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <InfoItem
                          icon={<Clock className='h-4 w-4' />}
                          label='Requested Date'
                          value={format(new Date(service.current_request.requested_date), 'PPP')}
                      />
                      {service.current_request.scheduled_date && (
                          <InfoItem
                              icon={<Calendar className='h-4 w-4' />}
                              label='Scheduled Date'
                              value={format(new Date(service.current_request.scheduled_date), 'PPP')}
                          />
                      )}
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-medium">Progress Updates</h4>
                      <div className="space-y-3">
                        {service.current_request.progress_updates.map((update) => (
                            <div key={update.id} className="flex items-start space-x-3">
                              <div className="mt-1">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                              </div>
                              <div>
                                <p className="text-sm">{update.description}</p>
                                <p className="text-xs text-muted-foreground">
                                  {format(new Date(update.date), 'PPp')} by {update.performed_by}
                                </p>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
          )}
        </Layout.Body>
      </Layout>
  )
}