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
import { Checkbox } from "@/components/ui/checkbox"

interface CreateEditProjectModalProps extends OpenModalProps {
    project?: any
}

const addressSchema = z.object({
    address_line1: z.string().min(1, 'Address is required'),
    city_id: z.string().min(1, 'City is required'),
    state_id: z.string().min(1, 'State is required'),
    country_id: z.string().min(1, 'Country is required'),
    postal_code: z.string().min(1, 'Postal code is required'),
}).optional()

// Validation schema update
const createProjectSchema = z.object({
    name: z.string().min(1, { message: 'Please enter name' }),
    status: z.string().min(1, { message: 'Please select status' }),
    address: addressSchema,
    has_different_address: z.boolean().default(false),
    start_date: z.string().min(1, { message: 'Please select start date' }),
    end_date: z.string().min(1, { message: 'Please select end date' }),
    notes: z.string().optional(),
    client_id: z.string().optional(),
    estimated_hours: z.string().min(1, { message: 'Please enter estimated hours' }),
    estimated_budget: z.string().min(1, { message: 'Please enter estimated budget' }),
    project_type: z.string().min(1, { message: 'Please enter project type' }),
    project_category: z.string().min(1, { message: 'Please select project category' }),
    team_leader_ids: z.array(z.string()).optional(),
    operations_manager_ids: z.array(z.string()).optional(),
}).refine((data) => {
    // Client validation
    if (data.project_category === 'client' && !data.client_id) {
        return false;
    }
    // Address validation
    if (data.project_category === 'client' && data.has_different_address && !data.address) {
        return false;
    }
    // Date validation
    if (data.start_date && data.end_date) {
        return new Date(data.end_date) >= new Date(data.start_date);
    }
    return true;
}, {
    message: "Validation failed",
    path: ["_errors"]  // This will be used to determine which field caused the error
});

