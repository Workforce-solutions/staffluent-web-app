import { OptionsType } from '@/@types/common'
import { useMemo } from 'react'
import SelectWrapper from '../wrappers/select-wrapper'
import { useServiceCategories } from '@/hooks/dropdown-values/use-service-categories'

interface DepartmentsDropdownProps {
  id?: number | null
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: ((...event: any[]) => void) | undefined
}

const ServiceCategoriesDropdown = ({
  id,
  onChange,
  className = 'col-span-4 !w-full',
}: DepartmentsDropdownProps) => {
  const { servicesData, queryParams, setQueryParams } = useServiceCategories()

  const options: OptionsType[] = useMemo(() => {
    return servicesData.map((dept) => ({
      label: dept.name,
      value: {
        label: dept.name,
        value: String(dept.id),
      },
    }))
  }, [servicesData])

  return (
    <SelectWrapper
      onChange={onChange}
      // @ts-ignore
      value={String(id ?? '')}
      placeholder='Select Service...'
      {...{ queryParams, setQueryParams, className, options }}
    />
  )
}

export default ServiceCategoriesDropdown
