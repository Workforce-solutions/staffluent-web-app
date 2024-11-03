import { Role } from '@/@types/auth'
import { Layout } from '@/components/custom/layout'
import { initialPage } from '@/components/table/data'
import ThemeSwitch from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { UserNav } from '@/components/user-nav'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import EditDelete from '@/components/wrappers/edit-delete-component'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useDeleteCustomRoleMutation,
  useGetCustomRolesQuery,
} from '@/services/roleApi'
import { ColumnDef } from '@tanstack/react-table'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { AddCustomRoleModal } from './add-custom-role'

export default function CustomRoles() {
  const [paginationValues, setPaginationValues] = useState(initialPage)
  const [open, setOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const { toast } = useToast()
  const venue_short_code = useShortCode()
  const {
    data: rolesResponse,
    isLoading,
    isError,
  } = useGetCustomRolesQuery({
    venue_short_code,
    ...paginationValues,
  })
  const [deleteRole, { isLoading: isDeleting }] = useDeleteCustomRoleMutation()

  const handleDelete = async () => {
    if (!selectedRole) return

    try {
      await deleteRole({
        id: selectedRole.id,
        short_code: venue_short_code,
      }).unwrap()

      toast({
        title: 'Success',
        description: 'Role deleted successfully',
      })
      setDeleteOpen(false)
      setSelectedRole(null)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete role',
        variant: 'destructive',
      })
    }
  }

  const roleColumns: ColumnDef<Role>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: ({ row: { original } }) => (
          <span className='font-medium'>{original.name}</span>
      ),
    },
    {
      header: 'Description',
      accessorKey: 'description',
      cell: ({ row: { original } }) => (
          <div className='max-w-[300px] truncate text-sm'>
            {original.description || (
                <span className='italic text-muted-foreground'>
              No description provided
            </span>
            )}
          </div>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row: { original } }) => (
        <div className='flex items-center gap-1'>
          <EditDelete
            original={original}
            handleDelete={() => {
              setSelectedRole(original)
              setDeleteOpen(true)
            }}
          />
        </div>
      ),
    },
  ]

  return (
    <Layout>
      <AddCustomRoleModal setOpen={setOpen} open={open} />
      <ConfirmationModal
        handleDelete={handleDelete}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        id={selectedRole}
        title='Delete Role'
        description='Are you sure you want to delete this role? This action cannot be undone.'
        loading={isDeleting}
      />

      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-8'>
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Custom roles</h2>
            <p className='text-muted-foreground'>
              Create and customize unique roles specific to your organization's needs
            </p>
          </div>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
            <Button
              onClick={() => setOpen(true)}
              className='flex items-center gap-2'
            >
              <PlusIcon className='h-4 w-4' />
              Add custom role
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className='pt-6'>
            <GenericTableWrapper
              columns={roleColumns}
              data={rolesResponse?.data || []}
              {...{ isError, isLoading, setPaginationValues, paginationValues }}
            />
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
