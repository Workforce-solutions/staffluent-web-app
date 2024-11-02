import { ClientResponse } from '@/@types/clients'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { UserNav } from '@/components/user-nav'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useDeleteClientMutation,
  useGetClientsQuery,
} from '@/services/clientsApi'
import { IconBuildingStore, IconUser } from '@tabler/icons-react'
import { PencilIcon, PlusIcon, TrashIcon, Eye } from 'lucide-react'
import { useState } from 'react'
import { AddClientModal } from './add-client'
import { UpdateClientModal } from './update-client'
import { useNavigate } from 'react-router-dom'

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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(clients?.clients?.data ?? [])
                  ?.filter(
                    (client) =>
                      client.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      client.contact_person
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      client.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className='font-medium'>
                        {client.name}
                      </TableCell>
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            style={{
                              width: '24px',
                              height: '24px',
                              marginRight: '8px',
                            }}
                          >
                            <AvatarImage
                              src={`https://api.dicebear.com/5.x/initials/svg?seed=${client.contact_person}`}
                              alt={`${client.contact_person}'s avatar`}
                            />
                            <AvatarFallback>
                              {client.contact_person
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{client.contact_person}</span>
                        </div>
                      </TableCell>
                      <TableCell
                        className='capitalize'
                        style={{ padding: '8px 16px' }}
                      >
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                          }}
                        >
                          {client.type === 'company' ? (
                            <IconBuildingStore
                              size={16}
                              style={{ marginRight: '8px' }}
                            />
                          ) : (
                            <IconUser
                              size={16}
                              style={{ marginRight: '8px' }}
                            />
                          )}
                          {client.type}
                        </span>
                      </TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell
                        className='max-w-md truncate'
                        title={client.full_address}
                      >
                        {client.full_address}
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <TableCell>
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={() =>
                                navigate(`/projects/clients/${client.id}`)
                              }
                            >
                              <Eye className='h-4 w-4' />
                            </Button>
                          </TableCell>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => {
                              setSelectedClient(client)
                              setEditOpen(true)
                            }}
                          >
                            <PencilIcon className='h-4 w-4' />
                          </Button>

                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => {
                              setSelectedClient(client)
                              setDeleteOpen(true)
                            }}
                          >
                            <TrashIcon className='h-4 w-4 text-red-500' />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Layout.Body>

      {open && <AddClientModal open={open} setOpen={setOpen} />}
      {editOpen && (
        <UpdateClientModal
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
