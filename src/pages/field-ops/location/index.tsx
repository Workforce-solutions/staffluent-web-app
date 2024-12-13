import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Input } from '@/components/ui/input'
import { Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import { TeamLocationMap, TeamLocationCard, teamLocationsData } from '@/components/maps/dashboard-map'

const TeamLocationView = () => {
    const [ setIsMapLoading] = useState(true)
    const [mapError, setMapError] = useState(false)

    return (
        <Layout>
            <Layout.Header className="border-b">
                <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-8 pb-8">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Team Locations</h2>
                        <p className="text-muted-foreground">
                            Track and manage your field team locations in real-time
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search teams..."
                                className="w-full pl-8 sm:w-64"
                                type="search"
                            />
                        </div>
                        <Button variant="outline">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardContent className="p-0">
                        {mapError ? (
                            <div className="flex items-center justify-center h-[400px] bg-muted/10">
                                <div className="text-center">
                                    <p className="text-muted-foreground">Unable to load map</p>
                                    <Button
                                        variant="outline"
                                        className="mt-4"
                                        onClick={() => {
                                            setMapError(false)
                                            // @ts-ignore
                                            setIsMapLoading(true)
                                        }}
                                    >
                                        Retry
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                <TeamLocationMap />
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {teamLocationsData.map(team => (
                        <TeamLocationCard key={team.id} team={team} />
                    ))}
                </div>
            </Layout.Body>

        </Layout>
    )
}

export default TeamLocationView