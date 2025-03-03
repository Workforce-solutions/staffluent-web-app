import { AuthProps } from '@/@types/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// import { Progress } from '@/components/ui/progress'

export const ClientFields = ({ userData }: { userData: AuthProps }) => {
  return (
    <div className='grid gap-6 py-4'>
      {/* General Information Section */}
      <div className='space-y-4'>
        <h3 className='text-lg font-medium'>General Information</h3>
        <Card>
          <CardContent>
            <div className='mt-6 grid gap-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-left'>
                  Name
                </Label>
                <Input
                  id='name'
                  className='col-span-3'
                  placeholder='Enter client name'
                  required
                  defaultValue={userData?.user?.name ?? ''}
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='type' className='text-left'>
                  Type
                </Label>
                <Select
                  defaultValue={userData?.account_type ?? 'homeowner'}
                  onValueChange={() => {}}
                >
                  <SelectTrigger className='col-span-3'>
                    <SelectValue placeholder='Select client type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='homeowner'>Homeowner</SelectItem>
                    <SelectItem value='company'>Company</SelectItem>
                    <SelectItem value='client'>Client</SelectItem>
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
                  defaultValue={userData?.user?.name ?? ''}
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
                  defaultValue={userData?.user?.phone ?? ''}
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
                  defaultValue={userData?.user?.email ?? ''}
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
                <Select defaultValue='US' onValueChange={() => {}}>
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
                <Select defaultValue='CA' onValueChange={() => {}}>
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
                <Select defaultValue='LA' onValueChange={() => {}}>
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
                  defaultValue={userData?.user?.address ?? ''}
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
                  defaultValue={userData?.user?.postal_code ?? ''}
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
                  defaultValue={userData?.user?.notes ?? ''}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='mt-6 flex justify-center'>
        <Button className='w-fit'>Save Client Information</Button>
      </div>
    </div>
  )
}
