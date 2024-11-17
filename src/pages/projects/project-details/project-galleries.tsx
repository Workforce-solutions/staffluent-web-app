import { Layout } from '@/components/custom/layout'
import { initialPage } from '@/components/table/data'
import { DataTablePagination } from '@/components/table/data-table-pagination'
import EmptyState from '@/components/table/empty-state'
import ThemeSwitch from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { UserNav } from '@/components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import {
  useDeleteAppGalleryItemMutation,
  useGetAppGalleriesQuery,
  useUploadAppGalleryItemMutation,
} from '@/services/projectApi'
import { useReactTable } from '@tanstack/react-table'
import { Trash, Upload } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function AppGalleries() {
  const { id: projectId } = useParams<{ id: string }>()
  const venue_short_code = useShortCode()
  const { toast } = useToast()

  const [file, setFile] = useState<File | null>(null)
  const [paginationValues, setPaginationValues] = useState(initialPage)
  const [uploadType, setUploadType] = useState<'image' | 'video'>('image')

  const {
    data: galleryData,
    isFetching,
    isError,
    refetch,
  } = useGetAppGalleriesQuery({
    id: Number(projectId),
    venue_short_code,
    ...paginationValues,
  })

  const [uploadAppGalleryItem, { isLoading: isUploading }] =
    useUploadAppGalleryItemMutation()
  const [deleteAppGalleryItem] = useDeleteAppGalleryItemMutation()

  const table = useReactTable({
    data: galleryData?.data || [],
    columns: [],
    pageCount: galleryData?.total_pages || -1,
    state: {
      pagination: {
        pageIndex: paginationValues.page - 1,
        pageSize: paginationValues.size,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({
          pageIndex: paginationValues.page - 1,
          pageSize: paginationValues.size,
        })
        setPaginationValues({
          page: newState.pageIndex + 1,
          size: newState.pageSize,
        })
      }
    },
    manualPagination: true,
  })

  const handleUpload = async () => {
    if (!file || !uploadType) {
      toast({
        title: 'Error',
        description: 'Please select a file and type.',
        variant: 'destructive',
      })
      return
    }

    const formData = new FormData()
    formData.append(uploadType, file)
    formData.append('type', uploadType)

    try {
      await uploadAppGalleryItem({
        venue_short_code,
        id: Number(projectId),
        formData,
      }).unwrap()
      toast({
        title: 'Success',
        description: 'File uploaded successfully!',
      })
      setFile(null)
      refetch()
    } catch (error) {
      console.error('Error uploading file:', error)
      toast({
        title: 'Error',
        description: 'Failed to upload file.',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (galleryId: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      await deleteAppGalleryItem({ id: galleryId, venue_short_code }).unwrap()
      toast({
        title: 'Success',
        description: 'Item deleted successfully!',
      })
      refetch()
    } catch (error) {
      console.error('Error deleting gallery item:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete item.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Layout>
      <Layout.Header className='min-h-fit border-b'>
        <div className='flex w-full flex-col'>
          <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-medium'>App Galleries</h2>
              <p className='text-sm text-muted-foreground'>
                Manage your project media
              </p>
            </div>
          </div>
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6 p-6'>
        {/* Upload Section */}
        <div className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Upload Media</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium'>
                    Select File
                  </label>
                  <input
                    type='file'
                    accept={uploadType === 'image' ? 'image/*' : 'video/*'}
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium'>
                    Media Type
                  </label>
                  <select
                    value={uploadType}
                    onChange={(e) =>
                      setUploadType(e.target.value as 'image' | 'video')
                    }
                    className='w-full border border-gray-300 p-2'
                  >
                    <option value='image'>Image</option>
                    <option value='video'>Video</option>
                  </select>
                </div>
                <Button onClick={handleUpload} disabled={isUploading || !file}>
                  {isUploading ? (
                    'Uploading...'
                  ) : (
                    <Upload className='mr-2 h-4 w-4' />
                  )}
                  Upload
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gallery Section */}
        <div>
          <Tabs defaultValue='gallery'>
            <TabsList>
              <TabsTrigger value='gallery'>Gallery</TabsTrigger>
            </TabsList>
            <TabsContent value='gallery'>
              {isFetching ? (
                <EmptyState isLoading={isFetching} isError={isError} />
              ) : (
                <>
                  <div className='grid gap-4 md:grid-cols-4'>
                    {galleryData?.data.map((item) => (
                      <Card key={item.id}>
                        <CardHeader className='flex justify-between'>
                          <CardTitle>{item.type.toUpperCase()}</CardTitle>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash className='h-4 w-4 text-red-600' />
                          </Button>
                        </CardHeader>
                        <CardContent>
                          {item.type === 'image' ? (
                            <img
                              src={item.content}
                              alt='Gallery Item'
                              className='w-full rounded'
                            />
                          ) : (
                            <video controls className='w-full rounded'>
                              <source src={item.content} type='video/mp4' />
                            </video>
                          )}
                          <p className='mt-2 text-sm'>{item.uploader.name}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className='mt-4'>
                    <DataTablePagination
                      table={table}
                      paginationValues={paginationValues}
                      setPaginationValues={setPaginationValues}
                      total_pages={galleryData?.total_pages}
                    />
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </Layout.Body>
    </Layout>
  )
}
