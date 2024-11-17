/* eslint-disable react-hooks/exhaustive-deps */
import { FilterParams } from '@/@types/common'
import { ServiceProps } from '@/@types/services'
import { initialQueryState } from '@/components/table/data'
import { useLazyGetServicesQuery } from '@/services/servicesApi'
import { useEffect, useState } from 'react'
import { useShortCode } from '../use-local-storage'

export const useServices = () => {
  const venue_short_code = useShortCode()
  const [servicesData, setServicesData] = useState<ServiceProps[]>([])
  const [queryParams, setQueryParams] =
    useState<FilterParams>(initialQueryState)

  const [getAllServices] = useLazyGetServicesQuery()

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
          setServicesData(response?.services?.data)
        } else {
          setServicesData((prevOptions) => [
            ...prevOptions,
            ...(response?.services?.data ?? []),
          ])
        }
        setQueryParams((e) => ({ ...e, loading: false }))
        if (response?.services.total_pages <= page) {
          setQueryParams((e) => ({ ...e, hasMore: false }))
        }
      })
      .catch(() => setQueryParams((e) => ({ ...e, loading: false })))
  }

  return { servicesData, fetchOptions, setQueryParams, queryParams }
}
