import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  UserPlus,
  KeyRound,
  Shield,
  UserCog,
  AlertTriangle,
  Users,
} from 'lucide-react'

// Types
interface AccessRecord {
  id: number
  name: string
  role: string
  type: 'employee' | 'contractor' | 'visitor'
  clearanceLevel: 'high' | 'medium' | 'low'
  sites: string[]
  status: 'active' | 'suspended' | 'pending'
  lastAccess: string
  expiryDate: string | null
  badges: string[]
}

interface AccessZone {
  id: number
  name: string
  site: string
  securityLevel: 'high' | 'medium' | 'low'
  activeUsers: number
  recentAccesses: number
  restrictions: string[]
  status: 'secure' | 'alert' | 'breach'
}

// Demo data
const accessRecordsData: AccessRecord[] = [
  {
    id: 1,
    name: "John Smith",
    role: "Site Manager",
    type: "employee",
    clearanceLevel: "high",
    sites: ["Downtown Plaza", "Tech Park"],
    status: "active",
    lastAccess: "10 minutes ago",
    expiryDate: null,
    badges: ["All Areas", "Safety Officer"]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Contractor",
    type: "contractor",
    clearanceLevel: "medium",
    sites: ["Downtown Plaza"],
    status: "active",
    lastAccess: "2 hours ago",
    expiryDate: "2024-06-30",
    badges: ["Zone B", "Equipment Operator"]
  },
  {
    id: 3,
    name: "Mike Wilson",
    role: "Visitor",
    type: "visitor",
    clearanceLevel: "low",
    sites: ["Tech Park"],
    status: "pending",
    lastAccess: "Never",
    expiryDate: "2024-03-15",
    badges: ["Visitor"]
  }
]

const accessZonesData: AccessZone[] = [
  {
    id: 1,
    name: "Main Construction Area",
    site: "Downtown Plaza",
    securityLevel: "high",
    activeUsers: 25,
    recentAccesses: 145,
    restrictions: ["Safety Training Required", "PPE Mandatory"],
    status: "secure"
  },
  {
    id: 2,
    name: "Storage Facility",
    site: "Downtown Plaza",
    securityLevel: "medium",
    activeUsers: 12,
    recentAccesses: 89,
    restrictions: ["Authorized Personnel Only"],
    status: "alert"
  },
  {
    id: 3,
    name: "Office Area",
    site: "Tech Park",
    securityLevel: "low",
    activeUsers: 8,
    recentAccesses: 56,
    restrictions: ["Sign-in Required"],
    status: "secure"
  }
]

const SiteAccessControl = () => {

  const AccessCard = ({ record }: { record: AccessRecord }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium">{record.name}</h3>
            <p className="text-sm text-muted-foreground">{record.role}</p>
          </div>
          <Badge variant={
            record.status === 'active' ? 'success' :
            record.status === 'suspended' ? 'destructive' :
            'warning'
          }>
            {record.status}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Clearance Level</p>
              <Badge variant={
                record.clearanceLevel === 'high' ? 'default' :
                record.clearanceLevel === 'medium' ? 'secondary' :
                'outline'
              }>
                {record.clearanceLevel.toUpperCase()}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Type</p>
              <span className="text-sm capitalize">{record.type}</span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Authorized Sites</p>
            <div className="flex flex-wrap gap-2">
              {record.sites.map((site, index) => (
                <Badge key={index} variant="outline">
                  {site}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-between text-sm pt-4 border-t">
            <span className="text-muted-foreground">Last Access:</span>
            <span>{record.lastAccess}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const ZoneCard = ({ zone }: { zone: AccessZone }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium">{zone.name}</h3>
            <p className="text-sm text-muted-foreground">{zone.site}</p>
          </div>
          <Badge variant={
            zone.status === 'secure' ? 'success' :
            zone.status === 'alert' ? 'warning' :
            'destructive'
          }>
            {zone.status}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-lg font-medium">{zone.activeUsers}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Recent Accesses</p>
              <p className="text-lg font-medium">{zone.recentAccesses}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Restrictions</p>
            <div className="space-y-1">
              {zone.restrictions.map((restriction, index) => (
                <div key={index} className="flex items-center text-sm">
                  <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                  {restriction}
                </div>
              ))}
            </div>
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
            <h2 className="text-2xl font-bold tracking-tight">Access Control</h2>
            <p className="text-muted-foreground">
              Manage site access permissions and security
            </p>
          </div>
          <div className="flex space-x-2">
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
            <Button variant="outline">
              <KeyRound className="h-4 w-4 mr-2" />
              Access Logs
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{accessRecordsData.filter(r => r.status === 'active').length}</div>
              <p className="text-xs text-muted-foreground">
                Currently authorized
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Secure Zones</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {accessZonesData.filter(z => z.status === 'secure').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Of {accessZonesData.length} total zones
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Access Requests</CardTitle>
              <UserCog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Pending approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Last 24 hours
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {accessZonesData.map(zone => (
                  <ZoneCard key={zone.id} zone={zone} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Access Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {accessRecordsData.map(record => (
                  <AccessCard key={record.id} record={record} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default SiteAccessControl