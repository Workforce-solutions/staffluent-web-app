import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from './data-table-column-header'
import { AttendenceResponse } from '@/@types/shifts'

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
    accessorKey: 'end',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='End' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='text-sm'> {row.getValue('end')}</span>
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
    accessorKey: 'paid',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Paid' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='text-sm'> {row.getValue('paid')}</span>
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
