// Types
export interface AddressPayload {
  address_line1: string
  city_id: number
  state_id: number
  country_id: number
  postal_code: string
}

interface CommonProps {
  id: number
  name: string
  active: number
  created_at: string
  updated_at: string
}

interface StateProps extends CommonProps {
  country_id: number
}

interface CityProps extends CommonProps {
  name_translations: string | null
  states_id: number
}

interface CountryProps extends CommonProps {
  code: string
  currency: string
  main_language: string
  other_languages: string | null
  entity: string | null
}

export interface AddressResponse {
  id: number
  address_line1: string
  address_line2: string | null
  state: StateProps
  city: CityProps
  postcode: string
  country: CountryProps
  active: number
  created_at: string
  updated_at: string
  is_for_retail: number
  latitude: number | null
  longitude: number | null
  country_id: number
  state_id: number
  city_id: number
}

export interface ClientResponse {
  id: number
  name: string
  type: 'homeowner' | 'company'
  contact_person: string
  email: string
  phone: string
  address_id: number
  venue_id: number
  notes: string
  full_address: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  address?: AddressResponse
}

export type ClientsType = {
  clients: PaginatedResponse<ClientResponse>
}

export interface CreateClientPayload {
  name: string
  type: 'homeowner' | 'company'
  contact_person: string
  email: string
  phone: string
  address: AddressPayload
  notes: string
  short_code: string
}

export interface CreateUser extends CreateClientPayload {
  password?: string
}

export interface UpdateClientPayload {
  id: number
  name: string
  type: 'homeowner' | 'company'
  contact_person: string
  email: string
  phone: string
  address: AddressPayload
  notes: string
  short_code: string
}

export interface UpdateClientModalProps extends OpenModalProps {
  client: ClientResponse | null
}

export type ClientType = 'homeowner' | 'company'

// Project related types
interface ClientProject {
  id: number;
  project_name: string;
  client: string;
  client_id?: number; // Add this field
  start_date: string;
  due_date: string;
  progress: number;
  status: 'Active' | 'Completed' | 'Pending' | 'On Hold';
  contact_person: string;
  type: 'company' | 'individual';
  email?: string;
  phone?: string;
  full_address?: string;
}

export interface ProjectStats {
  active_projects: number
  total_clients: number
  due_this_month: number
  previous_month_active: number
}

// In your types file
export interface ClientProjectsResponse {
  projects: Array<ClientProject & { client_id?: number }>;
  stats: {
    active_projects: number;
    total_clients: number;
    due_this_month: number;
    previous_month_active: number;
  };
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}