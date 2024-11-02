// src/pages/projects/components/columns.tsx
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
// @ts-ignore
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Project } from '../data/schema'
import { Progress } from '@/components/ui/progress'

export const columns: ColumnDef<Project>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
                className='translate-y-[2px]'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
                className='translate-y-[2px]'
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Project' />,
        cell: ({ row }) => {
            return (
                <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('name')}
          </span>
                </div>
            )
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
        cell: ({ row }) => {
            const status = row.getValue('status') as string
            return <Badge variant={status === 'active' ? 'default' : 'secondary'}>{status}</Badge>
        },
    },
    {
        accessorKey: 'progress',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Progress' />,
        cell: ({ row }) => {
            const progress = row.getValue('progress') as number
            return (
                <div className="w-full">
                    <Progress value={progress} className="w-[60%]" />
                    <span className="text-muted-foreground text-sm">{progress}%</span>
                </div>
            )
        },
    },
    {
        accessorKey: 'team',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Team' />,
        cell: ({ row }) => {
            const team = row.getValue('team') as { name: string; avatar: string }[]
            return (
                <div className="flex -space-x-2 overflow-hidden">
                    {team.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="inline-block border-2 border-background">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    ))}
                    {team.length > 3 && (
                        <Avatar className="inline-block border-2 border-background">
                            <AvatarFallback>+{team.length - 3}</AvatarFallback>
                        </Avatar>
                    )}
                </div>
            )
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]