import { StatusEnum } from '@/pages/services/service-requests'
import {
  OpenModalProps,
  PaginatedResponse,
  PaginationProps,
  VenueShortCode,
} from './common'

export interface StatsProps {
  new_requests: number
  in_progress: number
  completed_today: number
  avg_response_time: string
}

export interface RecentActivities {
  description: string
  time_ago: string
}

export interface ServiceRequestsProps {
  id: number
  reference: string
  client: string
  service: string
  requested_date: string
  scheduled_date: string | null
  status: StatusEnum
  priority: string
}

export interface ServiceRequestsResponse {
  recent_activities: RecentActivities[]
  requests: PaginatedResponse<ServiceRequestsProps>
  stats: StatsProps
}

export interface ServiceRequestsParams extends PaginationProps, VenueShortCode {
  status?: string
}

// Services

export interface ServiceProps {
  id: number
  venue_id: number
  category_id: number
  name: string
  price_type: string
  base_price: string
  duration: number
  description: string
  status: string
  created_at: string
  updated_at: string
  deleted_at: null
  category: {
    id: number
    venue_id: number
    name: string
    slug: string
    description: string
    created_at: string
    updated_at: string
    deleted_at: string | null
  }
}

export interface ServicesReponse {
  services: PaginatedResponse<ServiceProps>
}

export interface CreateServicePayload {
  name: string
  category_id: number
  price_type: string
  base_price: string
  duration: number
  description: string
  status: string
}

export interface ServiceModalProps extends OpenModalProps {
  service?: ServiceProps
}
