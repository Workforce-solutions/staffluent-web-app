export interface ShiftResponse {
  id: number
  date: string
  start_time: string
  end_time: string
  status: string
  avatar: string
}

export interface AttendenceResponse {
  id: string
  date: string
  start_time: string
  end_time: string
  status: string
  avatar: string
  icon: JSX.Element
  total_hours: number
  date: string
  punching: string
}
