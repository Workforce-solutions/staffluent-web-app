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
  services: ServiceProps[]
  total_pages: number | string
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
  total_pages: number | string
}

export interface ServicesReponse {
  requests: PaginatedResponse<ServiceProps>
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

export interface Service {
  id: number
  venue_id: number
  category_id: number
  name: string
  price_type: string
  base_price: number
  duration: number
  description: string
  status: string
  category: {
    id: number
    name: string
  }
  serviceRequests?: ServiceRequest[]
}

export interface ServiceResponse {
  services: Service[]
  total: number
}

export interface ServiceRequestProps {
  id: number
  reference: string
  client_id: number
  venue_id: number
  service_id: number
  app_project_id: number
  status: string
  priority: string
  requested_date: string
  preferred_date: string
  scheduled_date: string
  description: string
  notes: string
  assigned_to: number
  completed_at: string
  cancelled_at: string
  cancellation_reason: string
  client: {
    id: number
    name: string
  }
  service: {
    id: number
    name: string
  }
  assignedStaff: {
    id: number
    name: string
  }
  activities: Array<{
    id: number
    activity_type: string
    description: string
    created_at: string
  }>
  app_project?: {
    id: number
    name: string
    status: string
  }
}

interface ServiceRequestResponse {
  stats: {
    new_requests: number
    in_progress: number
    completed_today: number
    avg_response_time: string
  }
  requests: {
    data: ServiceRequestsProps[]
    current_page: number
    per_page: number
    total: number
    total_pages: number
  }
  recent_activities: {
    description: string
    time_ago: string
  }[]
}
