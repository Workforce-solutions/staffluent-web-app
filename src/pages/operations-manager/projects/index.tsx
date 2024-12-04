import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import GenericTableWrapper from '@/components/wrappers/generic-wrapper'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useShortCode } from '@/hooks/use-local-storage'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { projectStatuses } from '@/pages/projects/tasks/data/data'
import { Progress } from '@/components/ui/progress'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { getStatusVariant } from '@/hooks/common/common-functions'
import { useGetProjectsListQuery } from '@/services/operationMangerApi'

export default function TeamLeaderProjects() {
    // @ts-ignore
    const [open, setOpen] = useState(false)

    const venue_short_code = useShortCode()
    const { data: projectData } = useGetProjectsListQuery({ venue_short_code });

    // @ts-ignore
    const columns: ColumnDef<Project>[] = [
        {
            id: 'select',
            header: ({ table }: any) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label='Select all'
                    className='translate-y-[2px]'
                />
            ),
            cell: ({ row }: any) => (
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
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title='Project' />
            ),
            cell: ({ row }: any) => {
                return (
                    <div className='flex flex-col space-y-1'>
                        <span className='font-medium'>{row.getValue('name')}</span>
                        {row.original.client && (
                            <span className='text-sm text-muted-foreground'>
                                Client: {row.original.client.name}
                            </span>
                        )}
                    </div>
                )
            },
        },
        {
            accessorKey: 'start_date',
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title='Start Date' />
            ),
            cell: ({ row }: any) => {
                const date = row.getValue('start_date')
                if (!date) return <div className="text-muted-foreground">Not set</div>
                return format(new Date(date as string), 'MMM dd, yyyy')
            },
        },
        {
            accessorKey: 'end_date',
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title='Due Date' />
            ),
            cell: ({ row }: any) => {
                const date = row.getValue('end_date')
                if (!date) return <div className="text-muted-foreground">Not set</div>
                return format(new Date(date as string), 'MMM dd, yyyy')
            },
        },
        {
            accessorKey: 'status',
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title='Status' />
            ),
            cell: ({ row }: any) => {
                const status = projectStatuses.find(
                    (status) => status.value === row.original.status
                )
                if (!status) return null
                return (
                    <div className='flex w-[100px] items-center'>
                        <Badge variant={getStatusVariant(row.original.status)}>
                            {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
                        </Badge>
                    </div>
                )
            },
            filterFn: (row: any, id: any, value: any) => value.includes(row.getValue(id)),
        },
        {
            accessorKey: 'progress',
            header: ({ column }: any) => (
                <DataTableColumnHeader column={column} title='Progress' />
            ),
            cell: ({ row }: any) => {
                const progress = row.getValue('progress') as number
                {/*// @ts-ignore*/ }
                const hours = `${row.original.time_entries.spent_hours}/${row.original.time_entries.estimated_hours}h`
                return (
                    <div className='w-full space-y-1'>
                        <div className='flex items-center gap-2'>
                            <Progress value={progress} className='w-[60%]' />
                            <span className='text-sm text-muted-foreground'>{progress}%</span>
                        </div>
                        <span className='text-xs text-muted-foreground'>{hours}</span>
                    </div>
                )
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }: any) => (
                <div className='flex justify-end space-x-2'>
                    {(row.original.status === 'pending' ||
                        row.original.status === 'overdue') && (
                            <Button size='sm' onClick={() => { }}>
                                Pay Now
                            </Button>
                        )}
                    {/* <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => {
                            handleDownload(row.original.id)
                        }}
                    >
                        <Download className='h-4 w-4' />
                    </Button> */}
                </div>
            ),
        },
    ]

    return (
        <Layout>
            {/* Modal will go here */}
            <Layout.Header sticky>
                <div className='ml-auto flex items-center space-x-2'>
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body>
                <div className='flex items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Team Projects</h2>
                        <p className='text-muted-foreground'>
                            Manage and monitor your team's projects
                        </p>
                    </div>
                    {/* <div className='flex items-center space-x-2'>
                        <Button onClick={() => setOpen(true)}>
                            <PlusIcon className='mr-2 h-4 w-4' /> Add Project
                        </Button>
                    </div> */}
                </div>
                <div className='mt-4 flex-1 space-y-4'>
                    <GenericTableWrapper
                        data={projectData?.projects || []}
                        // @ts-ignore
                        columns={columns}
                        rowsSelected
                        isError={false}
                        isLoading={false}
                    />
                </div>
            </Layout.Body>
        </Layout>
    )
}