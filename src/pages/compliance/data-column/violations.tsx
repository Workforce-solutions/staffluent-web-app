import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'

export const columnsViolations: ColumnDef<any>[] = [
  {
    header: 'Department',
    accessorKey: 'department_name',
    cell: ({ row }) => (
        <div className="font-medium">{row.original.department_name}</div>
    ),
  },
  {
    header: 'Total Hours',
    accessorKey: 'total_hours',
    cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {Number(row.original.total_hours).toFixed(2)}h
        </div>
    ),
  },
  {
    header: 'Violations',
    accessorKey: 'violations',
    cell: ({ row }) => (
        <div className="flex gap-2">
          {Number(row.original.overtime_violations) > 0 && (
              <Badge variant="destructive">
                {row.original.overtime_violations} Overtime
              </Badge>
          )}
          {Number(row.original.break_violations) > 0 && (
              <Badge variant="destructive">
                {row.original.break_violations} Break
              </Badge>
          )}
          {Number(row.original.break_violations) === 0 &&
              Number(row.original.overtime_violations) === 0 && (
                  <Badge variant="success">No Violations</Badge>
              )}
        </div>
    ),
  },
  {
    header: 'Active Employees',
    accessorKey: 'active_employees',
    cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.original.active_employees} / {row.original.total_employees}
        </div>
    ),
  },
  {
    header: 'Overtime Hours',
    accessorKey: 'overtime_hours',
    cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.original.overtime_hours ?
              `${Number(row.original.overtime_hours).toFixed(2)}h` :
              '-'}
        </div>
    ),
  },
]