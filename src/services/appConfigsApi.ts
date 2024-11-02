// services/appConfigsApi.ts
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
    getPrepareHeaders,
    staffAdminAppkeyParam,
    vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface CountryResponse {
    id: number
    name: string
    code: string
}

interface StateResponse {
    id: number
    name: string
    country_id: number
}

interface CityResponse {
    id: number
    name: string
    state_id: number
}

interface LocationResponse<T> {
    data: T[]
}

export const appConfigsApi = createApi({
    reducerPath: 'appConfigs',
    baseQuery: fetchBaseQuery({
        baseUrl: vbUrl + 'vb-apps/staff/admin',
        prepareHeaders: (headers) => getPrepareHeaders({ headers }),
    }),
    tagTypes: ['AppConfigs'],
    endpoints: (builder) => ({
        getCountries: builder.query<LocationResponse<CountryResponse>, string>({
            query: (venue_short_code) => ({
                url: getCommonUrl({
                    queryString: '/countries',
                    query: `&venue_short_code=${venue_short_code}`,
                    params: staffAdminAppkeyParam,
                }),
            }),
        }),

        getStates: builder.query<LocationResponse<StateResponse>, { country_id: number; short_code: string }>({
            query: ({ country_id, short_code }) => ({
                url: getCommonUrl({
                    queryString: `/states/${country_id}`,  // Changed this line
                    query: `&venue_short_code=${short_code}`,
                    params: staffAdminAppkeyParam,
                }),
            }),
        }),

        getCities: builder.query<LocationResponse<CityResponse>, { state_id: number; short_code: string }>({
            query: ({ state_id, short_code }) => ({
                url: getCommonUrl({
                    queryString: `/cities/${state_id}`,  // Changed this line
                    query: `&venue_short_code=${short_code}`,
                    params: staffAdminAppkeyParam,
                }),
            }),
        }),
    }),
})

export const {
    useGetCountriesQuery,
    useGetStatesQuery,
    useGetCitiesQuery,
} = appConfigsApi