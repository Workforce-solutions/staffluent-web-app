import { ClientResponse } from '@/@types/clients'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { UserNav } from '@/components/user-nav'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useDeleteClientMutation,
  useGetClientsQuery,
} from '@/services/clientsApi'
import { IconBuildingStore, IconUser } from '@tabler/icons-react'
import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  Eye,
  MailIcon,
  PhoneIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { AddClientModal } from './add-client'
import { UpdateClientModal } from './update-client'
import { useNavigate } from 'react-router-dom'
import { ColumnDef } from '@tanstack/react-table'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'

export default function Clients() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<ClientResponse | null>(
    null
  )

  const { toast } = useToast()
  const short_code = useShortCode()
  const { data: clients } = useGetClientsQuery(short_code)
  const [deleteClient] = useDeleteClientMutation()

  const handleDelete = async (client: ClientResponse | null) => {
    if (!client) return

    try {
      await deleteClient({
        id: client.id,
        short_code,
      }).unwrap()

      toast({
        title: 'Success',
        description: 'Client deleted successfully',
      })
      setDeleteOpen(false)
      setSelectedClient(null)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete client',
        variant: 'destructive',
      })
    }
  }

  const columns: ColumnDef<ClientResponse>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <span className='font-medium'>{row.original.name}</span>
        ),
      },
      {
        accessorKey: 'contact_person',
        header: 'Contact Person',
        cell: ({ row }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              style={{
                width: '24px',
                height: '24px',
                marginRight: '8px',
              }}
            >
              <AvatarImage
                src={`https://api.dicebear.com/5.x/initials/svg?seed=${row?.original?.contact_person}`}
                alt={`${row?.original?.contact_person}'s avatar`}
              />
              <AvatarFallback>
                {row?.original?.contact_person
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <span>{row?.original?.contact_person}</span>
          </div>
        ),
      },
      {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
            className='capitalize'
          >
            {row?.original?.type === 'company' ? (
              <IconBuildingStore size={16} style={{ marginRight: '8px' }} />
            ) : (
              <IconUser size={16} style={{ marginRight: '8px' }} />
            )}
            {row?.original?.type}
          </span>
        ),
      },
      {
        id: 'contact',
        header: 'Contact',
        cell: ({ row }) => (
          <div className='flex space-x-2'>
            {row.original.email && (
              <Button
                variant='ghost'
                size='sm'
                className='h-8 w-8 p-0'
                onClick={() =>
                  (window.location.href = `mailto:${row.original.email}`)
                }
              >
                <MailIcon className='h-4 w-4' />
              </Button>
            )}
            {row.original.phone && (
              <Button
                variant='ghost'
                size='sm'
                className='h-8 w-8 p-0'
                onClick={() =>
                  (window.location.href = `tel:${row.original.phone}`)
                }
              >
                <PhoneIcon className='h-4 w-4' />
              </Button>
            )}
          </div>
        ),
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        cell: ({ row }) => <span>{row.original?.phone}</span>,
      },
      {
        accessorKey: 'full_address',
        header: 'Address',
        cell: ({ row }) => <span>{row.original?.full_address}</span>,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex items-center justify-end space-x-2'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => navigate(`/projects/clients/${row?.original?.id}`)}
            >
              <Eye className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => {
                setSelectedClient(row?.original)
                setEditOpen(true)
              }}
            >
              <PencilIcon className='h-4 w-4' />
            </Button>

            <Button
              variant='ghost'
              size='icon'
              onClick={() => {
                setSelectedClient(row?.original)
                setDeleteOpen(true)
              }}
            >
              <TrashIcon className='h-4 w-4 text-red-500' />
            </Button>
          </div>
        ),
      },
    ],
    [navigate]
  )

  // @ts-ignore
    return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-8'>
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Clients</h2>
            <p className='text-muted-foreground'>
              View and manage your clients information
            </p>
          </div>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
            <Input
              placeholder='Search clients...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full sm:w-64'
            />
            <Button
              onClick={() => setOpen(true)}
              className='flex items-center gap-2'
            >
              <PlusIcon className='h-4 w-4' />
              Add Client
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className='pt-6'>
            <GenericTableWrapper
              columns={columns}
              data={clients?.clients.data}
              isLoading={false}
              isError={false}
              showToolbar={false}
            />
          </CardContent>
        </Card>
      </Layout.Body>

      {open && <AddClientModal open={open} setOpen={setOpen} />}
      {editOpen && (
        <UpdateClientModal
            // @ts-ignore
          open={editOpen}
          setOpen={setEditOpen}
          client={selectedClient}
        />
      )}

      <ConfirmationModal
        {...{ handleDelete }}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        id={selectedClient}
        title='Delete Client'
        description='Are you sure you want to delete this client? This action cannot be undone.'
      />
    </Layout>
  )
}
