import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { UserNav } from '@/components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetServiceDetailsQuery } from '@/services/servicesApi'
import { format } from 'date-fns'
import { useParams } from 'react-router-dom'

export default function ServiceDetails() {
  const { id } = useParams<{ id: string }>()
  const shortCode = useShortCode()

  const { data: service, isLoading } = useGetServiceDetailsQuery({
    venue_short_code: shortCode,
    id: Number(id),
  })

  if (isLoading) return <ServiceDetailsSkeleton />
  if (!service) return <div>Service not found</div>

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
              {service.name}
            </h2>
            <p className='text-muted-foreground'>Service Details</p>
          </div>
          <Badge
            variant={service.status === 'active' ? 'success' : 'destructive'}
          >
            {service.status}
          </Badge>
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='grid gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className='space-y-4'>
                <div>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Category
                  </dt>
                  <dd className='text-sm'>{service.category.name}</dd>
                </div>
                <div>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Price Type
                  </dt>
                  <dd className='text-sm'>{service.price_type}</dd>
                </div>
                <div>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Base Price
                  </dt>
                  <dd className='text-sm'>${service.base_price}</dd>
                </div>
                <div>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Duration
                  </dt>
                  <dd className='text-sm'>{service.duration} minutes</dd>
                </div>
                <div>
                  <dt className='text-sm font-medium text-muted-foreground'>
                    Description
                  </dt>
                  <dd className='whitespace-pre-wrap text-sm'>
                    {service.description}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Service Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {service.serviceRequests?.length ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {service.serviceRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.reference}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.status === 'Completed'
                                ? 'success'
                                : request.status === 'Cancelled'
                                  ? 'destructive'
                                  : 'default'
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {format(
                            new Date(request.requested_date),
                            'MMM d, yyyy'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className='text-sm text-muted-foreground'>
                  No service requests yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </Layout.Body>
    </Layout>
  )
}

function ServiceDetailsSkeleton() {
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
        </div>
      </Layout.Body>
    </Layout>
  )
}
