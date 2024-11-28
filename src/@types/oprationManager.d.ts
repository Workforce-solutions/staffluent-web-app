export interface WorkOrderResponse {
    id: number
    name: string
    description: string
    status: string
}

export interface WorkOrdersResponse {
    work_orders: WorkOrderResponse[]
}

export interface CreateWorkOrderResponse {
    id: string
    name: string
    description: string
    start_date: string
    end_date: string
    status: string
}
