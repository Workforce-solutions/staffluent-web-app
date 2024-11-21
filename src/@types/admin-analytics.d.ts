export interface DateRange {
  date_from?: string
  date_to?: string
  period?: string
}

export interface ChartDataset {
  label?: string
  data: number[]
  borderColor?: string
  backgroundColor?: string[]
  tension?: number
  borderDash?: number[]
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}

export interface ServiceAnalytics {
  stats: {
    total_services: number
    active_clients: number
    avg_duration: number
    growth_rate: number
  }
  charts: {
    service_usage: ChartData
    category_distribution: ChartData
    revenue_by_service: ChartData
  }
}

interface DataSet {
  label: string
  data: number[]
  backgroundColor: string
  borderColor: string
  tension: number
  fill: boolean
}

interface ClientTypes {
  labels: string[]
  datasets: DataSet[]
}

export interface ClientsChartResponse {
  client_growth: {
    labels: string[]
    datasets: DataSet[]
  }
  client_types: ClientTypes
  quarterly_activity: {
    labels: string[]
    datasets: DataSet[]
  }
}

export interface MonthlyComparison {
  current: string
  previous: number
  change: number
}

export interface ChartStats {
  total_clients: number
  new_clients: number
  churn_rate: number
  retention_rate: number
  monthly_comparison: MonthlyComparison
}

export interface ClientAnalytics {
  stats: ChartStats
  charts: ClientsChartResponse
}

export interface TopService {
  name: string
  revenue: string
  bookings: number
  avg_price: string
  growth: number
}

export interface RevenueAnalytics {
  stats: {
    total_revenue: string
    avg_order_value: number
    revenue_growth: number
    projected_revenue: number
    monthly_comparison: MonthlyComparison
  }
  charts: {
    revenue_trends: ChartData
    revenue_by_category: ChartData
    top_services: TopService[]
  }
}
