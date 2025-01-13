import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, HardHat, Construction, Calendar, ArrowLeft } from 'lucide-react'
import { useShortCode } from '@/hooks/use-local-storage'
import { Progress } from '@/components/ui/progress'
import {
  useGetSiteDetailQuery,
} from '@/services/siteManagmentApi'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import NoticeView from './notice'
import RequirementView from './requirement'
import IssueView from './issue'
import ChecklistView from './checklist'

const SiteDetailPage = () => {
  const { id } = useParams()
  const shortCode = useShortCode()
  const navigate = useNavigate()
  const { data: site, isLoading } = useGetSiteDetailQuery({
    shortCode,
    id: Number(id),
  })

  
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!site) {
    return <div>Site not found</div>
  }

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-8'>
        <div className='flex items-center'>
          <Button variant='ghost' onClick={() => navigate(-1)}>
            <ArrowLeft className='mr-2 h-4 w-4' />
          </Button>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {site.data.name}
            </h2>
            <p className='text-muted-foreground'>{site.data.address.address}</p>
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Project Status
              </CardTitle>
              <Construction className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <Badge
                variant={
                  site.data.status === 'active'
                    ? 'success'
                    : site.data.status === 'maintenance'
                      ? 'warning'
                      : 'secondary'
                }
              >
                {site.data.status.toUpperCase()}
              </Badge>
              <div className='mt-4'>
                <div className='mb-2 flex justify-between text-sm'>
                  <span>Progress</span>
                  <span>{site.data.progress}%</span>
                </div>
                <Progress value={site.data.progress} className='h-2' />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Workforce</CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {site.data.no_of_workers}
              </div>
              <p className='text-xs text-muted-foreground'>
                Active workers on site
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Safety Score
              </CardTitle>
              <HardHat className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {site.data.safety_score ?? 0}%
              </div>
              <p className='text-xs text-muted-foreground'>
                Current safety rating
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Timeline</CardTitle>
              <Calendar className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='text-sm'>
                  <span className='text-muted-foreground'>Start: </span>
                  {site.data.start_date}
                </div>
                <div className='text-sm'>
                  <span className='text-muted-foreground'>End: </span>
                  {site.data.end_date}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Site Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div>
                <h4 className='font-medium'>Site Manager</h4>
                <p className='text-sm'>{site.data.site_manager}</p>
              </div>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <h4 className='text-sm font-medium'>Contact Email</h4>
                  <p className='text-sm text-muted-foreground'>
                    {site.data.site_manager_email ?? '-'}
                  </p>
                </div>
                <div>
                  <h4 className='text-sm font-medium'>Contact Phone</h4>
                  <p className='text-sm text-muted-foreground'>
                    {site.data.site_manager_phone ?? '-'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <IssueView siteId={Number(id)} />
        <RequirementView siteId={Number(id)} />
        <NoticeView siteId={Number(id)} />
        <ChecklistView siteId={Number(id)} />

      </Layout.Body>
    </Layout>
  )
}

export default SiteDetailPage
