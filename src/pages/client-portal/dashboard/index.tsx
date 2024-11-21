import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Badge } from '@/components/ui/badge'
import { Building2, Calendar, Receipt, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { useGetDashboardDataQuery } from '@/services/clientPortalApi'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function ClientDashboard() {
  const { data: clientData, isLoading, isError } = useGetDashboardDataQuery()

  if (isLoading) {
    return (
      <Layout>
        <Layout.Header>
          <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </Layout.Header>
        <Layout.Body className='space-y-6'>
          <div className='grid gap-4 md:grid-cols-3'>
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className='h-4 w-[150px]' />
                </CardHeader>
                <CardContent>
                  <Skeleton className='h-8 w-[100px]' />
                </CardContent>
              </Card>
            ))}
          </div>
        </Layout.Body>
      </Layout>
    )
  }

  if (isError || !clientData) {
    return (
      <Layout>
        <Layout.Body className='p-6'>
          <Alert variant='destructive'>
            <AlertCircle className='h-4 w-4' />
            <AlertDescription>Failed to load dashboard data</AlertDescription>
          </Alert>
        </Layout.Body>
      </Layout>
    )
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
            <h2 className='text-2xl font-bold tracking-tight'>Dashboard</h2>
            <p className='text-sm text-muted-foreground'>
              Welcome back! Here's your service overview
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className='grid gap-4 md:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Active Services
              </CardTitle>
              <Building2 className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {clientData.stats.active_services}
              </div>
              <p className='text-xs text-muted-foreground'>
                Current subscriptions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Pending Payments
              </CardTitle>
              <Receipt className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                ${clientData.stats?.pending_payments}
              </div>
              <p className='text-xs text-muted-foreground'>
                Outstanding balance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Next Service
              </CardTitle>
              <Calendar className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {clientData.next_service_date
                  ? format(
                      new Date(clientData.next_service_date),
                      'MMM dd, yyyy'
                    )
                  : 'No upcoming'}
              </div>
              <p className='text-xs text-muted-foreground'>
                Scheduled maintenance
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Active Services & Invoices */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <Card className='lg:col-span-4'>
            <CardHeader>
              <CardTitle>Active Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {clientData.active_services.map((service) => (
                  <div
                    key={service.id}
                    className='flex items-center justify-between border-b pb-4'
                  >
                    <div>
                      <p className='font-medium'>{service.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        {service.description}
                      </p>
                    </div>
                    <Badge
                      variant={
                        service.status === 'Active' ? 'success' : 'default'
                      }
                    >
                      {service.status}
                    </Badge>
                  </div>
                ))}

                {clientData.active_services.length === 0 && (
                  <p className='py-4 text-center text-sm text-muted-foreground'>
                    No active services
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className='lg:col-span-3'>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {clientData.recent_invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className='flex items-center justify-between'
                  >
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>
                        Invoice #{invoice.number}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {format(new Date(invoice.date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm font-medium'>
                        ${invoice.amount}
                      </p>
                      <Badge
                        variant={
                          invoice.status === 'paid' ? 'success' : 'warning'
                        }
                      >
                        {invoice.status.charAt(0).toUpperCase() +
                          invoice.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}

                {clientData.recent_invoices.length === 0 && (
                  <p className='py-4 text-center text-sm text-muted-foreground'>
                    No recent invoices
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Log */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {clientData.activity.map((item) => (
                <div key={item.id} className='flex items-start space-x-4'>
                  <AlertCircle className='mt-0.5 h-5 w-5 text-muted-foreground' />
                  <div className='space-y-1'>
                    <p className='text-sm font-medium'>{item.description}</p>
                    <p className='text-sm text-muted-foreground'>
                      {format(new Date(item.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              ))}

              {clientData.activity.length === 0 && (
                <p className='py-4 text-center text-sm text-muted-foreground'>
                  No recent activity
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
