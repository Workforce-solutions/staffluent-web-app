import { ColumnDef } from '@tanstack/react-table'
import { TeamsResponse } from '@/@types/staff'
import ActionsCell from './action-cell'
import { TeamMembersAvatar } from './team-members-avatar'
import { format } from 'date-fns'

interface ColumnActions {
  setDeleteOpen: (open: boolean) => void;
  setSelectedTeam: (team: TeamsResponse) => void;
  setModalOpen: (open: boolean) => void;
}

export const getColumns = ({
                             setDeleteOpen,
                             setSelectedTeam,
                             setModalOpen
                           }: ColumnActions): ColumnDef<TeamsResponse>[] => [
  {
    header: 'Team Name',
    accessorKey: 'name',
    cell: ({ row: { original } }) => (
        <span className='font-medium'>{original.name}</span>
    ),
  },
  {
    header: 'Description',
    accessorKey: 'description',
    cell: ({ row: { original } }) => (
        <div className="max-w-[300px] truncate text-sm">
          {original.description || (
              <span className="text-muted-foreground">No description</span>
          )}
        </div>
    ),
  },
  {
    header: 'Department',
    accessorKey: 'department.name',
  },
  {
    header: 'Team Leader',
    cell: ({ row: { original } }) => {
      const teamLeader = original.employees?.find(
          emp => emp.id === original.team_leader_id
      );

      return (
          <div className="text-sm">
            {teamLeader ? (
                <span className="font-medium">
              {teamLeader.name}
            </span>
            ) : (
                <span className="text-muted-foreground">
              No Team Leader
            </span>
            )}
          </div>
      );
    },
  },
  {
    header: 'Operations Manager',
    cell: ({ row: { original } }) => {
      const operationsManager = original.employees?.find(
          emp => emp.id === original.operations_manager_id
      );

      return (
          <div className="text-sm">
            {operationsManager ? (
                <span className="font-medium">
              {operationsManager.name}
            </span>
            ) : (
                <span className="text-muted-foreground">
              No Operations Manager
            </span>
            )}
          </div>
      );
    },
  },
  {
    header: 'Members',
    cell: ({ row: { original } }) => {
      if (!original.employees?.length) {
        return (
            <span className="text-sm text-muted-foreground">
            No team members
          </span>
        );
      }
      return <TeamMembersAvatar employees={original.employees} />;
    },
  },
  {
    header: 'Established',
    accessorKey: 'created_at',
    cell: ({ row: { original } }) => {
      if (!original.created_at) return null;

      return (
          <div className="text-sm text-muted-foreground">
            {format(new Date(original.created_at), 'MMM d, yyyy')}
          </div>
      );
    },
  },
  {
    header: 'Actions',
    cell: ({ row: { original } }) => (
        <ActionsCell
            team={original}
            onDelete={() => {
              setSelectedTeam(original)
              setDeleteOpen(true)
            }}
            onEdit={() => {
              setSelectedTeam(original)
              setModalOpen(true)
            }}
        />
    ),
  },
]