import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    Shield,
    Clock,
    FileText,
    Download,
    Search,
    AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

const complianceRecords = [
    {
        id: "CR-2024-001",
        type: "Safety Standards",
        title: "Monthly Safety Compliance Report",
        status: "compliant",
        lastUpdate: "2024-03-10",
        nextReview: "2024-04-10",
        documents: [
            {
                name: "Safety Standards Certification",
                type: "certification",
                validUntil: "2024-12-31"
            },
            {
                name: "Inspection Documentation",
                type: "report"
            }
        ],
        requirements: [
            { item: "Safety Standards Met", status: "passed" },
            { item: "Regular Maintenance", status: "passed" },
            { item: "Emergency Protocols", status: "passed" }
        ]
    },
    {
        id: "CR-2024-002",
        type: "Barrier Standards",
        title: "Barrier Compliance Certificate",
        status: "requires_attention",
        lastUpdate: "2024-03-05",
        nextReview: "2024-03-20",
        documents: [
            {
                name: "Current Certification",
                type: "certification",
                validUntil: "2024-03-20"
            }
        ],
        requirements: [
            { item: "Material Standards", status: "passed" },
            { item: "Installation Check", status: "warning" },
            { item: "Maintenance Schedule", status: "passed" }
        ],
        attention: "Certification renewal required within 10 days"
    }
]

export default function ComplianceRecords() {
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
                        <h2 className="text-2xl font-bold tracking-tight">Compliance Records</h2>
                        <p className="text-muted-foreground">
                            View and track your compliance documentation
                        </p>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search compliance records..."
                            className="w-full pl-8 sm:w-64"
                            type="search"
                        />
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Shield className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">100%</span>
                                <span className="text-sm text-muted-foreground">Safety Compliance</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Clock className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">1</span>
                                <span className="text-sm text-muted-foreground">Upcoming Reviews</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                                <span className="text-2xl font-bold">1</span>
                                <span className="text-sm text-muted-foreground">Action Required</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Compliance Records */}
                <div className="space-y-6">
                    {complianceRecords.map((record) => (
                        <Card key={record.id}>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-medium">{record.title}</h3>
                                                <Badge variant="outline">{record.id}</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">{record.type}</p>
                                        </div>
                                        <Badge
                                            variant={
                                                record.status === 'compliant' ? 'success' :
                                                    record.status === 'requires_attention' ? 'warning' :
                                                        'destructive'
                                            }
                                        >
                                            {record.status.replace('_', ' ')}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-medium mb-2">Requirements Status</h4>
                                                <div className="space-y-2">
                                                    {record.requirements.map((req, index) => (
                                                        <div key={index} className="flex items-center justify-between">
                                                            <span className="text-sm">{req.item}</span>
                                                            <Badge
                                                                variant={
                                                                    req.status === 'passed' ? 'success' :
                                                                        req.status === 'warning' ? 'warning' :
                                                                            'destructive'
                                                                }
                                                            >
                                                                {req.status}
                                                            </Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium mb-2">Review Dates</h4>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-muted-foreground">Last Updated:</span>
                                                        <span>{record.lastUpdate}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-muted-foreground">Next Review:</span>
                                                        <span>{record.nextReview}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-medium mb-2">Documents</h4>
                                                <div className="space-y-2">
                                                    {record.documents.map((doc, index) => (
                                                        <div key={index} className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-2">
                                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                                <span className="text-sm">{doc.name}</span>
                                                            </div>
                                                            {doc.validUntil && (
                                                                <span className="text-sm text-muted-foreground">
                                                                    Valid until {doc.validUntil}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {record.attention && (
                                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md">
                                                    <div className="flex items-center space-x-2">
                                                        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                                                        <p className="text-sm text-yellow-600 dark:text-yellow-500">
                                                            {record.attention}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-2 pt-4 border-t">
                                        <Button variant="outline" size="sm">
                                            <Download className="h-4 w-4 mr-2" />
                                            Download Documents
                                        </Button>
                                        <Button size="sm">
                                            View Full Report
                                        </Button>
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