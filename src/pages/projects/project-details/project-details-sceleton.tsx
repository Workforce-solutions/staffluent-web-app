import { Layout } from '@/components/custom/layout'
import { Skeleton } from '@/components/ui/skeleton'

export function ProjectDetailsSkeleton() {
  return (
    <Layout>
      <Layout.Header>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-8 w-8' />
          <div>
            <Skeleton className='h-8 w-48' />
            <Skeleton className='mt-1 h-4 w-32' />
          </div>
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='space-y-6'>
          <Skeleton className='h-[200px] w-full' />
          <div className='grid gap-6 md:grid-cols-3'>
            <Skeleton className='h-[120px]' />
            <Skeleton className='h-[120px]' />
            <Skeleton className='h-[120px]' />
          </div>
        </div>
      </Layout.Body>
    </Layout>
  )
}
