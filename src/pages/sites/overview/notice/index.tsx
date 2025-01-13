import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Notice } from '@/@types/site-management'
import { NoticeAddEditModal } from './add-edit-modal'
import { useState } from 'react'
import {
  useDeleteNoticeMutation,
  useGetNoticesQuery,
} from '@/services/siteManagmentApi'
import { useShortCode } from '@/hooks/use-local-storage'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import { toast } from '@/components/ui/use-toast'

interface NoticeViewProps {
  siteId: number
}

const NoticeView = ({ siteId }: NoticeViewProps) => {
  const shortCode = useShortCode()
  const [notice, setNotice] = useState<Notice | null>(null)
  const [isOpenNotice, setIsOpenNotice] = useState(false)
  const [isOpenDeleteNotice, setIsOpenDeleteNotice] = useState(false)
  const [deleteNotice] = useDeleteNoticeMutation()
  const {
    data: notices,
    refetch: refreshNotices,
    isLoading: isLoadingNotices,
  } = useGetNoticesQuery({
    shortCode,
    siteId: Number(siteId),
    page: 1,
    perPage: 20,
  })

  const handleDelete = async () => {
    await deleteNotice({
      shortCode,
      id: notice?.id!,
    }).unwrap()
    toast({
      title: 'Notice deleted successfully',
      variant: 'default',
    })
    refreshNotices()
    setIsOpenDeleteNotice(false)
  }

  return (
    <>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0'>
          <CardTitle className='text-lg font-medium'>Notices</CardTitle>
          <Button
            variant='default'
            size='sm'
            onClick={() => {
              setNotice(null)
              setIsOpenNotice(true)
            }}
          >
            Add Notice
          </Button>
        </CardHeader>
        {isLoadingNotices && (
          <div className='flex items-center justify-center p-6'>
            <div className='text-sm text-muted-foreground'>
              Loading notices...
            </div>
          </div>
        )}
        {notices?.data?.length === 0 && (
          <div className='flex items-center justify-center p-6'>
            <div className='text-sm text-muted-foreground'>
              No notices found
            </div>
          </div>
        )}
        <div className='grid grid-cols-4 gap-4 p-6'>
          {notices?.data.map((notice: Notice) => (
            <Card key={notice.id}>
              <CardContent className='flex flex-col p-6'>
                <div>
                  <div className='flex items-center justify-between'>
                    <h3 className='font-semibold'>{notice.title}</h3>
                    <Badge variant='secondary'>
                      {notice.type.charAt(0).toUpperCase() +
                        notice.type.slice(1)}
                    </Badge>
                  </div>
                  <p className='mt-2 text-sm text-muted-foreground'>
                    {notice.description}
                  </p>
                  {notice.attachment && (
                    <div className='mt-2'>
                      <a
                        href={notice.attachment}
                        className='text-sm text-blue-500 hover:underline'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        View Attachment
                      </a>
                    </div>
                  )}
                </div>
                <div className='mt-auto flex items-center justify-end gap-2 pt-2'>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => {
                      setNotice(notice)
                      setIsOpenDeleteNotice(true)
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant='default'
                    size='sm'
                    onClick={() => {
                      setNotice(notice)
                      setIsOpenNotice(true)
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>
      <NoticeAddEditModal
        notice={notice}
        isOpen={isOpenNotice}
        onClose={() => setIsOpenNotice(false)}
        refreshNotices={refreshNotices}
        siteId={Number(siteId)}
      />
      <ConfirmationModal
        id={notice?.id}
        open={isOpenDeleteNotice}
        setOpen={setIsOpenDeleteNotice}
        handleDelete={handleDelete}
        title='Delete Notice'
        description='Are you sure you want to delete this notice? This action cannot be undone.'
      />
    </>
  )
}

export default NoticeView
