import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    CloudRain,
    Wind,
    ThermometerSun,
    Calendar,
    Clock,
    AlertTriangle,
    CalendarClock,
    Building
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Sample data for a specific client's service locations and scheduled services
const clientWeatherAlerts = [
    {
        id: "WA-2024-001",
        serviceId: "SRV-001",
        serviceName: "Weekly Barrier Inspection",
        location: "123 Main St - North Entrance",
        scheduledDate: "2024-03-15",
        scheduledTime: "09:00 AM",
        weatherAlert: {
            type: "Heavy Rain",
            impact: "Potential Delay",
            description: "Heavy rainfall may delay outdoor inspection. Our team will contact you to reschedule if needed.",
            recommendedAction: "No action required. We'll notify you of any schedule changes.",
            icon: <CloudRain className="h-5 w-5" />
        }
    },
    {
        id: "WA-2024-002",
        serviceId: "SRV-002",
        serviceName: "Safety Barrier Installation",
        location: "123 Main St - South Wing",
        scheduledDate: "2024-03-16",
        scheduledTime: "10:30 AM",
        weatherAlert: {
            type: "High Winds",
            impact: "Service Rescheduling Required",
            description: "For safety reasons, installation cannot proceed during high winds. Rescheduling recommended.",
            recommendedAction: "Please select an alternate date through our scheduling system.",
            icon: <Wind className="h-5 w-5" />
        }
    },
    {
        id: "WA-2024-003",
        serviceId: "SRV-003",
        serviceName: "Monthly Maintenance Check",
        location: "456 Branch Office",
        scheduledDate: "2024-03-15",
        scheduledTime: "02:00 PM",
        weatherAlert: {
            type: "Heat Advisory",
            impact: "Modified Schedule",
            description: "Service will proceed with adjusted timing to avoid peak heat hours.",
            recommendedAction: "Service rescheduled to morning hours. Please confirm new time.",
            icon: <ThermometerSun className="h-5 w-5" />
        }
    }
]

export default function WeatherAlerts() {
    return (
        <Layout>
            <Layout.Header className="border-b">
                <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-8 pb-8">
                {/* Header */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Service Weather Alerts</h2>
                        <p className="text-muted-foreground">
                            Weather notifications affecting your scheduled services
                        </p>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">3</span>
                                <span className="text-sm text-muted-foreground">Affected Services</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Building className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">2</span>
                                <span className="text-sm text-muted-foreground">Affected Locations</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <CalendarClock className="h-5 w-5 text-purple-500" />
                                <span className="text-2xl font-bold">2</span>
                                <span className="text-sm text-muted-foreground">Schedule Changes</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Alerts List */}
                <div className="space-y-6">
                    {clientWeatherAlerts.map((alert) => (
                        <Card key={alert.id}>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                                                {alert.weatherAlert.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{alert.serviceName}</h3>
                                                <p className="text-sm text-muted-foreground">{alert.location}</p>
                                            </div>
                                        </div>
                                        <Badge variant="warning">
                                            {alert.weatherAlert.impact}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-2 text-sm">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span>Scheduled: {alert.scheduledDate}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span>Time: {alert.scheduledTime}</span>
                                            </div>
                                            <Badge variant="outline">{alert.serviceId}</Badge>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm font-medium">Weather Alert:</p>
                                                <p className="text-sm text-muted-foreground">{alert.weatherAlert.description}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Recommended Action:</p>
                                                <p className="text-sm text-muted-foreground">{alert.weatherAlert.recommendedAction}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-2 pt-4 border-t">
                                        <Button variant="outline" size="sm">
                                            View Service Details
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Contact Support
                                        </Button>
                                        {alert.weatherAlert.impact === 'Service Rescheduling Required' && (
                                            <Button size="sm">
                                                Reschedule Service
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Layout.Body>

        </Layout>
    )
}