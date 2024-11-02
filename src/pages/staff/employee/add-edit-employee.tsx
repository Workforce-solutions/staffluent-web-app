import { OpenModalProps } from '@/@types/common'
import { AddEmployeePayload, EmployeeResponse } from '@/@types/staff'
import DepartmentsDropdown from '@/components/staff/departments-dropdown'
import EmployeesDropdown from '@/components/staff/employee-dropdown'
import RolesDropdown from '@/components/staff/roles-dropdown'
import { employeeInitial } from '@/components/table/data'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  useAddEmployeeMutation,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
} from '@/services/staffApi'
import { IconMapPin, IconUserPlus } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

const inputFields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'hire_date', label: 'Hire Date', type: 'date' },
  { name: 'personal_email', label: 'Personal Email', type: 'email' },
  { name: 'personal_phone', label: 'Personal Phone', type: 'tel' },
  { name: 'company_email', label: 'Company Email', type: 'email' },
  { name: 'company_phone', label: 'Company Phone', type: 'tel' },
]

const addresFields = [
  { name: 'address_line1', label: 'Address Line 1', type: 'text' },
  { name: 'postal_code', label: 'Postal Code', type: 'text' },
]

interface AddEditEmployeeModalProps extends OpenModalProps {
  employeeToEdit?: EmployeeResponse
}

