import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Input } from '@/components/ui/input'
import { Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    ServiceAreasMap,
    ServiceAreaCard,
    CoverageOverview,
    serviceAreasData
} from '@/components/maps/dashboard-map'

const ServiceAreasView = () => {
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
                        <h2 className="text-2xl font-bold tracking-tight">Service Areas</h2>
                        <p className="text-muted-foreground">
                            Manage and monitor your service coverage areas
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <Input
                            placeholder="Search areas..."
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

                <CoverageOverview />

                <ServiceAreasMap />

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {serviceAreasData.map(area => (
                        <ServiceAreaCard key={area.id} area={area} />
                    ))}
                </div>
            </Layout.Body>
        </Layout>
    )
}

export default ServiceAreasView