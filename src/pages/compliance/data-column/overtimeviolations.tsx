import { OvertimeViolations } from '@/@types/compliance'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

export const columnsOvertimeViolations: ColumnDef<OvertimeViolations>[] = [
  {
    accessorKey: 'employee',
    header: 'Employee',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => format(new Date(row.getValue('date')), 'MMM d, yyyy'),
  },
  {
    accessorKey: 'overtime_hours',
    header: 'Overtime Hours',
  },
  {
    accessorKey: 'weekly_total',
    header: 'Weekly Total',
  },
]