export function AddEditEmployeeModal({
  open,
  setOpen,
  employeeToEdit,
}: AddEditEmployeeModalProps) {
  const { toast } = useToast()
  const short_code = useShortCode()
  const [addEmployee, { isLoading: isAddLoading }] = useAddEmployeeMutation()
  const [updateEmployee, { isLoading: isUpdateLoading }] =
    useUpdateEmployeeMutation()
  const { data: employe } = useGetEmployeeByIdQuery(
    { id: employeeToEdit?.id || 0, venue_short_code: short_code },
    { skip: employeeToEdit?.id === undefined }
  )

  console.log(employe, 'employe')

  const [employeeData, setEmployeeData] =
    useState<AddEmployeePayload>(employeeInitial)
  const [departmentId, setDepartmentId] = useState<number | null>(null)
  const [roleId, setRoleId] = useState<any>()
  const [managerId, setManagerId] = useState<string | null>(null)
  const [employeeWithCredentials, setEmployeeWithCredentials] =
    useState<number>()

  const { data: countries } = useGetCountriesQuery(short_code)
  const { data: states } = useGetStatesQuery(
    { country_id: employeeData.address.country_id, short_code },
    { skip: !employeeData.address.country_id }
  )
  const { data: cities } = useGetCitiesQuery(
    { state_id: employeeData.address.state_id, short_code },
    { skip: !employeeData.address.state_id }
  )

  useEffect(() => {
    if (employeeToEdit) {
      // @ts-ignore
      setEmployeeData({
        ...employeeInitial,
        ...employeeToEdit,
        // @ts-ignore
        address: { ...employeeInitial.address, ...employeeToEdit.address },
      })
      // @ts-ignore
      setDepartmentId(employeeToEdit.department_id || null)
      // @ts-ignore
      setRoleId({ value: { value: employeeToEdit.role } } || null)
      // @ts-ignore
      setManagerId(employeeToEdit.manager_id || null)
    } else {
      setEmployeeData(employeeInitial)
      setDepartmentId(null)
      setRoleId(undefined)
      setManagerId(null)
      setEmployeeWithCredentials(0)
    }
  }, [employeeToEdit])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.startsWith('address.')) {
      const addressField = name.split(
        '.'
      )[1] as keyof AddEmployeePayload['address']
      setEmployeeData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }))
    } else {
      setEmployeeData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const payload = {
        ...employeeData,
        role_id: Number(roleId.value.value),
        department_id: departmentId ?? -1,
        manager_id: managerId ?? '',
        is_custom: roleId?.value.role_type === 'system' ? 0 : 1,
        address: {
          ...employeeData.address,
          city_id: Number(employeeData.address.city_id),
          state_id: Number(employeeData.address.state_id),
          country_id: Number(employeeData.address.country_id),
        },
      }

      if (employeeToEdit) {
        await updateEmployee({
          id: employeeToEdit.id,
          short_code,
          employeeData: payload,
        }).unwrap()
        toast({
          title: 'Success',
          description: 'Employee updated successfully',
        })
      } else {
        await addEmployee({ short_code, employeeData: payload }).unwrap()
        toast({
          title: 'Success',
          description: 'Employee added successfully',
        })
      }
      setOpen(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: employeeToEdit
          ? 'Failed to update employee'
          : 'Failed to add employee',
        variant: 'destructive',
      })
    }
  }

  const isLoading = isAddLoading || isUpdateLoading

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='flex max-h-[80vh] flex-col sm:max-w-[425px] md:min-w-[400px] xl:min-w-[600px]'>
        <DialogHeader className='sticky top-0  bg-background pb-2 pt-4'>
          <DialogTitle>
            <div className='flex items-center space-x-2'>
              <IconUserPlus size={24} />
              <span>
                {employeeToEdit ? 'Edit Employee' : 'Add New Employee'}
              </span>
            </div>
          </DialogTitle>
          <DialogDescription>
            {employeeToEdit
              ? 'Edit employee information.'
              : 'Add a new employee to your organization.'}{' '}
            Fill in all required fields.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className='flex flex-grow flex-col overflow-hidden'
        >
          <div className='flex-grow overflow-y-auto pr-2'>
            <div className='col-span-2 grid gap-4 py-4'>
              {inputFields.map((field) => (
                <div
                  key={field.name}
                  className='grid grid-cols-4 items-center gap-4'
                >
                  <Label htmlFor={field.name} className='text-left'>
                    {field.label}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    // @ts-ignore
                    value={employeeData[field.name] || ''}
                    onChange={handleInputChange}
                    className='col-span-3'
                    required
                  />
                </div>
              ))}
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='department_id' className='text-left'>
                  Department
                </Label>
                <div className='col-span-3'>
                  <DepartmentsDropdown
                    departmentId={departmentId}
                    onChange={(value) => setDepartmentId(Number(value))}
                    className='col-span-3 !w-full'
                  />
                </div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='role_id' className='text-left'>
                  Role
                </Label>
                <div className='col-span-3'>
                  <RolesDropdown
                    // @ts-ignore
                    roleId={roleId?.value?.value || ''}
                    role='attached'
                    onChange={(_, option) => setRoleId(option)}
                    className='!w-full'
                  />
                </div>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='manager_id' className='text-left'>
                  Manager
                </Label>
                <div className='col-span-3'>
                  <EmployeesDropdown
                    // @ts-ignore
                    id={managerId}
                    onChange={(value) => setManagerId(value)}
                    className='col-span-3 !w-full'
                  />
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='user_with_credentials'
                  checked={!!employeeWithCredentials}
                  onCheckedChange={(checked) =>
                    setEmployeeWithCredentials(checked ? 1 : 0)
                  }
                />
                <Label htmlFor='user_with_credentials'>
                  Create user with credentials
                </Label>
              </div>

              {Boolean(employeeWithCredentials) && (
                <div
                  key={'employee_password'}
                  className='grid grid-cols-4 items-center gap-4'
                >
                  <Label htmlFor={'employee_password'} className='text-left'>
                    Employee Password
                  </Label>
                  <Input
                    id={'employee_password'}
                    name={'employee_password'}
                    type={'password'}
                    // @ts-ignore
                    value={employeeData['employee_password'] || ''}
                    onChange={handleInputChange}
                    className='col-span-3'
                    required
                  />
                </div>
              )}
            </div>

            <Separator className='my-4' />
            <div className='mb-3 flex items-center space-x-2'>
              <IconMapPin size={20} />
              <h3 className='text-lg font-medium'>Address Information</h3>
            </div>
            <div className='my-4 flex flex-col gap-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='country' className='text-left'>
                  Country
                </Label>
                <Select
                  value={
                    employeeData.address.country_id
                      ? employeeData.address.country_id.toString()
                      : ''
                  }
                  onValueChange={(value) =>
                    setEmployeeData({
                      ...employeeData,
                      address: {
                        ...employeeData.address,
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
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='state' className='text-left'>
                  State
                </Label>
                <Select
                  value={
                    employeeData?.address.state_id
                      ? employeeData?.address.state_id.toString()
                      : ''
                  }
                  onValueChange={(value) =>
                    setEmployeeData({
                      ...employeeData,
                      address: {
                        ...employeeData?.address,
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
                      <SelectItem key={state.id} value={state.id.toString()}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='city' className='text-left'>
                  City
                </Label>
                <Select
                  value={
                    employeeData?.address.city_id
                      ? employeeData?.address.city_id.toString()
                      : ''
                  }
                  onValueChange={(value) =>
                    setEmployeeData({
                      ...employeeData,
                      address: {
                        ...employeeData?.address,
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
                      <SelectItem key={city.id} value={city.id.toString()}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {addresFields.map((field) => (
                <div
                  key={field.name}
                  className='grid grid-cols-4 items-center gap-4'
                >
                  <Label htmlFor={field.name} className='text-left'>
                    {field.label}
                  </Label>
                  <Input
                    id={field.name}
                    name={`address.${field.name}`}
                    type={field.type}
                    // @ts-ignore
                    value={employeeData.address[field.name] || ''}
                    onChange={handleInputChange}
                    className='col-span-3'
                    required
                  />
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div className='flex justify-end space-x-2 pt-4'>
            <Button variant='secondary' onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading
                ? employeeToEdit
                  ? 'Updating...'
                  : 'Adding...'
                : employeeToEdit
                  ? 'Update Employee'
                  : 'Add Employee'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
