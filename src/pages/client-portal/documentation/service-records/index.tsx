import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    Calendar,
    FileText,
    Search,
    CheckSquare,
    Image,
    ClockIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const serviceRecords = [
    {
        id: "SR-2024-001",
        service: "Monthly Barrier Inspection",
        date: "2024-03-10",
        status: "completed",
        location: "Main Office Entrance",
        documents: [
            {
                type: "inspection",
                name: "Inspection Report",
                date: "2024-03-10",
                signed: true
            },
            {
                type: "photos",
                name: "Service Photos",
                date: "2024-03-10"
            },
            {
                type: "checklist",
                name: "Quality Checklist",
                date: "2024-03-10",
                signed: true
            }
        ],
        signedBy: "John Smith",
        signatureDate: "2024-03-10"
    },
    {
        id: "SR-2024-002",
        service: "Barrier Maintenance",
        date: "2024-03-05",
        status: "pending_approval",
        location: "Side Entrance",
        documents: [
            {
                type: "maintenance",
                name: "Maintenance Report",
                date: "2024-03-05"
            },
            {
                type: "photos",
                name: "Service Documentation",
                date: "2024-03-05"
            }
        ]
    },
    {
        id: "SR-2024-003",
        service: "Emergency Repair",
        date: "2024-03-01",
        status: "completed",
        location: "Loading Bay",
        documents: [
            {
                type: "repair",
                name: "Repair Report",
                date: "2024-03-01",
                signed: true
            },
            {
                type: "photos",
                name: "Before/After Photos",
                date: "2024-03-01"
            }
        ],
        signedBy: "Mike Wilson",
        signatureDate: "2024-03-01"
    }
]

export default function ServiceRecords() {
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
                        <h2 className="text-2xl font-bold tracking-tight">Service Records</h2>
                        <p className="text-muted-foreground">
                            View and manage your service documentation
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search records..."
                                className="w-full pl-8 sm:w-64"
                                type="search"
                            />
                        </div>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Records</SelectItem>
                                <SelectItem value="inspection">Inspections</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                <SelectItem value="repair">Repairs</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Records List */}
                <div className="space-y-6">
                    {serviceRecords.map((record) => (
                        <Card key={record.id}>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-medium">{record.service}</h3>
                                                <Badge variant="outline">{record.id}</Badge>
                                            </div>
                                            <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                                                <Calendar className="h-4 w-4" />
                                                <span>{record.date}</span>
                                                <span className="px-2">•</span>
                                                <span>{record.location}</span>
                                            </div>
                                        </div>
                                        <Badge
                                            variant={
                                                record.status === 'completed' ? 'success' :
                                                    record.status === 'pending_approval' ? 'warning' :
                                                        'secondary'
                                            }
                                        >
                                            {record.status.replace('_', ' ')}
                                        </Badge>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {record.documents.map((doc, index) => (
                                            <Button key={index} variant="outline" size="sm">
                                                {doc.type === 'photos' ? (
                                                    <Image className="h-4 w-4 mr-2" />
                                                ) : (
                                                    <FileText className="h-4 w-4 mr-2" />
                                                )}
                                                {doc.name}
                                                {/*// @ts-ignore*/}
                                                {doc.signed && <CheckSquare className="h-4 w-4 ml-2 text-green-500" />}
                                            </Button>
                                        ))}
                                    </div>

                                    {record.signedBy && (
                                        <div className="flex items-center justify-end space-x-2 pt-4 text-sm text-muted-foreground border-t">
                                            <ClockIcon className="h-4 w-4" />
                                            <span>Signed by {record.signedBy} on {record.signatureDate}</span>
                                        </div>
                                    )}

                                    {record.status === 'pending_approval' && (
                                        <div className="flex justify-end space-x-2 pt-4 border-t">
                                            <Button variant="outline" size="sm">
                                                Request Changes
                                            </Button>
                                            <Button size="sm">
                                                Sign & Approve
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Layout.Body>


        </Layout>
    )
}