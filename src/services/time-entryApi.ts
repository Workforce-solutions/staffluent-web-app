import { VenueShortCode } from '@/@types/common'
import { CreateTimeEntryPayload, TimeEntry } from '@/@types/time-entry'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const timeEntryApi = createApi({
  reducerPath: 'timeEntries',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['TimeEntries', 'Projects'],
  endpoints: (builder) => ({
    getTimeEntries: builder.query<
      TimeEntry[],
      VenueShortCode & { projectId: number }
    >({
      query: ({ venue_short_code, projectId }) => ({
        url: getCommonUrl({
          queryString: `/projects/${projectId}/time-entries`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['TimeEntries'],
    }),
    createTimeEntry: builder.mutation<
      void,
      VenueShortCode & { projectId: number; data: CreateTimeEntryPayload }
    >({
      query: ({ venue_short_code, projectId, data }) => ({
        url: getCommonUrl({
          queryString: `/projects/${projectId}/time-entries`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['TimeEntries', 'Projects'],
    }),
    updateTimeEntry: builder.mutation<
      void,
      VenueShortCode & {
        entryId: number
        data: Partial<CreateTimeEntryPayload>
      }
    >({
      query: ({ venue_short_code, entryId, data }) => ({
        url: getCommonUrl({
          queryString: `/projects/time-entries/${entryId}`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['TimeEntries', 'Projects'],
    }),
    deleteTimeEntry: builder.mutation<
      void,
      VenueShortCode & { entryId: number }
    >({
      query: ({ venue_short_code, entryId }) => ({
        url: getCommonUrl({
          queryString: `/projects/time-entries/${entryId}`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'DELETE',
      }),
      invalidatesTags: ['TimeEntries', 'Projects'],
    }),
  }),
})

export const {
  useGetTimeEntriesQuery,
  useCreateTimeEntryMutation,
  useUpdateTimeEntryMutation,
  useDeleteTimeEntryMutation,
} = timeEntryApi
