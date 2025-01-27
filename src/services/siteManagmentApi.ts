import {
  ChecklistResponse,
  EquipmentAssignmentResponse,
  EquipmentResponse,
  IssueResponse,
  NoticeResponse,
  RequirementResponse,
  SiteDetailResponse,
  SiteResponse,
} from '@/@types/site-management'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const siteManagementApi = createApi({
  reducerPath: 'siteManagement',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['Sites', 'Equipment', 'Issues', 'Requirements', 'Notices', 'Checklists', 'EquipmentAssignment'],
  endpoints: (builder) => ({
    addSite: builder.mutation<void, { shortCode: string; siteData: any }>({
      query: ({ shortCode, siteData }) => ({
        url: getCommonUrl({
          queryString: '/construction-site',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'POST',
        body: siteData,
      }),
      invalidatesTags: ['Sites'],
    }),
    getSites: builder.query<SiteResponse, { shortCode: string }>({
      query: ({ shortCode }) => ({
        url: getCommonUrl({
          queryString: '/construction-site',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
      }),
      providesTags: ['Sites'],
    }),
    getSiteDetail: builder.query<
      SiteDetailResponse,
      { shortCode: string; id: number }
    >({
      query: ({ shortCode, id }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
      }),
    }),
    addEquipment: builder.mutation<
      void,
      { shortCode: string; equipmentData: any }
    >({
      query: ({ shortCode, equipmentData }) => ({
        url: getCommonUrl({
          queryString: '/equipment',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'POST',
        body: equipmentData,
      }),
      invalidatesTags: ['Equipment'],
    }),
    getEquipment: builder.query<
      EquipmentResponse,
      { shortCode: string; search: string; page: number; perPage: number }
    >({
      query: ({ shortCode, search = '', page = 1, perPage = 20 }) => ({
        url: getCommonUrl({
          queryString: '/equipment',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}&search=${search}&page=${page}&per_page=${perPage}`,
        }),
      }),
      providesTags: ['Equipment'],
    }),
    updateEquipment: builder.mutation<
      void,
      { shortCode: string; equipmentData: any; id: number }
    >({
      query: ({ shortCode, equipmentData, id }) => ({
        url: getCommonUrl({
          queryString: `/equipment/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'PUT',
        body: equipmentData,
      }),
      invalidatesTags: ['Equipment'],
    }),
    getIssues: builder.query<
      IssueResponse,
      {
        shortCode: string
        siteId: number
        search: string
        page: number
        perPage: number
      }
    >({
      query: ({ shortCode, siteId, search = '', page = 1, perPage = 20 }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/issues/${siteId}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}&site_id=${siteId}&search=${search}&page=${page}&per_page=${perPage}`,
        }),
      }),
      providesTags: ['Issues'],
    }),
    updateIssue: builder.mutation<
      void,
      { shortCode: string; issueData: any; id: number }
    >({
      query: ({ shortCode, issueData, id }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/issues/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'PUT',
        body: issueData,
      }),
      invalidatesTags: ['Issues'],
    }),
    deleteIssue: builder.mutation<void, { shortCode: string; id: number }>({
      query: ({ shortCode, id }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/issues/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'DELETE',
      }),
      invalidatesTags: ['Issues'],
    }),
    getRequirements: builder.query<
      RequirementResponse,
      { shortCode: string; siteId: number; page: number; perPage: number }
    >({
      query: ({ shortCode, siteId, page = 1, perPage = 20 }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/requirements/${siteId}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}&page=${page}&per_page=${perPage}`,
        }),
      }),
      providesTags: ['Requirements'],
    }),
    addRequirement: builder.mutation<
      void,
      { shortCode: string; siteId: number; requirementData: any }
    >({
      query: ({ shortCode, siteId, requirementData }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/requirements/${siteId}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'POST',
        body: requirementData,
      }),
      invalidatesTags: ['Requirements'],
    }),
    updateRequirement: builder.mutation<
      void,
      { shortCode: string; requirementData: any; id: number }
    >({
      query: ({ shortCode, requirementData, id }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/requirements/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'PUT',
        body: requirementData,
      }),
      invalidatesTags: ['Requirements'],
    }),
    deleteRequirement: builder.mutation<
      void,
      { shortCode: string; id: number }
    >({
      query: ({ shortCode, id }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/requirements/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'DELETE',
      }),
      invalidatesTags: ['Requirements'],
    }),
    getNotices: builder.query<
      NoticeResponse,
      { shortCode: string; siteId: number; page: number; perPage: number }
    >({
      query: ({ shortCode, siteId, page = 1, perPage = 20 }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/notices/${siteId}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}&page=${page}&per_page=${perPage}`,
        }),
      }),
      providesTags: ['Notices'],
    }),
    addNotice: builder.mutation<
      void,
      { shortCode: string; siteId: number; noticeData: any }
    >({
      query: ({ shortCode, siteId, noticeData }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/notices/${siteId}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'POST',
        body: noticeData,
      }),
      invalidatesTags: ['Notices'],
    }),
    updateNotice: builder.mutation<
      void,
      { shortCode: string; noticeData: any; id: number }
    >({
      query: ({ shortCode, noticeData, id }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/notices/update/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'POST',
        body: noticeData,
      }),
      invalidatesTags: ['Notices'],
    }),
    deleteNotice: builder.mutation<void, { shortCode: string; id: number }>({
      query: ({ shortCode, id }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/notices/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'DELETE',
      }),
      invalidatesTags: ['Notices'],
    }),
    getChecklists: builder.query<ChecklistResponse, { shortCode: string; siteId: number; page: number; perPage: number }>({
      query: ({ shortCode, siteId, page = 1, perPage = 20 }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/checklists/${siteId}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}&page=${page}&per_page=${perPage}`,
        }),
      }),
      providesTags: ['Checklists'],
    }),
    addChecklist: builder.mutation<void, { shortCode: string; siteId: number; checklistData: any }>({
      query: ({ shortCode, siteId, checklistData }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/checklists/${siteId}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'POST',
        body: checklistData,
      }),
      invalidatesTags: ['Checklists'],  
    }),
    updateChecklist: builder.mutation<void, { shortCode: string; checklistData: any; id: number }>({
      query: ({ shortCode, checklistData, id }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/checklists/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'PUT',
        body: checklistData,
      }),
      invalidatesTags: ['Checklists'],
    }),
    deleteChecklist: builder.mutation<void, { shortCode: string; id: number }>({
      query: ({ shortCode, id }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/checklists/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'DELETE',
      }),
      invalidatesTags: ['Checklists'],
    }),
    markCheckListItemCompleted: builder.mutation<void, { shortCode: string; checklistId: number; itemId: number, data: any }>({
      query: ({ shortCode, checklistId, itemId, data }) => ({
        url: getCommonUrl({
          queryString: `/construction-site/checklist-items/${checklistId}/${itemId}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Checklists'],
    }),
    addEquipmentAssignment: builder.mutation<void, { shortCode: string; equipmentAssignmentData: any }>({
      query: ({ shortCode, equipmentAssignmentData }) => ({
        url: getCommonUrl({
          queryString: '/equipment-assignments',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'POST',
        body: equipmentAssignmentData,
      }),
      invalidatesTags: ['EquipmentAssignment'],
    }),
    getEquipmentAssignment: builder.query<EquipmentAssignmentResponse, { shortCode: string; page: number; perPage: number; search: string }>({
      query: ({ shortCode, page = 1, perPage = 20, search = '' }) => ({
        url: getCommonUrl({
          queryString: '/equipment-assignments',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}&page=${page}&per_page=${perPage}&search=${search}`,
        }),
      }),
    }),
    updateEquipmentAssignment: builder.mutation<void, { shortCode: string; equipmentAssignmentData: any; id: number }>({
      query: ({ shortCode, equipmentAssignmentData, id }) => ({
        url: getCommonUrl({
          queryString: `/equipment-assignments/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${shortCode}`,
        }),
        method: 'PUT',
        body: equipmentAssignmentData,
      }),
      invalidatesTags: ['EquipmentAssignment'],
    }),
  }),
})

export const {
  useAddSiteMutation,
  useGetSitesQuery,
  useGetSiteDetailQuery,
  useAddEquipmentMutation,
  useGetEquipmentQuery,
  useUpdateEquipmentMutation,
  useGetIssuesQuery,
  useUpdateIssueMutation,
  useDeleteIssueMutation,
  useGetRequirementsQuery,
  useAddRequirementMutation,
  useUpdateRequirementMutation,
  useDeleteRequirementMutation,
  useGetNoticesQuery,
  useAddNoticeMutation,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
  useGetChecklistsQuery,
  useAddChecklistMutation,
  useUpdateChecklistMutation,
  useDeleteChecklistMutation,
  useMarkCheckListItemCompletedMutation,
  useAddEquipmentAssignmentMutation,
  useGetEquipmentAssignmentQuery,
  useUpdateEquipmentAssignmentMutation,
} = siteManagementApi
