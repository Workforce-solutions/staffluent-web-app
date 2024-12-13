import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Image,
    FileText,
    Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const inspectionSignoffs = [
    {
        id: "INS-2024-001",
        type: "Safety Barrier Installation",
        location: "Main Office - North Wing",
        date: "2024-03-10",
        dueDate: "2024-03-12",
        status: "pending_approval",
        inspector: "John Smith",
        checklist: [
            { item: "Installation Compliance", status: "passed" },
            { item: "Safety Standards", status: "passed" },
            { item: "Material Quality", status: "passed" }
        ],
        attachments: [
            { type: "report", name: "Inspection Report.pdf" },
            { type: "photos", name: "Installation Photos" }
        ],
        notes: "All safety requirements met. Awaiting final client approval.",
        priority: "high"
    },
    {
        id: "INS-2024-002",
        type: "Monthly Maintenance Check",
        location: "Branch Office - Main Entrance",
        date: "2024-03-09",
        dueDate: "2024-03-11",
        status: "approved",
        inspector: "Sarah Johnson",
        checklist: [
            { item: "Equipment Check", status: "passed" },
            { item: "Performance Test", status: "passed" },
            { item: "Safety Verification", status: "passed" }
        ],
        attachments: [
            { type: "report", name: "Maintenance Report.pdf" },
            { type: "photos", name: "Inspection Photos" }
        ],
        notes: "Regular maintenance completed successfully. All systems functioning properly.",
        priority: "medium",
        signedBy: "Mike Wilson",
        signedDate: "2024-03-09"
    },
    {
        id: "INS-2024-003",
        type: "Emergency Repair Verification",
        location: "Main Office - South Entrance",
        date: "2024-03-08",
        dueDate: "2024-03-08",
        status: "rejected",
        inspector: "David Brown",
        checklist: [
            { item: "Repair Quality", status: "failed" },
            { item: "Safety Check", status: "passed" },
            { item: "Operation Test", status: "warning" }
        ],
        attachments: [
            { type: "report", name: "Repair Report.pdf" },
            { type: "photos", name: "Issue Documentation" }
        ],
        notes: "Additional repairs needed. Some issues require attention.",
        priority: "high",
        rejectionReason: "Repair quality does not meet standards"
    }
]

export default function InspectionSignoffs() {
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
                        <h2 className="text-2xl font-bold tracking-tight">Inspection Sign-offs</h2>
                        <p className="text-muted-foreground">
                            Review and approve inspection reports for your services
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search inspections..."
                                className="w-full pl-8 sm:w-64"
                                type="search"
                            />
                        </div>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Inspections</SelectItem>
                                <SelectItem value="pending">Pending Approval</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Clock className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">1</span>
                                <span className="text-sm text-muted-foreground">Pending Approvals</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">1</span>
                                <span className="text-sm text-muted-foreground">Approved</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <XCircle className="h-5 w-5 text-red-500" />
                                <span className="text-2xl font-bold">1</span>
                                <span className="text-sm text-muted-foreground">Rejected</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertCircle className="h-5 w-5 text-orange-500" />
                                <span className="text-2xl font-bold">2</span>
                                <span className="text-sm text-muted-foreground">High Priority</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Inspection List */}
                <div className="space-y-6">
                    {inspectionSignoffs.map((inspection) => (
                        <Card key={inspection.id}>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-medium">{inspection.type}</h3>
                                                <Badge variant="outline">{inspection.id}</Badge>
                                                {inspection.priority === 'high' && (
                                                    <Badge variant="destructive">High Priority</Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">{inspection.location}</p>
                                        </div>
                                        <Badge
                                            variant={
                                                inspection.status === 'approved' ? 'success' :
                                                    inspection.status === 'rejected' ? 'destructive' :
                                                        'warning'
                                            }
                                        >
                                            {inspection.status.replace('_', ' ')}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-medium mb-2">Inspection Details</h4>
                                                <div className="grid grid-cols-2 gap-2 text-sm">
                                                    <div className="text-muted-foreground">Inspector:</div>
                                                    <div>{inspection.inspector}</div>
                                                    <div className="text-muted-foreground">Date:</div>
                                                    <div>{inspection.date}</div>
                                                    <div className="text-muted-foreground">Due Date:</div>
                                                    <div>{inspection.dueDate}</div>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium mb-2">Checklist</h4>
                                                <div className="space-y-2">
                                                    {inspection.checklist.map((item, index) => (
                                                        <div key={index} className="flex items-center justify-between">
                                                            <span className="text-sm">{item.item}</span>
                                                            <Badge
                                                                variant={
                                                                    item.status === 'passed' ? 'success' :
                                                                        item.status === 'failed' ? 'destructive' :
                                                                            'warning'
                                                                }
                                                            >
                                                                {item.status}
                                                            </Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-medium mb-2">Documents</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {inspection.attachments.map((doc, index) => (
                                                        <Button key={index} variant="outline" size="sm">
                                                            {doc.type === 'photos' ? (
                                                                <Image className="h-4 w-4 mr-2" />
                                                            ) : (
                                                                <FileText className="h-4 w-4 mr-2" />
                                                            )}
                                                            {doc.name}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium mb-2">Notes</h4>
                                                <p className="text-sm text-muted-foreground">{inspection.notes}</p>
                                            </div>

                                            {inspection.rejectionReason && (
                                                <div className="bg-red-50 dark:bg-red-950/50 p-3 rounded-md">
                                                    <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                                                        Rejection Reason
                                                    </h4>
                                                    <p className="text-sm text-red-600 dark:text-red-400">
                                                        {inspection.rejectionReason}
                                                    </p>
                                                </div>
                                            )}

                                            {inspection.signedBy && (
                                                <div className="bg-green-50 dark:bg-green-950/50 p-3 rounded-md">
                                                    <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                                                        Approved By
                                                    </h4>
                                                    <p className="text-sm text-green-600 dark:text-green-400">
                                                        {inspection.signedBy} on {inspection.signedDate}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-2 pt-4 border-t">
                                        <Button variant="outline" size="sm">
                                            View Full Report
                                        </Button>
                                        {inspection.status === 'pending_approval' && (
                                            <>
                                                <Button variant="outline" size="sm" className="text-red-500">
                                                    Reject
                                                </Button>
                                                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                                    Approve
                                                </Button>
                                            </>
                                        )}
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