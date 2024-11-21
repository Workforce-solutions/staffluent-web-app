export interface Service {
  id: number
  name: string
  description: string
  status: string
}

export interface Invoice {
  id: number
  number: string
  date: Date
  amount: number
  status: 'paid' | 'pending'
}

export interface Activity {
  id: number
  description: string
  date: Date
  type: string
}
