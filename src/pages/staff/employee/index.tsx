import { useShortCode } from '@/hooks/use-local-storage'
import { useGetEmployeesQuery } from '@/services/staffApi'
import EmployeeTable from './common-employee-table'

export default function StaffOverview() {
  const short_code = useShortCode()
  const {
    data: staffResponse = [],
    isLoading,
    isError,
  } = useGetEmployeesQuery(short_code)

  return <EmployeeTable data={staffResponse} {...{ isError, isLoading }} />
}
