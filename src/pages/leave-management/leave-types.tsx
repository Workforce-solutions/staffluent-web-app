/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

const LeaveTypesList = () => {
  const [open, setOpen] = useState(false)
  const [editingLeaveType, setEditingLeaveType] = useState<any | null>(null)

  // Sample data - replace with actual API data
  const leaveTypes = [
    {
      id: 1,
      name: 'Annual Leave',
      days_per_year: 20,
      accrual_rate: 'Monthly',
      requires_approval: true,
      status: 'active',
      color: 'green',
      description: 'Standard annual leave for all employees',
    },
    {
      id: 2,
      name: 'Sick Leave',
      days_per_year: 10,
      accrual_rate: 'Yearly',
      requires_approval: false,
      status: 'active',
      color: 'red',
      description: "Leave for medical reasons with doctor's note required",
    },
    {
      id: 3,
      name: 'Maternity Leave',
      days_per_year: 90,
      accrual_rate: 'One-time',
      requires_approval: true,
      status: 'active',
      color: 'purple',
      description: 'Maternity leave for expecting mothers',
    },
  ]

  const AddEditLeaveTypeForm = () => (
    <div className='grid gap-4 py-4'>
      <div className='grid gap-2'>
        <label htmlFor='name'>Leave Type Name</label>
        <Input id='name' defaultValue={editingLeaveType?.name} />
      </div>
      <div className='grid gap-2'>
        <label htmlFor='days'>Days Per Year</label>
        <Input
          id='days'
          type='number'
          defaultValue={editingLeaveType?.days_per_year}
        />
      </div>
      <div className='grid gap-2'>
        <label>Accrual Rate</label>
        <Select defaultValue={editingLeaveType?.accrual_rate || 'Monthly'}>
          <SelectTrigger>
            <SelectValue placeholder='Select accrual rate' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Monthly'>Monthly</SelectItem>
            <SelectItem value='Yearly'>Yearly</SelectItem>
            <SelectItem value='One-time'>One-time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='grid gap-2'>
        <label>Color</label>
        <Select defaultValue={editingLeaveType?.color || 'green'}>
          <SelectTrigger>
            <SelectValue placeholder='Select color' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='green'>Green</SelectItem>
            <SelectItem value='red'>Red</SelectItem>
            <SelectItem value='purple'>Purple</SelectItem>
            <SelectItem value='blue'>Blue</SelectItem>
            <SelectItem value='orange'>Orange</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='grid gap-2'>
        <label htmlFor='description'>Description</label>
        <Input id='description' defaultValue={editingLeaveType?.description} />
      </div>
    </div>
  )

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Leave Types</h2>
            <p className='text-muted-foreground'>
              Manage and configure different types of leave for your
              organization
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className='mr-2 h-4 w-4' />
                Add Leave Type
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[500px]'>
              <DialogHeader>
                <DialogTitle>
                  {editingLeaveType ? 'Edit Leave Type' : 'Add New Leave Type'}
                </DialogTitle>
                <DialogDescription>
                  {editingLeaveType
                    ? 'Edit the details of the existing leave type'
                    : 'Configure a new type of leave for your organization'}
                </DialogDescription>
              </DialogHeader>
              <AddEditLeaveTypeForm />
              <DialogFooter>
                <Button variant='outline' onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setOpen(false)}>
                  {editingLeaveType ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Card>
          <CardHeader className='flex flex-row items-center gap-4 space-y-0'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input placeholder='Search leave types...' className='pl-8' />
              </div>
            </div>
            <Select defaultValue='all'>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Filter by status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='inactive'>Inactive</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Days/Year</TableHead>
                  <TableHead>Accrual Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveTypes.map((leaveType) => (
                  <TableRow key={leaveType.id}>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <div
                          className={`h-3 w-3 rounded-full bg-${leaveType.color}-500`}
                        />
                        {leaveType.name}
                      </div>
                    </TableCell>
                    <TableCell>{leaveType.days_per_year}</TableCell>
                    <TableCell>{leaveType.accrual_rate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          leaveType.status === 'active'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {leaveType.status}
                      </Badge>
                    </TableCell>
                    <TableCell className='max-w-[300px] truncate'>
                      {leaveType.description}
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => {
                          setEditingLeaveType(leaveType)
                          setOpen(true)
                        }}
                      >
                        <Pencil className='h-4 w-4' />
                      </Button>
                      <Button variant='ghost' size='icon'>
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}

export default LeaveTypesList
