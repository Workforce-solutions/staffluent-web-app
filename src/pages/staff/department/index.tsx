import { DepartmentResponse } from '@/@types/staff'
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
  useDeleteDepartmentMutation,
  useGetDepartmentsQuery,
} from '@/services/staffApi'
import { ColumnDef } from '@tanstack/react-table'
import { Folders, GitBranch, PlusIcon, Target, Users } from 'lucide-react'
import { useState } from 'react'
import { CreateDepartmentModal } from './create-department'
import { EditDepartmentModal } from './edit-department'
import { Input } from '@/components/ui/input'

export default function StaffDepartment() {
  const [paginationValues, setPaginationValues] = useState(initialPage)
  const [open, setOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentResponse | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const { toast } = useToast()
  const short_code = useShortCode()
  const {
    data: departmentsResponse,
    isLoading,
    isError,
  } = useGetDepartmentsQuery({
    venue_short_code: short_code,
    ...paginationValues,
  })
  const [deleteDepartment] = useDeleteDepartmentMutation()

  const handleDelete = async () => {
    if (!selectedDepartment) return

    try {
      await deleteDepartment({
        id: selectedDepartment.id,
        short_code,
      }).unwrap()

      toast({
        title: 'Success',
        description: 'Department deleted successfully',
      })
      setDeleteOpen(false)
      setSelectedDepartment(null)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete department',
        variant: 'destructive',
      })
    }
  }

  // eslint-disable-next-line react-refresh/only-export-components

  const departmentColumns: ColumnDef<DepartmentResponse>[] = [
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
      header: 'Department Overview',
      cell: ({ row: { original } }) => (
        <div className='flex items-center space-x-6'>
          {/* Employees Stats */}
          <div className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900'>
              <Users className='h-4 w-4 text-blue-600 dark:text-blue-300' />
            </div>
            <div className='flex flex-col'>
              <span className='text-xs font-medium text-muted-foreground'>
                Employees
              </span>
              <span className='text-sm font-bold text-blue-600 dark:text-blue-300'>
                {original.stats?.employees_count
                  ? original.stats.employees_count.toLocaleString()
                  : '—'}
              </span>
            </div>
          </div>

          {/* Teams Stats */}
          <div className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900'>
              <Folders className='h-4 w-4 text-green-600 dark:text-green-300' />
            </div>
            <div className='flex flex-col'>
              <span className='text-xs font-medium text-muted-foreground'>
                Teams
              </span>
              <span className='text-sm font-bold text-green-600 dark:text-green-300'>
                {original.stats?.teams_count
                  ? original.stats.teams_count.toLocaleString()
                  : '—'}
              </span>
            </div>
          </div>

          {/* Cross Teams Stats */}
          <div className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900'>
              <GitBranch className='h-4 w-4 text-amber-600 dark:text-amber-300' />
            </div>
            <div className='flex flex-col'>
              <span className='text-xs font-medium text-muted-foreground'>
                Cross Teams
              </span>
              <span className='text-sm font-bold text-amber-600 dark:text-amber-300'>
                {original.stats?.cross_teams_count
                  ? original.stats.cross_teams_count.toLocaleString()
                  : '—'}
              </span>
            </div>
          </div>

          {/* Projects Stats */}
          <div className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900'>
              <Target className='h-4 w-4 text-purple-600 dark:text-purple-300' />
            </div>
            <div className='flex flex-col'>
              <span className='text-xs font-medium text-muted-foreground'>
                Projects
              </span>
              <span className='text-sm font-bold text-purple-600 dark:text-purple-300'>
                {original.stats?.projects_count
                  ? original.stats.projects_count.toLocaleString()
                  : '—'}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row: { original } }) => (
        <div className='flex items-center justify-end  gap-1'>
          <EditDelete
            original={original}
            handleDelete={() => {
              setSelectedDepartment(original)
              setDeleteOpen(true)
            }}
            handleEdit={() => {
              setSelectedDepartment(original)
              setEditOpen(true)
            }}
          />
        </div>
      ),
    },
  ]

  return (
    <Layout>
      {open && <CreateDepartmentModal open={open} setOpen={setOpen} />}
      {editOpen && (
        <EditDepartmentModal
          open={editOpen}
          setOpen={setEditOpen}
          department={selectedDepartment}
        />
      )}

      <ConfirmationModal
        {...{ handleDelete }}
        open={deleteOpen}
        setOpen={setDeleteOpen}
        id={selectedDepartment}
        title='Delete Department'
        description='Are you sure you want to delete this department? This action cannot be undone.'
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
            <h2 className='text-2xl font-bold tracking-tight'>Departments</h2>
            <p className='text-muted-foreground'>
              Organize and manage your team departments
            </p>
          </div>
          <div className='flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0'>
            <Input
              placeholder='Search departments...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full sm:w-64'
            />
            <Button
              onClick={() => setOpen(true)}
              className='flex items-center gap-2'
            >
              <PlusIcon className='h-4 w-4' />
              Add Department
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className='pt-6'>
            <GenericTableWrapper
              columns={departmentColumns}
              data={departmentsResponse?.departments.data || []}
              isLoading={isLoading}
              isError={isError}
              paginationValues={paginationValues}
              setPaginationValues={setPaginationValues}
              total_pages={departmentsResponse?.departments.total_pages}
            />
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
