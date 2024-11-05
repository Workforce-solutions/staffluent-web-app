import { useMemo, useState } from 'react'
import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Search,
  PlusCircle,
  Edit,
  Trash2,
  MoreHorizontal,
  Package,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { CategoryModal } from './category-modal'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import { useToast } from '@/components/ui/use-toast'

type ServiceData = {
  id: number
  name: string
  slug: string
  services: number
  active_services: number
  last_updated: string
}

export default function ServiceCategories() {
  const [searchTerm, setSearchTerm] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<ServiceData | null>(null)
  const { toast } = useToast()

  const dummyData: ServiceData[] = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: 'Maintenance',
    slug: 'maintenance',
    services: 15,
    active_services: 12,
    last_updated: '2 days ago',
  }))

  const handleDelete = async () => {
    if (!selectedCategory) return

    try {
      // Add delete API call here
      toast({
        title: 'Success',
        description: 'Category deleted successfully',
      })
      setDeleteOpen(false)
      setSelectedCategory(null)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete category',
        variant: 'destructive',
      })
    }
  }

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
          accessorKey: 'slug',
          header: 'Slug',
          cell: ({ row }) => <span>{row.original.slug}</span>,
        },
        {
          accessorKey: 'services',
          header: 'Services',
          cell: ({ row }) => <span>{row.original.services}</span>,
        },
        {
          accessorKey: 'active_services',
          header: 'Active Services',
          cell: ({ row }) => <span>{row.original.active_services}</span>,
        },
        {
          accessorKey: 'last_updated',
          header: 'Last Updated',
          cell: ({ row }) => <span>{row.original.last_updated}</span>,
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
                    setSelectedCategory(row.original)
                    setModalOpen(true)
                  }}>
                    <Edit className='mr-2 h-4 w-4' />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                      className='text-destructive'
                      onClick={() => {
                        setSelectedCategory(row.original)
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
        <CategoryModal
            open={modalOpen}
            setOpen={setModalOpen}
            category={selectedCategory}
        />

        <ConfirmationModal
            id={0}
            open={deleteOpen}
            setOpen={setDeleteOpen}
            handleDelete={handleDelete}
            title="Delete Category"
            description="Are you sure you want to delete this category? This action cannot be undone."
        />

        <Layout.Header className='min-h-fit border-b'>
          <div className='flex w-full flex-col gap-1'>
            <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
              <ThemeSwitch />
              <UserNav />
            </div>
            <div className='flex w-full items-center justify-between'>
              <div>
                <h2 className='text-lg font-medium'>Service Categories</h2>
                <p className='text-sm text-muted-foreground'>
                  Manage and organize your service categories
                </p>
              </div>
              <Button onClick={() => {
                setSelectedCategory(null)
                setModalOpen(true)
              }}>
                <PlusCircle className='mr-2 h-4 w-4' />
                Add Category
              </Button>
            </div>
          </div>
        </Layout.Header>

        <Layout.Body className='space-y-6 p-6'>
          {/* Category Stats */}
          <div className='grid gap-4 md:grid-cols-3'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Categories
                </CardTitle>
                <Package className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>12</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Active Services
                </CardTitle>
                <Package className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>48</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Most Popular
                </CardTitle>
                <Package className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>Maintenance</div>
              </CardContent>
            </Card>
          </div>

          {/* Categories Table */}
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0'>
              <div className='space-y-1'>
                <CardTitle>Categories</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  A list of all service categories and their details
                </p>
              </div>
              <div className='relative'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                    placeholder='Search categories...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-[300px] pl-8'
                />
              </div>
            </CardHeader>
            <CardContent>
              <GenericTableWrapper
                  columns={columns}
                  data={dummyData}
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