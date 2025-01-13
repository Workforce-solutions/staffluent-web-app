import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
  HardHat,
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Calendar,
  User,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useGetAuditReportListQuery } from '@/services/safetyApi'
import { useShortCode } from '@/hooks/use-local-storage'
import { AuditReport } from '@/@types/safety'

export function SafetyAudits() {
  const short_code = useShortCode()
  const { data } = useGetAuditReportListQuery({ shortCode: short_code })
  return (
    <Layout>
      <Layout.Header className='border-b'>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-8 pb-8'>
        {/* Header */}
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Safety Audits</h2>
            <p className='text-muted-foreground'>
              Track and monitor safety audit results
            </p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className='grid gap-4 md:grid-cols-4'>
          <Card>
            <CardContent className='pt-6'>
              <div className='flex flex-col space-y-2'>
                <CheckCircle2 className='h-5 w-5 text-green-500' />
                <span className='text-2xl font-bold'>85%</span>
                <span className='text-sm text-muted-foreground'>
                  Average Score
                </span>
                <Progress value={85} className='h-2' />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <div className='flex flex-col space-y-2'>
                <ClipboardCheck className='h-5 w-5 text-blue-500' />
                <span className='text-2xl font-bold'>12</span>
                <span className='text-sm text-muted-foreground'>
                  Total Audits
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <div className='flex flex-col space-y-2'>
                <AlertTriangle className='h-5 w-5 text-yellow-500' />
                <span className='text-2xl font-bold'>3</span>
                <span className='text-sm text-muted-foreground'>
                  Open Findings
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='pt-6'>
              <div className='flex flex-col space-y-2'>
                <HardHat className='h-5 w-5 text-green-500' />
                <span className='text-2xl font-bold'>98%</span>
                <span className='text-sm text-muted-foreground'>
                  PPE Compliance
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audit List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-6'>
              {data?.data.map((audit: AuditReport) => (
                <div key={audit.id} className='rounded-lg border p-4'>
                  <div className='mb-4 flex items-start justify-between'>
                    <div>
                      <div className='flex items-center space-x-2'>
                        <h3 className='font-medium'>{audit.osha_compliance.title}</h3>
                        <Badge variant='outline'>{audit.id}</Badge>
                      </div>
                    </div>
                    <Badge
                      variant={
                        audit.status === 'completed'
                          ? 'success'
                          : audit.status === 'in_progress'
                            ? 'warning'
                            : 'secondary'
                      }
                    >
                      {audit.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className='mb-4 space-y-2'>
                    <p className='text-sm font-medium'>Findings:</p>
                    <ul className='list-inside list-disc text-sm text-muted-foreground'>
                      {audit.key_findings}
                    </ul>
                  </div>

                  <div className='flex items-center justify-between text-sm'>
                    <div className='flex items-center gap-4'>
                      <div className='flex items-center gap-2'>
                        <User className='h-4 w-4 text-muted-foreground' />
                        <span>{audit.audited.name}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Calendar className='h-4 w-4 text-muted-foreground' />
                        <span>{new Date(audit.audited_at).toISOString().split('T')[0]}</span>
                      </div>
                    </div>
                    {audit.score && (
                      <Badge variant='outline'>Score: {audit.score}%</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}

export default SafetyAudits