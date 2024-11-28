import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { QualityInspection } from '@/@types/team-leader'
import { statuses } from '@/pages/projects/tasks/data/data'
import { Badge } from '@/components/ui/badge'
import { getStatusVariant } from '@/hooks/common/common-functions'

export const columns: ColumnDef<QualityInspection>[] = [
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
    accessorKey: 'inspection_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Inspection Date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('inspection_date')
      if (!date) return <div className="text-muted-foreground">Not set</div>
      return format(new Date(date as string), 'MMM dd, yyyy')
    },
  },
  {
    accessorKey: 'remarks',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Remarks' />
    ),
    cell: ({ row }) => {
      const remarks = row.getValue('remarks') as string
      if (!remarks) return <div className="text-muted-foreground">Not set</div>

      return (
        <div
          className="max-w-[300px] truncate"
          title={remarks}
        >
          {remarks.length > 30 ? `${remarks.slice(0, 30)}...` : remarks}
        </div>
      )
    },
  },
  {
    accessorKey: 'improvement_suggestions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Improvement Suggestions' />
    ),
    cell: ({ row }) => {
      const suggestions = row.getValue('improvement_suggestions') as string
      if (!suggestions) return <div className="text-muted-foreground">Not set</div>

      return (
        <div
          className="max-w-[300px] truncate"
          title={suggestions}
        >
          {suggestions.length > 30 ? `${suggestions.slice(0, 30)}...` : suggestions}
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
    accessorKey: 'rating',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Rating' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>
          <span>{row.original.rating}</span>
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