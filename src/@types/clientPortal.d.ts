/* eslint-disable @typescript-eslint/no-explicit-any */
// @/@types/clientPortal.ts
export interface ClientService {
  id: number
  name: string
  description: string
  type: string
  status: string
  nextDate?: string
  decline_reason?: string
  created_at: string
  updated_at: string
  startDate?: string
  nextDate?: string
  progress_updates?: any[]
  activities?: any[]
  feedback?: string
  notes?: string
  price?: {
    type: string
    base_amount: number
    currency: string
  }
  service_info?: {
    id: number
    name: string
    description: string
    type: string
    start_date: string
  }
  current_status?: {
    status: string
    next_scheduled_date: string
    latest_request_id: number
  }
  service_history?: {
    total_completions: number
    first_request_date: string
    latest_completion_date: string
  }
  current_request?: {
    id: number
    reference: string
    status: string
    priority: string
    requested_date: string
    preferred_date: string
    scheduled_date: string
    description: string
    decline_reason: string | null
    progress_updates: Array<{
      id: number
      type: string
      description: string
      date: string
      performed_by: string
    }>
  }
}

interface ServiceWithRequests {
  service_id: number
  service_name: string
  description: string
  type: string
  price: Price
  requests: {
    active: ServiceRequest[]
    pending: ServiceRequest[]
    completed: ServiceRequest[]
    declined: ServiceRequest[]
  }
}

interface Price {
  type: string
  base_amount: string
  currency: string
}

// Add to @/@types/clientPortal.ts
interface ServiceDetails {
  service_info: {
    id: number
    name: string
    description: string
    type: string
    start_date: string
    price: {
      type: string
      base_amount: number
      currency: string
    }
  }
  current_status: {
    status: string
    next_scheduled_date: string | null
    latest_request_id: number | null
  }
  service_history: {
    total_completions: number
    first_request_date: string | null
    latest_completion_date: string | null
  }
  current_request: {
    id: number
    reference: string
    status: string
    priority: string
    requested_date: string
    preferred_date: string
    scheduled_date: string | null
    description: string
    decline_reason: string | null
    progress_updates: Array<{
      id: number
      type: string
      description: string
      date: string
      performed_by: string
    }>
  } | null
}

interface ServiceRequest {
  id: number
  reference: string
  status: string
  priority: string
  requested_date: string
  scheduled_date: string | null
  description: string
  progress_updates: Array<{
    id: number
    type: string
    description: string
    date: string
    performed_by: string
  }>
  preferred_date?: string
}

export interface ServiceRequestStats {
  pending: {
    count: number
    label: string
  }
  scheduled: {
    count: number
    label: string
  }
  completed: {
    count: number
    label: string
  }
  canceled: {
    count: number
    label: string
  }
}
export interface AvailableService {
  id: number
  name: string
  description: string
  price_type: string
  base_price: number
  duration: number
  status: 'Active' | 'Inactive'
  category?: {
    id: number
    name: string
  }
}

export interface ServiceRequestForm {
  service_id: number
  preferred_date: string
  description: string
  priority: 'Low' | 'Normal' | 'High' | 'Urgent'
}

export interface SupportTicket {}
