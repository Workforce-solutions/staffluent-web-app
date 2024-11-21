import { GenericTableProps } from '@/@types/table'
import EmptyState from '../table/empty-state'
import { DataTable } from '../table/data-table'

const GenericTableWrapper = <TData, TValue>({
  isError,
  isLoading,
  isFetching,
  ...rest
}: GenericTableProps<TData, TValue>) => {
  if (isError || isLoading || isFetching) {
    return <EmptyState isLoading={isLoading || isFetching} isError={isError} />
  }
  return <DataTable {...rest} />
}

export default GenericTableWrapper
