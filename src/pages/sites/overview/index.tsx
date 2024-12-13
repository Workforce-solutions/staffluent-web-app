import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Building2, Users, HardHat, Construction, AlertTriangle } from 'lucide-react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { Site, sitesData } from '../../../@types/site-management'
import { Progress } from '@/components/ui/progress'
import {useState} from "react";
import {AddSiteModal} from "./add-site";

const SiteOverview = () => {
    const mapCenter = { lat: 40.7128, lng: -74.0060 }
    const mapStyles = { height: '400px', width: '100%' }
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const SiteCard = ({ site }: { site: Site }) => (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-medium text-lg">{site.name}</h3>
                        <p className="text-sm text-muted-foreground">{site.address}</p>
                    </div>
                    <Badge variant={
                        site.status === 'active' ? 'success' :
                            site.status === 'maintenance' ? 'warning' :
                                'secondary'
                    }>
                        {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                    </Badge>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{site.progress}%</span>
                        </div>
                        <Progress value={site.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{site.workers} Workers</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <HardHat className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Safety: {site.safetyScore}%</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Current Phase:</span>
                            <span className="font-medium">{site.currentPhase}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    const SiteMetrics = () => (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Sites</CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{sitesData.length}</div>
                    <p className="text-xs text-muted-foreground">
                        Active and inactive sites
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    <Construction className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {sitesData.filter(site => site.status === 'active').length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Currently in progress
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Workers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {sitesData.reduce((acc, site) => acc + site.workers, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Across all sites
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Safety Incidents</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">
                        This month
                    </p>
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
                        <h2 className="text-2xl font-bold tracking-tight">Sites Overview</h2>
                        <p className="text-muted-foreground">
                            Manage and monitor all your construction sites
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <Input
                            placeholder="Search sites..."
                            className="w-full sm:w-64"
                            type="search"
                            // @ts-ignore
                            icon={<Search className="h-4 w-4" />}
                        />
                        <Button onClick={() => setIsAddModalOpen(true)}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Site
                        </Button>
                    </div>
                </div>

                <SiteMetrics />

                <Card>
                    <CardHeader>
                        <CardTitle>Site Locations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LoadScript googleMapsApiKey={'AIzaSyAEe-vcJ-r8w9FQdVEskAozi1v9cWy6YAA'}>
                            <GoogleMap
                                mapContainerStyle={mapStyles}
                                zoom={13}
                                center={mapCenter}
                            >
                                {sitesData.map(site => (
                                    <Marker
                                        key={site.id}
                                        position={site.location}
                                        title={site.name}
                                    />
                                ))}
                            </GoogleMap>
                        </LoadScript>
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sitesData.map(site => (
                        <SiteCard key={site.id} site={site} />
                    ))}
                </div>
            </Layout.Body>

            {isAddModalOpen && (
                <AddSiteModal
                    open={isAddModalOpen}
                    setOpen={setIsAddModalOpen}
                />
            )}
        </Layout>
    )
}

export default SiteOverview