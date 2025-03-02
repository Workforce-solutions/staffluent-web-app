import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  vbParams,
  vbUrl,
} from '@/hooks/common/common-functions'
import { VenueShortCode } from '@/@types/common'
import { TeamLeaderResponse } from '@/@types/team-leader'
import { GetProjectsResponse } from '@/@types/project'

type IdInterface = { id: number | string } & VenueShortCode

export const teamLeaderApi = createApi({
  reducerPath: 'teamLeader',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/employee',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['TeamLeaders', 'Projects'],
  endpoints: (builder) => ({
    getQualityInspectionsList: builder.query<TeamLeaderResponse, IdInterface>({
      query: ({ venue_short_code, id }) => ({
        url: getCommonUrl({
          queryString: `/projects/${id}/quality-inspections`,
          query: `&venue_short_code=${venue_short_code}`,
          params: vbParams,
        }),
      }),
      providesTags: ['TeamLeaders'],
    }),
    createQualityInspection: builder.mutation<
      TeamLeaderResponse,
      VenueShortCode & { data: Record<string, string>; id: number }
    >({
      query: ({ venue_short_code, data, id }) => ({
        url: getCommonUrl({
          queryString: `/projects/${id}/quality-inspections`,
          params: vbParams,
          query: `&venue_short_code=${venue_short_code}`,
        }),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['TeamLeaders'],
    }),
    getProjectsList: builder.query<GetProjectsResponse, VenueShortCode>({
      query: ({ venue_short_code }) => ({
        url: getCommonUrl({
          queryString: '/projects',
          query: `&venue_short_code=${venue_short_code}`,
          params: vbParams,
        }),
      }),
      providesTags: ['Projects'],
    }),
  }),
})

export const {
  useGetQualityInspectionsListQuery,
  useCreateQualityInspectionMutation,
  useGetProjectsListQuery,
} = teamLeaderApi
