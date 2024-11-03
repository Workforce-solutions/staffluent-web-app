export interface OverviewStats {
  totalStaff: {
    count: number
    change: string
  }
  averageProductivity: {
    percentage: number
    change: string
  }
  tasksCompleted: {
    count: number
    change: string
  }
  activeProjects: {
    count: number
    completed: string
  }
  productivityTrend: {
    dates: string[]
    actual: number[]
    expected: number[]
  }
  taskCompletionStatus: {
    completed: string
    inProgress: string
    notStarted: string
  }
}

export interface Performance {
  name: string
  role: string
  performanceScore: number
  stats: {
    activities: number
    activeDays: number
    completedTasks: number
  }
}

export interface TaskStats {
  departmentCompletion: Array<{
    department: string
    total: number
    completed: number
  }>
  taskStatus: {
    total: number
    completed: string
    in_progress: string
    not_started: string
    cancelled: string
  }
}

export interface ProjectStats {
  statusOverview: Array<{
    name: string
    status: string
    completion: number
  }>
}

export interface DashboardResponse {
  overview: OverviewStats
  performance: Performance[]
  tasks: TaskStats
  projects: ProjectStats
}

export interface DashboardParams {
  time_frame?: 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  venue_short_code: string
}
