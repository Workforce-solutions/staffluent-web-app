import { FieldValueProps, OpenModalProps, OptionsType } from '@/@types/common'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useGetOperationsManagerQuery,
  useGetTeamleadersQuery,
} from '@/services/staffApi'
import { IconMapPin, IconUsers } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  useCreateProjectMutation,
  useGetProjectsStatusListQuery,
} from '@/services/projectApi'
import MultiselectDropdown from '@/components/wrappers/multiselect-dropdown'
import { useGetClientsQuery } from '@/services/clientsApi'
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
  useGetStatesQuery,
} from '@/services/appConfigsApi'
import { Separator } from '@/components/ui/separator'

interface CreateEditProjectModalProps extends OpenModalProps {
  project?: any
}

const addressSchema = z.object({
  address_line1: z.string().min(1, 'Address is required'),
  city_id: z.string().min(1, 'City is required'),
  state_id: z.string().min(1, 'State is required'),
  country_id: z.string().min(1, 'Country is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
})

const createTaskSchema = z
  .object({
    name: z.string().min(1, { message: 'Please enter name' }),
    status: z.string().min(1, { message: 'Please select status' }),
    address: addressSchema,
    start_date: z.string().min(1, { message: 'Please select start date' }),
    end_date: z.string().min(1, { message: 'Please select end date' }),
    notes: z.string().min(1, { message: 'Please enter note' }),
    client_id: z.string().optional(), // Mark optional initially
    estimated_hours: z
      .string()
      .min(1, { message: 'Please enter estimated hours' }),
    estimated_budget: z
      .string()
      .min(1, { message: 'Please enter estimated budget' }),
    project_type: z.string().min(1, { message: 'Please select project type' }),
    project_category: z
      .string()
      .min(1, { message: 'Please select project category' }),
    team_leader_ids: z.array(z.string()).optional(),
    operations_manager_ids: z.array(z.string()),
  })
  .refine(
    (data) => {
      if (data.project_category === 'client') {
        return !!data.client_id && data.client_id.trim().length > 0
      }
      return true
    },
    {
      path: ['client_id'],
      message: 'Client ID is required when the project category is "client"',
    }
  )

export function CreateEditProjectModal({
  open,
  setOpen,
  project,
}: CreateEditProjectModalProps) {
  const { toast } = useToast()
  const venue_short_code = useShortCode()
  const [createProjrect] = useCreateProjectMutation()

  const { data: teamLeader = [] } = useGetTeamleadersQuery({ venue_short_code })
  const { data: operationsManager = [] } = useGetOperationsManagerQuery({
    venue_short_code,
  })
  const { data: clients } = useGetClientsQuery(venue_short_code)

  const [selectedTeamLeaders, setSelectedTeamLeaders] = useState<
    FieldValueProps[]
  >([])
  const [selectedOperationsManager, setSelectedOperationsManager] = useState<
    FieldValueProps[]
  >([])
  const { data: projectStatus } = useGetProjectsStatusListQuery({
    venue_short_code,
  })

  const projectStatusList = Object.keys(projectStatus ?? {}).map((key) => ({
    value: key,
    label: projectStatus[key],
  }))

  const teamLeaderOptions = teamLeader.map((teamLeader) => ({
    value: { label: teamLeader.name, value: teamLeader.id.toString() },
    label: teamLeader.name,
  }))

  const operationsManagerOptions: OptionsType[] = operationsManager.map(
    (operationsManager) => ({
      value: {
        label: operationsManager.name,
        value: operationsManager.id.toString(),
      },
      label: operationsManager.name,
    })
  )

  const isEditing = !!project

  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: '',
      status: '',
      end_date: '',
      start_date: '',
      notes: '',
      estimated_hours: '',
      estimated_budget: '',
      project_manager_id: '',
      project_type: '',
      client_id: '',
      project_category: '',
      address: {
        address_line1: '',
        city_id: '',
        state_id: '',
        country_id: '',
        postal_code: '',
      },
      team_leader_ids: [],
      operations_manager_ids: [],
    },
  })

  // Get location data
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<
    string | null
  >(null)
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null)
  const [selectedState, setSelectedState] = useState<number | null>(null)
  const { data: countries } = useGetCountriesQuery(venue_short_code)
  const { data: states } = useGetStatesQuery(
    {
      country_id: selectedCountry ?? 0,
      short_code: venue_short_code,
    },
    { skip: !selectedCountry }
  )
  const { data: cities } = useGetCitiesQuery(
    { state_id: selectedState ?? 0, short_code: venue_short_code },
    { skip: !selectedState }
  )

  useEffect(() => {
    form.reset()
    return () => {}
  }, [])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    await createProjrect({
      venue_short_code: venue_short_code,
      data: data,
    }).unwrap()
    setIsSubmitting(false)
    toast({
      title: 'Success',
      description: 'Project created successfully',
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='flex max-h-[90vh] flex-col overflow-auto sm:max-w-[425px] md:min-w-[900px]'>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center space-x-2'>
              <IconUsers size={24} />
              <span>{isEditing ? 'Edit Project' : 'Create New Project'}</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <Card>
              <CardContent>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='col-span-4'>
                    <div className='mt-6 flex w-full items-center space-x-2'>
                      <h3 className='text-lg font-medium'>Details</h3>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input type='text' placeholder='Name' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select status' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {projectStatusList.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='start_date'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='end_date'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type='date' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='estimated_hours'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Hours</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            min={1}
                            placeholder='Estimated Hours'
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='estimated_budget'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Budget</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            min={1}
                            placeholder='Estimated Budget'
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='project_type'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select Project Type' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='development'>
                              Development
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='project_category'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Category</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            setSelectedProjectCategory(value)
                            field.onChange(value)
                          }}
                          defaultValue={field.value}
                          {...field}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select Project Category' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='inhouse'>In House</SelectItem>
                            <SelectItem value='client'>Client</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {selectedProjectCategory === 'client' && (
                    <FormField
                      control={form.control}
                      name='client_id'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            {...field}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select Client' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {/*// @ts-ignore*/}
                              {clients?.clients.data.map((item) => (
                                <SelectItem
                                  key={item.id.toString()}
                                  value={item.id.toString()}
                                >
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name='notes'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input type='text' placeholder='Notes' {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className='col-span-4 mt-4'>
                    <Separator />
                    <div className='mt-6 flex w-full items-center space-x-2'>
                      <IconMapPin size={20} />
                      <h3 className='text-lg font-medium'>Address</h3>
                    </div>
                  </div>

                  <div className='col-span-4 flex flex-col gap-4'>
                    <div className='grid grid-cols-3 gap-4'>
                      <FormField
                        control={form.control}
                        name='address.country_id'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                setSelectedCountry(Number(value))
                                field.onChange(value)
                              }}
                              defaultValue={String(field.value)}
                              {...field}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select Country' />
                                </SelectTrigger>
                              </FormControl>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='address.state_id'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <Select
                              onValueChange={(value) => {
                                setSelectedState(Number(value))
                                field.onChange(value)
                              }}
                              defaultValue={field.value}
                              {...field}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select State' />
                                </SelectTrigger>
                              </FormControl>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='address.city_id'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              {...field}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Select City' />
                                </SelectTrigger>
                              </FormControl>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <FormField
                        control={form.control}
                        name='address.address_line1'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                placeholder='Address'
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='address.postal_code'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                              <Input
                                type='number'
                                placeholder='Postal code'
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className='col-span-4 mt-4'>
                    <Separator />
                    <div className='mt-6 flex w-full items-center space-x-2'>
                      <h3 className='text-lg font-medium'>Team</h3>
                    </div>
                  </div>
                  <div className='col-span-4'>
                    <div className='col-span-2'>
                      <FormField
                        control={form.control}
                        name='team_leader_ids'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team Leader</FormLabel>
                            <MultiselectDropdown
                              {...field}
                              itemValue={teamLeaderOptions}
                              setValue={(values) => {
                                const uniqueValues: any = values.filter(
                                  (value, index, self) => {
                                    return (
                                      self.findIndex(
                                        (v) => v.value === value.value
                                      ) === index
                                    )
                                  }
                                )
                                setSelectedTeamLeaders(uniqueValues)
                                form.setValue(
                                  'team_leader_ids',
                                  uniqueValues.map((v: any) => v.value)
                                )
                              }}
                              value={selectedTeamLeaders}
                              multiSelectorPlaceholder='Select Team Leader'
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='col-span-2'>
                      <FormField
                        control={form.control}
                        name='operations_manager_ids'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Operations Manager </FormLabel>
                            <MultiselectDropdown
                              {...field}
                              itemValue={operationsManagerOptions}
                              setValue={(values) => {
                                const uniqueValues: any = values.filter(
                                  (value, index, self) => {
                                    return (
                                      self.findIndex(
                                        (v) => v.value === value.value
                                      ) === index
                                    )
                                  }
                                )
                                setSelectedOperationsManager(uniqueValues)
                                form.setValue(
                                  'operations_manager_ids',
                                  uniqueValues.map((v: any) => v.value)
                                )
                              }}
                              value={selectedOperationsManager}
                              multiSelectorPlaceholder='Select Operations Manager'
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className='flex justify-end space-x-4'>
              <Button
                type='button'
                variant='outline'
                disabled={isSubmitting}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type='button' variant='secondary' onClick={() => {}}>
                Save as Draft
              </Button>
              <Button
                type='submit'
                disabled={isSubmitting}
                // onClick={form.handleSubmit(onSubmit)}
              >
                Generate Project
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
