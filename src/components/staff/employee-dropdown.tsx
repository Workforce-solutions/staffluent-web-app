import { OptionsType } from '@/@types/common'
import { useShortCode } from '@/hooks/use-local-storage'
import { ROLES } from '@/pages/staff/teams/team-employees/add-team-leader'
import { useGetEmployeesQuery } from '@/services/staffApi'
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
  const { data: employees = [] } = useGetEmployeesQuery(short_code)

  const options: OptionsType[] = useMemo(() => {
    const allItems = role
      ? employees.filter((item) => item.role.name === role)
      : employees
    return allItems.map((dept) => ({
      label: dept.name,
      value: {
        label: dept.name,
        value: String(dept.id),
      },
    }))
  }, [employees, role])

  return (
    <SelectWrapper
      onChange={onChange}
      value={String(id ?? '')}
      placeholder='Select Employee...'
      {...{ className, options }}
    />
  )
}

export default EmployeesDropdown
