import { OptionsType } from '@/@types/common'
import { useTeams } from '@/hooks/dropdown-values/use-teams'
import { useMemo } from 'react'
import SelectWrapper from '../wrappers/select-wrapper'

interface TeamDropdownProps {
  id?: number | null
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: ((...event: any[]) => void) | undefined
}

const TeamDropdown = ({
  id,
  onChange,
  className = 'col-span-4 !w-full',
}: TeamDropdownProps) => {
  const { teamsData, queryParams, setQueryParams } = useTeams()

  const options: OptionsType[] = useMemo(() => {
    return teamsData.map((team) => ({
      label: team.name,
      value: {
        label: team.name,
        value: String(team.id),
      },
    }))
  }, [teamsData])

  return (
    <SelectWrapper
      onChange={onChange}
      // @ts-ignore
      value={String(id ?? '')}
      placeholder='Select Team...'
      {...{ queryParams, setQueryParams, className, options }}
    />
  )
}

export default TeamDropdown
