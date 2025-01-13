import { Checklist } from '@/@types/site-management'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import {
  useDeleteChecklistMutation,
  useGetChecklistsQuery,
} from '@/services/siteManagmentApi'
import { ChecklistAddEditModal } from './add-edit-modal'
import { useShortCode } from '@/hooks/use-local-storage'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import { ChecklistViewModal } from './view'

interface ChecklistViewProps {
  siteId: number
}
const ChecklistView = ({ siteId }: ChecklistViewProps) => {
  const shortCode = useShortCode()
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(
    null
  )
  const [showChecklistViewModal, setShowChecklistViewModal] = useState(false)
  const {
    data: checklists,
    isLoading,
    error,
    refetch: refreshChecklists,
  } = useGetChecklistsQuery({
    shortCode: shortCode,
    siteId: siteId,
    page: 1,
    perPage: 10,
  })
  const [deleteChecklist] = useDeleteChecklistMutation()

  const handleDelete = async (checklistId: number) => {
    await deleteChecklist({ shortCode: shortCode, id: checklistId })
    refreshChecklists()
  }

  return (
    <>
      <Card>
        <CardHeader className='flex justify-between'>
          <div className='flex items-center justify-between'>
            <CardTitle>Checklists</CardTitle>
            <Button onClick={() => setShowAddEditModal(true)}>
              Add Checklist
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading checklists</div>
          ) : checklists?.data?.length === 0 ? (
            <div>No checklists found</div>
          ) : (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
              {checklists?.data?.map((checklist: Checklist) => (
                <Card key={checklist.id}>
                  <CardHeader>
                    <div className='flex flex-col gap-4'>
                      <div className='flex items-center justify-between'>
                        <CardTitle className='text-lg'>
                          {checklist.title}
                        </CardTitle>
                      </div>
                      <div className='h-2.5 w-full rounded-full bg-gray-200'>
                        <div
                          className='h-2.5 rounded-full bg-accent'
                          style={{ width: `${checklist.progress}%` }}
                        ></div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='text-sm text-muted-foreground'>
                          {checklist.completed_items}/{checklist.total_items}{' '}
                          items completed • {checklist.progress}%
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='grid grid-cols-2 gap-6'>
                      <div>
                        <div className='font-medium'>Assigned To</div>
                        <div className='text-sm text-muted-foreground'>
                          {checklist.assigned.name}
                        </div>
                      </div>
                      <div>
                        <div className='font-medium'>Due Date</div>
                        <div className='text-sm text-muted-foreground'>
                          {checklist.due_date}
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setSelectedChecklist(checklist)
                            setShowChecklistViewModal(true)
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => {
                            setSelectedChecklist(checklist)
                            setShowAddEditModal(true)
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant='destructive'
                          size='sm'
                          onClick={() => {
                            setSelectedChecklist(checklist)
                            setIsOpenDelete(true)
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ChecklistAddEditModal
        checklist={selectedChecklist}
        isOpen={showAddEditModal}
        onClose={() => {
          setShowAddEditModal(false)
          setSelectedChecklist(null)
        }}
        refreshChecklists={refreshChecklists}
        siteId={siteId}
      />
      <ConfirmationModal
        id={selectedChecklist?.id ?? 0}
        open={isOpenDelete}
        setOpen={setIsOpenDelete}
        handleDelete={handleDelete}
        title='Delete Checklist'
        description='Are you sure you want to delete this checklist? This action cannot be undone.'
      />
      <ChecklistViewModal
        checklist={selectedChecklist}
        setChecklist={setSelectedChecklist}
        isOpen={showChecklistViewModal}
        onClose={() => setShowChecklistViewModal(false)}
        refreshChecklists={refreshChecklists}
      />
    </>
  )
}

export default ChecklistView
