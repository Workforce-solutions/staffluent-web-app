import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Wrench,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  PenTool,
  ClipboardList
} from 'lucide-react'

// Types
interface MaintenanceTask {
  id: number
  asset: {
    name: string
    type: string
    location: string
  }
  type: 'preventive' | 'corrective' | 'inspection'
  priority: 'high' | 'medium' | 'low'
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue'
  assignedTo: string
  scheduledDate: string
  estimatedDuration: string
  lastMaintenance: string
  description: string
  checklist: string[]
}

// Demo data
const maintenanceData: MaintenanceTask[] = [
  {
    id: 1,
    asset: {
      name: "Excavator XC-200",
      type: "Heavy Equipment",
      location: "Downtown Plaza Site"
    },
    type: "preventive",
    priority: "high",
    status: "scheduled",
    assignedTo: "Mike Mechanic",
    scheduledDate: "2024-03-15",
    estimatedDuration: "4 hours",
    lastMaintenance: "2024-02-01",
    description: "Routine 500-hour maintenance check",
    checklist: [
      "Oil and filter change",
      "Hydraulic system inspection",
      "Track tension check",
      "Safety systems verification"
    ]
  },
  {
    id: 2,
    asset: {
      name: "Crane RT-300",
      type: "Heavy Equipment",
      location: "Tech Park Site"
    },
    type: "inspection",
    priority: "medium",
    status: "scheduled",
    assignedTo: "Sarah Tech",
    scheduledDate: "2024-03-20",
    estimatedDuration: "2 hours",
    lastMaintenance: "2024-02-10",
    description: "Monthly safety inspection",
    checklist: [
      "Cable inspection",
      "Load test",
      "Control system check",
      "Structural inspection"
    ]
  },
  {
    id: 3,
    asset: {
      name: "Concrete Mixer CM-100",
      type: "Construction Equipment",
      location: "Maintenance Bay"
    },
    type: "corrective",
    priority: "high",
    status: "in-progress",
    assignedTo: "John Repair",
    scheduledDate: "2024-03-10",
    estimatedDuration: "6 hours",
    lastMaintenance: "2024-01-15",
    description: "Drum motor replacement",
    checklist: [
      "Remove old motor",
      "Install new motor",
      "Calibrate rotation speed",
      "Test operation"
    ]
  }
]

const MaintenanceSchedule = () => {
  const MaintenanceCard = ({ task }: { task: MaintenanceTask }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium">{task.asset.name}</h3>
            <p className="text-sm text-muted-foreground">
              {task.asset.type} • {task.asset.location}
            </p>
          </div>
          <Badge variant={
            task.status === 'completed' ? 'success' :
            task.status === 'overdue' ? 'destructive' :
            task.status === 'in-progress' ? 'warning' :
            'secondary'
          }>
            {task.status}
          </Badge>
        </div>

          <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Type</p>
                      <Badge variant="outline" className="capitalize">
                          {task.type}
                      </Badge>
                  </div>
                  <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Priority</p>
                      <Badge variant={
                          task.priority === 'high' ? 'destructive' :
                              task.priority === 'medium' ? 'warning' :
                                  'secondary'
                      }>
                          {task.priority}
                      </Badge>
                  </div>
              </div>

              <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Checklist</p>
                  <div className="space-y-1">
                      {task.checklist.map((item, index) => (
                          <div key={index} className="flex items-center text-sm">
                              <CheckCircle className="h-4 w-4 mr-2 text-muted-foreground"/>
                              <span>{item}</span>
                          </div>
                      ))}
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                      <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground"/>
                          <span>Scheduled: {task.scheduledDate}</span>
                      </div>
                      <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground"/>
                          <span>Duration: {task.estimatedDuration}</span>
                      </div>
                  </div>
                  <div className="space-y-2">
                      <div className="flex items-center">
                          <PenTool className="h-4 w-4 mr-2 text-muted-foreground"/>
                          <span>Last: {task.lastMaintenance}</span>
                      </div>
                      <div className="flex items-center">
                          <ClipboardList className="h-4 w-4 mr-2 text-muted-foreground"/>
                          <span>{task.assignedTo}</span>
                      </div>
                  </div>
              </div>
              <div className="flex justify-between items-center pt-4 mt-4 border-t">
                  <div className="text-sm">
                      <span className="text-muted-foreground">Assigned to: </span>
                      <span>{task.assignedTo}</span>
                  </div>
                  <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button size="sm">Start Task</Button>
                  </div>
              </div>
          </div>
      </CardContent>
    </Card>
  )

    return (
        <Layout>
            <Layout.Header>
                <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-8">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Maintenance Schedule</h2>
                        <p className="text-muted-foreground">
                            Schedule and track equipment maintenance tasks
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            New Task
                        </Button>
                        <Button variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            Calendar View
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Scheduled Tasks</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {maintenanceData.filter(t => t.status === 'scheduled').length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Upcoming maintenance
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {maintenanceData.filter(t => t.status === 'in-progress').length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Tasks being worked on
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">92%</div>
                            <p className="text-xs text-muted-foreground">
                                Last 30 days
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {maintenanceData.filter(t => t.status === 'overdue').length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Require attention
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex space-x-2">
                    <Input
                        placeholder="Search tasks..."
                        className="max-w-sm"
                    />
                    <Button variant="outline">
                        Filter
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {maintenanceData.map(task => (
                        <MaintenanceCard key={task.id} task={task} />
                    ))}
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default MaintenanceSchedule
