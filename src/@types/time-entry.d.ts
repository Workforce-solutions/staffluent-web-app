import { OpenModalProps } from './common'
import { Assigned_employees, ProjectTask } from './project'

export interface TimeEntry {
  id: number
  project_id: number
  employee_id: number
  task_id?: number
  start_time: string
  end_time: string
  duration: number
  description?: string
  is_manually_entered: boolean
}

export interface CreateTimeEntryPayload {
  project_id: number
  employee_id: number
  task_id?: number
  start_time: string
  end_time: string
  description?: string
  is_manually_entered: boolean
  duration: number
}

export interface CreateTimeEntryProps extends OpenModalProps {
  tasks: ProjectTask[]
  project_id: number
  employees?: Assigned_employees[]
  onSuccess?: () => void
}

export interface EntryFormData {
  employee_id: string
  task_id: string
  start_time: string
  end_time: string
  description: string
}
