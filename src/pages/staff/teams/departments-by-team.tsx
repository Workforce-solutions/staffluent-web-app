import { Layout } from '@/components/custom/layout'
import { Button } from '@/components/custom/button'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetDepartmentsByTeamQuery } from '@/services/staffApi'
import { useParams } from 'react-router-dom'
import { Users, Folders, GitBranch, Target, PlusIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import EmptyState from '@/components/table/empty-state'

export default function TeamDepartments() {
  const { id } = useParams()
  const short_code = useShortCode()

  const { data, isLoading, isError } = useGetDepartmentsByTeamQuery({
    id: Number(id),
    venue_short_code: short_code,
  })

  if (isLoading || isError) {
    return <EmptyState isLoading={isLoading} isError={isError} />
  }

  // @ts-ignore
  const DepartmentStats = ({ department }) => (
      <div className='flex items-center space-x-6'>
        {/* Employees Stats */}
        <div className='flex items-center gap-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900'>
            <Users className='h-4 w-4 text-blue-600 dark:text-blue-300' />
          </div>
          <div className='flex flex-col'>
          <span className='text-xs font-medium text-muted-foreground'>
            Employees
          </span>
            <span className='text-sm font-bold text-blue-600 dark:text-blue-300'>
            {department.stats?.employees_count
                ? department.stats.employees_count.toLocaleString()
                : '—'}
          </span>
          </div>
        </div>

        {/* Teams Stats */}
        <div className='flex items-center gap-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900'>
            <Folders className='h-4 w-4 text-green-600 dark:text-green-300' />
          </div>
          <div className='flex flex-col'>
          <span className='text-xs font-medium text-muted-foreground'>
            Teams
          </span>
            <span className='text-sm font-bold text-green-600 dark:text-green-300'>
            {department.stats?.teams_count
                ? department.stats.teams_count.toLocaleString()
                : '—'}
          </span>
          </div>
        </div>

        {/* Projects Stats */}
        <div className='flex items-center gap-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900'>
            <Target className='h-4 w-4 text-purple-600 dark:text-purple-300' />
          </div>
          <div className='flex flex-col'>
          <span className='text-xs font-medium text-muted-foreground'>
            Projects
          </span>
            <span className='text-sm font-bold text-purple-600 dark:text-purple-300'>
            {department.stats?.projects_count
                ? department.stats.projects_count.toLocaleString()
                : '—'}
          </span>
          </div>
        </div>
      </div>
  )

  // @ts-ignore
  const DepartmentCard = ({ department, isPrimary = false }) => (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">{department.name}</CardTitle>
            {isPrimary && (
                <Badge className="mt-1" variant="default">
                  Primary Department
                </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {department.description || 'No description provided'}
          </p>
          <DepartmentStats department={department} />
        </CardContent>
      </Card>
  )

  return (
      <Layout>
        <Layout.Header>
          <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </Layout.Header>

        <Layout.Body className='space-y-8'>
          <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>Team Departments</h2>
              <p className='text-muted-foreground'>
                Manage team's primary and additional departments
              </p>
            </div>
            <Button className='flex items-center gap-2'>
              <PlusIcon className='h-4 w-4' />
              Add Department
            </Button>
          </div>

          <div className="space-y-6">
            {/* Primary Department */}
            {/*// @ts-ignore*/}
            {data?.primary_department && (
                <DepartmentCard
                    // @ts-ignore
                    department={data.primary_department}
                    isPrimary={true}
                />
            )}

            {/* Additional Departments */}
            {/*// @ts-ignore*/}
            {data?.additional_departments?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Departments</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {/*// @ts-ignore*/}
                    {data.additional_departments.map(department => (
                        <DepartmentCard
                            key={department.id}
                            department={department}
                        />
                    ))}
                  </div>
                </div>
            )}

            {/* Empty State for Additional Departments */}
            {/*// @ts-ignore*/}
            {(!data?.additional_departments?.length && data?.primary_department) && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center space-y-2 py-8 text-center">
                      <GitBranch className="h-8 w-8 text-muted-foreground" />
                      <p className="text-lg font-medium">No Additional Departments</p>
                      <p className="text-sm text-muted-foreground">
                        This team doesn't have any additional departments assigned.
                      </p>
                    </div>
                  </CardContent>
                </Card>
            )}
          </div>
        </Layout.Body>
      </Layout>
  )
}