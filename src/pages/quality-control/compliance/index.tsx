import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    AlertTriangle,
    CheckCircle2,
    FileText,
    Calendar,
    AlertCircle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const complianceData = [
    {
        code: "BC-2024-01",
        title: "Building Height Regulations",
        status: "compliant",
        lastChecked: "2024-03-10",
        nextReview: "2024-06-10",
        category: "Building Code",
        notes: "All measurements within acceptable range"
    },
    {
        code: "SC-2024-02",
        title: "Safety Barriers",
        status: "attention",
        lastChecked: "2024-03-08",
        nextReview: "2024-03-15",
        category: "Safety Code",
        notes: "Minor adjustments needed in section B"
    },
    {
        code: "FC-2024-03",
        title: "Fire Safety Standards",
        status: "non_compliant",
        lastChecked: "2024-03-09",
        nextReview: "2024-03-12",
        category: "Fire Code",
        notes: "Sprinkler system requires immediate attention"
    }
]

export function CodeCompliance() {
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
                        <h2 className="text-2xl font-bold tracking-tight">Code Compliance</h2>
                        <p className="text-muted-foreground">
                            Monitor and track regulatory compliance status
                        </p>
                    </div>
                </div>

                {/* Overview Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold">85%</span>
                                <span className="text-sm text-muted-foreground">Overall Compliance</span>
                                <Progress value={85} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                <span className="text-2xl font-bold">2</span>
                                <span className="text-sm text-muted-foreground">Pending Reviews</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col space-y-2">
                                <AlertCircle className="h-5 w-5 text-red-500" />
                                <span className="text-2xl font-bold">1</span>
                                <span className="text-sm text-muted-foreground">Non-Compliant Items</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Compliance List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Compliance Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {complianceData.map((item) => (
                                <div key={item.code} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-medium">{item.title}</h3>
                                                <Badge variant="outline">{item.code}</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{item.category}</p>
                                        </div>
                                        <Badge
                                            variant={
                                                item.status === 'compliant' ? 'success' :
                                                    item.status === 'attention' ? 'warning' :
                                                        'destructive'
                                            }
                                        >
                                            {item.status}
                                        </Badge>
                                    </div>

                                    <p className="text-sm mb-4">{item.notes}</p>

                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-muted-foreground" />
                                            <span>Last Check: {item.lastChecked}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span>Next Review: {item.nextReview}</span>
                                        </div>
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

export default CodeCompliance