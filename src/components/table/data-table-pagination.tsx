import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PaginationProps, SetPagination } from '@/@types/common'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  paginationValues?: PaginationProps
  setPaginationValues?: SetPagination
  rowsSelected?: boolean
  total_pages?: number
}

export function DataTablePagination<TData>({
  table,
  paginationValues,
  setPaginationValues,
  rowsSelected,
  total_pages,
}: DataTablePaginationProps<TData>) {
  const handleSetPageIndex = (index: number) => {
    table.setPageIndex(index)
    if (setPaginationValues) {
      setPaginationValues((prev) => ({ ...prev, page: index + 1 }))
    }
  }

  const currentPage =
    paginationValues?.page ?? table.getState().pagination.pageIndex + 1
  const canGoToPrevious = currentPage > 1
  const canGoToNext = currentPage < (total_pages ?? table.getPageCount())

  return (
    <div className='flex w-full items-center justify-between overflow-auto px-2'>
      {rowsSelected && (
        <div className='hidden flex-1 text-sm text-muted-foreground sm:block'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      )}
      <div
        className={`${rowsSelected ? '' : 'w-full'} flex items-center justify-end sm:space-x-6 lg:space-x-8`}
      >
        <div className='flex items-center space-x-2'>
          <p className='hidden text-sm font-medium sm:block'>Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
              setPaginationValues?.((prev) => ({
                ...prev,
                size: Number(value),
                page: 1,
              }))
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Page {currentPage} of {total_pages ?? table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => handleSetPageIndex(0)}
            disabled={!canGoToPrevious}
          >
            <span className='sr-only'>Go to first page</span>
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => handleSetPageIndex(currentPage - 2)}
            disabled={!canGoToPrevious}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => handleSetPageIndex(currentPage)}
            disabled={!canGoToNext}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() =>
              handleSetPageIndex((total_pages ?? table.getPageCount()) - 1)
            }
            disabled={!canGoToNext}
          >
            <span className='sr-only'>Go to last page</span>
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
