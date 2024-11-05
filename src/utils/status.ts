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
