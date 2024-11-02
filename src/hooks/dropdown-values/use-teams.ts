import { FilterParams } from '@/@types/common'
import { TeamsResponse } from '@/@types/staff'
import { initialQueryState } from '@/components/table/data'
import { useLazyGetTeamsQuery } from '@/services/staffApi'
import { useEffect, useState } from 'react'
import { useShortCode } from '../use-local-storage'

export const useTeams = () => {
  const venue_short_code = useShortCode()
  const [teamsData, setTeamsData] = useState<TeamsResponse[]>([])
  const [queryParams, setQueryParams] =
    useState<FilterParams>(initialQueryState)

  const [getAllTeams] = useLazyGetTeamsQuery()

  useEffect(() => {
    fetchOptions(queryParams.page)
  }, [queryParams.page])

  useEffect(() => {
    setQueryParams(initialQueryState)
    setTeamsData([])
  }, [])

  const fetchOptions = async (page: number) => {
    setQueryParams((e) => ({ ...e, loading: true }))
    getAllTeams({
      page,
      size: 10,
      venue_short_code,
    })
      .unwrap()
      .then((response) => {
        if (page === 1) {
          setTeamsData(response.data)
        } else {
          setTeamsData((prevOptions) => [
            ...prevOptions,
            ...(response?.data ?? []),
          ])
        }
        setQueryParams((e) => ({ ...e, loading: false }))
        if (response.total_pages <= page) {
          setQueryParams((e) => ({ ...e, hasMore: false }))
        }
      })
      .catch(() => setQueryParams((e) => ({ ...e, loading: false })))
  }

  return { teamsData, fetchOptions, setQueryParams, queryParams }
}
