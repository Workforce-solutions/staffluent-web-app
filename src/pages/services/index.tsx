import { Layout } from '@/components/custom/layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { ColumnDef } from '@tanstack/react-table'
import { Edit, Filter, MoreHorizontal, PlusCircle, Search, Trash2 } from 'lucide-react'
import { useState, useMemo } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { ServiceModal } from './service-modal'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import { useToast } from '@/components/ui/use-toast'

interface ServiceData {
  id: number
  name: string
  category: string
  priceType: string
  basePrice: string
  duration: string
  status: string
}

export default function AdminServices() {
  const [searchTerm, setSearchTerm] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null)
  const { toast } = useToast()

  const handleDelete = async () => {
    if (!selectedService) return

    try {
      // Add delete API call here
      toast({
        title: 'Success',
        description: 'Service deleted successfully',
      })
      setDeleteOpen(false)
      setSelectedService(null)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete service',
        variant: 'destructive',
      })
    }
  }

  const data: ServiceData[] = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    name: `Monthly Maintenance ${i + 1}`,
    category: 'Regular Service',
    priceType: 'Fixed',
    basePrice: `$299.99`,
    duration: '120 mins',
    status: i % 2 === 0 ? 'Active' : 'Inactive',
  }))

  const columns: ColumnDef<ServiceData>[] = useMemo(
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
          cell: ({ row }) => <span>{row.original.category}</span>,
        },
        {
          accessorKey: 'priceType',
          header: 'Price Type',
          cell: ({ row }) => <span>{row.original.priceType}</span>,
        },
        {
          accessorKey: 'basePrice',
          header: 'Base Price',
          cell: ({ row }) => <span>{row.original.basePrice}</span>,
        },
        {
          accessorKey: 'duration',
          header: 'Duration',
          cell: ({ row }) => <span>{row.original.duration}</span>,
        },
        {
          accessorKey: 'status',
          header: 'Status',
          cell: ({ row }) => (
              <Badge
                  className={
                    row.original.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                  }
              >
                {row.original.status}
              </Badge>
          ),
        },
        {
          id: 'actions',
          header: 'Actions',
          cell: ({ row }) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem onClick={() => {
                    setSelectedService(row.original)
                    setModalOpen(true)
                  }}>
                    <Edit className='mr-2 h-4 w-4' />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                      className='text-destructive'
                      onClick={() => {
                        setSelectedService(row.original)
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
            title="Delete Service"
            description="Are you sure you want to delete this service? This action cannot be undone."
        />

        <Layout.Header className='min-h-fit border-b'>
          <div className='flex w-full flex-col'>
            <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
              <ThemeSwitch />
              <UserNav />
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='text-lg font-medium'>Services</h2>
                <p className='text-sm text-muted-foreground'>
                  Manage your service offerings
                </p>
              </div>
              <Button onClick={() => {
                setSelectedService(null)
                setModalOpen(true)
              }}>
                <PlusCircle className='mr-2 h-4 w-4' />
                Add Service
              </Button>
            </div>
          </div>
        </Layout.Header>

        <Layout.Body className='space-y-4 p-6'>
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
                  data={data}
                  isLoading={false}
                  isError={false}
                  showToolbar={false}
              />
            </CardContent>
          </Card>
        </Layout.Body>
      </Layout>
  )
}