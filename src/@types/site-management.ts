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
    address: string
    location: SiteLocation
    manager: SiteManager
    startDate: string
    endDate: string
    progress: number
    workers: number
    equipment: SiteEquipment[]
    safetyScore: number
    lastIncident: string
    currentPhase: string
}

// Dummy data
export const sitesData: Site[] = [
    {
        id: 1,
        name: "Downtown Plaza Project",
        status: "active",
        type: "construction",
        address: "123 Main St, Downtown",
        location: { lat: 40.7128, lng: -74.0060 },
        manager: {
            id: 1,
            name: "John Builder",
            email: "john@example.com",
            phone: "(555) 123-4567",
            role: "Project Manager"
        },
        startDate: "2024-01-15",
        endDate: "2024-12-31",
        progress: 35,
        workers: 45,
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
        safetyScore: 95,
        lastIncident: "None reported",
        currentPhase: "Foundation Work"
    },
    {
        id: 2,
        name: "Riverside Complex",
        status: "maintenance",
        type: "renovation",
        address: "456 River Road",
        location: { lat: 40.7549, lng: -73.9840 },
        manager: {
            id: 2,
            name: "Sarah Manager",
            email: "sarah@example.com",
            phone: "(555) 987-6543",
            role: "Site Supervisor"
        },
        startDate: "2024-02-01",
        endDate: "2024-08-30",
        progress: 65,
        workers: 30,
        equipment: [
            {
                id: 3,
                name: "Lift Platform C3",
                status: "operational",
                lastMaintenance: "2024-02-10",
                nextMaintenance: "2024-03-10"
            }
        ],
        safetyScore: 88,
        lastIncident: "2024-02-01",
        currentPhase: "Interior Renovation"
    },
    {
        id: 3,
        name: "Tech Park Development",
        status: "active",
        type: "construction",
        address: "789 Innovation Way",
        location: { lat: 40.7829, lng: -73.9654 },
        manager: {
            id: 3,
            name: "Mike Constructor",
            email: "mike@example.com",
            phone: "(555) 456-7890",
            role: "Project Manager"
        },
        startDate: "2024-01-01",
        endDate: "2025-01-01",
        progress: 15,
        workers: 60,
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
        safetyScore: 92,
        lastIncident: "2024-01-15",
        currentPhase: "Ground Clearing"
    }
]