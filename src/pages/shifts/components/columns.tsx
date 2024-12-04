import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from './data-table-column-header'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ShiftResponse } from '@/@types/shifts'
import { getStatusVariant } from '@/utils/status'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<ShiftResponse>[] = [
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
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('date')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={getStatusVariant(row.original.status)}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'start_time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Time' />
    ),
    cell: ({ row }) => {
      return (
        <div className='w-full'>
          {/* <Progress value={progress} className='w-[60%]' /> */}
          <span className='text-sm text-muted-foreground'>{row.original.start_time} - {row.original.end_time}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'avatar',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Avatar' />
    ),
    cell: ({ row }) => {

      return (
        <Avatar
          // key={index}
          className='border-2 border-background'
        >
          <AvatarImage src={row.original.avatar} />
          <AvatarFallback>
            {/* {row.original.name.slice(0, 2).toUpperCase()} */}
          </AvatarFallback>
        </Avatar>
      )
    }
  },
  // {
  //   id: 'actions',
  //   // @ts-ignore
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
]
