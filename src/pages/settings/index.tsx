/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AuthProps } from '@/@types/auth'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
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
import { UserNav } from '@/components/user-nav'
import { useLocalStorageString } from '@/hooks/use-local-storage'
import { AccountType } from '../auth/components/user-auth-form'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useRef } from 'react'

export default function Settings() {
  const accountType = useLocalStorageString('accountType') as AccountType
  const userData = JSON.parse(
    useLocalStorageString('vbAuth')
  ) as unknown as AuthProps

  function getInitials(fullName: string) {
    return fullName
      ?.split(' ')
      .map((word) => word[0].toUpperCase())
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
              {/* ... existing initials code ... */}
              <div
                className='absolute bottom-20 right-0 cursor-pointer rounded-full bg-white p-2 hover:bg-gray-100'
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
              {/* ... existing initials code ... */}
              {getInitials(
                userData?.data?.user?.name ?? userData?.data?.user?.name
              )}
            </div>
          </div>
        </div>

        {accountType === 'client' ? (
          <ClientFields />
        ) : (
          <>
            <CardTitle>Personal Information</CardTitle>
            <Card>
              <CardContent>
                <div className='mt-6 grid grid-cols-[1fr_1fr] items-center gap-x-9 gap-y-6'>
                  <div className='grid grid-cols-[100px_1fr] items-center'>
                    <Label htmlFor='fullName'>Full name</Label>
                    <Input
                      id='fullName'
                      defaultValue={userData?.data?.user?.name}
                    />
                  </div>
                  <div className='grid grid-cols-[100px_1fr] items-center'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      defaultValue={userData?.data?.user?.email}
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
            <CommunicationPreferencesSection />
          </>
        )}

        <Button className='mx-auto w-fit'>Edit Profile</Button>
      </Layout.Body>
    </Layout>
  )
}

const EmploymentDetailsSection = () => {
  return (
    <>
      <CardTitle>Employment Details</CardTitle>
      <Card>
        <CardContent>
          <div className='mt-6 grid grid-cols-[1fr_1fr] items-center gap-x-9 gap-y-6'>
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
      <CardTitle>Communication Preferences</CardTitle>
      <Card>
        <CardContent>
          <div className='mt-6 flex flex-col gap-4'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <Label htmlFor='emailNotifications'>Email</Label>
                <span className='opacity-60'>
                  Recieve notifications to your Email
                </span>
              </div>

              <Switch id='emailNotifications' defaultChecked />
            </div>

            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <Label htmlFor='smsNotifications'>SMS</Label>
                <span className='opacity-60'>
                  Recieve notifications to your Phone
                </span>
              </div>
              <Switch id='smsNotifications' defaultChecked />
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
            <div className='mt-6 grid gap-4'>
              <div className='flex items-center space-x-2'>
                <Checkbox id='isUser' />
                <Label htmlFor='isUser'>Create as User</Label>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
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
              <div className='grid grid-cols-4 items-center gap-4'>
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
              <div className='grid grid-cols-4 items-center gap-4'>
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
              <div className='grid grid-cols-4 items-center gap-4'>
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
              <div className='grid grid-cols-4 items-center gap-4'>
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
            <div className='mt-6 grid gap-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
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
              <div className='grid grid-cols-4 items-center gap-4'>
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
              <div className='grid grid-cols-4 items-center gap-4'>
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
              <div className='grid grid-cols-4 items-center gap-4'>
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
              <div className='grid grid-cols-4 items-center gap-4'>
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
              <div className='grid grid-cols-4 items-center gap-4'>
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
    </div>
  )
}
