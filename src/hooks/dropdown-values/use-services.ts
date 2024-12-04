/* eslint-disable react-hooks/exhaustive-deps */
import { FilterParams } from '@/@types/common'
import { ServiceRequestResponse, ServiceRequestsProps } from '@/@types/services'
import { initialQueryState } from '@/components/table/data'
import { useGetServiceRequestsQuery } from '@/services/servicesApi'
import { useEffect, useState } from 'react'
import { useShortCode } from '../use-local-storage'

export const useServices = () => {
  const venue_short_code = useShortCode()
  const [servicesData, setServicesData] = useState<ServiceRequestsProps[]>([])
  const [queryParams, setQueryParams] = useState<FilterParams>(initialQueryState)

  const { refetch: getAllServices } = useGetServiceRequestsQuery({
    page: queryParams.page,
    size: 10,
    venue_short_code
  })

  useEffect(() => {
    fetchOptions(queryParams.page)
  }, [queryParams.page])

  useEffect(() => {
    setQueryParams(initialQueryState)
    setServicesData([])
  }, [])

  const fetchOptions = async (page: number) => {
    setQueryParams((e) => ({ ...e, loading: true }))
    getAllServices()
      .unwrap()
      .then((response: ServiceRequestResponse) => {
        if (page === 1) {
          setServicesData(response.requests.data)
        } else {
          setServicesData((prevOptions) => [
            ...prevOptions,
            ...response.requests.data,
          ])
        }
        setQueryParams((e) => ({
          ...e,
          loading: false,
          hasMore: response.requests.total_pages > page
        }))
      })
      .catch(() => setQueryParams((e) => ({ ...e, loading: false })))
  }

  return { servicesData, fetchOptions, setQueryParams, queryParams }
}
