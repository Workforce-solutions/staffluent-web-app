import { PaginatedResponse } from './common'

export interface EmployeeResponse {
  id: number
  name: string
  email: string
  status: string
  start_date: string | null
  hire_date: string | null
  custom_role: string | null
  projects_assigned: number
  performance: number
  company_phone: string | null
  company_email: string | null
  profile_picture: string
  role: { id: number
    name: string } | string,
  department: {
    id: number
    name: string
  } | null
  stats: {
    total_tasks: number
    completed_tasks: number
    tasks_on_time: number
    active_projects: number
  }
}

export interface AddEmployeePayload {
  name: string
  role_id: number
  email: string
  hire_date: string
  department_id: number
  personal_email: string
  personal_phone: string
  company_email: string
  company_phone: string
  address: {
    city_id: number
    address_line1: string
    state_id: number
    country_id: number
    postal_code: string
  }
  manager_id: string
  is_custom: number
  employee_password: string
}

export interface CreateEmployeeProps {
  short_code: string
  employeeData: Partial<AddEmployeePayload>
}

export interface UpdateEmployeeProps extends CreateEmployeeProps {
  id: number
}

export interface DepartmentResponse {
  id: number
  name: string
  description: string
  venue_id: number
  created_at: string
  updated_at: string
  stats: {
    employees_count: number
    teams_count: number
    projects_count: number
    cross_teams_count: number
  }
}

export type DepartmentsType = {
  departments: PaginatedResponse<DepartmentResponse>
}

export interface CreateDepartmentPayload {
  name: string
  description: string
  short_code: string
}

export interface UpdateDepartmentPayload extends CreateDepartmentPayload {
  id: number
}

export type TeamsResponseType = PaginatedResponse<TeamsResponse>

export interface CreateTeam {
  name: string
  description: string
  department_id: number
  short_code: string
}

export interface CreateTeamLeader {
  id: number
  employee_id: number
  short_code: string
}

export interface UpdateTeam extends CreateTeam {
  id: number
}

export interface TeamMemberResponse {
  id: number
  name: string
  email: string
  phone: string
  profile_picture: string
  role?: string
  company_phone: string | null
  status: string
  joined_at: string // from pivot table
}

interface DepartmentStats {
  employees_count: number
  teams_count: number
  projects_count: number
  cross_teams_count: number
}


export interface TeamLeaderProps {
  id: number
  name: string
  email: string
  company_email: string
  personal_email: string
  personal_phone: string
  company_phone: string
  status: string
  role_id: number
  manager_id: number
  owner_id: number
  user_id: number
  hire_date: string
  restaurant_id: number
  salary: string
  salary_frequency: string
  frequency_number: number
  custom_role: string
  department_id: number
  address_id: number
}

export interface TeamDepartmentsResponse {
  primary_department: Department
  additional_departments: Department[]
}

interface Department {
  id: number
  name: string
  description: string | null
  created_at: string
  updated_at: string
  venue_id: number
  deleted_at: string | null
  stats: DepartmentStats
}


export interface TeamByIdProps {
  id: number
  name: string
  description: string
  department_id: number
  venue_id: number
  team_leader_id: number
  operations_manager_id: number | null
  created_at: string
  updated_at: string
  department: DepartmentResponse
  employees: EmployeeResponse[]
  team_leader: TeamLeaderProps
  operations_manager: OMObject
}

export interface OMObject {
  name: string,
  email: string

}

export interface TeamsResponse {
  id: number
  name: string
  description: string
  department_id: number
  venue_id: number
  team_leader_id: number | null
  operations_manager_id: number | null
  created_at: string
  updated_at: string
  department: DepartmentResponse
  employees: EmployeeResponse[]
  departments: DepartmentResponse[]
}

export interface IdShortCodeProps {
  id: number
  venue_short_code: string
}

export interface CreateTeamEmployee {
  id: number
  short_code: string
  employees_ids: number[]
}

export interface CreateTeamOfficeManager {
  employee_id: number
  short_code: string
  team_ids: number[]
}
