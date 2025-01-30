import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useDeleteRequirementMutation, useGetRequirementsQuery } from '@/services/siteManagmentApi'
import { useShortCode } from '@/hooks/use-local-storage'
import { Requirement } from '@/@types/site-management'
import { Badge } from '@/components/ui/badge'
import { RequirementAddEditModal } from './add-edit-modal'
import ConfirmationModal from '@/components/wrappers/confirmation-modal'
import { toast } from '@/components/ui/use-toast'

interface RequirementViewProps {
  siteId: number
}

const RequirementView = ({ siteId }: RequirementViewProps) => {
  const shortCode = useShortCode()
  const [isOpenRequirement, setIsOpenRequirement] = useState(false)
  const [isOpenDeleteRequirement, setIsOpenDeleteRequirement] = useState(false)
  const [requirement, setRequirement] = useState<Requirement | null>(null)
  const [deleteRequirement] = useDeleteRequirementMutation()
  const {
    data: requirements,
    refetch: refreshRequirements,
    isLoading: isLoadingRequirements,
  } = useGetRequirementsQuery({
    shortCode,
    siteId: Number(siteId),
    page: 1,
    perPage: 20,
  })

  const handleDelete = async () => {
    await deleteRequirement({
      shortCode,
      id: requirement?.id!,
    })
    toast({
      title: 'Requirement deleted successfully',
      variant: 'default',
    })
    refreshRequirements()
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>Requirements</CardTitle>
            <Button
              variant='default'
              size='sm'
              onClick={() => {
                setRequirement(null)
                setIsOpenRequirement(true)
              }}
            >
              Create Requirement
            </Button>
          </div>
        </CardHeader>
        {isLoadingRequirements && (
          <div className='flex items-center justify-center p-6'>
            <div className='text-sm text-muted-foreground'>
              Loading requirements...
            </div>
          </div>
        )}
        {requirements?.data?.length === 0 && (
          <div className='flex items-center justify-center p-6'>
            <div className='text-sm text-muted-foreground'>
              No requirements found
            </div>
          </div>
        )}
        <div className='grid grid-cols-1 gap-4 p-3 md:grid-cols-2 lg:grid-cols-4'>
          {requirements?.data?.map((requirement: Requirement) => (
            <Card key={requirement.id}>
              <CardContent className='flex h-full flex-col justify-between pt-6'>
                <div className='flex h-full flex-col justify-between'>
                  <div className='mb-4 flex items-center justify-between'>
                    <Badge variant='outline'>
                      {requirement.type.charAt(0).toUpperCase() +
                        requirement.type.slice(1)}
                    </Badge>
                    <span className='text-sm text-muted-foreground'>
                      {new Date(requirement.last_check_date).toLocaleDateString(
                        'en-US',
                        {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        }
                      )}
                    </span>
                  </div>
                  <h3 className='mb-2 font-medium'>{requirement.title}</h3>
                  <p className='mb-4 text-sm text-muted-foreground'>
                    {requirement.description}
                  </p>
                </div>
                <div className='mt-auto flex items-center justify-between'>
                  <Badge
                    variant={
                      requirement.status === 'completed'
                        ? 'success'
                        : requirement.status === 'in_progress'
                          ? 'warning'
                          : 'secondary'
                    }
                  >
                    {requirement.status.charAt(0).toUpperCase() +
                      requirement.status.slice(1)}
                  </Badge>
                  <div className='flex items-center gap-4'>
                    <div className='text-sm text-muted-foreground'>
                      Assigned to:{' '}
                      {requirement.assigned?.name?.length > 15
                        ? requirement.assigned.name.substring(0, 15) + '...'
                        : requirement.assigned?.name}
                    </div>
                  </div>
                </div>
                <div className='mt-auto flex items-center justify-end gap-2 pt-2'>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => {
                      setRequirement(requirement)
                      setIsOpenDeleteRequirement(true)
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant='default'
                    size='sm'
                    onClick={() => {
                      setRequirement(requirement)
                      setIsOpenRequirement(true)
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
      <RequirementAddEditModal
        isOpen={isOpenRequirement}
        requirement={requirement}
        onClose={() => setIsOpenRequirement(false)}
        refreshRequirements={refreshRequirements}
        siteId={Number(siteId)}
      />
      <ConfirmationModal
        id={requirement?.id}
        open={isOpenDeleteRequirement}
        setOpen={setIsOpenDeleteRequirement}
        handleDelete={handleDelete}
        title='Delete Requirement'
        description='Are you sure you want to delete this requirement? This action cannot be undone.'
      />
    </>
  )
}

export default RequirementView
