import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import SelectWrapper from '@/components/wrappers/select-wrapper'
import { useToast } from '@/components/ui/use-toast'
import { IconBuilding } from '@tabler/icons-react'
import { OptionsType } from '@/@types/common'

export type AssignmentModalProps = {
  open: boolean
  setOpen: (open: boolean) => void
  title: string
  description: string
  options: OptionsType[]
  isLoading?: boolean
  onSave: (selectedId: number) => Promise<void>
  selectLabel?: string
  selectPlaceholder?: string
}

const DynamicAssignmentModal = ({
  open,
  setOpen,
  title,
  description,
  options,
  isLoading = false,
  onSave,
  selectLabel = 'Select Option',
  selectPlaceholder = 'Select an option',
}: AssignmentModalProps) => {
  const { toast } = useToast()
  const [selectedValue, setSelectedValue] = useState(-1)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedValue !== -1) {
      try {
        await onSave(selectedValue)
        toast({
          title: 'Success',
          description: 'Assignment completed successfully',
        })
        setOpen(false)
        setSelectedValue(-1)
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to complete assignment',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px] md:min-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center space-x-2'>
              <IconBuilding className='h-6 w-6' />
              <span>{title}</span>
            </div>
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-3'>
            <Label className='col-span-4 text-left'>{selectLabel}</Label>
            <SelectWrapper
              options={options}
              onChange={(value) => setSelectedValue(value)}
              placeholder={selectPlaceholder}
            />
          </div>
          <DialogFooter className='mt-5 flex justify-between sm:justify-end sm:space-x-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DynamicAssignmentModal
