import { Button } from '@/components/ui/button'
import { Issue } from '@/@types/site-management'
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card'
import {
  useDeleteIssueMutation,
  useGetIssuesQuery,
} from '@/services/siteManagmentApi'
import { useState } from 'react'
import { useShortCode } from '@/hooks/use-local-storage'
import { Badge } from '@/components/ui/badge'
import { EditIssueModal } from './edit-issue'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import { toast } from '@/components/ui/use-toast'

interface IssueViewProps {
  siteId: number
}
const IssueView = ({ siteId }: IssueViewProps) => {
  const shortCode = useShortCode()

  const { data: issues, refetch: refreshIssues } = useGetIssuesQuery({
    shortCode,
    siteId: Number(siteId),
    search: '',
    page: 1,
    perPage: 20,
  })

  const [deleteIssue] = useDeleteIssueMutation()

  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [issue, setIssue] = useState<Issue | null>(null)

  const handleDelete = async () => {
    await deleteIssue({ shortCode, id: issue?.id! })
    toast({
      title: 'Issue deleted successfully',
      variant: 'default',
    })
    refreshIssues()
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {issues?.data.map((issue: Issue) => (
              <Card key={issue.id}>
                <CardContent className='flex h-full flex-col justify-between pt-6'>
                  <div className='flex h-full flex-col justify-between'>
                    <div className='mb-4 flex items-center justify-between'>
                      <Badge
                        variant={
                          issue.priority === 'critical'
                            ? 'destructive'
                            : issue.priority === 'high'
                              ? 'warning'
                              : issue.priority === 'medium'
                                ? 'secondary'
                                : 'default'
                        }
                      >
                        {issue.priority.charAt(0).toUpperCase() +
                          issue.priority.slice(1)}
                      </Badge>
                      <span className='text-sm text-muted-foreground'>
                        {new Date(issue.created_at).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </span>
                    </div>
                    <h3 className='mb-2 font-medium'>{issue.title}</h3>
                    <p className='mb-4 text-sm text-muted-foreground'>
                      {issue.description}
                    </p>
                  </div>
                  <div className='mt-auto flex items-center justify-between'>
                    <Badge variant='outline'>
                      {issue.status.charAt(0).toUpperCase() +
                        issue.status.slice(1)}
                    </Badge>
                    <div className='flex items-center gap-2'>
                      <Button
                        variant='destructive'
                        size='sm'
                        className='ml-2'
                        onClick={() => {
                          setIssue(issue)
                          setIsOpenDelete(true)
                        }}
                      >
                        Delete
                      </Button>
                      {issue.status !== 'resolved' && (
                        <Button
                          variant='default'
                          size='sm'
                          onClick={() => {
                            setIssue(issue)
                            setIsOpenEdit(true)
                          }}
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <EditIssueModal
        issue={issue}
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        refreshIssues={refreshIssues}
      />
      <ConfirmationModal
        id={issue?.id}
        open={isOpenDelete}
        setOpen={setIsOpenDelete}
        handleDelete={handleDelete}
        title='Delete Issue'
        description='Are you sure you want to delete this issue? This action cannot be undone.'
      />
    </>
  )
}

export default IssueView
