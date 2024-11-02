import { RolesResponse } from '@/@types/auth'
import { PaginatedParams } from '@/@types/common'
import { RolesProps } from '@/@types/role'
import {
  CreateDepartmentPayload,
  CreateEmployeeProps,
  CreateTeam,
  CreateTeamEmployee,
  CreateTeamLeader,
  CreateTeamOfficeManager,
  DepartmentsType,
  EmployeeResponse,
  IdShortCodeProps,
  TeamByIdProps,
  TeamMemberResponse,
  TeamsResponseType,
  UpdateDepartmentPayload,
  UpdateEmployeeProps,
  UpdateTeam,
} from '@/@types/staff'
import { getCommonUrl } from '@/hooks/common/common-api-url'
import {
  getPrepareHeaders,
  staffAdminAppkeyParam,
  vbUrl,
} from '@/hooks/common/common-functions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const staffApi = createApi({
  reducerPath: 'staff',
  baseQuery: fetchBaseQuery({
    baseUrl: vbUrl + 'vb-apps/staff/admin',
    prepareHeaders: (headers) => getPrepareHeaders({ headers }),
  }),
  tagTypes: ['Employees', 'Departments', 'Teams', 'TeamEmployees', 'Roles'],
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeeResponse[], string>({
      query: (venue_short_code) => ({
        url: getCommonUrl({
          queryString: '/employees',
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Employees'],
    }),

    getDepartments: builder.query<DepartmentsType, PaginatedParams>({
      query: ({ venue_short_code, page, size }) => ({
        url: getCommonUrl({
          queryString: '/departments',
          query: `&venue_short_code=${venue_short_code}&page=${page}&per_page=${size}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Departments'],
    }),

    createDepartment: builder.mutation<void, CreateDepartmentPayload>({
      query: (payload) => ({
        url: getCommonUrl({
          queryString: '/departments',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${payload.short_code}`,
        }),
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Departments'],
    }),

    addEmployee: builder.mutation<void, CreateEmployeeProps>({
      query: ({ short_code, employeeData }) => ({
        url: getCommonUrl({
          queryString: '/employees',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${short_code}`,
        }),
        method: 'POST',
        body: employeeData,
      }),
      invalidatesTags: ['Employees'],
    }),

    updateEmployee: builder.mutation<void, UpdateEmployeeProps>({
      query: ({ id, short_code, employeeData }) => ({
        url: getCommonUrl({
          queryString: `/employees-update/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${short_code}`,
        }),
        method: 'PUT',
        body: employeeData,
      }),
      invalidatesTags: ['Employees'],
    }),

    // Team employee
    getEmployeeById: builder.query<RolesResponse, RolesProps & { id: number }>({
      query: ({ id, venue_short_code }) => ({
        url: getCommonUrl({
          queryString: `/employees/full/${id}`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
    }),

    getTeamEmployees: builder.query<TeamMemberResponse[], IdShortCodeProps>({
      query: ({ venue_short_code, id }) => ({
        url: getCommonUrl({
          queryString: `/teams/${id}/employees`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['TeamEmployees'],
    }),

    getTeamById: builder.query<TeamByIdProps, IdShortCodeProps>({
      query: ({ venue_short_code, id }) => ({
        url: getCommonUrl({
          queryString: `/teams/${id}`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['TeamEmployees'],
    }),

    getDepartmentsByTeam: builder.query<TeamByIdProps, IdShortCodeProps>({
      query: ({ venue_short_code, id }) => ({
        url: getCommonUrl({
          queryString: `/teams/${id}/departments`,
          query: `&venue_short_code=${venue_short_code}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['TeamEmployees'],
    }),

    createTeamEmployee: builder.mutation<void, CreateTeamEmployee>({
      query: ({ short_code, id, employees_ids }) => ({
        url: getCommonUrl({
          queryString: `/teams/${id}/assign-employees`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${short_code}`,
        }),
        method: 'POST',
        body: { employee_ids: employees_ids },
      }),
      invalidatesTags: ['TeamEmployees'],
    }),

    // Operation Manager

    createTeamOfficeManager: builder.mutation<void, CreateTeamOfficeManager>({
      query: ({ short_code, employee_id, team_ids }) => ({
        url: getCommonUrl({
          queryString: 'teams/assign-operations-manager',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${short_code}`,
        }),
        method: 'POST',
        body: { team_ids, employee_id },
      }),
      invalidatesTags: ['TeamEmployees', 'Teams'],
    }),

    updateDepartment: builder.mutation<void, UpdateDepartmentPayload>({
      query: (payload) => ({
        url: getCommonUrl({
          queryString: `/departments/${payload.id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${payload.short_code}`,
        }),
        method: 'PUT',
        body: {
          name: payload.name,
          description: payload.description,
        },
      }),
      invalidatesTags: ['Departments'],
    }),

    deleteDepartment: builder.mutation<
      void,
      { id: number; short_code: string }
    >({
      query: ({ id, short_code }) => ({
        url: getCommonUrl({
          queryString: `/departments/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${short_code}`,
        }),
        method: 'DELETE',
      }),
      invalidatesTags: ['Departments'],
    }),

    getStaffById: builder.query<unknown, number>({
      query: (id) => ({
        url: `/employees/${id}`,
      }),
      providesTags: ['Employees'],
    }),

    deleteEmployee: builder.mutation<number, number>({
      query: (id) => ({
        url: `/employee/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employees'],
    }),

    // Teams
    getTeams: builder.query<TeamsResponseType, PaginatedParams>({
      query: ({ venue_short_code, page, size }) => ({
        url: getCommonUrl({
          queryString: '/teams',
          query: `&venue_short_code=${venue_short_code}&page=${page}&per_page=${size}`,
          params: staffAdminAppkeyParam,
        }),
      }),
      providesTags: ['Teams'],
    }),
    createTeam: builder.mutation<void, CreateTeam>({
      query: (payload) => ({
        url: getCommonUrl({
          queryString: '/teams',
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${payload.short_code}`,
        }),
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Teams'],
    }),
    createTeamLeader: builder.mutation<void, CreateTeamLeader>({
      query: ({ id, employee_id, short_code }) => ({
        url: getCommonUrl({
          queryString: `/teams/${id}/assign-team-leader`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${short_code}`,
        }),
        method: 'POST',
        body: { employee_id },
      }),
      invalidatesTags: ['TeamEmployees'],
    }),
    deleteTeam: builder.mutation<void, { id: number; short_code: string }>({
      query: ({ id, short_code }) => ({
        url: getCommonUrl({
          queryString: `/teams/${id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${short_code}`,
        }),
        method: 'DELETE',
      }),
      invalidatesTags: ['Teams'],
    }),
    updateTeam: builder.mutation<void, UpdateTeam>({
      query: (payload) => ({
        url: getCommonUrl({
          queryString: `/teams/${payload.id}`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${payload.short_code}`,
        }),
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Teams'],
    }),
    removeTeamEmployee: builder.mutation<void, CreateTeamLeader>({
      query: ({ short_code, id, employee_id }) => ({
        url: getCommonUrl({
          queryString: `/teams/${id}/unassign-employee`,
          params: staffAdminAppkeyParam,
          query: `&venue_short_code=${short_code}`,
        }),
        method: 'POST',
        body: { employee_id },
      }),
      invalidatesTags: ['TeamEmployees'],
    }),
  }),
})

export const {
  useGetEmployeesQuery,
  useGetTeamEmployeesQuery,
  useGetDepartmentsQuery,
  useLazyGetDepartmentsQuery,
  useLazyGetEmployeesQuery,
  useGetTeamsQuery,
  useLazyGetTeamsQuery,
  useGetTeamByIdQuery,
  useGetDepartmentsByTeamQuery,
  //
  useGetEmployeeByIdQuery,
  useCreateTeamEmployeeMutation,
  useCreateTeamOfficeManagerMutation,
  useCreateTeamLeaderMutation,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useUpdateEmployeeMutation,
  useDeleteDepartmentMutation,
  useCreateTeamMutation,
  useAddEmployeeMutation,
  useDeleteTeamMutation,
  useUpdateTeamMutation,
  useRemoveTeamEmployeeMutation,
} = staffApi
