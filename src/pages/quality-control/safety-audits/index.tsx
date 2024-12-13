import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    HardHat,
    AlertTriangle,
    CheckCircle2,
    ClipboardCheck,
    Calendar,
    User,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const auditData = [
    {
        id: "SA-2024-001",
        type: "PPE Compliance",
        status: "completed",
        date: "2024-03-10",
        auditor: "John Smith",
        findings: [
            "All workers wearing proper PPE",
            "Safety goggles need replacement schedule"
        ],
        score: 92
    },
    {
        id: "SA-2024-002",
        type: "Equipment Safety",
        status: "in_progress",
        date: "2024-03-11",
        auditor: "Sarah Johnson",
        findings: [
            "Crane inspection pending",
            "Tool organization improved"
        ],
        score: 78
    },
    {
        id: "SA-2024-003",
        type: "Site Security",
        status: "scheduled",
        date: "2024-03-15",
        auditor: "Mike Wilson",
        findings: [],
        score: null
    }
]

export function SafetyAudits() {
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
                        <h2 className="text-2xl font-bold tracking-tight">Safety Audits</h2>
                        <p className="text-muted-foreground">
                            Track and monitor safety audit results
                        </p>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">85%</span>
                                <span className="text-sm text-muted-foreground">Average Score</span>
                                <Progress value={85} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <ClipboardCheck className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold">12</span>
                                <span className="text-sm text-muted-foreground">Total Audits</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">3</span>
                                <span className="text-sm text-muted-foreground">Open Findings</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <HardHat className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">98%</span>
                                <span className="text-sm text-muted-foreground">PPE Compliance</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Audit List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Audits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {auditData.map((audit) => (
                                <div key={audit.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-medium">{audit.type}</h3>
                                                <Badge variant="outline">{audit.id}</Badge>
                                            </div>
                                        </div>
                                        <Badge
                                            variant={
                                                audit.status === 'completed' ? 'success' :
                                                    audit.status === 'in_progress' ? 'warning' :
                                                        'secondary'
                                            }
                                        >
                                            {audit.status.replace('_', ' ')}
                                        </Badge>
                                    </div>

                                    {audit.findings.length > 0 && (
                                        <div className="space-y-2 mb-4">
                                            <p className="text-sm font-medium">Findings:</p>
                                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                                {audit.findings.map((finding, index) => (
                                                    <li key={index}>{finding}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                <span>{audit.auditor}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span>{audit.date}</span>
                                            </div>
                                        </div>
                                        {audit.score && (
                                            <Badge variant="outline">
                                                Score: {audit.score}%
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body>
            
        </Layout>
    )
}

export default SafetyAudits