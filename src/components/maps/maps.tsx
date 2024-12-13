import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Users, Clock } from 'lucide-react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { GoogleMap, LoadScript, Marker, Polygon } from '@react-google-maps/api'
import { useState } from 'react'

// Types
interface TeamMember {
    id: number
    name: string
    role: string
}

interface TeamLocation {
    id: number
    name: string
    status: 'active' | 'en_route' | 'on_break'
    location: string
    currentTask: string
    members: TeamMember[]
    coordinates: { lat: number; lng: number }
    lastUpdate: string
}

interface ServiceArea {
    id: number
    name: string
    coverage: string
    activeTeams: number
    activeJobs: number
    statistics: {
        responseTime: string
        completionRate: string
        clientSatisfaction: string
    }
    boundaries: Array<{ lat: number; lng: number }>
}

// Demo Data
export const teamLocationsData: TeamLocation[] = [
    {
        id: 1,
        name: "Team Alpha",
        status: "active",
        location: "Downtown Zone",
        currentTask: "Emergency Repair",
        members: [
            { id: 1, name: "John Doe", role: "Lead" },
            { id: 2, name: "Jane Smith", role: "Technician" }
        ],
        coordinates: { lat: 40.7128, lng: -74.0060 },
        lastUpdate: "2 mins ago"
    },
    {
        id: 2,
        name: "Team Beta",
        status: "en_route",
        location: "Midtown Area",
        currentTask: "Scheduled Maintenance",
        members: [
            { id: 3, name: "Mike Johnson", role: "Lead" },
            { id: 4, name: "Sarah Wilson", role: "Assistant" }
        ],
        coordinates: { lat: 40.7549, lng: -73.9840 },
        lastUpdate: "5 mins ago"
    },
    {
        id: 3,
        name: "Team Gamma",
        status: "on_break",
        location: "Uptown District",
        currentTask: "Break Time",
        members: [
            { id: 5, name: "Bob Brown", role: "Lead" },
            { id: 6, name: "Alice Green", role: "Specialist" }
        ],
        coordinates: { lat: 40.7829, lng: -73.9654 },
        lastUpdate: "1 min ago"
    }
]

export const serviceAreasData: ServiceArea[] = [
    {
        id: 1,
        name: "Downtown Zone",
        coverage: "Full Coverage",
        activeTeams: 2,
        activeJobs: 5,
        statistics: {
            responseTime: "15 mins",
            completionRate: "95%",
            clientSatisfaction: "4.8/5"
        },
        boundaries: [
            { lat: 40.7128, lng: -74.0060 },
            { lat: 40.7139, lng: -74.0070 },
            { lat: 40.7150, lng: -74.0080 }
        ]
    },
    {
        id: 2,
        name: "Midtown Area",
        coverage: "Partial Coverage",
        activeTeams: 1,
        activeJobs: 3,
        statistics: {
            responseTime: "22 mins",
            completionRate: "88%",
            clientSatisfaction: "4.5/5"
        },
        boundaries: [
            { lat: 40.7549, lng: -73.9840 },
            { lat: 40.7560, lng: -73.9850 },
            { lat: 40.7570, lng: -73.9860 }
        ]
    },
    {
        id: 3,
        name: "Uptown District",
        coverage: "Limited Coverage",
        activeTeams: 1,
        activeJobs: 2,
        statistics: {
            responseTime: "30 mins",
            completionRate: "82%",
            clientSatisfaction: "4.2/5"
        },
        boundaries: [
            { lat: 40.7829, lng: -73.9654 },
            { lat: 40.7840, lng: -73.9664 },
            { lat: 40.7850, lng: -73.9674 }
        ]
    }
]

// Map Components
export const TeamLocationMap = () => {
    const mapCenter = {
        lat: 40.7128,
        lng: -74.0060
    }

    const mapStyles = {
        height: '400px',
        width: '100%'
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Real-Time Team Locations</CardTitle>
            </CardHeader>
            <CardContent>
                <LoadScript googleMapsApiKey={'AIzaSyAEe-vcJ-r8w9FQdVEskAozi1v9cWy6YAA'}>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={13}
                        center={mapCenter}
                    >
                        {teamLocationsData.map(team => (
                            <Marker
                                key={team.id}
                                position={team.coordinates}
                                title={`${team.name} - ${team.currentTask}`}
                            />
                        ))}
                    </GoogleMap>
                </LoadScript>
            </CardContent>
        </Card>
    )
}

