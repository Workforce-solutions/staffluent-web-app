import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Boxes,
  Activity,
  MapPin,
  Timer,
  Settings,
  QrCode,
  BarChart
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'

// Types
interface Asset {
  id: number
  name: string
  type: string
  serialNumber: string
  status: 'active' | 'maintenance' | 'offline'
  location: string
  assignedTo: string | null
  lastMaintenance: string
  nextMaintenance: string
  utilization: number
  healthScore: number
  purchaseDate: string
  value: number
}

// Demo data
const assetsData: Asset[] = [
  {
    id: 1,
    name: "Excavator XC-200",
    type: "Heavy Equipment",
    serialNumber: "EX-2024-001",
    status: "active",
    location: "Downtown Plaza Site",
    assignedTo: "John Operator",
    lastMaintenance: "2024-02-01",
    nextMaintenance: "2024-03-15",
    utilization: 85,
    healthScore: 92,
    purchaseDate: "2023-06-15",
    value: 150000
  },
  {
    id: 2,
    name: "Concrete Mixer CM-100",
    type: "Construction Equipment",
    serialNumber: "CM-2023-045",
    status: "maintenance",
    location: "Maintenance Bay",
    assignedTo: null,
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-02-15",
    utilization: 0,
    healthScore: 75,
    purchaseDate: "2023-03-10",
    value: 75000
  },
  {
    id: 3,
    name: "Crane RT-300",
    type: "Heavy Equipment",
    serialNumber: "CR-2024-007",
    status: "active",
    location: "Tech Park Site",
    assignedTo: "Sarah Crane",
    lastMaintenance: "2024-02-10",
    nextMaintenance: "2024-03-25",
    utilization: 92,
    healthScore: 88,
    purchaseDate: "2023-09-20",
    value: 250000
  }
]

const AssetTracking = () => {
  const AssetCard = ({ asset }: { asset: Asset }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium">{asset.name}</h3>
            <p className="text-sm text-muted-foreground">
              {asset.type} • {asset.serialNumber}
            </p>
          </div>
          <Badge variant={
            asset.status === 'active' ? 'success' :
            asset.status === 'maintenance' ? 'warning' :
            'destructive'
          }>
            {asset.status}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Health Score</span>
                <span>{asset.healthScore}%</span>
              </div>
              <Progress value={asset.healthScore} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Utilization</span>
                <span>{asset.utilization}%</span>
              </div>
              <Progress value={asset.utilization} className="h-2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{asset.location}</span>
              </div>
              <div className="flex items-center">
                <Settings className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Next Service: {asset.nextMaintenance}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Timer className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Last Service: {asset.lastMaintenance}</span>
              </div>
              <div className="flex items-center">
                <QrCode className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>ID: {asset.serialNumber}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 mt-4 border-t">
          <div className="text-sm">
            <span className="text-muted-foreground">Assigned to: </span>
            <span>{asset.assignedTo || 'Unassigned'}</span>
          </div>
          <Button variant="outline" size="sm">View Details</Button>
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
            <h2 className="text-2xl font-bold tracking-tight">Asset Tracking</h2>
            <p className="text-muted-foreground">
              Monitor and manage your equipment fleet
            </p>
          </div>
          <div className="flex space-x-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
            <Button variant="outline">
              <BarChart className="h-4 w-4 mr-2" />
              Reports
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <Boxes className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assetsData.length}</div>
              <p className="text-xs text-muted-foreground">
                {assetsData.filter(a => a.status === 'active').length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fleet Value</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${assetsData.reduce((sum, asset) => sum + asset.value, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Total equipment value
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                Average across fleet
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Next 30 days
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="Search assets..."
            className="max-w-sm"
          />
          <Button variant="outline">
            Filter
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assetsData.map(asset => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default AssetTracking