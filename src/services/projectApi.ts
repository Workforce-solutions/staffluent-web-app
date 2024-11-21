/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PaginatedParams,
  PaginatedResponse,
  VenueShortCode,
} from '@/@types/common'
import {
  AssignEmployeeProps,
  AssignOperationsManagers,
  AssignProjectManager,
  AssignTeam,
  AssignTeamLeaders,
  ConnectProjectWithService,
  CreateProjectPayload,
  GalleryResponse,
  GetProjectsResponse,
  GetProjectsTeamResponse,
  ProjectDetails,
  UnAssignOperationsManager,
  UnAssignTeamLeader,
  UpdateProject,
} from '@/@types/project'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type IdInterface = { id: number | string } & VenueShortCode

export const projectApi = createApi({
  reducerPath: 'projects',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['Projects', 'AppGalleries'],
  endpoints: (builder) => ({
    getProject: builder.query<ProjectDetails, IdInterface>({
      query: ({ venue_short_code, id }) => ({
        url: getCommonUrl({
          queryString: `/projects/${id}`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: (_, __, { id }) => [{ type: 'Projects', id }],
    }),
    getProjectsList: builder.query<GetProjectsResponse, VenueShortCode>({
      query: ({ venue_short_code }) => ({
        url: getCommonUrl({
          queryString: '/projects',
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Projects'],
    }),
    getProjectsTeam: builder.query<
      GetProjectsTeamResponse,
      VenueShortCode & { id: string }
    >({
      query: ({ venue_short_code, id }) => ({
        url: getCommonUrl({
          queryString: `/projects/${id}/team`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
    }),

    getProjectsStatusList: builder.query<any, VenueShortCode>({
      query: ({ venue_short_code }) => ({
        url: getCommonUrl({
          queryString: '/projects/statuses',
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Projects'],
    }),
    deleteProject: builder.mutation<void, IdInterface>({
      query: ({ venue_short_code, id }) => ({
        url: getCommonUrl({
          queryString: `/projects/${id}`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'DELETE',
      }),
      invalidatesTags: ['Projects'],
    }),
    createProject: builder.mutation<
      CreateProjectPayload,
      VenueShortCode & { data: Record<string, string> }
    >({
      query: ({ venue_short_code, data }) => ({
        url: getCommonUrl({
          queryString: '/projects',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${venue_short_code}`,
        }),
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Projects'],
    }),
    updateProject: builder.mutation<CreateProjectPayload, UpdateProject>({
      query: ({ venue_short_code, data, id }) => ({
        url: getCommonUrl({
          queryString: `/projects/${id}`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Projects'],
    }),
    assignEmployee: builder.mutation<void, AssignEmployeeProps>({
      query: ({ venue_short_code, projectId, employeeId }) => ({
        url: getCommonUrl({
          queryString: `/projects/${projectId}/assign-employee`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { employee_id: employeeId },
      }),
      invalidatesTags: ['Projects'],
    }),
    assignTeamLeaders: builder.mutation<void, AssignTeamLeaders>({
      query: ({ venue_short_code, projectId, teamLeaderIds }) => ({
        url: getCommonUrl({
          queryString: `/projects/${projectId}/assign-team-leaders`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { team_leader_ids: teamLeaderIds },
      }),
      invalidatesTags: ['Projects'],
    }),
    assignOperationsManagers: builder.mutation<void, AssignOperationsManagers>({
      query: ({ venue_short_code, projectId, operationsManagerIds }) => ({
        url: getCommonUrl({
          queryString: `/projects/${projectId}/assign-operations-managers`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { operations_manager_ids: operationsManagerIds },
      }),
      invalidatesTags: ['Projects'],
    }),
    assignTeam: builder.mutation<void, AssignTeam>({
      query: ({ venue_short_code, projectId, teamId }) => ({
        url: getCommonUrl({
          queryString: `/projects/${projectId}/assign-team`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { team_id: teamId },
      }),
      invalidatesTags: ['Projects'],
    }),
    assignProjectManager: builder.mutation<void, AssignProjectManager>({
      query: ({ venue_short_code, projectId, employeeId }) => ({
        url: getCommonUrl({
          queryString: `/projects/${projectId}/assign-project-manager`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { employee_id: employeeId },
      }),
      invalidatesTags: ['Projects'],
    }),
    unassignEmployee: builder.mutation<void, AssignProjectManager>({
      query: ({ venue_short_code, projectId, employeeId }) => ({
        url: getCommonUrl({
          queryString: `/projects/${projectId}/unassign-employee`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { employee_id: employeeId },
      }),
      invalidatesTags: ['Projects'],
    }),
    connectProjectWithService: builder.mutation<
      void,
      ConnectProjectWithService
    >({
      query: ({ venue_short_code, project_id, service_id }) => ({
        url: getCommonUrl({
          queryString: `/projects/${project_id}/connect-with-service`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { project_id, service_id },
      }),
      invalidatesTags: ['Projects'],
    }),

    // galleries

    getAppGalleries: builder.query<
      PaginatedResponse<GalleryResponse>,
      IdInterface & PaginatedParams
    >({
      query: ({ venue_short_code, id, page, size }) => ({
        url: getCommonUrl({
          queryString: `/projects/${id}/app-galleries`,
          query: `&venue_short_code=${venue_short_code}&page=${page}&per_page=${size}&type=admin`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['AppGalleries'],
    }),

    uploadAppGalleryItem: builder.mutation<
      void,
      { venue_short_code: string; id: number; formData: FormData }
    >({
      query: ({ venue_short_code, id, formData }) => ({
        url: getCommonUrl({
          queryString: `/projects/${id}/app-galleries`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['AppGalleries'],
    }),

    deleteAppGalleryItem: builder.mutation<void, IdInterface>({
      query: ({ venue_short_code, id }) => ({
        url: getCommonUrl({
          queryString: `/projects/app-galleries/${id}`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'DELETE',
      }),
      invalidatesTags: ['AppGalleries'],
    }),

    // assigned
    unassignTeamLeader: builder.mutation<void, UnAssignTeamLeader>({
      query: ({ venue_short_code, projectId, team_leader_ids }) => ({
        url: getCommonUrl({
          queryString: `/projects/${projectId}/unassign-team-leader`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { team_leader_ids },
      }),
      invalidatesTags: ['Projects'],
    }),

    unassignProjectManager: builder.mutation<void, AssignProjectManager>({
      query: ({ venue_short_code, projectId, employeeId }) => ({
        url: getCommonUrl({
          queryString: `/projects/${projectId}/unassign-project-manager`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { employee_id: employeeId },
      }),
      invalidatesTags: ['Projects'],
    }),

    unassignOperationsManager: builder.mutation<
      void,
      UnAssignOperationsManager
    >({
      query: ({ venue_short_code, projectId, operations_manager_ids }) => ({
        url: getCommonUrl({
          queryString: `/projects/${projectId}/unassign-operations-manager`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
        method: 'POST',
        body: { operations_manager_ids },
      }),
      invalidatesTags: ['Projects'],
    }),

    // ... (keep existing endpoints)
  }),
})

export const {
  useGetProjectQuery,
  useGetProjectsListQuery,
  useGetProjectsStatusListQuery,
  useGetProjectsTeamQuery,
  useDeleteProjectMutation,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useAssignEmployeeMutation,
  useAssignTeamLeadersMutation,
  useAssignOperationsManagersMutation,
  useAssignTeamMutation,
  useAssignProjectManagerMutation,
  useUnassignEmployeeMutation,
  useConnectProjectWithServiceMutation,
  useGetAppGalleriesQuery,
  useUploadAppGalleryItemMutation,
  useDeleteAppGalleryItemMutation,
  useUnassignTeamLeaderMutation,
  useUnassignProjectManagerMutation,
  useUnassignOperationsManagerMutation,
} = projectApi
