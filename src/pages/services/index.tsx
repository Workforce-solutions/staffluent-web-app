/* eslint-disable react-hooks/exhaustive-deps */
import { ServiceProps } from '@/@types/services'
import { Layout } from '@/components/custom/layout'
import { initialPage } from '@/components/table/data'
import ThemeSwitch from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { UserNav } from '@/components/user-nav'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { getStatusVariant } from '@/hooks/common/common-functions'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from '@/services/servicesApi'
import { ColumnDef } from '@tanstack/react-table'
import {
  Edit,
  Filter,
  MoreHorizontal,
  PlusCircle,
  Search,
  Trash2,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ServiceModal } from './service-modal'

export default function AdminServices() {
  const [searchTerm, setSearchTerm] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceProps>()
  const { toast } = useToast()
  const venue_short_code = useShortCode()
  const [deleteService] = useDeleteServiceMutation()
  const navigate = useNavigate()

  const [paginationValues, setPaginationValues] = useState(initialPage)

  const {
    data: services,
    isFetching,
    isError,
  } = useGetServicesQuery({
    venue_short_code,
    ...paginationValues,
  })

  const handleDelete = async () => {
    if (!selectedService) return

    try {
      deleteService({ id: selectedService.id, venue_short_code })
        .unwrap()
        .then(() => {
          toast({
            title: 'Success',
            description: 'Service deleted successfully',
          })
          setDeleteOpen(false)
          setSelectedService(undefined)
        })
      // Add delete API call here
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete service',
        variant: 'destructive',
      })
    }
  }

  const columns: ColumnDef<ServiceProps>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <span className='font-medium'>{row.original.name}</span>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => <span>{row.original.category.name}</span>,
      },
      {
        accessorKey: 'priceType',
        header: 'Price Type',
        cell: ({ row }) => <span>{row.original.price_type}</span>,
      },
      {
        accessorKey: 'basePrice',
        header: 'Base Price',
        cell: ({ row }) => <span>{row.original.base_price}</span>,
      },
      {
        accessorKey: 'duration',
        header: 'Duration',
        cell: ({ row }) => <span>{row.original.duration}</span>,
      },
      {
        accessorKey: 'status',
        header: 'Status',

        cell: ({ row: { original } }) => (
          <Badge variant={getStatusVariant(original?.status)}>
            {original?.status}
          </Badge>
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row: { original } }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedService(original)
                  navigate(`/admin/services/${original.id}`)
                }}
              >
                Service details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedService(original)
                  setModalOpen(true)
                }}
              >
                <Edit className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-destructive'
                onClick={() => {
                  setSelectedService(original)
                  setDeleteOpen(true)
                }}
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  )

  return (
    <Layout>
      <ServiceModal
        open={modalOpen}
        setOpen={setModalOpen}
        service={selectedService}
      />

      <ConfirmationModal
        id={0}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        handleDelete={handleDelete}
        title='Delete Service'
        description='Are you sure you want to delete this service? This action cannot be undone.'
      />

      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-4 '>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Services</h2>
            <p className='text-sm text-muted-foreground'>
              Manage your service offerings
            </p>
          </div>
          <Button
            onClick={() => {
              setSelectedService(undefined)
              setModalOpen(true)
            }}
          >
            <PlusCircle className='mr-2 h-4 w-4' />
            Add Service
          </Button>
        </div>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0'>
            <div className='space-y-1'>
              <CardTitle>All Services</CardTitle>
              <p className='text-sm text-muted-foreground'>
                A list of all your services including pricing and status
              </p>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='relative'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Search services...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-[300px] pl-8'
                />
              </div>
              <Button variant='outline' size='icon'>
                <Filter className='h-4 w-4' />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <GenericTableWrapper
              columns={columns}
              data={services?.services.data as ServiceProps[]}
              isLoading={isFetching}
              showToolbar={false}
              {...{ paginationValues, setPaginationValues, isError }}
            />
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
