import { ColumnDef } from '@tanstack/react-table'

export const columnsEmployeeSummary: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: 'Employee Name',
  },
  {
    accessorKey: 'department.name',
    header: 'Department',
  },
  {
    accessorKey: 'breaks_taken',
    header: 'Breaks Taken',
  },
  {
    accessorKey: 'overtime_hours',
    header: 'Overtime Hours',
  },
  {
    accessorKey: 'total_hours',
    header: 'Total Hours',
  },
  {
    accessorKey: 'violations_count',
    header: 'Violations',
  },
]
