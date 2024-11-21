export interface GetTasksResponse {
  tasks: TasksResponse[]
}

export interface TasksResponse {
  assignee: User
  id: string
  name: string
  priority: string
  status: string
  project: Project
  due_date: string
  notes: string
  assigned_employee_ids: [string]
}
export interface Project {
  id: string
  name: string
}

export interface User {
  id: string
  name: string
  avatar: string
}

export interface CreateTaskPayload {
  project_id: string
  name: string
  description: string
  status: string
  assigned_employee_ids: [string]
  due_date: string
  priority: string
}
