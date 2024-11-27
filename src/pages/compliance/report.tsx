import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { columnsBreakViolations } from './data-column/breakviolations'
import { columnsOvertimeViolations } from './data-column/overtimeviolations'
import { columnsEmployeeSummary } from './data-column/employeeSummary'
import { useState } from 'react'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetComplianceReportsQuery } from '@/services/complianceApi'
import dayjs from 'dayjs'
import { useSearchParams } from 'react-router-dom'

export default function ComplianceReport() {
  const [searchParams] = useSearchParams()
  const department_id = searchParams.get('department_id')

  // the from and to is start of month and end of month
  const startDate = dayjs().startOf('month').format('YYYY-MM-DD')
  const endDate = dayjs().endOf('month').format('YYYY-MM-DD')
  // ... existing code ...
  const [dateRange, setDateRange] = useState({
    from: dayjs(startDate).toDate(),
    to: dayjs(endDate).toDate()
  });
  // ... existing code ...
  const venue_short_code: any = useShortCode()
  const { data: complianceReports } = useGetComplianceReportsQuery({ venue_short_code, start_date: dayjs(dateRange.from).format('YYYY-MM-DD'), end_date: dayjs(dateRange.to).format('YYYY-MM-DD'), department_id }, { skip: !dateRange.from || !dateRange.to })

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
            <h2 className='text-2xl font-bold tracking-tight'>
              Compliance Report
            </h2>
            <p className='text-muted-foreground'>
              View detailed compliance metrics and violations
            </p>
          </div>
          <div>
            <DateRangePicker
              value={dateRange}
              // @ts-ignore
              onValueChange={setDateRange}
            />
          </div>
        </div>

        <div className='mt-4 grid gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4 md:grid-cols-4'>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Total Hours
                  </p>
                  <p className='text-2xl font-bold'>
                    {complianceReports?.summary.total_hours}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Total Employees
                  </p>
                  <p className='text-2xl font-bold'>
                    {complianceReports?.summary.total_employees}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Overtime Hours
                  </p>
                  <p className='text-2xl font-bold'>
                    {complianceReports?.summary.total_overtime_hours}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Breaks Taken
                  </p>
                  <p className='text-2xl font-bold'>
                    {complianceReports?.summary.total_breaks_taken}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Departments Count
                  </p>
                  <p className='text-2xl font-bold'>
                    {complianceReports?.summary.departments_count}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Active Projects
                  </p>
                  <p className='text-2xl font-bold'>
                    {complianceReports?.summary.active_projects}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                <div>
                  <h3 className='mb-4 font-semibold'>Break Violations</h3>
                  <GenericTableWrapper
                    data={complianceReports?.compliance_issues.break_violations}
                    columns={columnsBreakViolations}
                  />
                </div>

                <div>
                  <h3 className='mb-4 font-semibold'>Overtime Violations</h3>
                  <GenericTableWrapper
                    data={complianceReports?.compliance_issues.overtime_violations}
                    columns={columnsOvertimeViolations}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Employee Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <GenericTableWrapper
                  data={complianceReports?.by_employee}
                  columns={columnsEmployeeSummary}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout.Body>
    </Layout>
  )
}
