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
  BarChart,
  Loader2
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetEquipmentQuery } from '@/services/siteManagmentApi'
import { Equipment } from '@/@types/site-management'
import { useState } from 'react'
import { AddEquipmentModal } from './addEditEquipment'
import { useDebounce } from '@/pages/clients/client-projects'
import { format } from 'date-fns'



const AssetTracking = () => {
  const short_code = useShortCode()
  const [page, setPage] = useState(1)
  const [perPage, _] = useState(20)
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  const [equipmentEdit, setEquipmentEdit] = useState<Equipment | undefined>(undefined)
  const {data: equipment, refetch, isFetching} = useGetEquipmentQuery({shortCode: short_code, search: debouncedSearch, page: page, perPage: perPage});

  const AssetCard = ({ asset }: { asset: Equipment }) => (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium">{asset.name}</h3>
              <p className="text-sm text-muted-foreground">
                {asset.type} • {asset.serial_number}
              </p>
            </div>
            <Badge variant={
              asset.status === 'available' ? 'success' :
              asset.status === 'maintenance' ? 'warning' :
              'destructive'
            }>
              {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
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
                  <span>{asset.location || '-'}</span>
                </div>
                <div className="flex items-center">
                  <Settings className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Next Service: {asset.next_maintenance_due? format(new Date(asset.next_maintenance_due), 'yyyy-MM-dd') : '-'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Timer className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Last Service: {asset.last_maintenance_date? format(new Date(asset.last_maintenance_date), 'yyyy-MM-dd') : '-'}</span>
                </div>
                <div className="flex items-center">
                  <QrCode className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>ID: {asset.serial_number}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 mt-4 border-t">
            <div className="text-sm">
              <span className="text-muted-foreground">Assigned to: </span>
              <span>{asset.assignedTo || 'Unassigned'}</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => {
                setOpen(true)
                setEquipmentEdit(asset)
              }}>Edit</Button>
              <Button variant="outline" size="sm">View Details</Button>
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
            <h2 className="text-2xl font-bold tracking-tight">Asset Tracking</h2>
            <p className="text-muted-foreground">
              Monitor and manage your equipment fleet
            </p>
          </div>
          <div className="flex space-x-2">
              <Button onClick={() => {
                setOpen(true)
                setEquipmentEdit(undefined)
              }}>
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
              <div className="text-2xl font-bold">{equipment?.pagination.total ?? 0}</div>
              <p className="text-xs text-muted-foreground">
                {equipment?.active_equipment ?? 0} active
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
                ${equipment?.total_purchase_cost ?? 0}
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline">
            Filter
          </Button>
        </div>

        {isFetching && <div className="flex justify-center items-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>}
        <div 
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          onScroll={(e) => {
            const element = e.target as HTMLDivElement;
            if (equipment && element.scrollHeight - element.scrollTop === element.clientHeight && equipment?.data.length < equipment?.pagination.total
            ) {
              setPage((prev) => prev + 1);
            }
          }}
          style={{ maxHeight: "calc(100vh - 400px)", overflowY: "auto" }}
        >
          {equipment?.data.map((asset: Equipment) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>

        <AddEquipmentModal open={open} setOpen={setOpen} equipment={equipmentEdit} refetch={refetch} />
      </Layout.Body>
    </Layout>
  )
}

export default AssetTracking