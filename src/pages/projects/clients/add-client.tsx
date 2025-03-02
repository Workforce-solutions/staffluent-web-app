'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useCreateClientMutation,
  useCreateUserMutation,
} from '@/services/clientsApi'
import {
  useGetCountriesQuery,
  useGetStatesQuery,
  useGetCitiesQuery,
} from '@/services/appConfigsApi'
import { FormEvent, useState } from 'react'
import { IconUsers, IconMapPin } from '@tabler/icons-react'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'

interface AddClientModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

type ClientType = 'homeowner' | 'company'

export function AddClientModal({ open, setOpen }: AddClientModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'homeowner' as ClientType,
    contact_person: '',
    email: '',
    phone: '',
    notes: '',
    address: {
      address_line1: '',
      city_id: 0,
      state_id: 0,
      country_id: 0,
      postal_code: '',
    },
    password: '',
    isUser: false,
    country_code: 'US',
  })

  const [createClient, { isLoading: isClientLoading }] = useCreateClientMutation()
  const [createUser, { isLoading: isUserLoading }] = useCreateUserMutation()
  
  // Then combine them
  const isLoading = isClientLoading || isUserLoading
  const { toast } = useToast()
  const short_code = useShortCode()

  // Get location data
  const { data: countries } = useGetCountriesQuery(short_code)
  const { data: states } = useGetStatesQuery(
    { country_id: formData.address.country_id, short_code },
    { skip: !formData.address.country_id }
  )
  const { data: cities } = useGetCitiesQuery(
    { state_id: formData.address.state_id, short_code },
    { skip: !formData.address.state_id }
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate address fields
    if (
      !formData.address.country_id ||
      !formData.address.state_id ||
      !formData.address.city_id
    ) {
      toast({
        title: 'Error',
        description: 'Please select all location fields',
        variant: 'destructive',
      })
      return
    }

    // Validate password for user creation
    if (formData.isUser && !formData.password) {
      toast({
        title: 'Error',
        description: 'Password is required for user creation',
        variant: 'destructive',
      })
      return
    }

    try {
      const payload = {
        ...formData,
        short_code,
      }

      if (formData.isUser) {
        await createUser(payload).unwrap()
        toast({
          title: 'Success',
          description: 'User created successfully',
        })
      } else {
        await createClient(payload).unwrap()
        toast({
          title: 'Success',
          description: 'Client created successfully',
        })
      }

      setOpen(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create client/user',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='flex flex-col sm:max-w-[425px] md:min-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center space-x-2'>
              <IconUsers size={24} />
              <span>Add New Client</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            Add a new client to your organization. Fill in all required fields.
          </DialogDescription>
        </DialogHeader>
        <div className='max-h-[75vh] flex-1 overflow-y-auto pr-2'>
          <form id='create-client-form' onSubmit={handleSubmit}>
            <div className='grid gap-6 py-4'>
              {/* General Information Section */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium'>General Information</h3>
                <div className='grid gap-4'>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='isUser'
                      checked={formData.isUser}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isUser: checked as boolean })
                      }
                    />
                    <Label htmlFor='isUser'>Create as User</Label>
                  </div>
                  <div className='grid grid-cols-4 gap-4 items-center'>
                    <Label htmlFor='name' className='text-left'>
                      Name
                    </Label>
                    <Input
                      id='name'
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className='col-span-3'
                      placeholder='Enter client name'
                      required
                    />
                  </div>

                  <div className='grid grid-cols-4 gap-4 items-center'>
                    <Label htmlFor='type' className='text-left'>
                      Type
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: ClientType) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
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
                      value={formData.contact_person}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact_person: e.target.value,
                        })
                      }
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
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
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
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className='col-span-3'
                      placeholder='Enter email address'
                      required
                    />
                  </div>

                  {formData.isUser && (
                    <div className='grid grid-cols-4 gap-4 items-center'>
                      <Label htmlFor='password' className='text-left'>
                        Password
                      </Label>
                      <Input
                        id='password'
                        type='password'
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className='col-span-3'
                        placeholder='Enter password'
                        required={formData.isUser}
                      />
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Address Section */}
              <div className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <IconMapPin size={20} />
                  <h3 className='text-lg font-medium'>Address Information</h3>
                </div>
                <div className='grid gap-4'>
                  <div className='grid grid-cols-4 gap-4 items-center'>
                    <Label htmlFor='country' className='text-left'>
                      Country
                    </Label>
                    <Select
                      value={
                        formData.address.country_id
                          ? formData.address.country_id.toString()
                          : ''
                      }
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            country_id: parseInt(value),
                            state_id: 0,
                            city_id: 0,
                          },
                        })
                      }
                    >
                      <SelectTrigger className='col-span-3'>
                        <SelectValue placeholder='Select country' />
                      </SelectTrigger>
                      <SelectContent>
                        {countries?.data.map((country) => (
                          <SelectItem
                            key={country.id}
                            value={country.id.toString()}
                          >
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.address.country_id > 0 && (
                    <div className='grid grid-cols-4 gap-4 items-center'>
                      <Label htmlFor='state' className='text-left'>
                        State
                      </Label>
                      <Select
                        value={
                          formData.address.state_id
                            ? formData.address.state_id.toString()
                            : ''
                        }
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            address: {
                              ...formData.address,
                              state_id: parseInt(value),
                              city_id: 0,
                            },
                          })
                        }
                      >
                        <SelectTrigger className='col-span-3'>
                          <SelectValue placeholder='Select state' />
                        </SelectTrigger>
                        <SelectContent>
                          {states?.data.map((state) => (
                            <SelectItem
                              key={state.id}
                              value={state.id.toString()}
                            >
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {formData.address.state_id > 0 && (
                    <div className='grid grid-cols-4 gap-4 items-center'>
                      <Label htmlFor='city' className='text-left'>
                        City
                      </Label>
                      <Select
                        value={
                          formData.address.city_id
                            ? formData.address.city_id.toString()
                            : ''
                        }
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            address: {
                              ...formData.address,
                              city_id: parseInt(value),
                            },
                          })
                        }
                      >
                        <SelectTrigger className='col-span-3'>
                          <SelectValue placeholder='Select city' />
                        </SelectTrigger>
                        <SelectContent>
                          {cities?.data.map((city) => (
                            <SelectItem
                              key={city.id}
                              value={city.id.toString()}
                            >
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className='grid grid-cols-4 gap-4 items-center'>
                    <Label htmlFor='address' className='text-left'>
                      Street Address
                    </Label>
                    <Input
                      id='address'
                      value={formData.address.address_line1}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            address_line1: e.target.value,
                          },
                        })
                      }
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
                      value={formData.address.postal_code}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            postal_code: e.target.value,
                          },
                        })
                      }
                      className='col-span-3'
                      placeholder='Enter postal code'
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Notes Section */}
              <div className='grid grid-cols-4 gap-4 items-center'>
                <Label htmlFor='notes' className='text-left'>
                  Notes
                </Label>
                <Input
                  id='notes'
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className='col-span-3'
                  placeholder='Add any additional notes'
                />
              </div>
            </div>
          </form>
        </div>
        <DialogFooter className='flex flex-none justify-between mt-6 sm:justify-end sm:space-x-2'>
          <Button
            type='button'
            variant='outline'
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type='submit' form='create-client-form' disabled={isLoading}>
            {isLoading
              ? 'Creating...'
              : `Create ${!formData.isUser ? 'Client' : 'Client with User'}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
