import { SideLink } from '@/data/sidelinks'
import { AccountType } from '@/pages/auth/components/user-auth-form'

export interface LoginData {
  email: string
  supabase_id: string
}

export interface LoginProps {
  email: string
  password: string
}

export interface RefreshProps {
  venue_short_code: string
}

export interface CheckConnectionProps {}

interface User {
  id: number
  name: string
  email: string
  emoployee: {
    id: number
    name: string
    email: string
    company_email: string | null
    personal_email: string | null
    personal_phone: string | null
    company_phone: string | null
    status: string
    role_id: number
    manager_id: string | null
    owner_id: string | null
    user_id: number
    hire_date: string | null
    restaurant_id: number
    salary: string
    salary_frequency: string
    frequency_number: string | null
    frequency_unit: string | null
    created_at: string | null
    updated_at: string | null
    custom_role: string | null
    department_id: string | null
    address_id: string | null
    profile_picture: string | null
    deleted_at: string | null
  }
  postal_code?: string
  notes?: string
  address?: string
  phone?: string
}

export interface AuthProps {
  data: {
    user: User
  }
  user?: User
  venue: {
    id: number
    name: string
    short_code: string
  }
  account_type: AccountType
  supabase_id: string
  token: string
  access_token: string
  refresh_token: string
  expires_at: number
  expires_in: number
  auth_response?: AuthResponse
  userId: string
  sidebarLinks: SideLink[]
}

export interface Role {
  id: number
  name: string
  description: string
  role_type: string
}

export interface RolesResponse {
  attached_roles: Role[]
  available_roles: Role[]
}

export interface LocalStorageProps<T> {
  key: string
  defaultValue: T
}

export interface DataAuthProps {
  data: AuthProps
}

export interface AuthResponse {
  account_type: AccountType
  supabase_id: string
  token: string
  access_token: string
  refresh_token: string
  expires_at: number
  expires_in: number
}
