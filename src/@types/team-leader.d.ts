export interface TeamLeaderResponse {
    id: number
    name: string
    description: string
    status: string
    rating: number
}

export interface TeamLeaderResponse {
    quality_inspections: Data<QualityInspectionResponse>
}

export interface CreateTeamLeaderResponse {
    id: string
    name: string
    description: string
    start_date: string
    end_date: string
    status: string
    rating: number
    improvement_suggestions: string
}

export interface QualityInspectionResponse {
    id: number
    name: string
    description: string
    status: string
    rating: number
}

export interface QualityInspection {
    id: string
    name: string
    inspection_date: string
    status: string
    rating: number
    improvement_suggestions: string
    // ... other fields
}
