import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    Calendar,
    Image as ImageIcon,
    MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const siteProgress = [
    {
        id: "SRV-2024-001",
        serviceName: "Barrier Installation Project",
        location: "Main Office - North Wing",
        startDate: "2024-03-01",
        endDate: "2024-03-15",
        status: "in_progress",
        progress: 75,
        currentPhase: "Installation",
        phases: [
            {
                name: "Site Preparation",
                status: "completed",
                date: "2024-03-01",
                photos: ["prep1.jpg", "prep2.jpg"],
                notes: "Site cleared and prepared according to specifications"
            },
            {
                name: "Foundation Work",
                status: "completed",
                date: "2024-03-05",
                photos: ["found1.jpg", "found2.jpg"],
                notes: "Foundation completed with quality check approval"
            },
            {
                name: "Installation",
                status: "in_progress",
                date: "2024-03-10",
                photos: ["inst1.jpg"],
                notes: "Main barrier components being installed"
            },
            {
                name: "Final Inspection",
                status: "pending",
                date: "2024-03-15",
                photos: [],
                notes: "Scheduled for completion"
            }
        ]
    },
    {
        id: "SRV-2024-002",
        serviceName: "Safety System Upgrade",
        location: "Branch Office",
        startDate: "2024-02-15",
        endDate: "2024-03-10",
        status: "completed",
        progress: 100,
        currentPhase: "Completed",
        phases: [
            {
                name: "System Assessment",
                status: "completed",
                date: "2024-02-15",
                photos: ["assess1.jpg"],
                notes: "Initial assessment and planning completed"
            },
            {
                name: "Upgrade Implementation",
                status: "completed",
                date: "2024-03-01",
                photos: ["upgrade1.jpg", "upgrade2.jpg"],
                notes: "System upgrades installed successfully"
            },
            {
                name: "Testing",
                status: "completed",
                date: "2024-03-05",
                photos: ["test1.jpg"],
                notes: "All systems tested and verified"
            },
            {
                name: "Final Sign-off",
                status: "completed",
                date: "2024-03-10",
                photos: ["final1.jpg"],
                notes: "Project completed and signed off"
            }
        ]
    }
]

export default function SiteProgress() {
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
                        <h2 className="text-2xl font-bold tracking-tight">Site Progress Tracking</h2>
                        <p className="text-muted-foreground">
                            Monitor service progress and view documentation
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Select site" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Sites</SelectItem>
                                <SelectItem value="main">Main Office</SelectItem>
                                <SelectItem value="branch">Branch Office</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Project Overview Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                    {siteProgress.map((project) => (
                        <Card key={project.id}>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-medium">{project.serviceName}</h3>
                                                <Badge variant="outline">{project.id}</Badge>
                                            </div>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm text-muted-foreground">{project.location}</span>
                                            </div>
                                        </div>
                                        <Badge
                                            variant={
                                                project.status === 'completed' ? 'success' :
                                                    project.status === 'in_progress' ? 'warning' :
                                                        'secondary'
                                            }
                                        >
                                            {project.status.replace('_', ' ')}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Overall Progress</span>
                                            <span>{project.progress}%</span>
                                        </div>
                                        <Progress value={project.progress} className="h-2" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-muted-foreground">Start Date:</span>
                                            <span className="ml-2">{project.startDate}</span>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">End Date:</span>
                                            <span className="ml-2">{project.endDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Detailed Progress */}
                {siteProgress.map((project) => (
                    <Card key={project.id}>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>{project.serviceName} - Progress Details</CardTitle>
                                <Badge variant="outline">{project.currentPhase}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {project.phases.map((phase, index) => (
                                    <div key={index} className="relative">
                                        {index !== project.phases.length - 1 && (
                                            <div className="absolute left-2.5 top-10 h-full w-px bg-border" />
                                        )}
                                        <div className="flex gap-6">
                                            <div className={`mt-2 h-5 w-5 rounded-full border-2 ${
                                                phase.status === 'completed' ? 'bg-green-500 border-green-500' :
                                                    phase.status === 'in_progress' ? 'bg-yellow-500 border-yellow-500' :
                                                        'bg-secondary border-muted-foreground'
                                            }`} />
                                            <div className="flex-1 space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-medium">{phase.name}</h4>
                                                        <p className="text-sm text-muted-foreground">{phase.notes}</p>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        <span className="text-sm">{phase.date}</span>
                                                    </div>
                                                </div>

                                                {phase.photos.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {/*// @ts-ignore*/}
                                                        {phase.photos.map((photo, photoIndex) => (
                                                            <Button key={photoIndex} variant="outline" size="sm">
                                                                <ImageIcon className="h-4 w-4 mr-2" />
                                                                View Photo
                                                            </Button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </Layout.Body>

        </Layout>
    )
}