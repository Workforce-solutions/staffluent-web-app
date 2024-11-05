import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Badge } from '@/components/ui/badge'
import { Building2, Calendar, Receipt, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'

interface Service {
  id: number
  name: string
  description: string
  status: string
}

interface Invoice {
  id: number
  number: string
  date: Date
  amount: number
  status: 'paid' | 'pending'
}

interface Activity {
  id: number
  description: string
  date: Date
  type: string
}

export default function ClientDashboard() {
  // Dummy data
  const clientData = {
    stats: {
      active_services: 3,
      pending_payments: 599.98,
      total_invoices: 5
    },
    next_service_date: format(new Date('2024-02-15'), 'MMM dd, yyyy'),
    active_services: [
      {
        id: 1,
        name: "Monthly Equipment Maintenance",
        description: "Regular maintenance and inspection",
        status: "Active"
      },
      {
        id: 2,
        name: "Emergency Support",
        description: "24/7 emergency technical support",
        status: "Active"
      },
      {
        id: 3,
        name: "Parts Replacement Service",
        description: "Quarterly parts check and replacement",
        status: "Scheduled"
      }
    ] as Service[],
    recent_invoices: [
      {
        id: 1,
        number: "INV-2024001",
        date: new Date('2024-01-15'),
        amount: 299.99,
        status: 'pending'
      },
      {
        id: 2,
        number: "INV-2024002",
        date: new Date('2024-01-10'),
        amount: 499.99,
        status: 'paid'
      },
      {
        id: 3,
        number: "INV-2024003",
        date: new Date('2024-01-05'),
        amount: 299.99,
        status: 'pending'
      }
    ] as Invoice[],
    activity: [
      {
        id: 1,
        description: "Monthly maintenance completed",
        date: new Date('2024-01-20'),
        type: "service"
      },
      {
        id: 2,
        description: "New invoice generated",
        date: new Date('2024-01-15'),
        type: "invoice"
      },
      {
        id: 3,
        description: "Service request submitted",
        date: new Date('2024-01-10'),
        type: "request"
      }
    ] as Activity[]
  }

  return (
      <Layout>
        <Layout.Header className="min-h-fit border-b">
          <div className="flex w-full flex-col">
            <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
              <ThemeSwitch />
              <UserNav />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium">Dashboard</h2>
                <p className="text-sm text-muted-foreground">
                  Welcome back! Here's your service overview
                </p>
              </div>
            </div>
          </div>
        </Layout.Header>

        <Layout.Body className='space-y-6 p-6'>
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
                <p className="text-xs text-muted-foreground">Current subscriptions</p>
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
                  ${clientData.stats.pending_payments}
                </div>
                <p className="text-xs text-muted-foreground">Outstanding balance</p>
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
                  {clientData.next_service_date || 'No upcoming'}
                </div>
                <p className="text-xs text-muted-foreground">Scheduled maintenance</p>
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
                        <Badge variant={service.status === 'Active' ? 'success' : 'default'}>
                          {service.status}
                        </Badge>
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
                            {format(invoice.date, 'MMM dd, yyyy')}
                          </p>
                        </div>
                        <div className='text-right'>
                          <p className='text-sm font-medium'>${invoice.amount}</p>
                          <Badge
                              variant={
                                invoice.status === 'paid' ? 'success' : 'warning'
                              }
                          >
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
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
                {clientData.activity.map((item) => (
                    <div key={item.id} className='flex items-start space-x-4'>
                      <AlertCircle className='mt-0.5 h-5 w-5 text-muted-foreground' />
                      <div className='space-y-1'>
                        <p className='text-sm font-medium'>{item.description}</p>
                        <p className='text-sm text-muted-foreground'>
                          {format(item.date, 'MMM dd, yyyy')}
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