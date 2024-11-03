import { OptionsType } from '@/@types/common'
import { useShortCode } from '@/hooks/use-local-storage'
import { ROLES } from '@/pages/staff/teams/team-employees/add-team-leader'
import {
  useGetEmployeesQuery,
  useGetOperationsManagerQuery,
  useGetTeamleadersQuery,
} from '@/services/staffApi'
import { useMemo } from 'react'
import SelectWrapper from '../wrappers/select-wrapper'

interface DepartmentsDropdownProps {
  id?: string
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: ((...event: any[]) => void) | undefined
  role?: ROLES
}

const EmployeesDropdown = ({
  id,
  onChange,
  className = 'col-span-4 !w-full',
  role,
}: DepartmentsDropdownProps) => {
  const short_code = useShortCode()
  const { data: employees = [] } = useGetEmployeesQuery(short_code, {
    skip: Boolean(role),
  })

  const { data: teamLeaders = [] } = useGetTeamleadersQuery(
    {
      venue_short_code: short_code,
    },
    {
      skip: role !== ROLES.teamLeader,
    }
  )

  const { data: operationsManagers = [] } = useGetOperationsManagerQuery(
    {
      venue_short_code: short_code,
    },
    {
      skip: role !== ROLES.operationManager,
    }
  )

  const options: OptionsType[] = useMemo(() => {
    const allItems = role
      ? role === ROLES.teamLeader
        ? teamLeaders
        : role === ROLES.operationManager
          ? operationsManagers
          : employees.filter((item) => item.role.name === role)
      : employees
    return allItems.map((dept) => ({
      label: dept.name,
      value: {
        label: dept.name,
        value: String(dept.id),
      },
    }))
  }, [employees, role, teamLeaders, operationsManagers])

  return (
    <SelectWrapper
      onChange={onChange}
      // @ts-ignore
      value={String(id ?? '')}
      placeholder='Select Employee...'
      {...{ className, options }}
    />
  )
}

export default EmployeesDropdown
