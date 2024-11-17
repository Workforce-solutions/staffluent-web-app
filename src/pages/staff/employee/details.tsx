/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useParams, useNavigate } from 'react-router-dom'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/custom/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetEmployeeByIdQuery } from '@/services/staffApi'
import { useUpdateEmployeeStatusMutation } from '@/services/staffApi'
import { getStatusColor } from '@/hooks/common/common-functions'
import { AddEditEmployeeModal } from './add-edit-employee'
import { useToast } from '@/components/ui/use-toast'
import {
  BriefcaseIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  CalendarIcon,
  UserIcon,
  AlertCircleIcon,
} from 'lucide-react'
import { format } from 'date-fns'
import { LocationNames } from '@/components/staff/location-names'
import { ActivityFeed } from '@/components/staff/activity-feed'
import { useGetStaffActivityQuery } from '@/hooks/use-staff-activity'
import { Alert } from '@/components/ui/alerts/Alert'
import { AlertDescription } from '@/components/ui/alerts/AlertDescription'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'

const employeeStatuses = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'on-break', label: 'On Break' },
  { value: 'on-leave', label: 'On Leave' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'off-duty', label: 'Off Duty' },
  { value: 'probation', label: 'Probation' },
  { value: 'terminated', label: 'Terminated' },
]

