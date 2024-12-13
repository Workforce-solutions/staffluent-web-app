import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Users,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  Filter
} from 'lucide-react'

// Types
interface Assignment {
  id: number
  equipment: {
    name: string
    type: string
    status: 'available' | 'assigned' | 'maintenance'
  }
  operator: {
    name: string
    certification: string[]
    experience: string
  } | null
  site: string
  startDate: string
  endDate: string | null
  duration: string
  status: 'active' | 'scheduled' | 'completed'
  notes: string
}

// Demo data
const assignmentData: Assignment[] = [
  {
    id: 1,
    equipment: {
      name: "Excavator XC-200",
      type: "Heavy Equipment",
      status: "assigned"
    },
    operator: {
      name: "John Operator",
      certification: ["Heavy Equipment", "Safety Level 3"],
      experience: "5 years"
    },
    site: "Downtown Plaza Site",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    duration: "2 weeks",
    status: "active",
    notes: "Primary excavation work"
  },
  {
    id: 2,
    equipment: {
      name: "Crane RT-300",
      type: "Heavy Equipment",
      status: "available"
    },
    operator: null,
    site: "Tech Park Site",
    startDate: "2024-03-20",
    endDate: "2024-04-10",
    duration: "3 weeks",
    status: "scheduled",
    notes: "Steel beam installation"
  },
  {
    id: 3,
    equipment: {
      name: "Concrete Mixer CM-100",
      type: "Construction Equipment",
      status: "maintenance"
    },
    operator: null,
    site: "Riverside Complex",
    startDate: "2024-03-05",
    endDate: "2024-03-10",
    duration: "5 days",
    status: "completed",
    notes: "Foundation work"
  }
]

const EquipmentAssignment = () => {
    const AssignmentCard = ({ assignment }: { assignment: Assignment }) => (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-medium">{assignment.equipment.name}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.equipment.type}</p>
                    </div>
                    <Badge variant={
                        assignment.status === 'active' ? 'success' :
                            assignment.status === 'scheduled' ? 'secondary' :
                                'default'
                    }>
                        {assignment.status}
                    </Badge>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Site</p>
                            <p className="text-sm font-medium">{assignment.site}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="text-sm font-medium">{assignment.duration}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Operator</p>
                        {assignment.operator ? (
                            <div className="space-y-1">
                                <p className="text-sm font-medium">{assignment.operator.name}</p>
                                <div className="flex flex-wrap gap-1">
                                    {assignment.operator.certification.map((cert, index) => (
                                        <Badge key={index} variant="outline">
                                            {cert}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-yellow-600 flex items-center">
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                No operator assigned
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>Start: {assignment.startDate}</span>
                            </div>
                            {assignment.endDate && (
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>End: {assignment.endDate}</span>
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <AlertTriangle className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{assignment.notes}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4 mt-4 border-t">
                        <Button variant="outline" size="sm">
                            Edit
                        </Button>
                        {!assignment.operator && (
                            <Button size="sm">
                                Assign Operator
                            </Button>
                        )}
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
            <h2 className="text-2xl font-bold tracking-tight">Equipment Assignment</h2>
            <p className="text-muted-foreground">
              Manage equipment assignments and operators
            </p>
          </div>
          <div className="flex space-x-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Assignment
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {assignmentData.filter(a => a.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently deployed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Operators</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Ready to assign
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                On-time assignments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unassigned Equipment</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {assignmentData.filter(a => !a.operator).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Needs operators
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="Search assignments..."
            className="max-w-sm"
          />
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assignmentData.map(assignment => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default EquipmentAssignment