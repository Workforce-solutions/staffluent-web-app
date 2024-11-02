
import { useParams, useNavigate } from 'react-router-dom'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

// Mock data for staff members (same as in StaffOverview)
const staffData = [
    { id: 1, name: "John Doe", role: "Manager", department: "Sales", status: "active" },
    { id: 2, name: "Jane Smith", role: "Developer", department: "IT", status: "on break" },
    { id: 3, name: "Bob Johnson", role: "Designer", department: "Marketing", status: "off-duty" },
    { id: 4, name: "Alice Brown", role: "HR Specialist", department: "Human Resources", status: "active" },
    { id: 5, name: "Charlie Davis", role: "Accountant", department: "Finance", status: "active" },
]

// Mock data for activity log
const activityLog = [
    { id: 1, action: "Logged in", timestamp: "2024-10-14 09:00:00" },
    { id: 2, action: "Started task: Q4 Report", timestamp: "2024-10-14 09:15:00" },
    { id: 3, action: "Completed task: Q4 Report", timestamp: "2024-10-14 11:30:00" },
    { id: 4, action: "Lunch break", timestamp: "2024-10-14 12:00:00" },
    { id: 5, action: "Returned from break", timestamp: "2024-10-14 13:00:00" },
]

const getStatusColor = (status: string) => {
    switch(status) {
        case 'active': return 'bg-green-500'
        case 'on break': return 'bg-yellow-500'
        case 'off-duty': return 'bg-gray-500'
        default: return 'bg-blue-500'
    }
}

export default function StaffDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    // @ts-ignore
    const staff = staffData.find(s => s.id === parseInt(id))

    if (!staff) {
        return <div>Staff member not found</div>
    }

    return (
        <Layout>
            <Layout.Header>
                <div className='ml-auto flex items-center space-x-4'>
                    <Search />
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className='space-y-8'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                        Staff Details
                    </h1>
                    <Button onClick={() => navigate('/staff-management')}>Back to Overview</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="md:col-span-1">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center space-y-4">
                                <Avatar className="h-32 w-32">
                                    <AvatarImage src={`https://api.dicebear.com/5.x/initials/svg?seed=${staff.name}`} />
                                    <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <h2 className="text-2xl font-bold">{staff.name}</h2>
                                <p className="text-gray-500">{staff.role}</p>
                                <Badge className={getStatusColor(staff.status)}>{staff.status}</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Staff Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Department</p>
                                    <p>{staff.department}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Employee ID</p>
                                    <p>{staff.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                    <p>{staff.name.toLowerCase().replace(' ', '.')}@company.com</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Phone</p>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-3">
                        <CardHeader>
                            <CardTitle>Activity Log</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {activityLog.map(activity => (
                                    <li key={activity.id} className="flex justify-between items-center border-b pb-2">
                                        <span>{activity.action}</span>
                                        <span className="text-sm text-gray-500">{activity.timestamp}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </Layout.Body>
        </Layout>
    )
}