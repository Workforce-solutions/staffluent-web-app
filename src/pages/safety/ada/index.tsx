import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Accessibility,
  AlertCircle,
  CheckCircle2,
  FileCheck,
  MapPin,
  ArrowRight
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'

// Types
interface AccessibilityCheck {
  id: number
  location: string
  category: string
  status: 'compliant' | 'non-compliant' | 'in-progress'
  lastInspection: string
  issueCount: number
  requirements: {
    title: string
    status: 'pass' | 'fail' | 'pending'
  }[]
  remediationPlan?: string
  priority: 'high' | 'medium' | 'low'
}

// Demo data
const accessibilityData: AccessibilityCheck[] = [
  {
    id: 1,
    location: "Main Entrance",
    category: "Access Routes",
    status: "compliant",
    lastInspection: "2024-02-15",
    issueCount: 0,
    requirements: [
      { title: "Clear Path Width (36\" min)", status: "pass" },
      { title: "Surface Stability", status: "pass" },
      { title: "Slope Requirements", status: "pass" },
      { title: "Proper Signage", status: "pass" }
    ],
    priority: "high"
  },
  {
    id: 2,
    location: "Restroom Facilities",
    category: "Interior Access",
    status: "non-compliant",
    lastInspection: "2024-02-10",
    issueCount: 2,
    requirements: [
      { title: "Door Clearance", status: "pass" },
      { title: "Turning Space", status: "fail" },
      { title: "Grab Bars", status: "fail" },
      { title: "Fixture Heights", status: "pass" }
    ],
    remediationPlan: "Adjust layout for proper turning radius, install missing grab bars",
    priority: "high"
  },
  {
    id: 3,
    location: "Parking Area",
    category: "Exterior Access",
    status: "in-progress",
    lastInspection: "2024-02-01",
    issueCount: 1,
    requirements: [
      { title: "Required Number of Spaces", status: "pass" },
      { title: "Space Dimensions", status: "pass" },
      { title: "Signage Height", status: "pending" },
      { title: "Access Aisle", status: "pass" }
    ],
    remediationPlan: "Adjust signage height to meet requirements",
    priority: "medium"
  }
]

const ADACompliance = () => {
    const AccessibilityCard = ({ check }: { check: AccessibilityCheck }) => (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-medium">{check.location}</h3>
                        <p className="text-sm text-muted-foreground">{check.category}</p>
                    </div>
                    <Badge variant={
                        check.status === 'compliant' ? 'success' :
                            check.status === 'in-progress' ? 'warning' :
                                'destructive'
                    }>
                        {check.status}
                    </Badge>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Compliance</span>
                            <span>
                {Math.round((check.requirements.filter(r => r.status === 'pass').length / check.requirements.length) * 100)}%
              </span>
                        </div>
                        <Progress
                            value={(check.requirements.filter(r => r.status === 'pass').length / check.requirements.length) * 100}
                            className="h-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Requirements</p>
                        <div className="space-y-1">
                            {check.requirements.map((req, index) => (
                                <div key={index} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center">
                                        <CheckCircle2 className={`h-4 w-4 mr-2 ${
                                            req.status === 'pass' ? 'text-green-500' :
                                                req.status === 'fail' ? 'text-red-500' :
                                                    'text-yellow-500'
                                        }`} />
                                        <span>{req.title}</span>
                                    </div>
                                    <Badge variant={
                                        req.status === 'pass' ? 'success' :
                                            req.status === 'fail' ? 'destructive' :
                                                'warning'
                                    }>
                                        {req.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>

                    {check.remediationPlan && (
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Remediation Plan</p>
                            <div className="flex items-start text-sm">
                                <AlertCircle className="h-4 w-4 mr-2 mt-1 text-yellow-500" />
                                <span>{check.remediationPlan}</span>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between items-center pt-4 mt-4 border-t text-sm">
                        <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Last checked: {check.lastInspection}</span>
                        </div>
                        <Button variant="outline" size="sm">
                            Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
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
                        <h2 className="text-2xl font-bold tracking-tight">ADA Compliance</h2>
                        <p className="text-muted-foreground">
                            Track and manage ADA accessibility requirements
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Check
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
                            <Accessibility className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {Math.round((accessibilityData.filter(d => d.status === 'compliant').length / accessibilityData.length) * 100)}%
                            </div>
                            <p className="text-xs text-muted-foreground">
                                ADA requirements met
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {accessibilityData.reduce((sum, d) => sum + d.issueCount, 0)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Require remediation
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Areas Checked</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{accessibilityData.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Total locations
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Next Audit</CardTitle>
                            <FileCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">15d</div>
                            <p className="text-xs text-muted-foreground">
                                Until next review
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex space-x-2">
                    <Input
                        placeholder="Search locations..."
                        className="max-w-sm"
                    />
                    <Button variant="outline">
                        Filter
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {accessibilityData.map(check => (
                        <AccessibilityCard key={check.id} check={check} />
                    ))}
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default ADACompliance