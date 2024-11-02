import { FilterParams } from '@/@types/common'
import { DepartmentResponse } from '@/@types/staff'
import { initialQueryState } from '@/components/table/data'
import { useLazyGetDepartmentsQuery } from '@/services/staffApi'
import { useEffect, useState } from 'react'
import { useShortCode } from '../use-local-storage'

export const useDepartments = () => {
  const venue_short_code = useShortCode()
  const [departmentsData, setDepartmentsData] = useState<DepartmentResponse[]>(
    []
  )
  const [queryParams, setQueryParams] =
    useState<FilterParams>(initialQueryState)

  const [getAllDepartments] = useLazyGetDepartmentsQuery()

  useEffect(() => {
    fetchOptions(queryParams.page)
  }, [queryParams.page])

  useEffect(() => {
    setQueryParams(initialQueryState)
    setDepartmentsData([])
  }, [])

  const fetchOptions = async (page: number) => {
    setQueryParams((e) => ({ ...e, loading: true }))
    getAllDepartments({
      page,
      size: 10,
      venue_short_code,
    })
      .unwrap()
      .then((response) => {
        if (page === 1) {
          setDepartmentsData(response.departments.data)
        } else {
          setDepartmentsData((prevOptions) => [
            ...prevOptions,
            ...(response?.departments.data ?? []),
          ])
        }
        setQueryParams((e) => ({ ...e, loading: false }))
        if (response.departments.total_pages <= page) {
          setQueryParams((e) => ({ ...e, hasMore: false }))
        }
      })
      .catch(() => setQueryParams((e) => ({ ...e, loading: false })))
  }

  return { departmentsData, fetchOptions, setQueryParams, queryParams }
}
