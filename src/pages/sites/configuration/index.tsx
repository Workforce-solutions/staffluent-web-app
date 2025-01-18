import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Search,
    Filter,
    Wrench,
    HardDrive,
    AlertCircle,
    Settings,
    Users, Calendar
} from 'lucide-react'
import {Site, sitesData} from '@/@types/site-management'

const SiteConfiguration = () => {
    const MaintenanceSchedule = () => (
        <Card>
            <CardHeader>
                <CardTitle>Maintenance Schedule</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {sitesData
                        .flatMap(site =>
                            site.equipment.map(equip => ({
                                ...equip,
                                siteName: site.name
                            }))
                        )
                        .sort((a, b) =>
                            new Date(a.nextMaintenance).getTime() - new Date(b.nextMaintenance).getTime()
                        )
                        // @ts-ignore
                        .map((equipment) => (
                            <div key={equipment.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-muted rounded-full">
                                        <Settings className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">{equipment.name}</h4>
                                        <p className="text-sm text-muted-foreground">{equipment.siteName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{equipment.nextMaintenance}</p>
                                        <p className="text-xs text-muted-foreground">Next Service</p>
                                    </div>
                                    <Badge variant={
                                        equipment.status === 'operational' ? 'success' :
                                            equipment.status === 'maintenance' ? 'warning' :
                                                'destructive'
                                    }>
                                        {equipment.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                </div>
            </CardContent>
        </Card>
    )

    const EquipmentCard = ({ equipment, siteName }: {
        equipment: Site['equipment'][0],
        siteName: string
    }) => (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-medium">{equipment.name}</h3>
                        <p className="text-sm text-muted-foreground">Site: {siteName}</p>
                    </div>
                    <Badge variant={
                        equipment.status === 'operational' ? 'success' :
                            equipment.status === 'maintenance' ? 'warning' :
                                'destructive'
                    }>
                        {equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1)}
                    </Badge>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center text-sm">
                        <Wrench className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Last Maintenance: {equipment.lastMaintenance}</span>
                    </div>
                    <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Next Maintenance: {equipment.nextMaintenance}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    const SiteConfigMetrics = () => (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Equipment Count</CardTitle>
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {sitesData.reduce((acc, site) => acc + site.equipment.length, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">Total equipment across sites</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Maintenance</CardTitle>
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {sitesData.reduce((acc, site) =>
                            acc + site.equipment.filter(e => e.status === 'maintenance').length, 0
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground">Equipment in maintenance</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Site Managers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{sitesData.length}</div>
                    <p className="text-xs text-muted-foreground">Active managers</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Configuration Alerts</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
            </Card>
        </div>
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
                        <h2 className="text-2xl font-bold tracking-tight">Site Configuration</h2>
                        <p className="text-muted-foreground">
                            Manage equipment and maintenance schedules
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <Input
                            placeholder="Search equipment..."
                            className="w-full sm:w-64"
                            type="search"
                            // @ts-ignore
                            icon={<Search className="h-4 w-4" />}
                        />
                        <Button variant="outline">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                        </Button>
                    </div>
                </div>

                <SiteConfigMetrics />
                <MaintenanceSchedule />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sitesData.flatMap(site =>
                        site.equipment.map(equip => (
                            <EquipmentCard
                                key={equip.id}
                                // @ts-ignore
                                equipment={equip}
                                siteName={site.name}
                            />
                        ))
                    )}
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default SiteConfiguration