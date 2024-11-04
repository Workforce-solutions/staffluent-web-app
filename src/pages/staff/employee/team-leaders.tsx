import { useShortCode } from '@/hooks/use-local-storage'
import { useGetTeamleadersQuery } from '@/services/staffApi'
import EmployeeTable from './common-employee-table'
import { ROLES } from '../teams/team-employees/add-team-leader'

export default function TeamLeaders() {
  const venue_short_code = useShortCode()
  const {
    data: staffResponse = [],
    isLoading,
    isError,
  } = useGetTeamleadersQuery({ venue_short_code })

  return (
    <EmployeeTable
      data={staffResponse}
      {...{ isError, isLoading }}
      role={ROLES.teamLeader}
    />
  )
}
