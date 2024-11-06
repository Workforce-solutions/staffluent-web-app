import { Layout } from '@/components/custom/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { PlusIcon, Search } from 'lucide-react'
import { useState } from 'react'
import { RequestServiceModal } from '@/components/client-portal/request-service-modal'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

interface Service {
  id: number
  name: string
  description: string
  type: string
  status: 'Active' | 'Pending' | 'Completed'
  nextDate?: string | Date
}

interface ServiceCardProps {
  service: Service
  onClick: () => void
}

export default function ClientServices() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [openRequestModal, setOpenRequestModal] = useState(false)

  // Dummy data
  const services = {
    active: [
      {
        id: 1,
        name: 'Monthly Equipment Maintenance',
        description: 'Regular maintenance and inspection of all equipment',
        type: 'Maintenance',
        status: 'Active',
        nextDate: new Date('2024-02-15'),
      },
      {
        id: 2,
        name: '24/7 Support Package',
        description: 'Priority technical support and emergency assistance',
        type: 'Support',
        status: 'Active',
        nextDate: new Date('2024-02-01'),
      },
    ],
    pending: [
      {
        id: 3,
        name: 'Equipment Upgrade Service',
        description: 'Comprehensive upgrade of existing equipment',
        type: 'Installation',
        status: 'Pending',
        nextDate: new Date('2024-02-20'),
      },
    ],
    completed: [
      {
        id: 4,
        name: 'Emergency Repair Service',
        description: 'Emergency repair of malfunctioning equipment',
        type: 'Repair',
        status: 'Completed',
        nextDate: null,
      },
      {
        id: 5,
        name: 'Staff Training Session',
        description: 'Training session for new equipment operation',
        type: 'Training',
        status: 'Completed',
        nextDate: null,
      },
    ],
  } as const

  // Filter services based on search term
  const filterServices = (serviceList: Service[]) => {
    return serviceList.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // @ts-ignore
  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6'>
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>My Services</h2>
            <p className='text-sm text-muted-foreground'>
              View and manage your service requests
            </p>
          </div>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
            <div className='relative'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search services...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-8 sm:w-64'
              />
            </div>
            <Button onClick={() => setOpenRequestModal(true)}>
              <PlusIcon className='mr-2 h-4 w-4' />
              Request Service
            </Button>
          </div>
        </div>
        <Tabs defaultValue='active' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='active'>Active</TabsTrigger>
            <TabsTrigger value='pending'>Pending</TabsTrigger>
            <TabsTrigger value='completed'>Completed</TabsTrigger>
          </TabsList>

          <TabsContent value='active' className='space-y-4'>
            {/*// @ts-ignore*/}
            {filterServices(services.active).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() =>
                  navigate(`/client-portal/services/${service.id}`)
                }
              />
            ))}
            {/*// @ts-ignore*/}
            {filterServices(services.active).length === 0 && (
              <p className='py-8 text-center text-muted-foreground'>
                No active services found
              </p>
            )}
          </TabsContent>

          <TabsContent value='pending' className='space-y-4'>
            {/*// @ts-ignore*/}
            {filterServices(services.pending).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() =>
                  navigate(`/client-portal/services/${service.id}`)
                }
              />
            ))}
            {/*// @ts-ignore*/}
            {filterServices(services.pending).length === 0 && (
              <p className='py-8 text-center text-muted-foreground'>
                No pending services found
              </p>
            )}
          </TabsContent>

          <TabsContent value='completed' className='space-y-4'>
            {/*// @ts-ignore*/}
            {filterServices(services.completed).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() =>
                  navigate(`/client-portal/services/${service.id}`)
                }
              />
            ))}
            {/*// @ts-ignore*/}
            {filterServices(services.completed).length === 0 && (
              <p className='py-8 text-center text-muted-foreground'>
                No completed services found
              </p>
            )}
          </TabsContent>
        </Tabs>
      </Layout.Body>

      <RequestServiceModal
        open={openRequestModal}
        setOpen={setOpenRequestModal}
      />
    </Layout>
  )
}

function ServiceCard({ service, onClick }: ServiceCardProps) {
  return (
    <Card
      className='cursor-pointer transition-colors hover:bg-accent/50'
      onClick={onClick}
    >
      <CardContent className='p-6'>
        <div className='flex items-start justify-between'>
          <div className='space-y-1'>
            <h3 className='font-semibold'>{service.name}</h3>
            <p className='text-sm text-muted-foreground'>
              {service.description}
            </p>
          </div>
          <Badge
            variant={
              service.status === 'Active'
                ? 'success'
                : service.status === 'Pending'
                  ? 'warning'
                  : 'default'
            }
          >
            {service.status}
          </Badge>
        </div>
        <div className='mt-4 grid gap-4 md:grid-cols-3'>
          <InfoItem label='Service Type' value={service.type} />
          <InfoItem
            label='Next Service'
            value={
              service.nextDate
                ? format(new Date(service.nextDate), 'PPP')
                : 'Not scheduled'
            }
          />
          <InfoItem label='Status' value={service.status} />
        </div>
      </CardContent>
    </Card>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className='space-y-1'>
      <p className='text-sm text-muted-foreground'>{label}</p>
      <p className='font-medium'>{value}</p>
    </div>
  )
}
