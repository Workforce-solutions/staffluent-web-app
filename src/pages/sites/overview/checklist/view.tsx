import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Checklist } from '@/@types/site-management'
import { useShortCode } from '@/hooks/use-local-storage'
import { useMarkCheckListItemCompletedMutation } from '@/services/siteManagmentApi'
import { toast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'

interface ChecklistViewModalProps {
  checklist: Checklist | null
  setChecklist: (checklist: Checklist | null) => void
  isOpen: boolean
  onClose: () => void
  refreshChecklists: () => void
}

export const ChecklistViewModal = ({
  checklist,
  setChecklist,
  isOpen,
  onClose,
  refreshChecklists,
}: ChecklistViewModalProps) => {
  const shortCode = useShortCode()
  const [markCheckListItemCompleted] = useMarkCheckListItemCompletedMutation()

  const handleCheckboxChange = async (itemId: number, isCompleted: boolean) => {
    if (!checklist) return

    try {
      await markCheckListItemCompleted({
        shortCode,
        checklistId: checklist.id,
        itemId: itemId,
        data: {
          is_completed: isCompleted ? 1 : 0
        }
      }).unwrap()

      const updatedItems = checklist.items.map(item => {
        if (item.id === itemId) {
          return { ...item, is_completed: isCompleted ? 1 : 0 }
        }
        return item
      })
    //   checklist.items = updatedItems
      const completedItems = updatedItems.filter(item => item.is_completed === 1).length
      const totalItems = updatedItems.length
      const progress = Math.round((completedItems / totalItems) * 100)
      
      setChecklist({ ...checklist, items: updatedItems, progress })
      toast({
        title: 'Item status updated successfully',
        variant: 'default',
      })
      refreshChecklists()
    } catch (error) {
      console.error('Update error:', error)
      toast({
        title: 'Failed to update item status',
        variant: 'destructive',
      })
    }
  }

  if (!checklist) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{checklist.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Assigned To</p>
              <p className="text-sm text-gray-500">{checklist.assigned?.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Due Date</p>
              <p className="text-sm text-gray-500">{checklist.due_date}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-accent h-2.5 rounded-full"
                style={{ width: `${checklist.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {checklist.completed_items} of {checklist.total_items} items completed
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Items</p>
            {checklist.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={item.is_completed === 1}
                  onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                />
                <span className={`text-sm ${item.is_completed === 1 ? 'line-through text-gray-500' : ''}`}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
