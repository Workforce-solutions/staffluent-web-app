import { TasksResponse } from '@/@types/tasks'
import { Checkbox } from '@/components/ui/checkbox'
import EmployeAvatarName from '@/pages/staff/employee/employe-avatar-name'
import { ColumnDef } from '@tanstack/react-table'
import { priorities, statuses } from '@/pages/projects/tasks/data/data'
import { DataTableColumnHeader } from '@/pages/projects/tasks/components/data-table-column-header'
import { DataTableRowActions } from '@/pages/projects/tasks/components/data-table-row-actions'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

export const columns: ColumnDef<TasksResponse, TasksResponse>[] = [
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
    accessorKey: 'id',
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Task' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Title' />
    ),
    enableColumnFilter: true,
    filterFn: 'includesString',
    cell: ({ row }) => {
      return (
          <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
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
      const status = statuses.find(
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
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Priority' />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
          (priority) => priority.value === row.getValue('priority')
      )
      if (!priority) return null
      return (
          <div className='flex items-center'>
            {priority.icon && (
                <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />
            )}
            <span>{priority.label}</span>
          </div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'start_date',
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Start Date' />
    ),
    cell: ({ row }) => {
      const startDate = row.getValue('start_date')
      return startDate ? (
          <div>{format(new Date(startDate as string), 'MMM dd, yyyy')}</div>
      ) : (
          <div className="text-muted-foreground">No date set</div>
      )
    },
  },
  {
    accessorKey: 'due_date',
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Due Date' />
    ),
    cell: ({ row }) => {
      const dueDate = row.getValue('due_date')
      return dueDate ? (
          <div className={cn(
              row.original.is_overdue && 'text-destructive font-medium',
          )}>
            {format(new Date(dueDate as string), 'MMM dd, yyyy')}
          </div>
      ) : (
          <div className="text-muted-foreground">No date set</div>
      )
    },
  },
  {
    accessorKey: 'assignee',
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Assignee' />
    ),
    cell: ({ row }) => {
      const assignee = row.original.assignee
      return assignee ? (
          <div className='flex items-center gap-2'>
            <EmployeAvatarName
                profile_picture={`https://api.dicebear.com/6.x/initials/svg?seed=${assignee.avatar}`}
            />
            <span>{assignee.name}</span>
          </div>
      ) : (
          <div className="text-muted-foreground">Unassigned</div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]