import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { CreateWorkOrderResponse } from '@/@types/oprationManager'
import { priorities, statuses } from '@/pages/projects/tasks/data/data'
import { Badge } from '@/components/ui/badge'
import { getStatusVariant } from '@/hooks/common/common-functions'

export const columns: ColumnDef<CreateWorkOrderResponse>[] = [
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
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex flex-col space-y-1'>
          <span className='font-medium'>{row.getValue('name')}</span>
          {/*// @ts-ignore*/}
          {row.original.client && (
            <span className='text-sm text-muted-foreground'>
              {/*// @ts-ignore*/}
              Client: {row.original.client.name}
            </span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'start_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Start Date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('start_date')
      if (!date) return <div className="text-muted-foreground">Not set</div>
      return format(new Date(date as string), 'MMM dd, yyyy')
    },
  },
  {
    accessorKey: 'end_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='End Date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('end_date')
      if (!date) return <div className="text-muted-foreground">Not set</div>
      return format(new Date(date as string), 'MMM dd, yyyy')
    },
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

      const priorityColors: Record<string, string> = {
        high: 'text-red-500',
        medium: 'text-yellow-500',
        low: 'text-green-500',
      }

      return (
        <div className='flex items-center'>
          <span className={priorityColors[priority.value] || ''}>
            {priority.label}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => {
      const description = row.getValue('description') as string
      if (!description) return <div className="text-muted-foreground">Not set</div>

      return (
        <div
          className="max-w-[300px] truncate"
          title={description}
        >
          {description.length > 30 ? `${description.slice(0, 30)}...` : description}
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
        (status) => status.value === row.original.status
      )
      if (!status) return null
      return (
        <div className='flex w-[100px] items-center'>
          <Badge variant={getStatusVariant(row.original.status)}>
            {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: 'actions',
    // @ts-ignore
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]