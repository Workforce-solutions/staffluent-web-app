import { EditDeleteProps } from '@/@types/common'
import { Button } from '../ui/button'
import { PencilIcon, TrashIcon } from 'lucide-react'

const EditDelete = <T,>({
  original,
  disableDelete,
  disableEdit,
  handleDelete,
  handleEdit,
}: EditDeleteProps<T>) => {
  return (
    <div className='flex space-x-2'>
      {handleEdit && (
        <Button
          disabled={disableEdit}
          variant='ghost'
          size='icon'
          onClick={() => handleEdit?.(original)}
        >
          <PencilIcon className='h-4 w-4' />
        </Button>
      )}
      {handleDelete && (
        <Button
          disabled={disableDelete}
          variant='ghost'
          size='icon'
          onClick={() => handleDelete?.(original)}
        >
          <TrashIcon className='h-4 w-4 text-red-500' />
        </Button>
      )}
    </div>
  )
}

export default EditDelete
