import { ProjectEmployee } from '@/@types/project'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface OperationsManagersProps {
  operations_managers: ProjectEmployee[]
}

const OperationsManagers = ({
  operations_managers,
}: OperationsManagersProps) => {
  return (
    <div>
      <h4 className='mb-4 text-sm font-medium'>Operations Managers</h4>
      <div className='grid gap-4 md:grid-cols-2'>
        {operations_managers.map((manager) => (
          <div key={manager.id} className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={manager.avatar} />
              <AvatarFallback>
                {manager.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium'>{manager.name}</p>
              <p className='text-sm text-muted-foreground'>
                Operations Manager
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OperationsManagers
