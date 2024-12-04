import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Clock, AlertCircle } from 'lucide-react'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

import { Link } from 'react-router-dom'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { columnsViolations } from './data-column/violations'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetComplianceStatusQuery } from '@/services/complianceApi'

export default function ComplianceScreen() {

  const short_code = useShortCode()
  const { data: complianceStatus } = useGetComplianceStatusQuery({ venue_short_code: short_code, })

  return (
    <Layout>
      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-2'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Compliance</h2>
            <p className='text-muted-foreground'>
              Monitor compliance metrics and violations
            </p>
          </div>
        </div>

        <div className='mt-4 grid gap-4 md:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Employees</CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{complianceStatus?.overview.total_employees}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Break Compliance</CardTitle>
              <Clock className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-sm text-muted-foreground'>Required Breaks:</span>
                  <span className='font-medium'>{complianceStatus?.break_compliance.total_required_breaks}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm text-muted-foreground'>Taken Breaks:</span>
                  <span className='font-medium'>{complianceStatus?.break_compliance.total_taken_breaks}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm text-muted-foreground'>Missing Breaks:</span>
                  <span className='font-medium'>{complianceStatus?.break_compliance.missing_meal_breaks}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Overtime Compliance</CardTitle>
              <AlertCircle className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-sm text-muted-foreground'>Unapproved:</span>
                  <span className='font-medium'>{complianceStatus?.overtime_compliance?.unapproved_overtime}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm text-muted-foreground'>Excessive Hours:</span>
                  <span className='font-medium'>{complianceStatus?.overtime_compliance?.excessive_hours}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm text-muted-foreground'>Pending Approval:</span>
                  <span className='font-medium'>{complianceStatus?.overtime_compliance?.pending_approval}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className='mt-4'>
          <CardHeader>
            <CardTitle>Violations</CardTitle>
          </CardHeader>
          <CardContent>
            <GenericTableWrapper
              data={complianceStatus?.violations_by_department}
              columns={columnsViolations}
            />
          </CardContent>
        </Card>

        <div className='mt-4 flex justify-end'>
          <Button asChild>
            <Link to={`/compliance/report${complianceStatus?.violations_by_department[0]?.department_id ? `?department_id=${complianceStatus.violations_by_department[0]?.department_id}` : ''}`}>View Compliance Report</Link>
          </Button>
        </div>
      </Layout.Body>
    </Layout>
  )
}
