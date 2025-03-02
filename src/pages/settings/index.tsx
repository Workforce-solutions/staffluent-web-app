/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AuthProps } from '@/@types/auth'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { useToast } from "@/components/ui/use-toast"
import { UserNav } from '@/components/user-nav'
import { 
  useLocalStorageString, 
  useHasChangedPassword, 
  useBusinessData, 
  useSubscription, 
  useFeatures 
} from '@/hooks/use-local-storage'
import { AccountType } from '../auth/components/user-auth-form'
import { AlertCircle, Check, Pencil } from 'lucide-react'
import { useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

import { OMNISTACK_BASE_URL } from '@/hooks/common/common-functions'
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
      console.log('Selected file:', file)
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully.",
      })
    }
  }

  return (
    <Layout fixed>
      <Layout.Header>
        <div className='flex items-center ml-auto space-x-2'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='flex h-full flex-col gap-6 !overflow-y-auto'>
        <div className='flex justify-center w-full'>
          <div className='flex relative flex-col gap-4 justify-center items-center'>
            <div className='flex h-28 w-28 items-center justify-center rounded-full bg-[#0F172A] text-[26px] font-bold text-white'>
              <div
                className='absolute right-0 bottom-0 p-2 bg-white rounded-full shadow-sm cursor-pointer hover:bg-gray-100'
                onClick={handlePencilClick}
              >
                <Pencil className='w-4 h-4' color='black' />
              </div>
              <input
                type='file'
                ref={fileInputRef}
                className='hidden'
                accept='image/*'
                onChange={handleFileChange}
              />
              
              {getInitials( // @ts-ignore
                userData?.data?.user?.name ?? userData?.user?.name ?? '' 
              )}
            </div>
            <h2 className='mt-2 text-xl font-semibold'>
              {/*// @ts-ignore*/}
              {userData?.data?.user?.name ?? userData?.user?.name ?? 'User'}
            </h2>
            <Badge variant={accountType === 'business' ? 'default' : 'outline'}>
              {accountType === 'business' ? 'Admin' : accountType.replace(/_/g, ' ')}
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="business">Business & Subscription</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            {accountType === 'client' ? (
              <ClientFields />
            ) : (
              <>
                <CardTitle className='mb-4'>Personal Information</CardTitle>
                <Card>
                  <CardContent>
                    <div className='grid grid-cols-1 gap-y-6 gap-x-9 items-center mt-6 md:grid-cols-2'>
                      <div className='grid grid-cols-[100px_1fr] items-center'>
                        <Label htmlFor='fullName'>Full name</Label>
                        <Input
                          id='fullName'
                          // @ts-ignore
                          defaultValue={userData?.data?.user?.name ?? userData?.user?.name}
                        />
                      </div>
                      <div className='grid grid-cols-[100px_1fr] items-center'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          id='email'
                          // @ts-ignore
                          defaultValue={userData?.data?.user?.email ?? userData?.user?.email}
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

                <div className="flex justify-center mt-6 mb-8">
                  <Button className='w-fit'>Save Changes</Button>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="security">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
          
          <TabsContent value="business">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <BusinessInfoSection business={business} />
              </div>
              <div>
                <SubscriptionSection subscription={subscription} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="features">
            <FeaturesSection features={features} />
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  )
}

const PasswordChangeSection = ({ hasChangedPassword, userId }: { hasChangedPassword: boolean, userId: string }) => {
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
      setError("Password must be at least 8 characters long")
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
      const response = await fetch(`${OMNISTACK_BASE_URL}users/password/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'client-x-api-key': 'sk_2462670fcf9d668a3ce8e98d5845b3154ee13aa100e4f00e3103b054e9a0bacf',
          'x-api-key': 'gwy_3kjg9KdJ37sdL4hF8Tk2sXnY5LzW8Rv'
        },
        body: JSON.stringify(passwordData)
      })
      
      const responseData = await response.json()
      
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to change password")
      }
      
      // Show success toast and clear form
      toast({
        title: "Password changed successfully",
        description: responseData.message || "Your password has been updated.",
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
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <CardTitle className='mb-4'>Change Password</CardTitle>
      <Card>
        <CardContent className="mt-6">
          {error && (
            <div className="flex gap-2 items-center p-3 mb-4 text-red-700 bg-red-50 rounded-md border border-red-200">
              <AlertCircle className="w-4 h-4" />
              <p>{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            {hasChangedPassword && (
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input 
                  id="currentPassword" 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password" 
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input 
                id="newPassword" 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password" 
              />
              <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password" 
              />
            </div>
            
            <Button 
              onClick={handlePasswordChange} 
              disabled={isLoading || !newPassword || !confirmPassword || (hasChangedPassword && !currentPassword)}
              className="w-full"
            >
              {isLoading ? "Changing Password..." : "Change Password"}
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
        <CardContent className="mt-6">
          <div className="space-y-6">
            {business && Object.keys(business).length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-y-4 gap-x-6">
                  <div>
                    <Label className="text-sm text-muted-foreground">Business Name</Label>
                    <p className="text-lg font-medium">{business.name}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-muted-foreground">Email</Label>
                    <p className="text-lg">{business.email}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-muted-foreground">Business Type</Label>
                    <p className="text-lg">{business.type}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-muted-foreground">Subscription Status</Label>
                    <Badge 
                      variant={
                        business.subscriptionStatus === 'active' ? 'success' : 
                        business.subscriptionStatus === 'trialing' ? 'warning' : 
                        'outline'
                      }
                    >
                      {business.subscriptionStatus}
                    </Badge>
                  </div>
                </div>
                
                {business.subscriptionEndDate && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Subscription End Date</Label>
                    <p className="text-lg">{format(new Date(business.subscriptionEndDate), 'MMMM dd, yyyy')}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="py-6 text-center text-muted-foreground">
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
        <CardContent className="mt-6">
          {subscription && Object.keys(subscription).length > 0 ? (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">
                    {subscription.tier?.charAt(0).toUpperCase() + subscription.tier?.slice(1)} Plan
                  </h3>
                  <p className="text-muted-foreground">
                    Status: <Badge variant={subscription.status === 'active' ? 'success' : 'warning'}>
                      {subscription.status}
                    </Badge>
                  </p>
                </div>
                <Button disabled variant="outline">Upgrade Plan</Button>
              </div>
              
              {subscription.endDate && (
                <div>
                  <p className="mb-1 text-sm text-muted-foreground">Subscription Renewal</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="mr-2 w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>
                        {format(new Date(subscription.endDate), 'MMMM dd, yyyy')}
                      </span>
                    </div>
                    {subscription.status === 'trialing' && (
                      <Badge variant="outline">
                        {Math.ceil((new Date(subscription.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left in trial
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {subscription.details && (
                <div className="p-4 rounded-md border bg-slate-50">
                  <h4 className="mb-3 font-medium">Plan Details</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {subscription.details.amount && (
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-medium">
                          ${(subscription.details.amount / 100).toFixed(2)} / {subscription.details.interval || 'month'}
                        </p>
                      </div>
                    )}
                    {subscription.details.currency && (
                      <div>
                        <p className="text-sm text-muted-foreground">Currency</p>
                        <p className="font-medium">{subscription.details.currency.toUpperCase()}</p>
                      </div>
                    )}
                    {subscription.details.planId && (
                      <div>
                        <p className="text-sm text-muted-foreground">Plan ID</p>
                        <p className="text-sm font-medium">{subscription.details.planId}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-6 text-center text-muted-foreground">
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
  
  const filteredFeatures = features.filter(feature => 
    feature.toLowerCase().includes(filter.toLowerCase())
  )
  
  // Group features by category
  const featureCategories = {
    'Time Management': filteredFeatures.filter(f => 
      f.includes('time') || f.includes('break') || f.includes('attendance') || f.includes('timesheet')
    ),
    'Project Management': filteredFeatures.filter(f => 
      f.includes('project') || f.includes('task') || f.includes('milestone')
    ),
    'Team Management': filteredFeatures.filter(f => 
      f.includes('team') || f.includes('department') || f.includes('role') || 
      f.includes('staff') || f.includes('employee')
    ),
    'Equipment & Resources': filteredFeatures.filter(f => 
      f.includes('equipment') || f.includes('resource') || f.includes('document') ||
      f.includes('supply') || f.includes('asset')
    ),
    'Client Management': filteredFeatures.filter(f => 
      f.includes('client') || f.includes('invoice') || f.includes('portal')
    ),
    'Quality & Safety': filteredFeatures.filter(f => 
      f.includes('quality') || f.includes('safety') || f.includes('compliance') ||
      f.includes('inspection') || f.includes('audit')
    ),
    'Reporting & Analytics': filteredFeatures.filter(f => 
      f.includes('report') || f.includes('analytics') || f.includes('dashboard') ||
      f.includes('metrics') || f.includes('monitoring')
    ),
    'Communication': filteredFeatures.filter(f => 
      f.includes('communication') || f.includes('chat') || f.includes('notification') ||
      f.includes('message')
    ),
    'Other': filteredFeatures.filter(f => 
      !f.includes('time') && !f.includes('break') && !f.includes('attendance') && 
      !f.includes('timesheet') && !f.includes('project') && !f.includes('task') && 
      !f.includes('milestone') && !f.includes('team') && !f.includes('department') && 
      !f.includes('role') && !f.includes('staff') && !f.includes('employee') && 
      !f.includes('equipment') && !f.includes('resource') && !f.includes('document') && 
      !f.includes('supply') && !f.includes('asset') && !f.includes('client') && 
      !f.includes('invoice') && !f.includes('portal') && !f.includes('quality') && 
      !f.includes('safety') && !f.includes('compliance') && !f.includes('inspection') && 
      !f.includes('audit') && !f.includes('report') && !f.includes('analytics') && 
      !f.includes('dashboard') && !f.includes('metrics') && !f.includes('monitoring') && 
      !f.includes('communication') && !f.includes('chat') && !f.includes('notification') && 
      !f.includes('message')
    )
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <CardTitle>Enabled Features</CardTitle>
        <div className="flex items-center">
          <Input
            placeholder="Filter features..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>
      
      {features.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
          {Object.entries(featureCategories).map(([category, categoryFeatures]) => 
            categoryFeatures.length > 0 && (
              <Card key={category}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{category}</CardTitle>
                  <p className="text-sm text-muted-foreground">{categoryFeatures.length} features</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {categoryFeatures.map(feature => (
                      <li key={feature} className="flex gap-2 items-center">
                        <Check className="w-4 h-4 text-green-500" />
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
          <CardContent className="py-6 text-center text-muted-foreground">
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
      <CardTitle className='mt-6 mb-4'>Employment Details</CardTitle>
      <Card>
        <CardContent>
          <div className='grid grid-cols-1 gap-y-6 gap-x-9 items-center mt-6 md:grid-cols-2'>
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
          <div className='flex flex-col gap-4 mt-6'>
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

const ClientFields = () => {
  return (
    <div className='grid gap-6 py-4'>
      {/* General Information Section */}
      <div className='space-y-4'>
        <h3 className='text-lg font-medium'>General Information</h3>
        <Card>
          <CardContent>
            <div className='grid gap-4 mt-6'>
              <div className='flex items-center space-x-2'>
                <Checkbox id='isUser' />
                <Label htmlFor='isUser'>Create as User</Label>
              </div>
              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor='name' className='text-left'>
                  Name
                </Label>
                <Input
                  id='name'
                  className='col-span-3'
                  placeholder='Enter client name'
                  required
                />
              </div>
              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor='type' className='text-left'>
                  Type
                </Label>
                <Select value='homeowner' onValueChange={() => {}}>
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Select client type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='homeowner'>Homeowner</SelectItem>
                    <SelectItem value='company'>Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor='contact_person' className='text-left'>
                  Contact Person
                </Label>
                <Input
                  id='contact_person'
                  className='col-span-3'
                  placeholder='Enter contact person name'
                  required
                />
              </div>
              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor='phone' className='text-left'>
                  Phone
                </Label>
                <Input
                  id='phone'
                  className='col-span-3'
                  placeholder='Enter phone number'
                  required
                />
              </div>
              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor='email' className='text-left'>
                  Email
                </Label>
                <Input
                  id='email'
                  type='email'
                  className='col-span-3'
                  placeholder='Enter email address'
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-4'>
        <div className='flex items-center space-x-2'>
          <h3 className='text-lg font-medium'>Address Information</h3>
        </div>
        <Card>
          <CardContent>
            <div className='grid gap-4 mt-6'>
              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor='country' className='text-left'>
                  Country
                </Label>
                <Select value='' onValueChange={() => {}}>
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Select country' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='US'>United States</SelectItem>
                    <SelectItem value='CA'>Canada</SelectItem>
                    <SelectItem value='GB'>United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor='state' className='text-left'>
                  State
                </Label>
                <Select value='' onValueChange={() => {}}>
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Select state' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='CA'>California</SelectItem>
                    <SelectItem value='NY'>New York</SelectItem>
                    <SelectItem value='TX'>Texas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor='city' className='text-left'>
                  City
                </Label>
                <Select value='' onValueChange={() => {}}>
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Select city' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='LA'>Los Angeles</SelectItem>
                    <SelectItem value='NY'>New York City</SelectItem>
                    <SelectItem value='HOU'>Houston</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor='address' className='text-left'>
                  Street Address
                </Label>
                <Input
                  id='address'
                  className='col-span-3'
                  placeholder='Enter street address'
                  required
                />
              </div>
              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor='postal_code' className='text-left'>
                  Postal Code
                </Label>
                <Input
                  id='postal_code'
                  className='col-span-3'
                  placeholder='Enter postal code'
                  required
                />
              </div>
              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor='notes' className='text-left'>
                  Notes
                </Label>
                <Input
                  id='notes'
                  className='col-span-3'
                  placeholder='Add any additional notes'
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center mt-6">
        <Button className='w-fit'>Save Client Information</Button>
      </div>
    </div>
  )
}