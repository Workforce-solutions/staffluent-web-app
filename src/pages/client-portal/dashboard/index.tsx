/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { InfoItem } from '@/components/info-item'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { useShortCode } from '@/hooks/use-local-storage'
import { Building2, Calendar, Receipt, AlertCircle } from 'lucide-react'

export default function ClientDashboard() {
  // const short_code = useShortCode()
  // const { data: clientData } = useGetClientDashboardQuery(short_code)
  {
    /*//@ts-expect-error*/
  }
  const clientData = []

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6'>
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
              {/*//@ts-ignore*/}
              <div className='text-2xl font-bold'>
                {clientData?.stats?.active_services}
              </div>
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
              {/*//@ts-ignore*/}
              <div className='text-2xl font-bold'>
                ${clientData?.stats?.pending_payments}
              </div>
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
              {/*//@ts-ignore*/}
              <div className='text-2xl font-bold'>
                {clientData?.next_service_date || 'No upcoming'}
              </div>
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
                {/*//@ts-ignore*/}
                {clientData?.active_services?.map((service) => (
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
                    <Badge>{service.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className='lg:col-span-3'>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {/*//@ts-ignore*/}
                {clientData?.recent_invoices?.map((invoice) => (
                  <div
                    key={invoice.id}
                    className='flex items-center justify-between'
                  >
                    <div className='space-y-1'>
                      <p className='text-sm font-medium'>
                        Invoice #{invoice.number}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {invoice.date}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='text-sm font-medium'>${invoice.amount}</p>
                      <Badge
                        variant={
                          invoice.status === 'paid' ? 'success' : 'warning'
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {/*//@ts-ignore*/}
              {clientData?.activity?.map((item) => (
                <div key={item.id} className='flex items-start space-x-4'>
                  <AlertCircle className='mt-0.5 h-5 w-5 text-muted-foreground' />
                  <div className='space-y-1'>
                    <p className='text-sm font-medium'>{item.description}</p>
                    <p className='text-sm text-muted-foreground'>{item.date}</p>
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
