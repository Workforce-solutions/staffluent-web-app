import { useDepartments } from '@/hooks/dropdown-values/use-departments'
import SelectWrapper from '../wrappers/select-wrapper'
import { OptionsType } from '@/@types/common'
import { useMemo } from 'react'

interface DepartmentsDropdownProps {
  departmentId?: number | null
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: ((...event: any[]) => void) | undefined
}

const DepartmentsDropdown = ({
  departmentId,
  onChange,
  className = 'col-span-4 !w-full',
}: DepartmentsDropdownProps) => {
  const { departmentsData, queryParams, setQueryParams } = useDepartments()

  const options: OptionsType[] = useMemo(() => {
    return departmentsData.map((dept) => ({
      label: dept.name,
      value: {
        label: dept.name,
        value: String(dept.id),
      },
    }))
  }, [departmentsData])

  return (
    <SelectWrapper
      onChange={onChange}
      value={String(departmentId ?? '')}
      placeholder='Select Department...'
      {...{ queryParams, setQueryParams, className, options }}
    />
  )
}

export default DepartmentsDropdown
