import { EmployeeResponse } from "./staff"

// types/site-management.ts
export interface SiteLocation {
    lat: number
    lng: number
}

export interface SiteManager {
    id: number
    name: string
    email: string
    phone: string
    role: string
}

export interface SiteEquipment {
    id: number
    name: string
    status: 'operational' | 'maintenance' | 'offline'
    lastMaintenance: string
    nextMaintenance: string
}

export interface Site {
    id: number
    name: string
    status: 'active' | 'maintenance' | 'inactive'
    type: 'construction' | 'maintenance' | 'renovation'
    address: SiteAddress
    location: SiteLocation
    site_manager: string;
    site_manager_email: string;
    site_manager_phone: string;
    start_date: string
    end_date: string
    progress: number
    no_of_workers: number
    safety_score: number
    equipment: SiteEquipment[]
    lastIncident: string
    currentPhase: string
}

export interface SiteAddress {
    address: string;
    latitude: number;
    longitude: number;
}

export interface SiteResponse {
    data: Site[]
    total_workers: number
    active_sites: number
    projects_count: number
    pagination: {
        total: number
        page: number
        limit: number
    }
}

export interface SiteDetailResponse {
    data: Site
}

export interface EquipmentResponse {
    data: Equipment[]
    active_equipment: number
    total_purchase_cost: number
    pagination: {
        total: number
        page: number
        limit: number
    }
} 

export interface Equipment {
    id: number
    name: string
    type: string
    model: string
    serial_number: string
    purchase_date: string
    purchase_cost: number
    healthScore: number
    utilization: number
    location: string
    assignedTo: string
    status: 'available' | 'maintenance' | 'offline'
    last_maintenance_date: string
    next_maintenance_due: string
    maintenance_interval_days: number
}   
export interface IssueResponse {
    data: Issue[]
    open_issues: number
    resolved_issues: number
    pagination: {
        total: number
        page: number
        limit: number
    }
}

export interface Issue {
    id: number
    title: string
    description: string
    location: string
    priority: 'low' | 'medium' | 'high' | 'critical'
    status: 'open' | 'in_progress' | 'resolved'
    assigned_to: string
    image: string
    created_at: string
    updated_at: string
}

export interface RequirementResponse {
    data: Requirement[]
    pagination: {
        total: number
        page: number
        limit: number
    }
}

export interface Requirement {
    id: number
    title: string
    description: string
    type: string
    status: string
    last_check_date: string
    assigned_to: string
    assigned: EmployeeResponse
}

export interface NoticeResponse {
    data: Notice[]
    pagination: {
        total: number
        page: number
        limit: number
    }
}
export interface Notice {
    id: number
    title: string
    description: string
    type: string
    attachment: string
    created_at: string
    updated_at: string
}

export interface ChecklistResponse {
    data: Checklist[]
    pagination: {
        total: number
        page: number
        limit: number
    }
}

export interface Checklist {
    id: number
    title: string
    assigned_to: string
    due_date: string
    progress: number
    completed_items: number
    total_items: number
    items: ChecklistItem[]
    assigned: EmployeeResponse
}

export interface ChecklistItem {
    id: number
    title: string
    is_completed: number
}

// Dummy data
export const sitesData: Site[] = [
    {
        id: 1,
        name: "Downtown Plaza Project",
        status: "active",
        type: "construction",
        address: {
            address: "123 Main St, Downtown",
            latitude: 40.7128,
            longitude: -74.0060
        },
        location: { lat: 40.7128, lng: -74.0060 },
        site_manager: "John Builder",
        site_manager_email: "john@example.com",
        site_manager_phone: "(555) 123-4567",
        start_date: "2024-01-15",
        end_date: "2024-12-31",
        progress: 35,
        no_of_workers: 45,
        equipment: [
            {
                id: 1,
                name: "Crane A1",
                status: "operational",
                lastMaintenance: "2024-02-15",
                nextMaintenance: "2024-03-15"
            },
            {
                id: 2,
                name: "Excavator B2",
                status: "maintenance",
                lastMaintenance: "2024-02-20",
                nextMaintenance: "2024-03-20"
            }
        ],
        safety_score: 95,
        lastIncident: "None reported",
        currentPhase: "Foundation Work"
    },
    {
        id: 2,
        name: "Riverside Complex",
        status: "maintenance",
        type: "renovation",
        address: {
            address: "456 River Road",
            latitude: 40.7549,
            longitude: -73.9840
        },
        location: { lat: 40.7549, lng: -73.9840 },
        site_manager: "Sarah Manager",
        site_manager_email: "sarah@example.com",
        site_manager_phone: "(555) 987-6543",
        start_date: "2024-02-01",
        end_date: "2024-08-30",
        progress: 65,
        no_of_workers: 30,
        equipment: [
            {
                id: 3,
                name: "Lift Platform C3",
                status: "operational",
                lastMaintenance: "2024-02-10",
                nextMaintenance: "2024-03-10"
            }
        ],
        safety_score: 88,
        lastIncident: "2024-02-01",
        currentPhase: "Interior Renovation"
    },
    {
        id: 3,
        name: "Tech Park Development",
        status: "active",
        type: "construction",
        address: {
            address: "789 Innovation Way",
            latitude: 40.7829,
            longitude: -73.9654
        },
        location: { lat: 40.7829, lng: -73.9654 },
        site_manager: "Mike Constructor",
        site_manager_email: "mike@example.com",
        site_manager_phone: "(555) 456-7890",
        start_date: "2024-01-01",
        end_date: "2025-01-01",
        progress: 15,
        no_of_workers: 60,
        equipment: [
            {
                id: 4,
                name: "Bulldozer D4",
                status: "operational",
                lastMaintenance: "2024-02-18",
                nextMaintenance: "2024-03-18"
            },
            {
                id: 5,
                name: "Crane B5",
                status: "offline",
                lastMaintenance: "2024-02-01",
                nextMaintenance: "2024-03-01"
            }
        ],
        safety_score: 92,
        lastIncident: "2024-01-15",
        currentPhase: "Ground Clearing"
    }
]