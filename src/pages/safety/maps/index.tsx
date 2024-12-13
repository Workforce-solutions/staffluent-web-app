import React from 'react'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Map,
  AlertTriangle,
  Shield,
  HardHat,
  Eye,
  Download,
  Printer,
  Plus,
  MapPin,
  FileCheck
} from 'lucide-react'
import { GoogleMap, LoadScript, Marker, Circle, Polygon } from '@react-google-maps/api'

// Types
interface SafetyZone {
  id: number
  name: string
  type: 'restricted' | 'hazard' | 'assembly' | 'exit'
  status: 'active' | 'temporary' | 'cleared'
  coordinates: { lat: number; lng: number }
  radius?: number
  boundaries?: Array<{ lat: number; lng: number }>
  description: string
  lastUpdated: string
  restrictions: string[]
}

interface SafetyMap {
  id: number
  site: string
  version: string
  status: 'current' | 'draft' | 'archived'
  lastUpdated: string
  zones: SafetyZone[]
  emergencyRoutes: Array<{
    name: string
    points: Array<{ lat: number; lng: number }>
  }>
}

// Demo data
const safetyMapsData: SafetyMap[] = [
  {
    id: 1,
    site: "Downtown Plaza Project",
    version: "2.3",
    status: "current",
    lastUpdated: "2024-02-15",
    zones: [
      {
        id: 1,
        name: "Main Construction Area",
        type: "restricted",
        status: "active",
        coordinates: { lat: 40.7128, lng: -74.0060 },
        radius: 100,
        description: "Heavy machinery operation zone",
        lastUpdated: "2024-02-15",
        restrictions: ["PPE Required", "Authorized Personnel Only"]
      },
      {
        id: 2,
        name: "Emergency Assembly Point",
        type: "assembly",
        status: "active",
        coordinates: { lat: 40.7138, lng: -74.0070 },
        radius: 50,
        description: "Primary assembly point",
        lastUpdated: "2024-02-15",
        restrictions: ["Keep Clear", "No Storage"]
      }
    ],
    emergencyRoutes: [
      {
        name: "Primary Evacuation Route",
        points: [
          { lat: 40.7128, lng: -74.0060 },
          { lat: 40.7138, lng: -74.0070 },
        ]
      }
    ]
  }
]

const SiteSafetyMaps = () => {
  const MapCard = ({ map }: { map: SafetyMap }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium">{map.site}</h3>
            <p className="text-sm text-muted-foreground">Version {map.version}</p>
          </div>
          <Badge variant={
            map.status === 'current' ? 'success' :
            map.status === 'draft' ? 'warning' :
            'secondary'
          }>
            {map.status}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="h-[200px] relative rounded-lg overflow-hidden">
            <LoadScript googleMapsApiKey={'YOUR_GOOGLE_MAPS_API_KEY'}>
              <GoogleMap
                mapContainerStyle={{ height: '100%', width: '100%' }}
                zoom={15}
                center={map.zones[0]?.coordinates}
              >
                {map.zones.map(zone => (
                  <React.Fragment key={zone.id}>
                    {zone.radius ? (
                      <Circle
                        center={zone.coordinates}
                        radius={zone.radius}
                        options={{
                          fillColor: zone.type === 'restricted' ? '#ef4444' :
                                   zone.type === 'hazard' ? '#f59e0b' :
                                   zone.type === 'assembly' ? '#22c55e' :
                                   '#3b82f6',
                          fillOpacity: 0.3,
                          strokeColor: zone.type === 'restricted' ? '#dc2626' :
                                     zone.type === 'hazard' ? '#d97706' :
                                     zone.type === 'assembly' ? '#16a34a' :
                                     '#2563eb',
                          strokeWeight: 2
                        }}
                      />
                    ) : zone.boundaries ? (
                      <Polygon
                        paths={zone.boundaries}
                        options={{
                          fillColor: '#ef4444',
                          fillOpacity: 0.3,
                          strokeColor: '#dc2626',
                          strokeWeight: 2
                        }}
                      />
                    ) : (
                      <Marker
                        position={zone.coordinates}
                        title={zone.name}
                      />
                    )}
                  </React.Fragment>
                ))}
              </GoogleMap>
            </LoadScript>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="text-muted-foreground">Safety Zones</p>
              <div className="space-y-1">
                {map.zones.map(zone => (
                  <div key={zone.id} className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
    zone.type === 'restricted' ? 'bg-red-500' :
        zone.type === 'hazard' ? 'bg-yellow-500' :
            zone.type === 'assembly' ? 'bg-green-500' :
                'bg-blue-500'
}`} />
                    <span>{zone.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">Emergency Routes</p>
              <div className="space-y-1">
                {map.emergencyRoutes.map((route, index) => (
                  <div key={index} className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                    <span>{route.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 mt-4 border-t">
            <div className="flex items-center text-sm text-muted-foreground">
              <FileCheck className="h-4 w-4 mr-2" />
              Updated: {map.lastUpdated}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
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
            <h2 className="text-2xl font-bold tracking-tight">Site Safety Maps</h2>
            <p className="text-muted-foreground">
              Manage and monitor site safety zones and emergency routes
            </p>
          </div>
          <div className="flex space-x-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Map
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Maps</CardTitle>
              <Map className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {safetyMapsData.filter(m => m.status === 'current').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Current safety maps
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hazard Zones</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {safetyMapsData.reduce((sum, map) => 
                  sum + map.zones.filter(z => z.type === 'hazard').length, 0
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Active hazard areas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Safety Zones</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {safetyMapsData.reduce((sum, map) => sum + map.zones.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total marked zones
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">PPE Requirements</CardTitle>
              <HardHat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Active requirements
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="Search maps..."
            className="max-w-sm"
          />
          <Button variant="outline">
            Filter
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {safetyMapsData.map(map => (
            <MapCard key={map.id} map={map} />
          ))}
        </div>
      </Layout.Body>
    </Layout>
  )
}

export default SiteSafetyMaps