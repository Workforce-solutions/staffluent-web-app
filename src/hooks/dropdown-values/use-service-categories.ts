/* eslint-disable react-hooks/exhaustive-deps */
import { FilterParams } from '@/@types/common'
import { initialQueryState } from '@/components/table/data'
import { useLazyGetServiceCategoriesQuery } from '@/services/servicesApi'
import { useEffect, useState } from 'react'
import { useShortCode } from '../use-local-storage'
import { ServiceData } from '@/@types/clientPortal'

export const useServiceCategories = () => {
  const venue_short_code = useShortCode()
  const [servicesData, setServicesData] = useState<ServiceData[]>([])
  const [queryParams, setQueryParams] =
    useState<FilterParams>(initialQueryState)

  const [getAllServices] = useLazyGetServiceCategoriesQuery()

  useEffect(() => {
    fetchOptions(queryParams.page)
  }, [queryParams.page])

  useEffect(() => {
    setQueryParams(initialQueryState)
    setServicesData([])
  }, [])

  const fetchOptions = async (page: number) => {
    setQueryParams((e) => ({ ...e, loading: true }))
    getAllServices({
      page,
      size: 10,
      venue_short_code,
    })
      .unwrap()
      .then((response) => {
        if (page === 1) {
          setServicesData(response?.categories?.data)
        } else {
          setServicesData((prevOptions) => [
            ...prevOptions,
            ...(response?.categories?.data ?? []),
          ])
        }
        setQueryParams((e) => ({ ...e, loading: false }))
        if (response?.categories?.total_pages <= page) {
          setQueryParams((e) => ({ ...e, hasMore: false }))
        }
      })
      .catch(() => setQueryParams((e) => ({ ...e, loading: false })))
  }

  return { servicesData, fetchOptions, setQueryParams, queryParams }
}
