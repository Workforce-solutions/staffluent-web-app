import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useAllTimeEntriesQuery } from '@/services/projectApi'
import { useShortCode } from "../../../hooks/use-local-storage"
import TimeEntriesDashboard from '@/components/time-entries-dashboard'

export default function TimeEntries() {
    const venue_short_code = useShortCode()
    const { data: timeEntriesResponse} = useAllTimeEntriesQuery({
        venue_short_code,
    })

    return (
        <Layout>
            <Layout.Header sticky>
                <div className='ml-auto flex items-center space-x-2'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <TimeEntriesDashboard
                    timeEntries={timeEntriesResponse?.data ?? []}
                />
            </Layout.Body>
        </Layout>
    )
}