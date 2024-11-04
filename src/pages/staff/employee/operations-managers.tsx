import { useShortCode } from '@/hooks/use-local-storage'
import { useGetOperationsManagerQuery } from '@/services/staffApi'
import { ROLES } from '../teams/team-employees/add-team-leader'
import EmployeeTable from './common-employee-table'

export default function OperationsManager() {
  const venue_short_code = useShortCode()
  const {
    data: staffResponse = [],
    isLoading,
    isError,
  } = useGetOperationsManagerQuery(
    { venue_short_code },
    { skip: !venue_short_code }
  )

  return (
    <EmployeeTable
      data={staffResponse}
      {...{ isError, isLoading }}
      role={ROLES.operationManager}
    />
  )
}
