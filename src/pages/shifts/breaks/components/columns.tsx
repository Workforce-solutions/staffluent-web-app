import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from './data-table-column-header'
import { AttendenceResponse } from '@/@types/shifts'
import { Badge } from '@/components/ui/badge'
import { getStatusVariant } from '@/hooks/common/common-functions'

export const columns: ColumnDef<AttendenceResponse>[] = [
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
      <DataTableColumnHeader column={column} title='Id' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px]'>
            {row.getValue('id')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px]'>
            {row.getValue('title')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'start',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Start' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px]'>
            {row.getValue('start')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Duration' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='text-sm'> {row.getValue('duration')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'remaining',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Remaining' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='text-sm'> {row.getValue('remaining')}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='text-sm'> {row.getValue('type')}</span>
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
      return (
        <div className='flex space-x-2'>
          <Badge variant={getStatusVariant(row.original.status)}>
            {row.original.status}
          </Badge>
        </div>
      )
    },
  },
  // {
  //   id: 'actions',
  //   // @ts-ignore
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
]
