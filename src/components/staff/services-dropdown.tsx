import { OptionsType } from '@/@types/common'
import { useServices } from '@/hooks/dropdown-values/use-services'
import { useMemo } from 'react'
import SelectWrapper from '../wrappers/select-wrapper'

interface DepartmentsDropdownProps {
  id?: number | null
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: ((...event: any[]) => void) | undefined
}

const ServicesDropdown = ({
  id,
  onChange,
  className = 'col-span-4 !w-full',
}: DepartmentsDropdownProps) => {
  const { servicesData, queryParams, setQueryParams } = useServices()

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

export default ServicesDropdown
