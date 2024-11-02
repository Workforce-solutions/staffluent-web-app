import { Layout } from '@/components/custom/layout'
import { InfoItem } from '@/components/info-item'
import EmptyState from '@/components/table/empty-state'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {getInitials, getStatusColor} from '@/hooks/common/common-functions'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetTeamByIdQuery } from '@/services/staffApi'
import { Users, Briefcase, Building2, CalendarDays } from 'lucide-react'
import { useParams } from 'react-router-dom'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

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

    if (isFetching || isError || !team)
        return <EmptyState isLoading={isFetching} isError={isError} />

    // @ts-ignore
    return (
        <Layout>
            <Layout.Header>
                <div className='flex w-full justify-between'>
                    <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
                        <ThemeSwitch />
                        <UserNav />
                    </div>
                </div>
            </Layout.Header>

            <Layout.Body className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Team Info Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-2xl'>Team Information</CardTitle>
                        </CardHeader>
                        <CardContent className='grid gap-6'>
                            <div className='flex items-center space-x-4'>
                                <Avatar className='h-20 w-20'>
                                    <AvatarImage
                                        src={`https://api.dicebear.com/5.x/initials/svg?seed=${team.name}`}
                                    />
                                    <AvatarFallback>{getInitials(team.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className='text-2xl font-semibold'>{team.name}</h3>
                                    <p className='text-muted-foreground'>{team.department.name}</p>
                                </div>
                            </div>

                            <div className='grid gap-2'>
                                <InfoItem icon={<Building2 className='h-4 w-4' />} label='Department'>
                                    <Badge variant='outline'>{team.department.name}</Badge>
                                </InfoItem>
                                <InfoItem icon={<Users className='h-4 w-4' />} label='Team Size'>
                                    {team.employees.length} members
                                </InfoItem>
                                <InfoItem icon={<Briefcase className='h-4 w-4' />} label='Description'>
                                    {team.description || 'No description provided'}
                                </InfoItem>
                                <InfoItem icon={<CalendarDays className='h-4 w-4' />} label='Created'>
                                    {new Date(team.created_at).toLocaleDateString()}
                                </InfoItem>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Leadership Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-2xl'>Team Leadership</CardTitle>
                        </CardHeader>
                        <CardContent className='grid gap-6'>
                            {/* Team Leader */}
                            <div>
                                <h4 className='text-sm font-medium text-muted-foreground mb-3'>Team Leader</h4>
                                <div className='flex items-center space-x-4'>
                                    <Avatar>
                                        <AvatarImage
                                            src={`https://api.dicebear.com/5.x/initials/svg?seed=${team.team_leader.name}`}
                                        />
                                        <AvatarFallback>{getInitials(team.team_leader.name)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className='font-medium'>{team.team_leader.name}</p>
                                        <p className='text-sm text-muted-foreground'>{team.team_leader.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Operations Manager */}
                            <div>
                                <h4 className='text-sm font-medium text-muted-foreground mb-3'>Operations Manager</h4>
                                <div className='flex items-center space-x-4'>
                                    <Avatar>
                                        <AvatarImage
                                            src={`https://api.dicebear.com/5.x/initials/svg?seed=${team.operations_manager.name}`}
                                        />
                                        <AvatarFallback>{getInitials(team.operations_manager.name)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className='font-medium'>{team.operations_manager.name}</p>
                                        <p className='text-sm text-muted-foreground'>{team.operations_manager.email}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Team Members Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                                {team.employees.map((employee) => (
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
                                            {/*// @ts-ignore*/}
                                            <Badge variant="secondary">{employee.role || 'Team Member'}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={getStatusColor(employee.status)}>
                                                {employee.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{employee.hire_date || 'N/A'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </Layout.Body>
        </Layout>
    )
}