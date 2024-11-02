import { PaginationProps } from './common'

export interface RolesProps {
  venue_short_code: string
}

export interface CustomRolesProps extends RolesProps, PaginationProps {}

export interface CreateCustomRoleProps extends RolesProps {
  name: string
  description: string
}

export interface DeleteRoleProps {
  id: number
  short_code: string
}

export interface CreateAttachRoleProps extends RolesProps {
  role_id: number
  is_custom: boolean
}
