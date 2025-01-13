import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  ClipboardCheck,
  Clock,
  Calendar,
} from 'lucide-react'
import { useState } from 'react'
import { AddEditOSHAModal } from './addEdit'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetOshaComplianceQuery } from '@/services/safetyApi'
import { OshaCompliance } from '@/@types/safety'

// Types
interface ComplianceRequirement {
  id: number
  title: string
  category: string
  status: 'compliant' | 'non-compliant' | 'pending'
  lastInspection: string
  nextInspection: string
  assignedTo: string
  violations: number
  requirements: string[]
  actions: string[]
}

// Demo data
const complianceData: ComplianceRequirement[] = [
  {
    id: 1,
    title: 'Fall Protection Standards',
    category: 'Safety Equipment',
    status: 'compliant',
    lastInspection: '2024-02-15',
    nextInspection: '2024-03-15',
    assignedTo: 'Sarah Safety',
    violations: 0,
    requirements: [
      'Guardrails on all elevated platforms',
      'Personal fall arrest systems',
      'Safety net systems',
      'Regular equipment inspection',
    ],
    actions: [
      'Weekly safety harness inspections',
      'Monthly guardrail maintenance',
      'Quarterly staff training',
    ],
  },
  {
    id: 2,
    title: 'Hazard Communication',
    category: 'Documentation',
    status: 'pending',
    lastInspection: '2024-02-01',
    nextInspection: '2024-03-01',
    assignedTo: 'Mike Handler',
    violations: 1,
    requirements: [
      'Written hazard communication program',
      'Chemical inventory list',
      'Safety Data Sheets (SDS)',
      'Employee training records',
    ],
    actions: [
      'Update SDS database',
      'Conduct employee training',
      'Review chemical storage',
    ],
  },
  {
    id: 3,
    title: 'Personal Protective Equipment',
    category: 'Safety Equipment',
    status: 'non-compliant',
    lastInspection: '2024-02-10',
    nextInspection: '2024-03-10',
    assignedTo: 'John Safety',
    violations: 2,
    requirements: [
      'Hard hats in construction areas',
      'Safety glasses for all workers',
      'Steel-toed boots requirement',
      'High-visibility clothing',
    ],
    actions: [
      'Order new PPE supplies',
      'Update PPE training program',
      'Implement daily PPE checks',
    ],
  },
]

const OSHACompliance = () => {
  const [open, setOpen] = useState(false)

  const short_code = useShortCode()
  const { data } = useGetOshaComplianceQuery({
    shortCode: short_code,
  })

  const ComplianceCard = ({ requirement }: { requirement: OshaCompliance }) => (
    <Card>
      <CardContent className='pt-6'>
        <div className='mb-4 flex items-start justify-between'>
          <div>
            <h3 className='font-medium'>{requirement.title}</h3>
            <p className='text-sm text-muted-foreground'>
              {requirement.category}
            </p>
          </div>
          <Badge
            variant={
              requirement.status === 'compliant'
                ? 'success'
                : requirement.status === 'pending'
                  ? 'warning'
                  : 'destructive'
            }
          >
            {requirement.status}
          </Badge>
        </div>

        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>Last Inspection</p>
              <div className='flex items-center'>
                <Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
                <span className='text-sm'>
                  {requirement.last_inspection_date}
                </span>
              </div>
            </div>
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>Next Inspection</p>
              <div className='flex items-center'>
                <Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
                <span className='text-sm'>
                  {requirement.next_inspection_date}
                </span>
              </div>
            </div>
          </div>

          {requirement.requirements.length > 0 && (
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>Requirements</p>
              <div className='space-y-1'>
                {requirement.requirements.map((req: string, index: number) => (
                  <div key={index} className='flex items-start text-sm'>
                    <ShieldCheck className='mr-2 mt-1 h-4 w-4 text-muted-foreground' />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {requirement.required_actions.length > 0 && (
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>Required Actions</p>
              <div className='space-y-1'>
                {requirement.required_actions.map(
                  (action: string, index: number) => (
                    <div key={index} className='flex items-start text-sm'>
                      <AlertTriangle className='mr-2 mt-1 h-4 w-4 text-yellow-500' />
                      <span>{action}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <div className='mt-4 flex items-center justify-between border-t pt-4 text-sm'>
            <div className='flex items-center'>
              <Clock className='mr-2 h-4 w-4 text-muted-foreground' />
              <span>Assigned to: {requirement.assigned?.name}</span>
            </div>
            <Button variant='outline' size='sm'>
              View Details
            </Button>
          </div>
        </div>
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
            <h2 className='text-2xl font-bold tracking-tight'>
              OSHA Compliance
            </h2>
            <p className='text-muted-foreground'>
              Track and manage OSHA safety requirements
            </p>
          </div>
          <div className='flex space-x-2'>
            <Button onClick={() => setOpen(true)}>
              <Plus className='mr-2 h-4 w-4' />
              Add Requirement
            </Button>
            <Button variant='outline'>
              <FileCheck className='mr-2 h-4 w-4' />
              Run Audit
            </Button>
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Compliance Rate
              </CardTitle>
              <ShieldCheck className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {Math.round(
                  (complianceData.filter((d) => d.status === 'compliant')
                    .length /
                    complianceData.length) *
                    100
                )}
                %
              </div>
              <p className='text-xs text-muted-foreground'>
                Overall compliance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Open Violations
              </CardTitle>
              <AlertTriangle className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {complianceData.reduce((sum, d) => sum + d.violations, 0)}
              </div>
              <p className='text-xs text-muted-foreground'>Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Inspections Due
              </CardTitle>
              <ClipboardCheck className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>5</div>
              <p className='text-xs text-muted-foreground'>Next 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Last Audit</CardTitle>
              <Clock className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>7d</div>
              <p className='text-xs text-muted-foreground'>Days ago</p>
            </CardContent>
          </Card>
        </div>

        <div className='flex space-x-2'>
          <Input placeholder='Search requirements...' className='max-w-sm' />
          <Button variant='outline'>Filter</Button>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {data?.data.map((requirement) => (
            <ComplianceCard key={requirement.id} requirement={requirement} />
          ))}
        </div>
        <AddEditOSHAModal open={open} setOpen={setOpen} />
      </Layout.Body>
    </Layout>
  )
}

export default OSHACompliance
