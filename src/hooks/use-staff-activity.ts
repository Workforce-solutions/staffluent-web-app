// hooks/use-staff-activity.ts
import { staffApi } from '@/services/staffApi'
import {getCommonUrl} from "./common/common-api-url";
import {staffAdminAppkeyParam} from "./common/common-functions";

const extendedApi = staffApi.injectEndpoints({
    endpoints: (builder) => ({
        getStaffActivity: builder.query<StaffActivity[], { id: number; venue_short_code: string }>({
            query: ({ id, venue_short_code }) => ({
                url: getCommonUrl({
                    queryString: `/activity/${id}/activity`,
                    query: `&venue_short_code=${venue_short_code}`,
                    params: staffAdminAppkeyParam,
                }),
            }),
        }),
    }),
})

export const { useGetStaffActivityQuery } = extendedApi

export interface StaffActivity {
    id: number
    type: string
    employee_id: number
    venue_id: number
    trackable_type: string | null
    trackable_id: number | null
    metadata: Record<string, any>
    created_at: string
}

export const getActivityIcon = (type: string) => {
    switch(type) {
        case 'media-upload': return 'upload'
        case 'media-view': return 'eye'
        case 'timesheet-clock-in': return 'log-in'
        case 'timesheet-clock-out': return 'log-out'
        case 'work-order-create': return 'file-plus'
        case 'issue-create': return 'alert-triangle'
        default: return 'activity'
    }
}

export const getActivityDescription = (activity: StaffActivity): string => {
    const projectName = activity.metadata?.project_name || 'Unknown Project'

    switch(activity.type) {
        case 'media-upload':
            return `Uploaded ${activity.metadata?.media_type} to ${projectName}`
        case 'timesheet-clock-in':
            return `Clocked in to ${projectName}`
        case 'timesheet-clock-out':
            return `Clocked out from ${projectName} after ${activity.metadata?.duration} hours`
        default:
            return activity.metadata?.description || `Performed ${activity.type} action`
    }
}