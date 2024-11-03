import { OptionsType } from '@/@types/common'
import { useShortCode } from '@/hooks/use-local-storage'
import { useMemo } from 'react'
import SelectWrapper from '../wrappers/select-wrapper'
import { useGetRolesQuery } from '@/services/roleApi'

interface RolesDropdownProps {
  roleId?: string | null
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: ((...event: any[]) => void) | undefined
  role: 'attached' | 'available' | 'all'
}

const RolesDropdown = ({
  roleId,
  onChange,
  role,
  className = 'col-span-4 !w-full',
}: RolesDropdownProps) => {
  const short_code = useShortCode()

  const { data: rolesData = { attached_roles: [], available_roles: [] } } =
    useGetRolesQuery({ venue_short_code: short_code })

  const options: OptionsType[] = useMemo(() => {
    const allRoles =
      role === 'all'
        ? [...rolesData.attached_roles, ...rolesData.available_roles]
        : role === 'attached'
          ? rolesData.attached_roles
          : rolesData.available_roles

    return allRoles.map((role) => ({
      label: role.name,
      value: {
        label: role.name,
        value: String(role.id),
        role_type: role.role_type,
      },
    }))
  }, [rolesData, role])

  const handleOnChangle = (event: any) => {
    onChange?.(
      event,
      options.find((role) => event === role.value.value)
    )
  }

  return (
    <SelectWrapper
      onChange={handleOnChangle}
      // @ts-ignore
      value={String(roleId ?? '')}
      placeholder='Select Role...'
      {...{ className, options }}
    />
  )
}

export default RolesDropdown
