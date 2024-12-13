import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Input } from '@/components/ui/input'
import {
    Search,
    CheckSquare,
    XSquare,
    AlertTriangle,
    Clock,
    FileCheck,
    Camera,
    CheckCircle2,
    User, Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {AddVerificationModal} from "./add-verification";
import {useState} from "react";

const sampleVerifications = [
    {
        id: "QV-2024-001",
        task: "Foundation Inspection",
        site: "Building A",
        status: "passed",
        inspector: "John Smith",
        date: "2024-03-10",
        category: "structural",
        checklist: [
            { item: "Concrete strength test", status: "passed", note: "Meets requirements" },
            { item: "Rebar placement", status: "passed", note: "Properly placed" },
            { item: "Foundation depth", status: "passed", note: "Within specifications" }
        ],
        photos: ["photo1.jpg", "photo2.jpg"],
        notes: "All requirements met, ready for next phase"
    },
    {
        id: "QV-2024-002",
        task: "Electrical Wiring Check",
        site: "Building B",
        status: "failed",
        inspector: "Sarah Johnson",
        date: "2024-03-11",
        category: "electrical",
        checklist: [
            { item: "Wire gauge check", status: "passed", note: "Correct gauge used" },
            { item: "Circuit testing", status: "failed", note: "Ground fault detected" },
            { item: "Connection inspection", status: "warning", note: "Needs tightening" }
        ],
        photos: ["photo3.jpg"],
        notes: "Ground fault needs to be addressed before approval"
    },
    {
        id: "QV-2024-003",
        task: "Plumbing Pressure Test",
        site: "Building A",
        status: "pending",
        inspector: "Mike Wilson",
        date: "2024-03-12",
        category: "plumbing",
        checklist: [
            { item: "Pressure test", status: "pending", note: "Not started" },
            { item: "Joint inspection", status: "pending", note: "Not started" },
            { item: "Valve operation", status: "pending", note: "Not started" }
        ],
        photos: [],
        notes: "Scheduled for afternoon inspection"
    }
]

const qualityMetrics = {
    pass_rate: 85,
    total_inspections: 45,
    pending_verifications: 8,
    critical_issues: 3,
    categories: [
        { name: "Structural", pass_rate: 92 },
        { name: "Electrical", pass_rate: 78 },
        { name: "Plumbing", pass_rate: 88 },
        { name: "Safety", pass_rate: 95 }
    ]
}

export function QualityVerification() {
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false)

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
                        <h2 className="text-2xl font-bold tracking-tight">Quality Verification</h2>
                        <p className="text-muted-foreground">
                            Track and manage quality inspections and verifications
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search verifications..."
                                className="w-full pl-8 sm:w-64"
                                type="search"
                            />
                        </div>
                        <Button onClick={() => setIsVerificationModalOpen(true)}>
                            <FileCheck className="h-4 w-4 mr-2" />
                            New Verification
                        </Button>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">{qualityMetrics.pass_rate}%</span>
                                <span className="text-sm text-muted-foreground">Pass Rate</span>
                                <Progress value={qualityMetrics.pass_rate} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <FileCheck className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">{qualityMetrics.total_inspections}</span>
                                <span className="text-sm text-muted-foreground">Total Inspections</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <Clock className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">{qualityMetrics.pending_verifications}</span>
                                <span className="text-sm text-muted-foreground">Pending Verifications</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                                <span className="text-2xl font-bold">{qualityMetrics.critical_issues}</span>
                                <span className="text-sm text-muted-foreground">Critical Issues</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Category Performance */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quality Performance by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {qualityMetrics.categories.map((category, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">{category.name}</span>
                                        <span className="text-sm">{category.pass_rate}%</span>
                                    </div>
                                    <Progress value={category.pass_rate} className="h-2" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Verification List */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Recent Verifications</CardTitle>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="passed">Passed</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {sampleVerifications.map((verification) => (
                                <div key={verification.id} className="border rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-medium text-lg">{verification.task}</h3>
                                                <Badge variant="outline">{verification.id}</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{verification.site}</p>
                                        </div>
                                        <Badge
                                            variant={
                                                verification.status === 'passed' ? 'success' :
                                                    verification.status === 'failed' ? 'destructive' :
                                                        'secondary'
                                            }
                                        >
                                            {verification.status}
                                        </Badge>
                                    </div>

                                    {/* Checklist */}
                                    <div className="space-y-3 mb-4">
                                        {verification.checklist.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between bg-muted/50 rounded-lg p-2">
                                                <div className="flex items-center gap-2">
                                                    {item.status === 'passed' && <CheckSquare className="h-4 w-4 text-green-500" />}
                                                    {item.status === 'failed' && <XSquare className="h-4 w-4 text-red-500" />}
                                                    {item.status === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                                                    {item.status === 'pending' && <Clock className="h-4 w-4 text-muted-foreground" />}
                                                    <span className="text-sm">{item.item}</span>
                                                </div>
                                                <span className="text-sm text-muted-foreground">{item.note}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer Info */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span>{verification.inspector}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span>{verification.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Camera className="h-4 w-4 text-muted-foreground" />
                                            <span>{verification.photos.length} Photos</span>
                                        </div>
                                        <div className="sm:text-right">
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
            <AddVerificationModal
                open={isVerificationModalOpen}
                setOpen={setIsVerificationModalOpen}
            />
        </Layout>
    )
}

export default QualityVerification