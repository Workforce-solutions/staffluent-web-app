// pages/client-portal/services/index.tsx
import { Layout } from '@/components/custom/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { PlusIcon, Search } from 'lucide-react'
import {useMemo, useState} from 'react'
import { RequestServiceModal } from '@/components/client-portal/request-service-modal'
import { useNavigate } from 'react-router-dom'
import { useGetClientServicesQuery } from '@/services/clientPortalApi'
import { ServiceWithRequests} from '@/@types/clientPortal'
import { Skeleton } from '@/components/ui/skeleton'
import {getClientServiceStatusVariant} from "../../../utils/status";

interface ServiceCardProps {
  service: ServiceWithRequests;
  onClick: () => void;
}

export default function ClientServices() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [openRequestModal, setOpenRequestModal] = useState(false)

  const { data: services, isLoading, error } = useGetClientServicesQuery()

  const transformedServices = useMemo(() => {
    if (!services) return { active: [], pending: [], completed: [], declined: [] };

    const result = {
      active: [] as ServiceWithRequests[],
      pending: [] as ServiceWithRequests[],
      completed: [] as ServiceWithRequests[],
      declined: [] as ServiceWithRequests[]
    };

    services.forEach(service => {
      // @ts-ignore
      if (service.requests.active.length > 0) {
        // @ts-ignore
        result.active.push(service);
      }
      // @ts-ignore
      if (service.requests.pending.length > 0) {
        // @ts-ignore
        result.pending.push(service);
      }
      // @ts-ignore
      if (service.requests.completed.length > 0) {
        // @ts-ignore
        result.completed.push(service);
      }
      // @ts-ignore
      if (service.requests.declined.length > 0) {
        // @ts-ignore
        result.declined.push(service);
      }
    });

    return result;
  }, [services]);

  // Update the filter function
  const filterServices = (serviceList: ServiceWithRequests[] = []) => {
    if (!serviceList) return [];
    const searchLower = searchTerm.toLowerCase();
    return serviceList.filter(
        (service) =>
            service.service_name.toLowerCase().includes(searchLower) ||
            service.description.toLowerCase().includes(searchLower) ||
            service.type.toLowerCase().includes(searchLower)
    );
  };

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
          {/* Header with Search and Request Button */}
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

          {error ? (
              <div className="text-center text-destructive">
                Failed to load services. Please try again later.
              </div>
          ) : (
              <Tabs defaultValue='active' className='space-y-4'>
                <TabsList>
                  <TabsTrigger value='active'>Active</TabsTrigger>
                  <TabsTrigger value='pending'>Pending</TabsTrigger>
                  <TabsTrigger value='completed'>Completed</TabsTrigger>
                  <TabsTrigger value='declined'>Declined</TabsTrigger>
                </TabsList>

                {['active', 'pending', 'completed', 'declined'].map((tab) => (
                    // @ts-ignore
                    <TabsContent key={tab} value={tab} className='space-y-4'>
                      {isLoading ? (
                          <ServiceCardSkeleton />
                          // @ts-ignore
                      ) : transformedServices[tab]?.length > 0 ? (
                          // @ts-ignore
                          filterServices(transformedServices[tab]).map((service) => (
                              <ServiceCard
                                  key={service.service_id}
                                  service={service}
                                  onClick={() => navigate(`/client-portal/services/${service.service_id}`)}
                              />
                          ))
                      ) : (
                          <p className='py-8 text-center text-muted-foreground'>
                            No {tab} services found
                          </p>
                      )}
                    </TabsContent>
                ))}
              </Tabs>
          )}
        </Layout.Body>

        <RequestServiceModal
            open={openRequestModal}
            setOpen={setOpenRequestModal}
        />
      </Layout>
  )
}

function ServiceCard({ service, onClick }: ServiceCardProps) {
  // Get the first request's status for the badge
  const status =
      service.requests.active[0]?.status ||
      service.requests.pending[0]?.status ||
      service.requests.completed[0]?.status ||
      service.requests.declined[0]?.status ||
      'No requests';

  return (
      <Card
          className='cursor-pointer transition-colors hover:bg-accent/50'
          onClick={onClick}
      >
        <CardContent className='p-6'>
          <div className='flex items-start justify-between'>
            <div className='space-y-1'>
              <h3 className='font-semibold'>{service.service_name}</h3>
              <p className='text-sm text-muted-foreground'>
                {service.description}
              </p>
            </div>
            <Badge variant={getClientServiceStatusVariant(status)}>
              {status}
            </Badge>
          </div>
          <div className='mt-4 grid gap-4 md:grid-cols-3'>
            <InfoItem label='Service Type' value={service.type} />
            <InfoItem
                label='Price'
                value={`${service.price.currency} ${service.price.base_amount}`}
            />
            <InfoItem
                label='Status'
                value={status}
            />
          </div>
        </CardContent>
      </Card>
  );
}

function ServiceCardSkeleton() {
  return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
            <Card key={i}>
              <CardContent className='p-6'>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-[200px]' />
                    <Skeleton className='h-4 w-[300px]' />
                  </div>
                  <Skeleton className='h-6 w-20' />
                </div>
                <div className='mt-4 grid gap-4 md:grid-cols-3'>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-20' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-20' />
                    <Skeleton className='h-4 w-32' />
                  </div>
                  <div className='space-y-2'>
                    <Skeleton className='h-4 w-20' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                </div>
              </CardContent>
            </Card>
        ))}
      </div>
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