import { GenericTableProps } from '@/@types/table'
import EmptyState from '../table/empty-state'
import { DataTable } from '../table/data-table'

const GenericTableWrapper = <TData, TValue>({
  isError,
  isLoading,
  ...rest
}: GenericTableProps<TData, TValue>) => {
  if (isError || isLoading) {
    return <EmptyState {...{ isError, isLoading }} />
  }
  return <DataTable {...rest} />
}

export default GenericTableWrapper
