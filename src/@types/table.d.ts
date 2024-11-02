import { ColumnDef } from '@tanstack/react-table'
import { PaginationProps, SetPagination } from './common'

export interface DataTableProps<TData, TValue> {
  columns?: ColumnDef<TData, TValue>[]
  data?: TData[]
  paginationValues?: PaginationProps
  setPaginationValues?: SetPagination
  rowsSelected?: boolean
  total_pages?: number
  showToolbar?: boolean
}

export interface LoaderProps {
  isLoading?: boolean
  isError?: boolean
}

export interface GenericTableProps<TData, TValue>
  extends DataTableProps<TData, TValue>,
    LoaderProps {}
