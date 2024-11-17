import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { ProjectsResponse } from '@/@types/project'
import { projectStatuses } from '../tasks/data/data'

export const columns: ColumnDef<ProjectsResponse>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Project' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('name')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = projectStatuses.find(
        (status) => status.value === row.getValue('status')
      )
      if (!status) return null
      return (
        <div className='flex w-[100px] items-center'>
          {status.icon && (
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}{' '}
          <span>{status.label}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'progress',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Progress' />
    ),
    cell: ({ row }) => {
      const progress = row.getValue('progress') as number
      return (
        <div className='w-full'>
          <Progress value={progress} className='w-[60%]' />
          <span className='text-sm text-muted-foreground'>{progress}%</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'team',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Team' />
    ),
    cell: ({ row }) => {
      const team = row.original.assigned_employees
      return (
        <div className='flex -space-x-2 overflow-hidden'>
          {team.map((member, index) => (
            <Avatar
              key={index}
              className='inline-block border-2 border-background'
            >
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>
                {member.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}
          {team.length > 3 && (
            <Avatar className='inline-block border-2 border-background'>
              <AvatarFallback>+{team.length - 3}</AvatarFallback>
            </Avatar>
          )}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
