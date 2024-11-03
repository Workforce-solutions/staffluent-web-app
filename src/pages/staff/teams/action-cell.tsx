import { Button } from '@/components/ui/button'
import EditDelete from '@/components/wrappers/edit-delete-component'
import { BuildingIcon, EyeIcon, UsersIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TeamsResponse } from '@/@types/staff'

interface ActionsCellProps {
    team: TeamsResponse;
    onDelete?: () => void;
    onEdit?: () => void;
}

const ActionsCell = ({ team, onDelete, onEdit }: ActionsCellProps) => {
    const navigate = useNavigate()

    return (
        <div className='flex items-center justify-end  gap-1'>
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
                onClick={() => navigate(`/teams/${team.id}/departments-by-team`)}
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

            <EditDelete
                original={team}
                handleDelete={onDelete}
                handleEdit={onEdit}
            />
        </div>
    )
}

export default ActionsCell