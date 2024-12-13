import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Input } from '@/components/ui/input'
import { Search, Calendar, Clock, Route } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const sampleTasks = [
    {
        id: 1,
        location: "Downtown Site A",
        address: "123 Main St, New York, NY",
        timeWindow: "09:00 AM - 11:00 AM",
        type: "Installation",
        priority: "high",
        coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
        id: 2,
        location: "Midtown Site B",
        address: "456 Park Ave, New York, NY",
        timeWindow: "11:30 AM - 01:30 PM",
        type: "Maintenance",
        priority: "medium",
        coordinates: { lat: 40.7549, lng: -73.9840 }
    },
    {
        id: 3,
        location: "Uptown Site C",
        address: "789 Broadway, New York, NY",
        timeWindow: "02:00 PM - 04:00 PM",
        type: "Inspection",
        priority: "low",
        coordinates: { lat: 40.7829, lng: -73.9654 }
    }
]

const RoutePlanning = () => {
    const [selectedTask, setSelectedTask] = useState(null)
    const [selectedTeam, setSelectedTeam] = useState('')

    const mapCenter = {
        lat: 40.7128,
        lng: -74.0060
    }

    const mapStyles = {
        height: '400px',
        width: '100%'
    }

    return (
        <Layout>
            <Layout.Header className="border-b">
                <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-8 pb-8">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Route Planning</h2>
                        <p className="text-muted-foreground">
                            Optimize service routes and manage field assignments
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <Button variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Route
                        </Button>
                        <Button>
                            <Route className="h-4 w-4 mr-2" />
                            Optimize Routes
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-12">
                    {/* Left Side - Tasks and Filters */}
                    <div className="md:col-span-4 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Filters</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Team" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="team-a">Team Alpha</SelectItem>
                                            <SelectItem value="team-b">Team Beta</SelectItem>
                                            <SelectItem value="team-c">Team Gamma</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search locations..."
                                        className="w-full pl-8"
                                        type="search"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Tasks</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {sampleTasks.map(task => (
                                        <div
                                            key={task.id}
                                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                                // @ts-ignore
                                                selectedTask?.id === task.id
                                                    ? 'border-primary bg-primary/5'
                                                    : 'hover:border-primary/50'
                                            }`}
                                            // @ts-ignore
                                            onClick={() => setSelectedTask(task)}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-medium">{task.location}</h3>
                                                    <p className="text-sm text-muted-foreground">{task.address}</p>
                                                </div>
                                                <Badge
                                                    variant={
                                                        task.priority === 'high' ? 'destructive' :
                                                            task.priority === 'medium' ? 'warning' :
                                                                'secondary'
                                                    }
                                                >
                                                    {task.priority}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Clock className="h-4 w-4 mr-2" />
                                                {task.timeWindow}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Side - Map and Details */}
                    <div className="md:col-span-8 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Route Map</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <LoadScript googleMapsApiKey={'AIzaSyAEe-vcJ-r8w9FQdVEskAozi1v9cWy6YAA'}>
                                    <GoogleMap
                                        mapContainerStyle={mapStyles}
                                        zoom={12}
                                        center={mapCenter}
                                    >
                                        {sampleTasks.map(task => (
                                            <Marker
                                                key={task.id}
                                                position={task.coordinates}
                                                title={task.location}
                                            />
                                        ))}
                                    </GoogleMap>
                                </LoadScript>
                            </CardContent>
                        </Card>

                        {selectedTask && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Task Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm font-medium">Location</p>
                                                {/*// @ts-ignore*/}
                                                <p className="text-sm text-muted-foreground">{selectedTask.location}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Type</p>
                                                {/*// @ts-ignore*/}
                                                <p className="text-sm text-muted-foreground">{selectedTask.type}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Time Window</p>
                                                {/*// @ts-ignore*/}
                                                <p className="text-sm text-muted-foreground">{selectedTask.timeWindow}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Priority</p>
                                                {/*// @ts-ignore*/}
                                                <p className="text-sm text-muted-foreground capitalize">{selectedTask.priority}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Address</p>
                                            {/*// @ts-ignore*/}
                                            <p className="text-sm text-muted-foreground">{selectedTask.address}</p>
                                        </div>
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="outline">View Details</Button>
                                            <Button>Assign Team</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </Layout.Body>

        </Layout>
    )
}

export default RoutePlanning