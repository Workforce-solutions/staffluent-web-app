/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AuthProps } from '@/@types/auth'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { UserNav } from '@/components/user-nav'
import {
  useBusinessData,
  useFeatures,
  useHasChangedPassword,
  useLocalStorageString,
  useSubscription,
} from '@/hooks/use-local-storage'
import { format } from 'date-fns'
import { AlertCircle, Check, Pencil } from 'lucide-react'
import { useRef, useState } from 'react'
import { AccountType } from '../auth/components/user-auth-form'

import { OMNISTACK_BASE_URL } from '@/hooks/common/common-functions'
import { ClientFields } from './client-fields'
// import { Progress } from '@/components/ui/progress'

export default function Settings() {
  const accountType = useLocalStorageString('accountType') as AccountType
  const userData = JSON.parse(
    useLocalStorageString('vbAuth')
  ) as unknown as AuthProps
  const hasChangedPassword = useHasChangedPassword()
  const business = useBusinessData()
  const subscription = useSubscription()
  const features = useFeatures()
  const userId = localStorage.getItem('osId')

  const { toast } = useToast()

  function getInitials(fullName: string) {
    return fullName
      ?.split(' ')
      .map((word) => word[0]?.toUpperCase())
      .join('')
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePencilClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // TODO: Implement file upload logic here
      toast({
        title: 'Profile picture updated',
        description: 'Your profile picture has been updated successfully.',
      })
    }
  }

  return (
    <Layout fixed>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='flex h-full flex-col gap-6 !overflow-y-auto'>
        <div className='flex w-full justify-center'>
          <div className='relative flex flex-col items-center justify-center gap-4'>
            <div className='flex h-28 w-28 items-center justify-center rounded-full bg-[#0F172A] text-[26px] font-bold text-white'>
              <div
                className='absolute bottom-0 right-0 cursor-pointer rounded-full bg-white p-2 shadow-sm hover:bg-gray-100'
                onClick={handlePencilClick}
              >
                <Pencil className='h-4 w-4' color='black' />
              </div>
              <input
                type='file'
                ref={fileInputRef}
                className='hidden'
                accept='image/*'
                onChange={handleFileChange}
              />

              {getInitials(
                // @ts-ignore
                userData?.data?.user?.name ?? userData?.user?.name ?? ''
              )}
            </div>
            <h2 className='mt-2 text-xl font-semibold'>
              {/*// @ts-ignore*/}
              {userData?.data?.user?.name ?? userData?.user?.name ?? 'User'}
            </h2>
            <Badge variant={accountType === 'business' ? 'default' : 'outline'}>
              {accountType === 'business'
                ? 'Admin'
                : accountType.replace(/_/g, ' ')}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue='personal' className='w-full'>
          <TabsList className='mb-6 grid grid-cols-4'>
            <TabsTrigger value='personal'>Personal Info</TabsTrigger>
            <TabsTrigger value='security'>Security</TabsTrigger>
            {accountType !== AccountType.client &&
              accountType !== AccountType.app_client && (
                <TabsTrigger value='business'>
                  Business & Subscription
                </TabsTrigger>
              )}
            <TabsTrigger value='features'>Features</TabsTrigger>
          </TabsList>

          <TabsContent value='personal'>
            {accountType === 'client' ? (
              <ClientFields userData={userData} />
            ) : (
              <>
                <CardTitle className='mb-4'>Personal Information</CardTitle>
                <Card>
                  <CardContent>
                    <div className='mt-6 grid grid-cols-1 items-center gap-x-9 gap-y-6 md:grid-cols-2'>
                      <div className='grid grid-cols-[100px_1fr] items-center'>
                        <Label htmlFor='fullName'>Full name</Label>
                        <Input
                          id='fullName'
                          // @ts-ignore
                          defaultValue={
                            userData?.data?.user?.name ?? userData?.user?.name
                          }
                        />
                      </div>
                      <div className='grid grid-cols-[100px_1fr] items-center'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          id='email'
                          // @ts-ignore
                          defaultValue={
                            userData?.data?.user?.email ?? userData?.user?.email
                          }
                        />
                      </div>

                      <div className='grid grid-cols-[100px_1fr] items-center'>
                        <Label htmlFor='phone'>Phone</Label>
                        <Input id='phone' defaultValue='123-456-78901' />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <EmploymentDetailsSection />

                <div className='mb-8 mt-6 flex justify-center'>
                  <Button className='w-fit'>Save Changes</Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value='security'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div>
                <PasswordChangeSection
                  hasChangedPassword={hasChangedPassword}
                  // @ts-ignore
                  userId={userId}
                />
              </div>
              <div>
                <CommunicationPreferencesSection />
              </div>
            </div>
          </TabsContent>

          <TabsContent value='business'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div>
                <BusinessInfoSection business={business} />
              </div>
              <div>
                <SubscriptionSection subscription={subscription} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value='features'>
            <FeaturesSection features={features} />
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}

const PasswordChangeSection = ({
  hasChangedPassword,
  userId,
}: {
  hasChangedPassword: boolean
  userId: string
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const { toast } = useToast()

  const handlePasswordChange = async () => {
    // Validate inputs
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match")
      return
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Create the password data object based on whether the user has changed their password before
      const passwordData = hasChangedPassword
        ? { currentPassword, newPassword }
        : { newPassword }

      // Make the API call to change password
      const response = await fetch(
        `${OMNISTACK_BASE_URL}users/password/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            'client-x-api-key':
              'sk_2462670fcf9d668a3ce8e98d5845b3154ee13aa100e4f00e3103b054e9a0bacf',
            'x-api-key': 'gwy_3kjg9KdJ37sdL4hF8Tk2sXnY5LzW8Rv',
          },
          body: JSON.stringify(passwordData),
        }
      )

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to change password')
      }

      // Show success toast and clear form
      toast({
        title: 'Password changed successfully',
        description: responseData.message || 'Your password has been updated.',
      })

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')

      // Update hasChangedPassword in localStorage if this was first password change
      if (!hasChangedPassword) {
        const osAuth = localStorage.getItem('osAuth')
        if (osAuth) {
          const parsedAuth = JSON.parse(osAuth)
          parsedAuth.has_changed_password = true
          localStorage.setItem('osAuth', JSON.stringify(parsedAuth))
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <CardTitle className='mb-4'>Change Password</CardTitle>
      <Card>
        <CardContent className='mt-6'>
          {error && (
            <div className='mb-4 flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-red-700'>
              <AlertCircle className='h-4 w-4' />
              <p>{error}</p>
            </div>
          )}

          <div className='space-y-4'>
            {hasChangedPassword && (
              <div className='space-y-2'>
                <Label htmlFor='currentPassword'>Current Password</Label>
                <Input
                  id='currentPassword'
                  type='password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder='Enter your current password'
                />
              </div>
            )}

            <div className='space-y-2'>
              <Label htmlFor='newPassword'>New Password</Label>
              <Input
                id='newPassword'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='Enter your new password'
              />
              <p className='text-xs text-muted-foreground'>
                Password must be at least 8 characters long
              </p>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='confirmPassword'>Confirm New Password</Label>
              <Input
                id='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm your new password'
              />
            </div>

            <Button
              onClick={handlePasswordChange}
              disabled={
                isLoading ||
                !newPassword ||
                !confirmPassword ||
                (hasChangedPassword && !currentPassword)
              }
              className='w-full'
            >
              {isLoading ? 'Changing Password...' : 'Change Password'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

const BusinessInfoSection = ({ business }: { business: any }) => {
  return (
    <>
      <CardTitle>Business Information</CardTitle>
      <Card className='mt-4'>
        <CardContent className='mt-6'>
          <div className='space-y-6'>
            {business && Object.keys(business).length > 0 ? (
              <>
                <div className='grid grid-cols-1 gap-x-6 gap-y-4'>
                  <div>
                    <Label className='text-sm text-muted-foreground'>
                      Business Name
                    </Label>
                    <p className='text-lg font-medium'>{business.name}</p>
                  </div>

                  <div>
                    <Label className='text-sm text-muted-foreground'>
                      Email
                    </Label>
                    <p className='text-lg'>{business.email}</p>
                  </div>

                  <div>
                    <Label className='text-sm text-muted-foreground'>
                      Business Type
                    </Label>
                    <p className='text-lg'>{business.type}</p>
                  </div>

                  <div>
                    <Label className='text-sm text-muted-foreground'>
                      Subscription Status
                    </Label>
                    <Badge
                      variant={
                        business.subscriptionStatus === 'active'
                          ? 'success'
                          : business.subscriptionStatus === 'trialing'
                            ? 'warning'
                            : 'outline'
                      }
                    >
                      {business.subscriptionStatus}
                    </Badge>
                  </div>
                </div>

                {business.subscriptionEndDate && (
                  <div>
                    <Label className='text-sm text-muted-foreground'>
                      Subscription End Date
                    </Label>
                    <p className='text-lg'>
                      {format(
                        new Date(business.subscriptionEndDate),
                        'MMMM dd, yyyy'
                      )}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className='py-6 text-center text-muted-foreground'>
                No business information available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

const SubscriptionSection = ({ subscription }: { subscription: any }) => {
  return (
    <>
      <CardTitle>Subscription Details</CardTitle>
      <Card className='mt-4'>
        <CardContent className='mt-6'>
          {subscription && Object.keys(subscription).length > 0 ? (
            <div className='space-y-8'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-xl font-semibold'>
                    {subscription.tier?.charAt(0).toUpperCase() +
                      subscription.tier?.slice(1)}{' '}
                    Plan
                  </h3>
                  <p className='text-muted-foreground'>
                    Status:{' '}
                    <Badge
                      variant={
                        subscription.status === 'active' ? 'success' : 'warning'
                      }
                    >
                      {subscription.status}
                    </Badge>
                  </p>
                </div>
                <Button disabled variant='outline'>
                  Upgrade Plan
                </Button>
              </div>

              {subscription.endDate && (
                <div>
                  <p className='mb-1 text-sm text-muted-foreground'>
                    Subscription Renewal
                  </p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='mr-2 h-2 w-2 rounded-full bg-green-400'></div>
                      <span>
                        {format(
                          new Date(subscription.endDate),
                          'MMMM dd, yyyy'
                        )}
                      </span>
                    </div>
                    {subscription.status === 'trialing' && (
                      <Badge variant='outline'>
                        {Math.ceil(
                          (new Date(subscription.endDate).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{' '}
                        days left in trial
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {subscription.details && (
                <div className='rounded-md border bg-slate-50 p-4'>
                  <h4 className='mb-3 font-medium'>Plan Details</h4>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    {subscription.details.amount && (
                      <div>
                        <p className='text-sm text-muted-foreground'>Price</p>
                        <p className='font-medium'>
                          ${(subscription.details.amount / 100).toFixed(2)} /{' '}
                          {subscription.details.interval || 'month'}
                        </p>
                      </div>
                    )}
                    {subscription.details.currency && (
                      <div>
                        <p className='text-sm text-muted-foreground'>
                          Currency
                        </p>
                        <p className='font-medium'>
                          {subscription.details.currency.toUpperCase()}
                        </p>
                      </div>
                    )}
                    {subscription.details.planId && (
                      <div>
                        <p className='text-sm text-muted-foreground'>Plan ID</p>
                        <p className='text-sm font-medium'>
                          {subscription.details.planId}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className='py-6 text-center text-muted-foreground'>
              No subscription information available
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

const FeaturesSection = ({ features }: { features: string[] }) => {
  const [filter, setFilter] = useState('')

  const filteredFeatures = features.filter((feature) =>
    feature.toLowerCase().includes(filter.toLowerCase())
  )

  // Group features by category
  const featureCategories = {
    'Time Management': filteredFeatures.filter(
      (f) =>
        f.includes('time') ||
        f.includes('break') ||
        f.includes('attendance') ||
        f.includes('timesheet')
    ),
    'Project Management': filteredFeatures.filter(
      (f) =>
        f.includes('project') || f.includes('task') || f.includes('milestone')
    ),
    'Team Management': filteredFeatures.filter(
      (f) =>
        f.includes('team') ||
        f.includes('department') ||
        f.includes('role') ||
        f.includes('staff') ||
        f.includes('employee')
    ),
    'Equipment & Resources': filteredFeatures.filter(
      (f) =>
        f.includes('equipment') ||
        f.includes('resource') ||
        f.includes('document') ||
        f.includes('supply') ||
        f.includes('asset')
    ),
    'Client Management': filteredFeatures.filter(
      (f) =>
        f.includes('client') || f.includes('invoice') || f.includes('portal')
    ),
    'Quality & Safety': filteredFeatures.filter(
      (f) =>
        f.includes('quality') ||
        f.includes('safety') ||
        f.includes('compliance') ||
        f.includes('inspection') ||
        f.includes('audit')
    ),
    'Reporting & Analytics': filteredFeatures.filter(
      (f) =>
        f.includes('report') ||
        f.includes('analytics') ||
        f.includes('dashboard') ||
        f.includes('metrics') ||
        f.includes('monitoring')
    ),
    Communication: filteredFeatures.filter(
      (f) =>
        f.includes('communication') ||
        f.includes('chat') ||
        f.includes('notification') ||
        f.includes('message')
    ),
    Other: filteredFeatures.filter(
      (f) =>
        !f.includes('time') &&
        !f.includes('break') &&
        !f.includes('attendance') &&
        !f.includes('timesheet') &&
        !f.includes('project') &&
        !f.includes('task') &&
        !f.includes('milestone') &&
        !f.includes('team') &&
        !f.includes('department') &&
        !f.includes('role') &&
        !f.includes('staff') &&
        !f.includes('employee') &&
        !f.includes('equipment') &&
        !f.includes('resource') &&
        !f.includes('document') &&
        !f.includes('supply') &&
        !f.includes('asset') &&
        !f.includes('client') &&
        !f.includes('invoice') &&
        !f.includes('portal') &&
        !f.includes('quality') &&
        !f.includes('safety') &&
        !f.includes('compliance') &&
        !f.includes('inspection') &&
        !f.includes('audit') &&
        !f.includes('report') &&
        !f.includes('analytics') &&
        !f.includes('dashboard') &&
        !f.includes('metrics') &&
        !f.includes('monitoring') &&
        !f.includes('communication') &&
        !f.includes('chat') &&
        !f.includes('notification') &&
        !f.includes('message')
    ),
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <CardTitle>Enabled Features</CardTitle>
        <div className='flex items-center'>
          <Input
            placeholder='Filter features...'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='max-w-xs'
          />
        </div>
      </div>

      {features.length > 0 ? (
        <div className='mt-4 grid grid-cols-1 gap-6 md:grid-cols-2'>
          {Object.entries(featureCategories).map(
            ([category, categoryFeatures]) =>
              categoryFeatures.length > 0 && (
                <Card key={category}>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-lg'>{category}</CardTitle>
                    <p className='text-sm text-muted-foreground'>
                      {categoryFeatures.length} features
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className='space-y-2'>
                      {categoryFeatures.map((feature) => (
                        <li key={feature} className='flex items-center gap-2'>
                          <Check className='h-4 w-4 text-green-500' />
                          <span>{feature.replace(/_/g, ' ')}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
          )}
        </div>
      ) : (
        <Card>
          <CardContent className='py-6 text-center text-muted-foreground'>
            No features information available
          </CardContent>
        </Card>
      )}
    </>
  )
}

const EmploymentDetailsSection = () => {
  return (
    <>
      <CardTitle className='mb-4 mt-6'>Employment Details</CardTitle>
      <Card>
        <CardContent>
          <div className='mt-6 grid grid-cols-1 items-center gap-x-9 gap-y-6 md:grid-cols-2'>
            <div className='grid grid-cols-[100px_1fr] items-center'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' defaultValue='john.doe@company.com' />
            </div>
            <div className='grid grid-cols-[100px_1fr] items-center'>
              <Label htmlFor='phone'>Phone</Label>
              <Input id='phone' defaultValue='098-765-4321' />
            </div>
            <div className='grid grid-cols-[100px_1fr] items-center'>
              <Label htmlFor='position'>Position</Label>
              <Input id='position' defaultValue='Office Manager' />
            </div>
            <div className='grid grid-cols-[100px_1fr] items-center'>
              <Label htmlFor='department'>Department</Label>
              <Input id='department' defaultValue='Technology' />
            </div>
            <div className='grid grid-cols-[100px_1fr] items-center'>
              <Label htmlFor='employeeId'>Employee ID</Label>
              <Input id='employeeId' defaultValue='#34023342' />
            </div>
            <div className='grid grid-cols-[100px_1fr] items-center'>
              <Label htmlFor='startDate'>Start Date</Label>
              <Input id='startDate' defaultValue='2024-10-19' />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

const CommunicationPreferencesSection = () => {
  return (
    <>
      <CardTitle className='mb-4'>Communication Preferences</CardTitle>
      <Card>
        <CardContent>
          <div className='mt-6 flex flex-col gap-4'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <Label htmlFor='emailNotifications'>Email</Label>
                <span className='opacity-60'>
                  Receive notifications to your Email
                </span>
              </div>

              <Switch id='emailNotifications' defaultChecked />
            </div>

            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <Label htmlFor='smsNotifications'>SMS</Label>
                <span className='opacity-60'>
                  Receive notifications to your Phone
                </span>
              </div>
              <Switch id='smsNotifications' defaultChecked />
            </div>

            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <Label htmlFor='pushNotifications'>Push Notifications</Label>
                <span className='opacity-60'>
                  Receive push notifications on your devices
                </span>
              </div>
              <Switch id='pushNotifications' defaultChecked />
            </div>

            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <Label htmlFor='twoFactorAuth'>Two-Factor Authentication</Label>
                <span className='opacity-60'>
                  Enable additional security for your account
                </span>
              </div>
              <Switch id='twoFactorAuth' />
            </div>

            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <Label htmlFor='sessionTimeout'>Session Timeout</Label>
                <span className='opacity-60'>
                  Automatically log out after inactivity
                </span>
              </div>
              <Switch id='sessionTimeout' defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
