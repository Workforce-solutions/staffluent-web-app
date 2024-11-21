import { HeaderProps } from '@/@types/common'

export const getPrepareHeaders = ({
  headers,
  apikey = false,
  isRefreshToken,
}: HeaderProps) => {
  const token = localStorage.getItem('adminToken')
  const refreshToken = localStorage.getItem('refreshToken')
  const updatedToken = isRefreshToken ? refreshToken : token

  if ((updatedToken ?? '')?.length > 0) {
    // headers.set('Authorization', `Bearer ${refreshToken ?? token}`)
    headers.set('Authorization', `Bearer ${updatedToken}`)
  }
  if (apikey) {
    headers.set('apikey', supabaseKey)
  }
  return headers
}

export const supabaseUrl = 'https://unzkbvyeaefcpooqeenz.supabase.co'
export const vbUrl = 'https://core.venueboost.io/api/v1/'
export const STRIPE_PUBLIC_KEY =
  'pk_test_51NfR0wK9QDeYHZl0UJfwbBV4pQA720OkzlPCINfIXd1ghM1AHnvGIYdgOyp1s57JgJfg9zllXgROGytlwkwR0PeO00jNXxIIVd'
export const vbParams =
  '?SN_BOOST_CORE_VB_APPS_API_KEY=boost-sn-25011xC0R5-vbapps!'
export const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuemtidnllYWVmY3Bvb3FlZW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4Njg2MDcsImV4cCI6MjA0NDQ0NDYwN30.mTzcMdIuOmwY8CGLc5PvQQywrjQWFQ_x7bJ0a7eY1r8' // Use VITE_ prefix for environment variables in Vite
export const staffAdminAppkeyParam =
  '?SN-BOOST-CORE-ADMIN-API-KEY=boost-sn-23010xC0R3-admin!'
export const staffClientPortalkeyParam =
  '?SN_BOOST_CORE_CLIENT_PORTAL_API_KEY=boost-sn-25011xC0R5-clientportal!'

export const getFirstCharacters = (value = '') => {
  const words = value.split(' ')
  const initials = words
    .filter((item) => isNaN(Number(item.charAt(0))))
    .map((item) => item.charAt(0).toUpperCase())
  return initials.slice(0, 2).join('')
}

export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'bg-green-500 text-white'
    case 'inactive':
      return 'bg-gray-500 text-white'
    case 'on-break':
      return 'bg-yellow-500 text-white'
    case 'on-leave':
      return 'bg-blue-500 text-white'
    case 'suspended':
      return 'bg-red-500 text-white'
    case 'off-duty':
      return 'bg-slate-500 text-white'
    case 'probation':
      return 'bg-orange-500 text-white'
    case 'terminated':
      return 'bg-red-700 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
}

export const getPerformanceColor = (performance: number) => {
  if (performance >= 90) return 'text-green-600'
  if (performance >= 75) return 'text-yellow-600'
  return 'text-red-600'
}

export const addFilter = (
  queryString: string,
  filter: string,
  hasFilter: boolean
) => {
  if (!hasFilter) {
    queryString += `?${filter}`
    hasFilter = true
  } else {
    queryString += `&${filter}`
  }
  return { queryString, hasFilter }
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export const getStatusVariant = (
  status: string
):
  | 'default'
  | 'destructive'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'warning'
  | null
  | undefined => {
  switch (status.toLocaleLowerCase()) {
    case 'active':
      return 'success'
    case 'pending':
      return 'default'
    case 'scheduled':
      return 'secondary'
    case 'inProgres':
      return 'warning'
    case 'completed':
      return 'success'
    case 'cancelled':
      return 'destructive'
    default:
      return 'default'
  }
}

export const statusColorMap: Record<string, string> = {
  in_progress: 'bg-green-500',
  completed: 'bg-blue-500',
  on_hold: 'bg-yellow-500',
  planning: 'bg-purple-500',
  cancelled: 'bg-red-500',
}