export default function StaffDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const short_code = useShortCode()
  const [openEditModal, setOpenEditModal] = useState(false)
  const [employeeStatus, setEmployeeStatus] = useState('')
  const { toast } = useToast()

  const {
    data: employee,
    isLoading: isEmployeeLoading,
    isError: isEmployeeError,
  } = useGetEmployeeByIdQuery(
    { id: Number(id), venue_short_code: short_code },
    { skip: !id }
  )

  useEffect(() => {
    if (employee) {
      setEmployeeStatus(employee.status)
    }
  }, [employee])

  const { data: activityData, isLoading: isActivitiesLoading } =
    useGetStaffActivityQuery(
      { id: Number(id), venue_short_code: short_code },
      { skip: !id }
    )

  const [updateEmployeeStatus] = useUpdateEmployeeStatusMutation()

  // Add the handler function:
  const handleStatusChange = async (newStatus: string) => {
    setEmployeeStatus(newStatus)
    if (!employee) return
    try {
      await updateEmployeeStatus({
        id: employee.id,
        status: newStatus,
        short_code,
      }).unwrap()

      toast({
        title: 'Success',
        description: 'Employee status updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update employee status',
        variant: 'destructive',
      })
    }
  }

  if (isEmployeeError) {
    return (
      <Layout>
        <Layout.Body>
          <Alert variant='warning'>
            <AlertCircleIcon className='h-4 w-4' />
            <AlertDescription>
              Error loading employee details. Please try again later.
            </AlertDescription>
          </Alert>
        </Layout.Body>
      </Layout>
    )
  }

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-8'>
        {/* Header with Actions */}
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Employee Profile
            </h2>
            <p className='text-muted-foreground'>
              View and manage employee information
            </p>
          </div>
          <div className='space-x-4'>
            <Button variant='outline' onClick={() => navigate('/employees')}>
              Back to Overview
            </Button>
            <Button onClick={() => setOpenEditModal(true)}>Edit Profile</Button>
          </div>
        </div>

        {isEmployeeLoading ? (
          // Loading state
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            <LoadingCard />
            <LoadingCard className='md:col-span-2' />
            <LoadingCard className='md:col-span-3' />
          </div>
        ) : employee ? (
          <>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              {/* Profile Card */}
              <Card className='md:col-span-1'>
                <CardContent className='pt-6'>
                  <div className='flex flex-col items-center space-y-4'>
                    <Avatar className='h-32 w-32'>
                      <AvatarImage src={employee.profile_picture} />
                      <AvatarFallback>
                        {employee.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className='text-center'>
                      <h2 className='text-2xl font-bold'>{employee.name}</h2>
                      <p className='text-muted-foreground'>
                        {employee.role?.name}
                      </p>

                      <div className='mt-4'>
                        <Select
                          value={employeeStatus}
                          onValueChange={handleStatusChange}
                        >
                          <SelectTrigger
                            className={`w-[180px] ${getStatusColor(employeeStatus)} border-0 ring-offset-background focus:ring-2 [&>span]:text-white [&>svg]:text-white`}
                          >
                            <SelectValue placeholder='Select status' />
                          </SelectTrigger>
                          <SelectContent>
                            {employeeStatuses.map((status) => (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                                className='hover:bg-muted'
                              >
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className='w-full pt-4'>
                      <div className='space-y-3'>
                        <div className='flex items-center space-x-2'>
                          <BriefcaseIcon className='h-4 w-4 opacity-70' />
                          <span>
                            {employee.department?.name || 'No Department'}
                          </span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <MailIcon className='h-4 w-4 opacity-70' />
                          <span>{employee.company_email}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <PhoneIcon className='h-4 w-4 opacity-70' />
                          <span>{employee.company_phone}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <CalendarIcon className='h-4 w-4 opacity-70' />
                          <span>
                            Hired:{' '}
                            {format(
                              new Date(employee.hire_date),
                              'MMM dd, yyyy'
                            )}
                          </span>
                        </div>
                        {employee.manager_id && (
                          <div className='flex items-center space-x-2'>
                            <UserIcon className='h-4 w-4 opacity-70' />
                            <span>Reports to: {employee.manager?.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Information */}
              <Card className='md:col-span-2'>
                <CardContent className='pt-6'>
                  <Tabs defaultValue='personal' className='w-full'>
                    <TabsList>
                      <TabsTrigger value='personal'>Personal Info</TabsTrigger>
                      <TabsTrigger value='work'>Work Info</TabsTrigger>
                      <TabsTrigger value='address'>Address</TabsTrigger>
                    </TabsList>

                    <TabsContent value='personal' className='space-y-4'>
                      <div className='grid grid-cols-2 gap-4'>
                        <InfoField
                          label='Personal Email'
                          value={employee.personal_email}
                          icon={<MailIcon className='h-4 w-4' />}
                        />
                        <InfoField
                          label='Personal Phone'
                          value={employee.personal_phone}
                          icon={<PhoneIcon className='h-4 w-4' />}
                        />
                        <InfoField
                          label='Hire Date'
                          value={format(new Date(employee.hire_date), 'PP')}
                          icon={<CalendarIcon className='h-4 w-4' />}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value='work' className='space-y-4'>
                      <div className='grid grid-cols-2 gap-4'>
                        <InfoField
                          label='Role Type'
                          value={employee.role?.role_type}
                          icon={<BriefcaseIcon className='h-4 w-4' />}
                        />
                        <InfoField
                          label='Department'
                          value={employee.department?.name}
                          icon={<BriefcaseIcon className='h-4 w-4' />}
                        />
                        <InfoField
                          label='Employee ID'
                          value={`#${employee.id}`}
                          icon={<UserIcon className='h-4 w-4' />}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value='address' className='space-y-4'>
                      <div className='space-y-4'>
                        <InfoField
                          label='Street Address'
                          value={employee.address?.address_line1}
                          icon={<MapPinIcon className='h-4 w-4' />}
                        />
                        <InfoField
                          label='Location'
                          value={
                            <LocationNames
                              cityId={employee.address?.city_id}
                              stateId={employee.address?.state_id}
                              countryId={employee.address?.country_id}
                              short_code={short_code}
                            />
                          }
                          icon={<MapPinIcon className='h-4 w-4' />}
                        />
                        <InfoField
                          label='Postal Code'
                          value={employee.address?.postal_code}
                          icon={<MapPinIcon className='h-4 w-4' />}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Activity Feed */}
              <Card className='md:col-span-3'>
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                </CardHeader>
                <CardContent>
                  <ActivityFeed
                    // @ts-ignore
                    data={
                      activityData || {
                        activities: [],
                        summary: {
                          total_activities: 0,
                          activity_types: [],
                          most_active_time: { hour: 0, count: 0 },
                        },
                        pagination: {
                          current_page: 1,
                          total: 0,
                          per_page: 15,
                          total_pages: 1,
                        },
                      }
                    }
                    isLoading={isActivitiesLoading}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Edit Modal */}
            <AddEditEmployeeModal
              open={openEditModal}
              setOpen={setOpenEditModal}
              // @ts-ignore
              employeeToEdit={employee}
            />
          </>
        ) : null}
      </Layout.Body>
    </Layout>
  )
}

export function InfoField({
  label,
  value,
  icon,
}: {
  label: string
  value: React.ReactNode
  icon: React.ReactNode
}) {
  return (
    <div className='space-y-1'>
      <div className='flex items-center space-x-2 text-muted-foreground'>
        {icon}
        <span className='text-sm'>{label}</span>
      </div>
      <p className='font-medium'>{value || 'N/A'}</p>
    </div>
  )
}

function LoadingCard({ className = '' }: { className?: string }) {
  return (
    <Card className={className}>
      <CardContent className='p-6'>
        <div className='animate-pulse space-y-4'>
          <div className='h-4 w-3/4 rounded bg-muted' />
          <div className='h-4 w-1/2 rounded bg-muted' />
          <div className='h-4 w-2/3 rounded bg-muted' />
        </div>
      </CardContent>
    </Card>
  )
}
