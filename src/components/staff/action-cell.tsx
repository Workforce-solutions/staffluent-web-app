import { Button } from '@/components/ui/button'
import EditDelete from '@/components/wrappers/edit-delete-component'
import { BuildingIcon, EyeIcon, UsersIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TeamsResponse } from '@/@types/staff'

interface ActionsCellProps {
  team: TeamsResponse
}

const ActionsCell = ({ team }: ActionsCellProps) => {
  const navigate = useNavigate()

  return (
    <div className='flex items-center gap-1'>
      <Button
        variant='ghost'
        size='icon'
        onClick={() => navigate(`/teams/${team.id}/members`)}
        title='View Employees'
      >
        <UsersIcon className='h-4 w-4' />
      </Button>

      <Button
        variant='ghost'
        size='icon'
        onClick={() => navigate(`/teams/${team.id}/departments`)}
        title='View Departments'
      >
        <BuildingIcon className='h-4 w-4' />
      </Button>

      <Button
        variant='ghost'
        size='icon'
        onClick={() => navigate(`/teams/${team.id}`)}
        title='View Team'
      >
        <EyeIcon className='h-4 w-4' />
      </Button>

      <EditDelete original={team} />
    </div>
  )
}

export default ActionsCell
