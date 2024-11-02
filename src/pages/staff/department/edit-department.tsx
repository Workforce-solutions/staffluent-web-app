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
import { useToast } from '@/components/ui/use-toast'
import { useShortCode } from '@/hooks/use-local-storage'
import { useUpdateDepartmentMutation } from '@/services/staffApi'
import { useState, useEffect } from 'react'
import { IconBuilding } from '@tabler/icons-react'
import { FormEvent } from 'react'
import { DepartmentResponse } from "@/@types/staff";

interface EditDepartmentModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  department: DepartmentResponse | null;
}

export function EditDepartmentModal({ open, setOpen, department }: EditDepartmentModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [updateDepartment, { isLoading }] = useUpdateDepartmentMutation()
  const { toast } = useToast()

  const short_code = useShortCode()

  useEffect(() => {
    if (department) {
      setName(department.name)
      setDescription(department.description)
    }
  }, [department])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!department) return

    try {
      await updateDepartment({
        id: department.id,
        name,
        description,
        short_code,
      }).unwrap()
      toast({
        title: 'Success',
        description: 'Department updated successfully',
      })
      setOpen(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update department',
        variant: 'destructive',
      })
    }
  }

  if (!department) return null

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[425px] md:min-w-[600px]'>
          <DialogHeader>
            <DialogTitle>
              <div className='flex items-center space-x-2'>
                <IconBuilding size={24} />
                <span>Edit Department</span>
              </div>
            </DialogTitle>
            <DialogDescription>
              Make changes to the department details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-left'>
                  Name
                </Label>
                <Input
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='col-span-3'
                    required
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='description' className='text-left'>
                  Description
                </Label>
                <Input
                    id='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='col-span-3'
                    required
                />
              </div>
            </div>
            <DialogFooter className="flex justify-between sm:justify-end sm:space-x-2">
              <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  )
}