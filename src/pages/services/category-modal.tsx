import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import {
  useCreateServiceCategorieMutation,
  useUpdateServiceCategorieMutation,
} from '@/services/servicesApi'
import { useShortCode } from '@/hooks/use-local-storage'
import { useEffect } from 'react'

interface CategoryModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  category?: any // Replace with your type
}

export function CategoryModal({ open, setOpen, category }: CategoryModalProps) {
  const { toast } = useToast()
  const isEditing = !!category
  const venue_short_code = useShortCode()

  const [updateServiceCategorie] = useUpdateServiceCategorieMutation()
  const [createServiceCategorie] = useCreateServiceCategorieMutation()

  const form = useForm({
    defaultValues: {
      name: category?.name || '',
      description: category?.description || '',
    },
  })

  useEffect(() => {
    form.reset({
      name: category?.name || '',
      description: category?.description || '',
    })
  }, [category, form])

  // @ts-ignore
  const onSubmit = async (data: { name: string; description: string }) => {
    try {
      if (isEditing) {
        await updateServiceCategorie({
          venue_short_code: venue_short_code,
          id: category?.id,
          data: data,
        }).unwrap()
        toast({
          title: 'Success',
          description: 'Category updated successfully',
        })
      } else {
        await createServiceCategorie({
          venue_short_code: venue_short_code,
          data: data,
        }).unwrap()
        toast({
          title: 'Success',
          description: 'Category created successfully',
        })
      }
      setOpen(false)
      form.reset()
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${isEditing ? 'update' : 'create'} category`,
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Add'} Category</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Edit the' : 'Create a new'} service category
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter category name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter category description'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end space-x-2 pt-4'>
              <Button
                variant='outline'
                onClick={() => setOpen(false)}
                type='button'
              >
                Cancel
              </Button>
              <Button type='submit'>
                {isEditing ? 'Save changes' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
