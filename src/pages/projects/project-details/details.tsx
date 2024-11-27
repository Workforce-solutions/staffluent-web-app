import EmptyBlock from '@/components/cards/empty-block'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetProjectQuery } from '@/services/projectApi'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ConnectProjectService from './connect-project-service'
import OverviewCard from './overview-card'
import { ProjectDetailsSkeleton } from './project-details-sceleton'
import ProjectShortcuts from './project-shortcusts'
import SidebarContent from './sidebar-content'

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const short_code = useShortCode()

  const {
    data: project,
    isFetching,
    refetch,
  } = useGetProjectQuery({
    id: Number(id),
    venue_short_code: short_code,
  })
  const [openConnectServiceModal, setOpenConnectServiceModal] = useState(false)

  if (isFetching) {
    return <ProjectDetailsSkeleton />
  }

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <Layout>
      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-2'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-3 flex items-center justify-between'>
          <div>
            <div className='flex items-center gap-2'>
              <ChevronLeft
                className='cursor-pointer'
                onClick={() => navigate('/projects/list')}
              />
              <h2 className='text-2xl font-bold tracking-tight'>
                {project.name}
              </h2>
            </div>
            <p className='text-sm text-muted-foreground'>Project Details</p>
          </div>
        </div>
        <div className='grid gap-6 md:grid-cols-7'>
          {/* Main Content - 5 columns */}
          <div className='space-y-6 md:col-span-5'>
            <OverviewCard
              project={project}
              tasks={project?.tasks}
              isFetching={isFetching}
              onSuccess={refetch}
            />

            {project.service === null && (
              <EmptyBlock
                onClick={() => setOpenConnectServiceModal(true)}
                title='Add Service Request'
                description='There is no active job service request connected with this project. Please connect one.'
                topDescription='No active job service request'
              >
                <ConnectProjectService
                  setOpen={setOpenConnectServiceModal}
                  open={openConnectServiceModal}
                />
              </EmptyBlock>
            )}
          </div>

          {/* Sidebar - 2 columns */}
          <SidebarContent project={project} />
        </div>
        <div className='mt-6'>
          <ProjectShortcuts />
        </div>
      </Layout.Body>
    </Layout>
  )
}
