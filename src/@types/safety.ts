import { EmployeeResponse } from "./staff"

export interface OshaComplianceResponse {
    data: OshaCompliance[]
    total_workers: number
    active_sites: number
    pagination: {
        total: number
        page: number
        limit: number
    }
}

export interface OshaCompliance {
    id: number
    title: string
    category: string
    status: string
    last_inspection_date: string
    next_inspection_date: string
    assigned_to: string
    assigned: EmployeeResponse
    requirements: string[]
    required_actions: string[]
}

export interface AuditReportListResponse {
    data: AuditReport[]
    total_workers: number
    active_sites: number
    pagination: {
        total: number
        page: number
        limit: number
    }
}

export interface AuditReport {
    id: number
    ppe_compliance: string
    fall_protection: string
    key_findings: string
    audited_at: string
    status: string
    audited: EmployeeResponse
    osha_compliance: OshaCompliance
    score: number
}