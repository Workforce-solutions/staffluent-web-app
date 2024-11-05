// pages/client-portal/services/index.tsx
import { Layout } from '@/components/custom/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { PlusIcon, Search } from 'lucide-react'
import { useState } from 'react'
import { RequestServiceModal } from '@/components/client-portal/request-service-modal'
import { useNavigate } from 'react-router-dom'
import {useGetClientServicesQuery} from "../../../services/clientPortalApi";
import {format} from "date-fns";
import {getStatusVariant, ServiceStatus} from "../../../utils/status";

interface Service {
  id: number
  name: string
  description: string
  type: string
  status: ServiceStatus
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
  const { data: services } = useGetClientServicesQuery()

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
        {/* Header */}
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>My Services</h2>
            <p className='text-muted-foreground'>
              View and manage your service requests
            </p>
          </div>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder='Search services...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-8 sm:w-64'
              />
            </div>
            <Button onClick={() => setOpenRequestModal(true)}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Request Service
            </Button>
          </div>
        </div>

        {/* Services List */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {services?.active.map(service => (
              <ServiceCard
                key={service.id}
                //@ts-ignore
                service={service}
                onClick={() => navigate(`/client-portal/services/${service.id}`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {services?.pending.map(service => (
              <ServiceCard
                key={service.id}
                //@ts-ignore
                service={service}
                onClick={() => navigate(`/client-portal/services/${service.id}`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {services?.completed.map(service => (
              <ServiceCard
                key={service.id}
                //@ts-ignore
                service={service}
                onClick={() => navigate(`/client-portal/services/${service.id}`)}
              />
            ))}
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
  // @ts-ignore
  return (
      <Card
          className="cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold">{service.name}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
            <Badge variant={getStatusVariant(service.status)}>{service.status}</Badge>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <InfoItem label="Service Type" value={service.type} />
            <InfoItem
                label="Next Service"
                value={service.nextDate ? format(new Date(service.nextDate), 'PPP') : 'Not scheduled'}
            />
            <InfoItem label="Status" value={service.status} />
          </div>
        </CardContent>
      </Card>
  )
}


// @ts-ignore
function InfoItem({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}