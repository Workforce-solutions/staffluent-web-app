import { VenueShortCode } from '@/@types/common'
import { CreateTaskPayload, GetTasksResponse } from '@/@types/tasks'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
    getPrepareHeaders,
    staffAdminAppkeyParam,
    vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tasksApi = createApi({
    reducerPath: 'tasks',
    baseQuery: fetchBaseQuery({
        baseUrl: vbUrl + 'vb-apps/staff/admin',
        prepareHeaders: (headers) => getPrepareHeaders({ headers }),
    }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasksList: builder.query<GetTasksResponse, VenueShortCode>({
            query: ({ venue_short_code }) => ({
                url: getCommonUrl({
                    queryString: '/tasks',
                    query: `&venue_short_code=${venue_short_code}`,
                    params: staffAdminAppkeyParam,
                }),
            }),
            providesTags: ['Tasks'],
        }),
        getTasksStatusList: builder.query<any, VenueShortCode>({
            query: ({ venue_short_code }) => ({
                url: getCommonUrl({
                    queryString: '/tasks/statuses',
                    query: `&venue_short_code=${venue_short_code}`,
                    params: staffAdminAppkeyParam,
                }),
            }),
            providesTags: ['Tasks'],
        }),
        deleteTask: builder.mutation<void, VenueShortCode & { id: number | string }>({
            query: ({ venue_short_code, id }) => ({
                url: getCommonUrl({
                    queryString: `/tasks/${id}`,
                    query: `&venue_short_code=${venue_short_code}`,
                    params: staffAdminAppkeyParam,
                }),
                method: 'DELETE',
            }),
            invalidatesTags: ['Tasks'],
        }),
        createTask: builder.mutation<CreateTaskPayload, VenueShortCode & { data: Record<string, string> }>({
            query: ({ venue_short_code, data }) => ({
                url: getCommonUrl({
                    queryString: '/tasks',
                    params: staffAdminAppkeyParam,
                    query: `&venue_short_code=${venue_short_code}`,
                }),
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Tasks'],
        }),
        updateTask: builder.mutation<
            CreateTaskPayload,
            VenueShortCode & { data: CreateTaskPayload; id: string }
        >({
            query: ({ venue_short_code, data, id }) => ({
                url: getCommonUrl({
                    queryString: `/tasks/${id}`,
                    query: `&venue_short_code=${venue_short_code}`,
                    params: staffAdminAppkeyParam,
                }),
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Tasks'],
        }),
    }),
})

export const {
    useGetTasksListQuery,
    useGetTasksStatusListQuery,
    useDeleteTaskMutation,
    useCreateTaskMutation,
    useUpdateTaskMutation,
} = tasksApi
