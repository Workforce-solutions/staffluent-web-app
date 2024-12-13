import { useState } from 'react'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Upload,
  FileText,
  Construction,
  HardHat,
  Clock,
  Filter,
  Download,
  Eye,
  MoreVertical,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Types
interface Document {
  id: number
  name: string
  type: 'permit' | 'safety' | 'inspection' | 'plan' | 'report'
  site: string
  uploadedBy: string
  uploadDate: string
  lastViewed: string
  status: 'active' | 'expired' | 'pending'
  size: string
  version: string
}

// Demo data
const documentsData: Document[] = [
  {
    id: 1,
    name: "Building Permit A-123",
    type: "permit",
    site: "Downtown Plaza Project",
    uploadedBy: "John Builder",
    uploadDate: "2024-02-15",
    lastViewed: "2 hours ago",
    status: "active",
    size: "2.4 MB",
    version: "1.0"
  },
  {
    id: 2,
    name: "Safety Protocol 2024",
    type: "safety",
    site: "Downtown Plaza Project",
    uploadedBy: "Sarah Safety",
    uploadDate: "2024-01-20",
    lastViewed: "1 day ago",
    status: "active",
    size: "1.8 MB",
    version: "2.1"
  },
  {
    id: 3,
    name: "Monthly Inspection Report",
    type: "inspection",
    site: "Tech Park Development",
    uploadedBy: "Mike Inspector",
    uploadDate: "2024-02-01",
    lastViewed: "5 days ago",
    status: "expired",
    size: "3.2 MB",
    version: "1.0"
  },
  {
    id: 4,
    name: "Site Layout Plan",
    type: "plan",
    site: "Riverside Complex",
    uploadedBy: "Tom Planner",
    uploadDate: "2024-02-10",
    lastViewed: "1 week ago",
    status: "active",
    size: "5.6 MB",
    version: "3.2"
  },
  {
    id: 5,
    name: "Progress Report Q1",
    type: "report",
    site: "Harbor Project",
    uploadedBy: "Lisa Manager",
    uploadDate: "2024-03-01",
    lastViewed: "3 days ago",
    status: "pending",
    size: "1.5 MB",
    version: "1.1"
  }
]

const SiteDocumentation = () => {
  const [selectedType, setSelectedType] = useState<string>('all')

  const DocumentCard = ({ doc }: { doc: Document }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-muted rounded-lg">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">{doc.name}</h3>
              <p className="text-sm text-muted-foreground">{doc.site}</p>
            </div>
          </div>
          <Badge variant={
            doc.status === 'active' ? 'success' :
            doc.status === 'expired' ? 'destructive' :
            'warning'
          }>
            {doc.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Uploaded by</p>
            <p>{doc.uploadedBy}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Version</p>
            <p>{doc.version}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Last viewed</p>
            <p>{doc.lastViewed}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Size</p>
            <p>{doc.size}</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
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
            <h2 className="text-2xl font-bold tracking-tight">Site Documentation</h2>
            <p className="text-muted-foreground">
              Manage and access all site-related documents
            </p>
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documentsData.length}</div>
              <p className="text-xs text-muted-foreground">
                Across all sites
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Permits</CardTitle>
              <Construction className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documentsData.filter(d => d.type === 'permit' && d.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently valid
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Safety Documents</CardTitle>
              <HardHat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documentsData.filter(d => d.type === 'safety').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Protocols and guidelines
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Updates</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Last 7 days
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex space-x-4">
            <Input
              placeholder="Search documents..."
              className="w-[300px]"
              // @ts-ignore
              icon={<Search className="h-4 w-4" />}
            />
            <Select
              value={selectedType}
              onValueChange={setSelectedType}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="permit">Permits</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
                <SelectItem value="inspection">Inspections</SelectItem>
                <SelectItem value="plan">Plans</SelectItem>
                <SelectItem value="report">Reports</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documentsData
            .filter(doc => selectedType === 'all' || doc.type === selectedType)
            .map(doc => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default SiteDocumentation
