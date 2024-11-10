import { Layout } from '@/components/custom/layout'
import { InfoItem } from '@/components/info-item'
import EmptyState from '@/components/table/empty-state'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getInitials, getStatusColor } from '@/hooks/common/common-functions'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetTeamByIdQuery } from '@/services/staffApi'
import { Users, Briefcase, Building2, CalendarDays } from 'lucide-react'
import { useParams } from 'react-router-dom'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Type definitions for better type safety
interface Employee {
    id: number
    name: string
    email: string
    role?: string
    status: string
    hire_date?: string
}

interface TeamLeader {
    name: string
    email: string
}

interface Department {
    name: string
}

interface Team {
    name: string
    department: Department
    description: string
    created_at: string
    team_leader: TeamLeader
    operations_manager: TeamLeader
    employees: Employee[]
}

export default function TeamDetails() {
    const { id } = useParams()
    const short_code = useShortCode()
    const {
        data: team,
        isFetching,
        isError,
    } = useGetTeamByIdQuery(
        { id: Number(id), venue_short_code: short_code },
        {
            skip: !id || isNaN(Number(id)),
        }
    )

    if (isFetching || isError || !team) {
        return <EmptyState isLoading={isFetching} isError={isError} />
    }

    // Safeguard against undefined team data
    const teamData: Team = {
        name: team.name || 'Unnamed Team',
        department: {
            name: team.department?.name || 'Unassigned Department'
        },
        description: team.description || 'No description available',
        created_at: team.created_at || new Date().toISOString(),
        team_leader: {
            name: team.team_leader?.name || 'Unassigned',
            email: team.team_leader?.email || 'No email provided'
        },
        operations_manager: {
            name: team.operations_manager?.name || 'Unassigned',
            email: team.operations_manager?.email || 'No email provided'
        },
        // @ts-ignore
        employees: Array.isArray(team.employees) ? team.employees : []
    }

    const renderLeadershipCard = (role: string, leader: TeamLeader) => (
        <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">{role}</h4>
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage
                        src={`https://api.dicebear.com/5.x/initials/svg?seed=${leader.name}`}
                    />
                    <AvatarFallback>{getInitials(leader.name)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{leader.name}</p>
                    <p className="text-sm text-muted-foreground">{leader.email}</p>
                </div>
            </div>
        </div>
    )

    return (
        <Layout>
            <Layout.Header>
                <div className="flex w-full justify-between">
                    <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                        <ThemeSwitch />
                        <UserNav />
                    </div>
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Team Info Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Team Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage
                                        src={`https://api.dicebear.com/5.x/initials/svg?seed=${teamData.name}`}
                                    />
                                    <AvatarFallback>{getInitials(teamData.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-2xl font-semibold">{teamData.name}</h3>
                                    <p className="text-muted-foreground">{teamData.department.name}</p>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <InfoItem icon={<Building2 className="h-4 w-4" />} label="Department">
                                    <Badge variant="outline">{teamData.department.name}</Badge>
                                </InfoItem>
                                <InfoItem icon={<Users className="h-4 w-4" />} label="Team Size">
                                    {teamData.employees.length} members
                                </InfoItem>
                                <InfoItem icon={<Briefcase className="h-4 w-4" />} label="Description">
                                    {teamData.description}
                                </InfoItem>
                                <InfoItem icon={<CalendarDays className="h-4 w-4" />} label="Created">
                                    {new Date(teamData.created_at).toLocaleDateString()}
                                </InfoItem>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Leadership Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Team Leadership</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            {renderLeadershipCard("Team Leader", teamData.team_leader)}
                            {renderLeadershipCard("Operations Manager", teamData.operations_manager)}
                        </CardContent>
                    </Card>
                </div>

                {/* Team Members Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {teamData.employees.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Member</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Hire Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teamData.employees.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={`https://api.dicebear.com/5.x/initials/svg?seed=${employee.name}`} />
                                                        <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                                                    </Avatar>
                                                    <span>{employee.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{employee.email}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{employee.role || 'Team Member'}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(employee.status)}>
                                                    {employee.status || 'Unknown'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{employee.hire_date || 'N/A'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center py-6 text-muted-foreground">
                                No team members found
                            </div>
                        )}
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}