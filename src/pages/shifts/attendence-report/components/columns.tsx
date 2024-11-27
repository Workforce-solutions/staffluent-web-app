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
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('status')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'total_hours',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total Hours' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('total_hours')}h Total
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'start_time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Start Time' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex gap-2'>
          <span className='text-sm text-muted-foreground'>{row.original.start_time}</span>
          {row.original.icon && (
            row.original.icon
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'end_time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='End Time' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex gap-2'>
          <span className='text-sm text-muted-foreground'>{row.original.end_time}</span>
          {row.original.icon && (
            row.original.icon
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => {
      return (
        <div className='w-full text-start'>
          {/* <Progress value={progress} className='w-[60%]' /> */}
          <span className='text-sm text-muted-foreground'>{row.original.date}</span>
        </div>
      )
    },
  },
  // {
  //   accessorKey: 'avatar',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Avatar' />
  //   ),
  //   cell: ({ row }) => {

  //     return (
  //       <Avatar
  //         // key={index}
  //         className='inline-block border-2 border-background'
  //       >
  //         <AvatarImage src={row.original.avatar} />
  //         <AvatarFallback>
  //           {/* {row.original.name.slice(0, 2).toUpperCase()} */}
  //         </AvatarFallback>
  //       </Avatar>
  //     )
  //   }
  // },
  // {
  //   id: 'actions',
  //   // @ts-ignore
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
]
