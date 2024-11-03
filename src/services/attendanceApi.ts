// services/attendanceApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import { getPrepareHeaders, staffAdminAppkeyParam, vbUrl } from '@/hooks/common/common-functions'

interface AttendanceTrend {
    date: string
    present: number
    late: number
    absent: number
}

interface AttendanceOverview {
    status: 'Present' | 'Late' | 'Absent'
    value: number
}

interface DepartmentAttendance {
    department: string
    attendance: number
}

interface Insights {
    overallRate: number
    timeFrame: string
    bestDepartment: DepartmentAttendance
    worstDepartment: DepartmentAttendance
    highestLateDay: string | null
    lateArrivalRate: number
}

export interface AttendanceResponse {
    attendanceTrend: AttendanceTrend[]
    attendanceOverview: AttendanceOverview[]
    departmentAttendance: DepartmentAttendance[]
    insights: Insights
}

export interface AttendanceParams {
    venue_short_code: string
    time_frame?: 'weekly' | 'monthly' | 'quarterly' | 'yearly'
}

export const attendanceApi = createApi({
    reducerPath: 'attendance',
    baseQuery: fetchBaseQuery({
        baseUrl: vbUrl + 'vb-apps/staff/admin',
        prepareHeaders: (headers) => getPrepareHeaders({ headers }),
    }),
    tagTypes: ['Attendance'],
    endpoints: (builder) => ({
        getAttendance: builder.query<AttendanceResponse, AttendanceParams>({
            query: ({ venue_short_code, time_frame = 'monthly' }) => ({
                url: getCommonUrl({
                    queryString: '/attendance',
                    query: `&venue_short_code=${venue_short_code}&time_frame=${time_frame}`,
                    params: staffAdminAppkeyParam,
                }),
            }),
            providesTags: ['Attendance'],
        }),
        exportAttendance: builder.mutation<Blob, AttendanceParams>({
            query: ({ venue_short_code, time_frame = 'monthly' }) => ({
                url: getCommonUrl({
                    queryString: '/attendance/export',
                    query: `&venue_short_code=${venue_short_code}&time_frame=${time_frame}`,
                    params: staffAdminAppkeyParam,
                }),
                responseHandler: async (response) => response.blob(),
                cache: 'no-cache',
            }),
        }),
    }),
})

export const { useGetAttendanceQuery, useExportAttendanceMutation } = attendanceApi;