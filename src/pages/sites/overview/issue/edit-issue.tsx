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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Issue } from '@/@types/site-management'
import { useEffect, useState } from 'react'
import { useUpdateIssueMutation } from '@/services/siteManagmentApi'
import { useShortCode } from '@/hooks/use-local-storage'

interface EditIssueModalProps {
  issue: Issue | null
  isOpen: boolean
  onClose: () => void
  refreshIssues: () => void
}

export function EditIssueModal({
  issue,
  isOpen,
  onClose,
  refreshIssues,
}: EditIssueModalProps) {
    
  const shortCode = useShortCode()
  const [title, setTitle] = useState(issue?.title || '')
  const [description, setDescription] = useState(issue?.description || '')
  const [status, setStatus] = useState(issue?.status || 'open')
  const [priority, setPriority] = useState(issue?.priority || 'low')
  const [updateIssue, { isLoading }] = useUpdateIssueMutation()
  
  useEffect(() => {
    setTitle(issue?.title || '')
    setDescription(issue?.description || '')
    setStatus(issue?.status || 'open')
    setPriority(issue?.priority || 'low')
  }, [issue])

  const handleSave = async () => {
    const response = await updateIssue({
      shortCode: shortCode,
      issueData: {
        title,
        description,
        status,
        priority,
      },
      id: issue?.id || 0,
    })
    if (response.error) {
      console.error('Error updating issue:', response.error)
    } else {
      refreshIssues()
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Issue</DialogTitle>
          <DialogDescription>
            Make changes to the issue details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              disabled={isLoading}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              disabled={isLoading}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={(value: 'open' | 'in_progress' | 'resolved') => setStatus(value)} disabled={isLoading}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high' | 'critical') => setPriority(value)} disabled={isLoading}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
