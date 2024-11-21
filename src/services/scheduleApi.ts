// services/scheduleApi.ts
import { VenueShortCode } from '@/@types/common'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface CalendarEvent {
  id: number
  title: string
  start: string
  end: string
  type: string
  backgroundColor: string
  employee: {
    id: number
    name: string
  }
  venue: string
}

export interface ShiftData {
  upcomingShift: {
    date: string
    startTime: string
    endTime: string
    venue: string
  } | null
  recentChanges: string
  shifts: {
    id: number
    date: string
    startTime: string
    endTime: string
    status: string
    venue: string
    leaveType?: string
    isTimeOff: boolean
  }[]
  recordConfigurations: {
    manual: boolean
    qr_code: boolean
  }
}

export interface CreateSchedulePayload {
  employee_id: number
  date: string
  start_time: string
  end_time: string
  schedule_type?: 'shift' | 'task' | 'job'
}

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['Schedule'],
  endpoints: (builder) => ({
    getShifts: builder.query<ShiftData, VenueShortCode>({
      query: ({ venue_short_code }) => ({
        url: getCommonUrl({
          queryString: '/shifts',
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Schedule'],
    }),

    getCalendarEvents: builder.query<
      CalendarEvent[],
      VenueShortCode & { start_date: string; end_date: string }
    >({
      query: ({ venue_short_code, start_date, end_date }) => ({
        url: getCommonUrl({
          queryString: '/shifts/calendar',
          query: `&venue_short_code=${venue_short_code}&start_date=${start_date}&end_date=${end_date}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Schedule'],
    }),

    createSchedule: builder.mutation<
      any,
      VenueShortCode & { data: CreateSchedulePayload }
    >({
      query: ({ venue_short_code, data }) => ({
        url: getCommonUrl({
          queryString: '/shifts/schedule',
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Schedule'],
    }),
  }),
})

export const {
  useGetShiftsQuery,
  useGetCalendarEventsQuery,
  useCreateScheduleMutation,
} = scheduleApi
