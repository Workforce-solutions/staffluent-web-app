import { format } from 'date-fns'
import { ColumnDef } from "@tanstack/react-table"

export const columnsBreakViolations: ColumnDef<any>[] = [
  {
    accessorKey: "employee",
    header: "Employee",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => format(new Date(row.getValue("date")), "PP"),
  },
  {
    accessorKey: "hour",
    header: "Hours",
  },
  {
    accessorKey: "violation",
    header: "Violation",
  },
]