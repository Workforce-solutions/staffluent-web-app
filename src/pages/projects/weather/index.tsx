import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    Cloud,
    CloudRain,
    Wind,
    Sun,
    ThermometerSun,
    CalendarDays,
    AlertTriangle,
    AlertCircle, Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const sampleSites = [
    {
        id: 1,
        name: "Downtown Project",
        location: "New York, NY",
        currentConditions: {
            temperature: 72,
            windSpeed: 8,
            precipitation: 0,
            forecast: "clear"
        },
        weekForecast: [
            { day: "Mon", temp: 72, condition: "sunny" },
            { day: "Tue", temp: 68, condition: "cloudy" },
            { day: "Wed", temp: 65, condition: "rain" },
            { day: "Thu", temp: 70, condition: "sunny" },
            { day: "Fri", temp: 73, condition: "sunny" }
        ],
        activeAlerts: [
            { type: "wind", message: "High winds expected tomorrow", severity: "warning" },
            { type: "rain", message: "Heavy rain expected Wednesday", severity: "alert" }
        ],
        delayHistory: [
            { date: "2024-03-01", hours: 4, reason: "Heavy Rain" },
            { date: "2024-03-05", hours: 2, reason: "High Winds" }
        ]
    },
    {
        id: 2,
        name: "Midtown Complex",
        location: "New York, NY",
        currentConditions: {
            temperature: 70,
            windSpeed: 5,
            precipitation: 0,
            forecast: "partly_cloudy"
        },
        weekForecast: [
            { day: "Mon", temp: 70, condition: "cloudy" },
            { day: "Tue", temp: 69, condition: "rain" },
            { day: "Wed", temp: 67, condition: "rain" },
            { day: "Thu", temp: 71, condition: "cloudy" },
            { day: "Fri", temp: 72, condition: "sunny" }
        ],
        activeAlerts: [
            { type: "rain", message: "Rain expected Tuesday-Wednesday", severity: "warning" }
        ],
        delayHistory: [
            { date: "2024-02-28", hours: 3, reason: "Heavy Rain" }
        ]
    }
]

const WeatherMonitoring = () => {
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
                        <h2 className="text-2xl font-bold tracking-tight">Weather Monitoring</h2>
                        <p className="text-muted-foreground">
                            Track weather conditions and potential delays across construction sites
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select site" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Sites</SelectItem>
                                <SelectItem value="downtown">Downtown Project</SelectItem>
                                <SelectItem value="midtown">Midtown Complex</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">3</span>
                                <span className="text-sm text-muted-foreground">Active Weather Alerts</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Clock className="h-5 w-5 text-muted-foreground" />
                                <span className="text-2xl font-bold">9h</span>
                                <span className="text-sm text-muted-foreground">Total Delay Hours</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Cloud className="h-5 w-5 text-muted-foreground" />
                                <span className="text-2xl font-bold">2</span>
                                <span className="text-sm text-muted-foreground">Sites With Alerts</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <CalendarDays className="h-5 w-5 text-muted-foreground" />
                                <span className="text-2xl font-bold">5-Day</span>
                                <span className="text-sm text-muted-foreground">Forecast View</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Weather Alert Banner */}
                <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="py-4">
                        <div className="flex items-center space-x-4">
                            <AlertCircle className="h-6 w-6 text-yellow-600" />
                            <div>
                                <h4 className="font-medium text-yellow-800">Weather Advisory</h4>
                                <p className="text-sm text-yellow-700">Heavy rain expected Wednesday may impact construction schedules. Plan accordingly.</p>
                            </div>
                            <Button variant="outline" size="sm" className="ml-auto">
                                View Details
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Site Weather Cards */}
                <div className="grid gap-6">
                    {sampleSites.map((site) => (
                        <Card key={site.id}>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    {/* Site Header */}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-lg">{site.name}</h3>
                                            <p className="text-sm text-muted-foreground">{site.location}</p>
                                        </div>
                                        <Badge variant={site.activeAlerts.length > 0 ? "destructive" : "secondary"}>
                                            {site.activeAlerts.length} Active Alerts
                                        </Badge>
                                    </div>

                                    {/* Current Conditions */}
                                    <div className="grid grid-cols-4 gap-4 border rounded-lg p-4">
                                        <div className="text-center">
                                            <ThermometerSun className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                                            <div className="text-2xl font-bold">{site.currentConditions.temperature}°F</div>
                                            <div className="text-sm text-muted-foreground">Temperature</div>
                                        </div>
                                        <div className="text-center">
                                            <Wind className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                                            <div className="text-2xl font-bold">{site.currentConditions.windSpeed} mph</div>
                                            <div className="text-sm text-muted-foreground">Wind Speed</div>
                                        </div>
                                        <div className="text-center">
                                            <CloudRain className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                                            <div className="text-2xl font-bold">{site.currentConditions.precipitation}%</div>
                                            <div className="text-sm text-muted-foreground">Precipitation</div>
                                        </div>
                                        <div className="text-center">
                                            <Sun className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                                            <div className="text-2xl font-bold capitalize">{site.currentConditions.forecast}</div>
                                            <div className="text-sm text-muted-foreground">Conditions</div>
                                        </div>
                                    </div>

                                    {/* Weekly Forecast */}
                                    <div>
                                        <h4 className="font-medium mb-4">5-Day Forecast</h4>
                                        <div className="grid grid-cols-5 gap-4">
                                            {site.weekForecast.map((day, index) => (
                                                <div key={index} className="text-center">
                                                    <div className="text-sm font-medium">{day.day}</div>
                                                    {day.condition === 'sunny' && <Sun className="h-5 w-5 mx-auto my-2" />}
                                                    {day.condition === 'cloudy' && <Cloud className="h-5 w-5 mx-auto my-2" />}
                                                    {day.condition === 'rain' && <CloudRain className="h-5 w-5 mx-auto my-2" />}
                                                    <div className="text-sm">{day.temp}°F</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Active Alerts */}
                                    {site.activeAlerts.length > 0 && (
                                        <div>
                                            <h4 className="font-medium mb-2">Active Alerts</h4>
                                            <div className="space-y-2">
                                                {site.activeAlerts.map((alert, index) => (
                                                    <div key={index} className="flex items-center space-x-2 text-sm">
                                                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                                        <span>{alert.message}</span>
                                                        <Badge variant={alert.severity === 'alert' ? 'destructive' : 'warning'}>
                                                            {alert.severity}
                                                        </Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Delay History */}
                                    <div className="border-t pt-4">
                                        <h4 className="font-medium mb-2">Recent Delays</h4>
                                        <div className="space-y-2">
                                            {site.delayHistory.map((delay, index) => (
                                                <div key={index} className="flex justify-between items-center text-sm">
                                                    <span>{delay.date}</span>
                                                    <span className="text-muted-foreground">{delay.reason}</span>
                                                    <Badge variant="outline">{delay.hours} hours</Badge>
                                                </div>
                                            ))}
                                        </div>
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

export default WeatherMonitoring