export function CreateEditProjectModal({
                                           open,
                                           setOpen,
                                           project,
                                       }: CreateEditProjectModalProps) {
    const { toast } = useToast()
    const venue_short_code = useShortCode()
    const [createProject] = useCreateProjectMutation()

    const { data: teamLeader = [] } = useGetTeamleadersQuery({ venue_short_code })
    const { data: operationsManager = [] } = useGetOperationsManagerQuery({
        venue_short_code,
    })
    const { data: clients } = useGetClientsQuery(venue_short_code)

    const [selectedTeamLeaders, setSelectedTeamLeaders] = useState<FieldValueProps[]>([])
    const [selectedOperationsManager, setSelectedOperationsManager] = useState<FieldValueProps[]>([])
    const { data: projectStatus } = useGetProjectsStatusListQuery({
        venue_short_code,
    })

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

    const [selectedProjectCategory, setSelectedProjectCategory] = useState<string | null>(null)
    const [hasDifferentAddress, setHasDifferentAddress] = useState(false)
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

    const form = useForm({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: project?.name ?? '',
            status: project?.status ?? '',
            end_date: project?.end_date ?? '',
            start_date: project?.start_date ?? '',
            notes: project?.notes ?? '',
            estimated_hours: project?.estimated_hours ?? '',
            estimated_budget: project?.estimated_budget ?? '',
            project_type: project?.project_type ?? '',
            project_category: project?.project_category ?? '',
            client_id: project?.client_id ?? '',
            has_different_address: false,
            address: undefined,
            team_leader_ids: project?.team_leader_ids ?? [],
            operations_manager_ids: project?.operations_manager_ids ?? [],
        },
    })

    useEffect(() => {
        form.reset()
        setHasDifferentAddress(false)
        setSelectedProjectCategory(null)
        setSelectedCountry(null)
        setSelectedState(null)
        setSelectedTeamLeaders([])
        setSelectedOperationsManager([])
        return () => {}
    }, [open])

    const [isSubmitting, setIsSubmitting] = useState(false)

    // Error handling in onSubmit
    const onSubmit = async (data: any) => {
        try {
            setIsSubmitting(true)
            await createProject({
                venue_short_code: venue_short_code,
                data: data,
            }).unwrap()

            toast({
                title: 'Success',
                description: 'Project created successfully',
            })
            setOpen(false)
        } catch (error: any) {
            // Handle specific backend errors
            if (error?.data?.errors) {
                // Map backend errors to form errors
                Object.keys(error.data.errors).forEach((key) => {
                    form.setError(key as any, {
                        type: 'manual',
                        message: error.data.errors[key][0]
                    });
                });

                // Also show toast for general error
                toast({
                    title: 'Validation Error',
                    description: 'Please check the form for errors',
                    variant: 'destructive'
                });
            } else {
                toast({
                    title: 'Error',
                    description: error?.data?.message || 'Something went wrong',
                    variant: 'destructive'
                })
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='flex max-h-[90vh] flex-col overflow-auto sm:max-w-[425px] md:min-w-[900px]'>
                <DialogHeader>
                    <DialogTitle>
                        <div className='flex items-center space-x-2'>
                            <IconUsers size={24} />
                            <span>Create New Project</span>
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
                                                <FormMessage />
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
                                                        {projectStatus && Object.entries(projectStatus).map(([key, value]) => (
                                                            <SelectItem key={key} value={key}>
                                                                {/*// @ts-ignore*/}
                                                                {value}
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
                                                <FormMessage />
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
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='project_type'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Project Type</FormLabel>
                                                <FormControl>
                                                    <Input type='text' placeholder='Project Type' {...field} />
                                                </FormControl>
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
                                                        if (value !== 'client') {
                                                            form.setValue('client_id', '')
                                                            setHasDifferentAddress(false)
                                                            form.setValue('has_different_address', false)
                                                            form.setValue('address', undefined)
                                                        }
                                                    }}
                                                    defaultValue={field.value}
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
                                        <>
                                            <FormField
                                                control={form.control}
                                                name='client_id'
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Client</FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder='Select Client' />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {/*// @ts-ignore*/}
                                                                {clients?.clients.data.map((client) => (
                                                                    <SelectItem
                                                                        key={client.id.toString()}
                                                                        value={client.id.toString()}
                                                                    >
                                                                        {client.name}
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
                                                name='has_different_address'
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={(checked) => {
                                                                    setHasDifferentAddress(checked as boolean)
                                                                    field.onChange(checked)
                                                                    if (!checked) {
                                                                        form.setValue('address', undefined)
                                                                    }
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <div className="leading-none">
                                                            <FormLabel>
                                                                Use different address than client
                                                            </FormLabel>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )}

                                    <FormField
                                        control={form.control}
                                        name='notes'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Notes</FormLabel>
                                                <FormControl>
                                                    <Input type='text' placeholder='Notes' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {selectedProjectCategory === 'client' && hasDifferentAddress && (
                                        <>
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
                                                        // @ts-ignore
                                                        name='address.country_id'
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Country</FormLabel>
                                                                <Select
                                                                    onValueChange={(value) => {
                                                                        setSelectedCountry(Number(value))
                                                                        field.onChange(value)
                                                                        // @ts-ignore
                                                                        form.setValue('address.state_id', '')
                                                                        // @ts-ignore
                                                                        form.setValue('address.city_id', '')
                                                                        setSelectedState(null)
                                                                    }}
                                                                    defaultValue={field.value}
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
                                                        // @ts-ignore
                                                        name='address.state_id'
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>State</FormLabel>
                                                                <Select
                                                                    onValueChange={(value) => {
                                                                        setSelectedState(Number(value))
                                                                        field.onChange(value)
                                                                        // @ts-ignore
                                                                        form.setValue('address.city_id', '')
                                                                    }}
                                                                    defaultValue={field.value}
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
                                                        // @ts-ignore
                                                        name='address.city_id'
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>City</FormLabel>
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    defaultValue={field.value}
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
                                                        // @ts-ignore
                                                        name='address.address_line1'
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Address</FormLabel>
                                                                <FormControl>
                                                                    <Input type='text' placeholder='Address' {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        // @ts-ignore
                                                        name='address.postal_code'
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Postal Code</FormLabel>
                                                                <FormControl>
                                                                    <Input type='text' placeholder='Postal code' {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

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
                                                        <FormLabel>Operations Manager</FormLabel>
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
                            <Button
                                type='submit'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating...' : 'Create Project'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}