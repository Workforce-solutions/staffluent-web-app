import { HeaderProps } from '@/@types/common'
import { clientLinks } from '@/data/client-links'
import { operationsManagersLinks } from '@/data/operations-managers-links'
import { teamLeaderLinks } from '@/data/team-leader-links'
import { sidelinks } from '@/data/sidelinks'
import { AccountType } from '@/pages/auth/components/user-auth-form'
type GroupAccountType =  'business' | 'admin' | 'teamLeader' | 'client' | 'operationsManager'

const STAFFLUENT_API_KEY =
  'sk_2462670fcf9d668a3ce8e98d5845b3154ee13aa100e4f00e3103b054e9a0bacf'
const API_KEY = 'gwy_3kjg9KdJ37sdL4hF8Tk2sXnY5LzW8Rv'

export const getPrepareHeaders = ({
  headers,
  apikey = false,
  isRefreshToken,
  isClientApiKey,
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
  if (isClientApiKey) {
    headers.set('client-x-api-key', STAFFLUENT_API_KEY)
    headers.set('x-api-key', API_KEY)
  }
  return headers
}

export const OMNISTACK_BASE_URL = 'https://apigtw.omnistackhub.xyz/'

export const supabaseUrl = 'https://unzkbvyeaefcpooqeenz.supabase.co'
export const vbUrl = 'https://core.venueboost.io/api/v1/'
// export const vbUrl = 'http://192.168.1.4:8000/api/v1/'
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
  | 'completed'
  | 'info'
  | null
  | undefined => {
  const statusLowerCase = status.toLowerCase()

  if (statusLowerCase.includes('active')) {
    return 'success'
  } else if (statusLowerCase.includes('pending')) {
    return 'warning'
  } else if (statusLowerCase.includes('scheduled')) {
    return 'secondary'
  } else if (statusLowerCase.includes('progress')) {
    return 'info'
  } else if (statusLowerCase.includes('completed')) {
    return 'success'
  } else if (statusLowerCase.includes('cancelled')) {
    return 'destructive'
  } else if (statusLowerCase.includes('open')) {
    return 'outline'
  } else if (statusLowerCase.includes('closed')) {
    return 'destructive'
  } else {
    return 'default'
  }
}

export const statusColorMap: Record<string, string> = {
  in_progress: 'bg-green-500',
  completed: 'bg-green-500',
  on_hold: 'bg-yellow-500',
  planning: 'bg-purple-500',
  cancelled: 'bg-red-500',
}

export const getAccountGroup = (accountType: AccountType): GroupAccountType => {
  switch (accountType) {
    // Group 1: Admin and Operations Managers
    case AccountType.business_admin:
    case AccountType.business:
   
      return 'admin'

    // Group 2: Team Leaders
    case AccountType.business_team_leader:
    case AccountType.staff_team_leader:
    case AccountType.team_leader:
      return 'teamLeader'

      // Group 2: Team Leaders
    
    case AccountType.business_operations_managers:
    case AccountType.staff_operations_manager:
    case AccountType.operations_manager:
    case AccountType.business_operations_manager:
        return 'admin'

    // Group 3: Clients
    case AccountType.app_client:
    case AccountType.client:
      return 'client'

    default:
      return 'admin'
  }
}

export const getSidebarLinks = (accountType: AccountType) => {
  const group = getAccountGroup(accountType)

  switch (group) {
    case 'admin':
      return sidelinks
    case 'business':
        return sidelinks
    case 'operationsManager':
        return operationsManagersLinks
    case 'teamLeader':
      return teamLeaderLinks
    case 'client':
      return clientLinks
    default:
      return []
  }
}

export const getSidebarText = (accountType: AccountType) => {
  const group = getAccountGroup(accountType)

  switch (group) {
    case 'admin':
      return 'Admin'
    case 'business':
      return 'Admin'
    case 'operationsManager':
      return 'Operations Manager'
    case 'teamLeader':
      return 'Team Leader'
    case 'client':
      return 'Client Portal'
    default:
      return ''
  }
}

export const getRedirectPath = (accountType: AccountType) => {
  const group = getAccountGroup(accountType)

  switch (group) {
    case 'admin':
      return '/dashboard'
    case 'operationsManager':
      return '/operations-manager/dashboard'
    case 'teamLeader':
      return '/team-leader/dashboard'
    case 'client':
      return '/client-portal/dashboard'
    default:
      return '/'
  }
}
