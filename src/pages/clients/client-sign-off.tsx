import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Settings,
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
  Pen,
  Filter
} from 'lucide-react'

// Types
interface SignOffRequest {
  id: number
  projectName: string
  client: string
  type: 'inspection' | 'milestone' | 'completion'
  status: 'pending' | 'approved' | 'rejected' | 'expired'
  dueDate: string
  submittedDate: string
  documents: string[]
  notes?: string
}

// Demo data
const signOffData: SignOffRequest[] = [
  {
    id: 1,
    projectName: "Downtown Plaza Project",
    client: "ABC Corporation",
    type: "milestone",
    status: "pending",
    dueDate: "2024-03-15",
    submittedDate: "2024-03-10",
    documents: ["milestone-report.pdf", "inspection-photos.zip"],
    notes: "Awaiting client review of Phase 1 completion"
  },
  {
    id: 2,
    projectName: "Tech Park Development",
    client: "XYZ Tech",
    type: "inspection",
    status: "approved",
    dueDate: "2024-03-12",
    submittedDate: "2024-03-08",
    documents: ["safety-inspection.pdf", "compliance-report.pdf"]
  },
  {
    id: 3,
    projectName: "Riverside Complex",
    client: "River Development Inc",
    type: "completion",
    status: "rejected",
    dueDate: "2024-03-14",
    submittedDate: "2024-03-07",
    documents: ["final-report.pdf"],
    notes: "Client requested additional documentation"
  }
]

const ClientSignOff = () => {
  const SignOffCard = ({ request }: { request: SignOffRequest }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium">{request.projectName}</h3>
            <p className="text-sm text-muted-foreground">{request.client}</p>
          </div>
          <Badge variant={
            request.status === 'approved' ? 'success' :
            request.status === 'rejected' ? 'destructive' :
            request.status === 'expired' ? 'secondary' :
            'warning'
          }>
            {request.status}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Type</p>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm capitalize">{request.type}</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Due Date</p>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{request.dueDate}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Documents</p>
            <div className="space-y-1">
              {request.documents.map((doc, index) => (
                <div key={index} className="flex items-center text-sm">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {request.notes && (
            <div className="flex items-start text-sm">
              <AlertCircle className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
              <span>{request.notes}</span>
            </div>
          )}

          <div className="flex justify-between items-center pt-4 mt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Submitted: {request.submittedDate}
            </div>
            <Button variant="outline" size="sm">
              <Pen className="h-4 w-4 mr-2" />
              Review
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
            <h2 className="text-2xl font-bold tracking-tight">Client Sign-offs</h2>
            <p className="text-muted-foreground">
              Manage and track client approvals
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {signOffData.filter(r => r.status === 'pending').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting client response
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {signOffData.filter(r => r.status === 'approved').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Last 30 days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">
                Average response time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Next 48 hours
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="Search sign-offs..."
            className="max-w-sm"
          />
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {signOffData.map(request => (
            <SignOffCard key={request.id} request={request} />
          ))}
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default ClientSignOff