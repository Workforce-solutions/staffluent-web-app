import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getPrepareHeaders, staffAdminAppkeyParam, vbUrl } from '@/hooks/common/common-functions'
import { getCommonUrl } from '@/hooks/common/common-api-url'

// Types
export interface OverviewStats {
    totalStaff: {
        count: number
        change: string
    }
    averageProductivity: {
        percentage: number
        change: string
    }
    tasksCompleted: {
        count: number
        change: string
    }
    activeProjects: {
        count: number
        completed: string
    }
    productivityTrend: {
        dates: string[]
        actual: number[]
        expected: number[]
    }
    taskCompletionStatus: {
        completed: number
        inProgress: number
        notStarted: number
    }
}

export interface Performance {
    name: string
    role: string
    performanceScore: number
    stats: {
        activities: number
        activeDays: number
        completedTasks: number
    }
}

export interface TaskStats {
    departmentCompletion: Array<{
        department: string
        total: number
        completed: number
    }>
    taskStatus: {
        total: number
        completed: number
        in_progress: number
        not_started: number,
        cancelled: number
    }
}

export interface ProjectStats {
    statusOverview: Array<{
        name: string
        status: string
        completion: number
    }>
}

export interface DashboardResponse {
    overview: OverviewStats
    performance: Performance[]
    tasks: TaskStats
    projects: ProjectStats
}

export interface DashboardParams {
    time_frame?: 'weekly' | 'monthly' | 'quarterly' | 'yearly'
    venue_short_code: string
}

export const dashboardApi = createApi({
    reducerPath: 'dashboard',
    baseQuery: fetchBaseQuery({
        baseUrl: vbUrl + 'vb-apps/staff/admin',
        prepareHeaders: (headers) => getPrepareHeaders({ headers }),
    }),
    tagTypes: ['Dashboard'],
    endpoints: (builder) => ({
        getDashboard: builder.query<DashboardResponse, DashboardParams>({
            query: ({ venue_short_code, time_frame = 'monthly' }) => ({
                url: getCommonUrl({
                    queryString: '/dashboard',
                    query: `&venue_short_code=${venue_short_code}&time_frame=${time_frame}`,
                    params: staffAdminAppkeyParam,
                }),
            }),
            providesTags: ['Dashboard'],
        }),
    }),
})

export const { useGetDashboardQuery } = dashboardApi