import { getCommonUrl } from '@/hooks/common/common-api-url'
import { getPrepareHeaders, staffAdminAppkeyParam, vbUrl } from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Types
export interface Activity {
    id: number
    type: string
    user: string
    department: string
    team: string
    timestamp: string
    task?: string
    metadata: Record<string, any>
}

export interface Department {
    id: number
    name: string
}

export interface Team {
    id: number
    name: string
}

export interface ActivityResponse {
    activities: Activity[]
    pagination: {
        current_page: number
        total: number
        per_page: number
        total_pages: number
    }
    summary: {
        activity_breakdown: Array<{type: string; count: number}>
        team_performance: Array<{name: string; count: number}>
    }
    filters: {
        departments: Department[]
        teams: Team[]
    }
}

export interface ActivityFilters {
    venue_short_code: string
    department?: number | string | undefined // Allow both number and string
    team?: number | string | undefined
    search?: string | undefined
    per_page?: number | undefined
    page?: number | undefined
}

export interface KPIData {
    date: string
    activities: number
    completions: number
}

export interface TeamPerformanceData {
    name: string
    efficiency: number
    activity: number
    engagement: number
}

export interface StaffPerformanceData {
    name: string
    tasks: number
    activity_score: number
    engagement_rate: number
}

export interface PerformanceInsights {
    total_activities: number
    active_employees: number
    task_completion_rate: number
    most_active_time: number | null
}

export interface PerformanceMetricsResponse {
    time_frame: string
    kpi_data: KPIData[]
    team_performance: TeamPerformanceData[]
    staff_performance: StaffPerformanceData[]
    insights: PerformanceInsights
}

export interface PerformanceMetricsParams {
    venue_short_code: string
    time_frame?: 'weekly' | 'monthly' | 'quarterly' | 'yearly'
}

export const adminActivityApi = createApi({
    reducerPath: 'adminActivity',
    baseQuery: fetchBaseQuery({
        baseUrl: vbUrl + 'vb-apps/staff/admin',
        prepareHeaders: (headers) => getPrepareHeaders({ headers }),
    }),
    tagTypes: ['ActivityFeed', 'PerformanceMetrics'],
    endpoints: (builder) => ({
        getActivities: builder.query<ActivityResponse, ActivityFilters>({
            query: ({ venue_short_code, ...params }) => ({
                url: getCommonUrl({
                    queryString: '/activity',
                    query: `&venue_short_code=${venue_short_code}${
                        params.department && params.department !== 'All' ? `&department=${params.department}` : ''
                    }${params.team && params.team !== 'All' ? `&team=${params.team}` : ''}${
                        params.search ? `&search=${params.search}` : ''
                    }${params.per_page ? `&per_page=${params.per_page}` : ''}${
                        params.page ? `&page=${params.page}` : ''
                    }`,
                    params: staffAdminAppkeyParam,
                }),
            }),
            providesTags: ['ActivityFeed'],
        }),
        getPerformanceMetrics: builder.query<PerformanceMetricsResponse, PerformanceMetricsParams>({
            query: ({ venue_short_code, time_frame = 'monthly' }) => ({
                url: getCommonUrl({
                    queryString: '/activity/performance-metrics',
                    query: `&venue_short_code=${venue_short_code}&time_frame=${time_frame}`,
                    params: staffAdminAppkeyParam,
                }),
            }),
            providesTags: ['PerformanceMetrics'],
        }),
    }),
})

export const {
    useGetActivitiesQuery,
    useGetPerformanceMetricsQuery
} = adminActivityApi