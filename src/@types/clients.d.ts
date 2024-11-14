import { OpenModalProps, PaginatedResponse } from './common'

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

export type UpdateClientPayload = {
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
