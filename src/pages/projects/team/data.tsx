import { ColumnDef } from '@tanstack/react-table'
import { Award, Briefcase, UserPlus, Users } from 'lucide-react'

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    case 'on-break':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
  }
}

export const menuOptions = [
  {
    label: 'Assign Employee',
    icon: UserPlus,
    action: 'AssignEmployee'
  },
  {
    label: 'Assign Operations Manager',
    icon: Briefcase,
    action: 'AssignOperationsManager',
  },
  {
    label: 'Assign Team to Project',
    icon: Users,
    action: 'AssignTeamToProject',
  },
  {
    label: 'Assign Project Manager',
    icon: Award,
    action: 'AssignProjectManager',
  },
]

export const assignedTeamColumns = (): ColumnDef<{
  name: string
  department: { name: string }
}>[] => [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row: { original } }) => <div>{original?.department?.name}</div>,
  },
]