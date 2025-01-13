import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Notice } from '@/@types/site-management'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useShortCode } from '@/hooks/use-local-storage'
import { useAddNoticeMutation, useUpdateNoticeMutation } from '@/services/siteManagmentApi'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.string().min(1, 'Type is required'),
  attachment: z.instanceof(File).optional().or(z.string().optional()),
})

interface AddEditModalProps {
  notice: Notice | null
  isOpen: boolean
  onClose: () => void
  refreshNotices: () => void
  siteId?: number
}

export const NoticeAddEditModal = ({
  notice,
  isOpen,
  onClose,
  refreshNotices,
  siteId,
}: AddEditModalProps) => {
  const shortCode = useShortCode()
  const [addNotice] = useAddNoticeMutation()
  const [updateNotice] = useUpdateNoticeMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: notice?.title || '',
      description: notice?.description || '',
      type: notice?.type || '',
      attachment: notice?.attachment || '',
    },
  })

  useEffect(() => {
    if(notice){
      form.reset(notice)
    } else {
      form.reset()
    }
  }, [isOpen])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true)

      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('description', values.description) 
      formData.append('type', values.type)
      
      if (values.attachment instanceof File) {
        formData.append('attachment', values.attachment)
      }

      if (notice) {
        await updateNotice({
          shortCode,
          noticeData: formData,
          id: notice.id,
        }).unwrap()
        toast({
          title: 'Notice updated successfully',
          variant: 'default',
        })
      } else {
        await addNotice({
          shortCode,
          siteId: siteId!,
          noticeData: formData,
        }).unwrap()
        toast({
          title: 'Notice added successfully',
          variant: 'default',
        })
      }
      refreshNotices()
      onClose()
    } catch (error) {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{notice ? 'Edit Notice' : 'Add Notice'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attachment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachment URL</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          // Handle file upload here
                          field.onChange(file)
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : notice ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
