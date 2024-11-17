import { VenueShortCode } from '@/@types/common'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getCommonUrl} from "../hooks/common/common-api-url";
import {getPrepareHeaders, staffAdminAppkeyParam, vbUrl} from "../hooks/common/common-functions";

export interface AuditLog {
    id: string
    action: string
    user: string
    timestamp: string
    details: string
    severity: 'High' | 'Medium' | 'Low'
    type: 'staff' | 'login'
}

export interface AuditLogResponse {
    logs: AuditLog[]
    summary: {
        total_logs: number
        unique_users: number
        actions_today: number
        critical_events: number
    }
    pagination: {
        current_page: number
        per_page: number
        total: number
        total_pages: number
    }
    filters: {
        actions: string[]
    }
}


export const auditLogsApi = createApi({
    reducerPath: 'auditLogs',
    baseQuery: fetchBaseQuery({
        baseUrl: vbUrl + 'vb-apps/staff/admin',
        prepareHeaders: (headers) => getPrepareHeaders({ headers }),
    }),
    tagTypes: ['AuditLogs'],
    endpoints: (builder) => ({
        getAuditLogs: builder.query<AuditLogResponse, VenueShortCode & {
            page?: number
            search?: string
            action?: string
            date?: string
        }>({
            query: ({ venue_short_code, page = 1, search, action, date }) => ({
                url: getCommonUrl({
                    queryString: '/logs/audit',
                    query: `&venue_short_code=${venue_short_code}&page=${page}&per_page=10${
                        search ? `&search=${search}` : ''
                    }${action ? `&action=${action}` : ''}${
                        date ? `&date=${date}` : ''
                    }`,
                    params: staffAdminAppkeyParam,
                }),
            }),
            transformResponse: (response: any): AuditLogResponse => ({
                ...response,
                logs: Object.values(response.logs),
                pagination: {
                    current_page: Number(response.pagination.current_page),
                    per_page: Number(response.pagination.per_page),
                    total: Number(response.pagination.total),
                    total_pages: Number(response.pagination.total_pages),
                }
            }),
            providesTags: ['AuditLogs'],
        }),
        exportAuditLogs: builder.mutation<Blob, VenueShortCode & {
            format: 'csv'
            search?: string
            action?: string
            date?: string
        }>({
            query: ({ venue_short_code, search, action, date }) => ({
                url: getCommonUrl({
                    queryString: '/logs/audit/export',
                    query: `&venue_short_code=${venue_short_code}${
                        search ? `&search=${search}` : ''
                    }${action ? `&action=${action}` : ''}${
                        date ? `&date=${date}` : ''
                    }`,
                    params: staffAdminAppkeyParam,
                }),
                responseHandler: (response) => response.blob(),
            }),
        }),
    }),
})

export const {
    useGetAuditLogsQuery,
    useExportAuditLogsMutation
} = auditLogsApi