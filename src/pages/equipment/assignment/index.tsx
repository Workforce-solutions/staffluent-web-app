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
import { useState, useEffect } from 'react'
import { AddEditAssignmentModal } from './add-edit-modal'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetEquipmentAssignmentQuery } from '@/services/siteManagmentApi'
import { EquipmentAssignment } from '@/@types/site-management'

const EquipmentAssignmentList = () => {
  
  const short_code = useShortCode()
  const [openAddEditAssignmentModal, setOpenAddEditAssignmentModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [editEquipmentAssignment, setEditEquipmentAssignment] = useState<EquipmentAssignment | undefined>(undefined)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const { data: equipmentAssignments, refetch: refetchEquipmentAssignments } = useGetEquipmentAssignmentQuery({
    shortCode: short_code,
    page: 1,
    perPage: 100,
    search: debouncedSearchTerm
  })

  const handleEdit = (assignment: EquipmentAssignment) => {
    setEditEquipmentAssignment(assignment)
    setOpenAddEditAssignmentModal(true)
  }

  const AssignmentCard = ({ assignment }: { assignment: EquipmentAssignment }) => (
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
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </Badge>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Site</p>
                            <p className="text-sm font-medium">{assignment.assignable.name}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="text-sm font-medium">
                              {assignment.return_expected_at ? 
                                `${Math.ceil((new Date(assignment.return_expected_at).getTime() - new Date(assignment.assigned_at).getTime()) / (1000 * 60 * 60 * 24))} days` :
                                'No end date set'}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Operator</p>
                        {assignment.assigned_employee ? (
                            <div className="space-y-1">
                                <p className="text-sm font-medium">{assignment.assigned_employee.name}</p>
                                <div className="flex flex-wrap gap-1">
                                    {/* {assignment.assigned.certification.map((cert, index) => (
                                        <Badge key={index} variant="outline">
                                            {cert}
                                        </Badge>
                                    ))} */}
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
                                <span>Start: {new Date(assignment.assigned_at).toLocaleDateString('en-US')}</span>
                            </div>
                            {assignment.return_expected_at && (
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>End: {new Date(assignment.return_expected_at).toLocaleDateString('en-US')}</span>
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
                        <Button variant="outline" size="sm" onClick={() => handleEdit(assignment)}>
                            Edit
                        </Button>
                        {!assignment.assigned_employee && (
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
            <Button onClick={() => {
                setOpenAddEditAssignmentModal(true)
            }}>
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
                {equipmentAssignments?.active_assignments || 0}
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
              <div className="text-2xl font-bold">{equipmentAssignments?.available_operator || 0}</div>
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
                {equipmentAssignments?.unassigned_equipments || 0}
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {equipmentAssignments?.data.map((assignment: EquipmentAssignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      </Layout.Body>
      <AddEditAssignmentModal
        open={openAddEditAssignmentModal}
        initialData={editEquipmentAssignment}
        onOpenChange={(open) => {
          setOpenAddEditAssignmentModal(open);
          if (!open) {
            setEditEquipmentAssignment(undefined);
          }
        }}
        refetchEquipmentAssignments={refetchEquipmentAssignments}
      />
    </Layout>
  )
}

export default EquipmentAssignmentList