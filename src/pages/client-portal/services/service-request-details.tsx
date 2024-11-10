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
    Tag,
    DollarSign
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetRequestDetailsQuery } from '@/services/clientPortalApi'
import { getStatusVariant, getPriorityVariant } from '@/utils/status'
import { format } from 'date-fns'
import { Alert } from '@/components/ui/alerts/Alert'
import { AlertDescription } from '@/components/ui/alerts/AlertDescription'
import { Skeleton } from '@/components/ui/skeleton'

interface InfoItemProps {
    icon: React.ReactNode
    label: string
    value: string | null
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

export default function ServiceRequestDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: response, isLoading, isError } = useGetRequestDetailsQuery(id as string)

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
                            Failed to load request details. Please try again later.
                        </AlertDescription>
                    </Alert>
                </Layout.Body>
            </Layout>
        )
    }

    // @ts-ignore
    const request = response?.request

    if (!request) return null

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
                                onClick={() => navigate('/client-portal/service-requests')}
                            >
                                <ArrowLeft className='mr-2 h-4 w-4' />
                                Back to Requests
                            </Button>
                        </div>
                        <h2 className='text-2xl font-bold tracking-tight'>
                            Request {request.reference}
                        </h2>
                    </div>
                    <div className="space-x-2">
                        <Badge variant={getPriorityVariant(request.priority)}>
                            {request.priority}
                        </Badge>
                        <Badge variant={getStatusVariant(request.status)}>
                            {request.status}
                        </Badge>
                    </div>
                </div>

                <div className='grid gap-6 md:grid-cols-2'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Request Details</CardTitle>
                        </CardHeader>
                        <CardContent className='grid gap-4'>
                            <InfoItem
                                icon={<FileText className='h-4 w-4' />}
                                label='Service'
                                value={request.service.name}
                            />
                            <InfoItem
                                icon={<Clock className='h-4 w-4' />}
                                label='Requested Date'
                                value={format(new Date(request.requested_date), 'PPP')}
                            />
                            <InfoItem
                                icon={<Calendar className='h-4 w-4' />}
                                label='Preferred Date'
                                value={format(new Date(request.preferred_date), 'PPP')}
                            />
                            {request.scheduled_date && (
                                <InfoItem
                                    icon={<Calendar className='h-4 w-4' />}
                                    label='Scheduled Date'
                                    value={format(new Date(request.scheduled_date), 'PPP')}
                                />
                            )}
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Description</p>
                                <p className="text-sm">{request.description}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Service Information</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <InfoItem
                                icon={<Tag className='h-4 w-4' />}
                                label='Service Type'
                                value={request.service.price_type}
                            />
                            <InfoItem
                                icon={<DollarSign className='h-4 w-4' />}
                                label='Base Price'
                                value={`$${request.service.base_price}`}
                            />
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Service Description</p>
                                <p className="text-sm">{request.service.description}</p>
                            </div>
                            <Separator className='my-4' />
                            <div className='flex space-x-4'>
                                <Button variant='outline' className='w-full'>
                                    <MessageSquare className='mr-2 h-4 w-4' />
                                    Contact Support
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Activity Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            {/*// @ts-ignore*/}
                            {request.activities.map((activity, index) => (
                                <div key={index} className='flex items-start space-x-4'>
                                    <div className='mt-1'>
                                        <div className='h-2 w-2 rounded-full bg-primary' />
                                    </div>
                                    <div className='space-y-1'>
                                        <p className='text-sm'>
                                            {activity.description}
                                            <span className="text-muted-foreground"> by {activity.performed_by}</span>
                                        </p>
                                        <p className='text-xs text-muted-foreground'>
                                            {activity.performed_at}
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