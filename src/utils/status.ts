// utils/status.ts
export type ServiceStatus = 'active' | 'pending' | 'completed' | 'cancelled' | 'on-hold'

export const getStatusVariant = (status: ServiceStatus) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'default'
    case 'pending':
      return 'secondary'
    case 'completed':
      return 'success'
    case 'cancelled':
      return 'destructive'
    case 'on-hold':
      return 'warning'
    default:
      return 'secondary'
  }
}

export const getClientServiceStatusVariant = (status: string) => {
  switch (status) {
    case 'Active':
    case 'Completed':
      return 'success'
    case 'Pending':
      return 'warning'
    case 'Cancelled':
      return 'destructive'
    default:
      return 'default'
  }
}


export const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case 'High':
    case 'Urgent':
      return 'destructive'
    case 'Normal':
      return 'default'
    case 'Low':
      return 'secondary'
    default:
      return 'default'
  }
}
