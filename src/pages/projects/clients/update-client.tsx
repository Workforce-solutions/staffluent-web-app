import { ClientType, UpdateClientModalProps } from '@/@types/clients'
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
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
  useGetStatesQuery,
} from '@/services/appConfigsApi'
import { useUpdateClientMutation } from '@/services/clientsApi'
import { IconMapPin, IconUsers } from '@tabler/icons-react'
import { FormEvent, useEffect, useState } from 'react'

export function UpdateClientModal({
  // @ts-ignore
  open,
  // @ts-ignore
  setOpen,
  client,
}: UpdateClientModalProps) {
  const [formData, setFormData] = useState({
    name: client?.name || '',
    type: (client?.type || 'homeowner') as ClientType,
    contact_person: client?.contact_person || '',
    email: client?.email || '',
    phone: client?.phone || '',
    notes: client?.notes || '',
    address: {
      address_line1: client?.address?.address_line1 || '',
      city_id: client?.address?.city_id || 0,
      state_id: client?.address?.state_id || 0,
      country_id: client?.address?.country_id || 0,
      postal_code: client?.address?.postcode || '',
    },
  })

  const [updateClient, { isLoading }] = useUpdateClientMutation()
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

  useEffect(() => {
    if (client) {
      setFormData({
        ...client,
        address: {
          address_line1: client.address?.address_line1 || '',
          city_id: client.address?.city_id || 0,
          state_id: client.address?.state_id || 0,
          country_id: client.address?.country_id || 0,
          postal_code: client.address?.postcode || '',
        },
      })
    }
  }, [client])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!client) return

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

    try {
      await updateClient({
        id: client.id,
        ...formData,
        short_code,
      }).unwrap()

      toast({
        title: 'Success',
        description: 'Client updated successfully',
      })
      setOpen(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update client',
        variant: 'destructive',
      })
    }
  }

  if (!client) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='flex max-h-[90vh] flex-col sm:max-w-[425px] md:min-w-[600px]'>
        <DialogHeader className='flex-none'>
          <DialogTitle>
            <div className='flex items-center space-x-2'>
              <IconUsers size={24} />
              <span>Edit Client</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            Make changes to client information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable form content */}
        <div className='flex-1 overflow-y-auto pr-2'>
          <form
            onSubmit={handleSubmit}
            id='update-client-form'
            className='space-y-6'
          >
            <div className='grid gap-6 py-4'>
              {/* General Information Section */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium'>General Information</h3>
                <div className='grid gap-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
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

                  <div className='grid grid-cols-4 items-center gap-4'>
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

                  <div className='grid grid-cols-4 items-center gap-4'>
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

                  <div className='grid grid-cols-4 items-center gap-4'>
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

                  <div className='grid grid-cols-4 items-center gap-4'>
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
                  <div className='grid grid-cols-4 items-center gap-4'>
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
                    <div className='grid grid-cols-4 items-center gap-4'>
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
                    <div className='grid grid-cols-4 items-center gap-4'>
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

                  <div className='grid grid-cols-4 items-center gap-4'>
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

                  <div className='grid grid-cols-4 items-center gap-4'>
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
              <div className='grid grid-cols-4 items-center gap-4'>
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

        {/* Fixed footer */}
        <DialogFooter className='mt-6 flex flex-none justify-between sm:justify-end sm:space-x-2'>
          <Button
            type='button'
            variant='outline'
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type='submit' form='update-client-form' disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