export const ServiceAreasMap = () => {
    const mapCenter = {
        lat: 40.7128,
        lng: -74.0060
    }

    const mapStyles = {
        height: '400px',
        width: '100%'
    }

    const getPolygonOptions = (coverage: string) => ({
        fillColor: coverage === 'Full Coverage' ? '#22c55e' :
                  coverage === 'Partial Coverage' ? '#eab308' :
                  '#ef4444',
        fillOpacity: 0.3,
        strokeColor: coverage === 'Full Coverage' ? '#16a34a' :
                    coverage === 'Partial Coverage' ? '#d97706' :
                    '#dc2626',
        strokeWeight: 2
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Service Areas Coverage</CardTitle>
            </CardHeader>
            <CardContent>
                <LoadScript googleMapsApiKey={'AIzaSyAEe-vcJ-r8w9FQdVEskAozi1v9cWy6YAA'}>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={13}
                        center={mapCenter}
                    >
                        {serviceAreasData.map(area => (
                            <Polygon
                                key={area.id}
                                paths={area.boundaries}
                                options={getPolygonOptions(area.coverage)}
                            />
                        ))}
                    </GoogleMap>
                </LoadScript>
            </CardContent>
        </Card>
    )
}

// Card Components
export const TeamLocationCard = ({ team }: { team: TeamLocation }) => {
    return (
        <div className="p-4 border rounded-lg bg-background shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-medium">{team.name}</h3>
                    <p className="text-sm text-muted-foreground">{team.location}</p>
                </div>
                <Badge
                    variant={
                        team.status === 'active' ? 'success' :
                        team.status === 'en_route' ? 'warning' :
                        'secondary'
                    }
                >
                    {team.status === 'active' ? 'Active' :
                     team.status === 'en_route' ? 'En Route' :
                     'On Break'}
                </Badge>
            </div>

            <div className="space-y-2 mt-4">
                <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Current Task: {team.currentTask}</span>
                </div>
                <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{team.members.length} team members</span>
                </div>
                <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Updated {team.lastUpdate}</span>
                </div>
            </div>
        </div>
    )
}

export const ServiceAreaCard = ({ area }: { area: ServiceArea }) => {
    return (
        <div className="p-4 border rounded-lg bg-background shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-medium">{area.name}</h3>
                    <p className="text-sm text-muted-foreground">{area.coverage}</p>
                </div>
                <Badge variant="outline">
                    {area.activeTeams} Active Teams
                </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                    <p className="text-sm font-medium">{area.statistics.responseTime}</p>
                    <p className="text-xs text-muted-foreground">Resp. Time</p>
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium">{area.statistics.completionRate}</p>
                    <p className="text-xs text-muted-foreground">Completion</p>
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium">{area.statistics.clientSatisfaction}</p>
                    <p className="text-xs text-muted-foreground">Satisfaction</p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Jobs:</span>
                    <span className="font-medium">{area.activeJobs}</span>
                </div>
            </div>
        </div>
    )
}

// Coverage Overview Component
export const CoverageOverview = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Coverage Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Total Areas</p>
                                <p className="text-2xl font-bold">{serviceAreasData.length}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Full Coverage</p>
                                <p className="text-2xl font-bold">
                                    {serviceAreasData.filter(a => a.coverage === 'Full Coverage').length}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-muted-foreground">Coverage Status</span>
                                <span className="text-sm font-medium">78%</span>
                            </div>
                            <div className="h-2 rounded-full bg-secondary">
                                <div className="h-2 rounded-full bg-primary" style={{ width: '78%' }} />
                            </div>
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: 'Full Coverage', value: 2, color: '#22c55e' },
                                    { name: 'Partial Coverage', value: 1, color: '#eab308' },
                                    { name: 'Limited Coverage', value: 1, color: '#ef4444' },
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {serviceAreasData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={[
                                            '#22c55e',
                                            '#eab308',
                                            '#ef4444',
                                        ][index % 3]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

// Main Component Export
export const DashboardMap = () => {
    const [activeView, setActiveView] = useState<'teams' | 'areas'>('teams')

    return (
        <div className="space-y-4">
            <div className="flex space-x-2">
                <Button
                    variant={activeView === 'teams' ? 'default' : 'outline'}
                    onClick={() => setActiveView('teams')}
                >
                    <Users className="h-4 w-4 mr-2" />
                    Team Locations
                </Button>
                <Button
                    variant={activeView === 'areas' ? 'default' : 'outline'}
                    onClick={() => setActiveView('areas')}
                >
                    <MapPin className="h-4 w-4 mr-2" />
                    Service Areas
                </Button>
            </div>

            {activeView === 'teams' ? (
                <>
                    <TeamLocationMap />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {teamLocationsData.map(team => (
                            <TeamLocationCard key={team.id} team={team} />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <ServiceAreasMap />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {serviceAreasData.map(area => (
                            <ServiceAreaCard key={area.id} area={area} />
                        ))}
                    </div>
                </>
            )}

            <CoverageOverview />
        </div>
    )
}

export default DashboardMap;