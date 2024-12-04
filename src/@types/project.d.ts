/* eslint-disable @typescript-eslint/no-explicit-any */
import { VenueShortCode } from './common'

export interface GetProjectsResponse {
  projects: ProjectsResponse[]
}

export interface ProjectsResponse {
  name: string
  description: string
  start_date: string
  end_date: string
  status: string
  department_id: string
  id: string
  team_id: string
  estimated_hours: string
  estimated_budget: string
  project_manager_id: string
  project_type: string
  project_category: string
  client_id: string
  address: Address
  team_leader_ids: [string]
  operations_manager_ids: [string]
  assigned_employees: [Assigned_employees]
  assignee: User
  project: Project
  service_id?: number
}

export interface User {
  id: string
  name: string
  avatar: string
}

export interface Project {
  id: string
  name: string
}

export interface Address {
  address_line1: string
  city_id: string
  state_id: string
  country_id: string
  postal_code: string
}

export interface Assigned_employees {
  end_date: string
  id: string
  name: string
  progress: string
  start_date: string
  status: string
  avatar: string
}

export interface CreateProjectPayload {
  project_id: string
  name: string
  description: string
  status: string
  assigned_employee_ids: [string]
  due_date: string
  priority: string
}

export interface AssignEmployeeProps extends VenueShortCode {
  projectId: number
  employeeId: number
}

export interface UpdateProject extends VenueShortCode {
  data: CreateProjectPayload
  id: number
}

export interface AssignTeamLeaders extends VenueShortCode {
  projectId: number
  teamLeaderIds: number[]
}

export interface AssignOperationsManagers extends VenueShortCode {
  projectId: number
  operationsManagerIds: number[]
}

export interface AssignTeam extends VenueShortCode {
  projectId: number
  teamId: number
}

export interface AssignProjectManager extends VenueShortCode {
  projectId: number
  employeeId: number
}

export interface UnAssignTeamLeader extends VenueShortCode {
  projectId: number
  team_leader_ids: number[]
}

export interface UnAssignOperationsManager extends VenueShortCode {
  projectId: number
  operations_manager_ids: number[]
}

export interface ProjectEmployee {
  id: number
  name: string
  avatar: string
}

export interface TimeEntry {
  id: number
  start_time: string
  end_time: string
  duration: number
  description?: string
  employee: {
    id: number
    name: string
  }
  task?: {
    id: number
    name: string
  }
}

export interface ProjectTask {
  id: number
  name: string
  status: string
  assigned_to?: {
    id: number
    name: string
  }
  time_entries?: TimeEntry[]
  due_date: string
  start_date: string
  is_overdue: boolean,
  description: string
}

export interface ProjectService {
  id: number
  name: string
  quoted_price: number
  final_price: number
  service_details: any
}

export interface ProjectDetails {
  id: number
  name: string
  description: string
  start_date: string
  end_date: string
  status: string
  progress: number
  estimated_hours: number
  worked_hours: number
  estimated_budget: number
  project_type: string
  project_category: string
  project_source: string
  client?: {
    id: number
    name: string
    type: string
    contact_person: string
    email: string
    phone: string
  }
  address?: {
    address_line1: string
    city: string
    state: string
    country: string
    postcode: string
  }
  service?: ProjectService
  department?: {
    id: number
    name: string
  }
  team?: {
    id: number
    name: string
  }
  project_manager?: ProjectEmployee
  team_leaders: ProjectEmployee[]
  operations_managers: ProjectEmployee[]
  assigned_employees: Assigned_employees[]
  tasks: ProjectTask[]
  time_entries: TimeEntry[]
}

export interface ConnectProjectWithService {
  venue_short_code: string
  project_id: number
  service_request_id: number
}

export interface GalleryResponse {
  id: number
  type: 'image' | 'video'
  uploader: {
    id: number
    name: string
    avatar: string
  }
  content: string
}

type TeamMember = {
  id: number
  name: string
  email: string
  phone: string | null
  profile_picture: string
  role: string
  status: 'active' | 'on-break' | 'inactive'
  assigned_at?: string
}
export interface GetProjectsTeamResponse {
  project_manager: TeamMember
  team_leaders: TeamMember[]
  operations_managers: TeamMember[]
  team_members: TeamMember[]
  assigned_team: TeamMember | null
}
