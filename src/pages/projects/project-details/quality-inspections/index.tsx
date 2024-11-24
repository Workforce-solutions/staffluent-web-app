import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { UserNav } from '@/components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetProjectQuery } from '@/services/projectApi'
import { ChevronLeft, PlusIcon, SlidersHorizontal, Star } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CreateEditInspectionModal } from './create-edit-inspection'

const order = [
    {
        id: 1,
        title: "Electrical Wiring Inspection",
        status: "open",
        description: "Wiring is up to code.",
        inspected_in: "2023-01-01",
        team_leader: "John Doe",
        suggestion: "Improvement suggestions"
    },
    {
        id: 2,
        title: "Electrical Wiring Inspection",
        status: "in_progress",
        description: "Wiring is up to code.",
        inspected_in: "2023-01-01",
        team_leader: "John Doe",
        suggestion: "Improvement suggestions"
    },
    {
        id: 3,
        title: "Electrical Wiring Inspection",
        status: "closed",
        description: "Wiring is up to code.",
        inspected_in: "2023-01-01",
        team_leader: "John Doe",
        suggestion: "Improvement suggestions"
    },
    {
        id: 4,
        title: "Electrical Wiring Inspection",
        status: "closed",
        description: "Wiring is up to code.",
        inspected_in: "2023-01-01",
        team_leader: "John Doe",
        suggestion: "Improvement suggestions"
    },
]

const Comments = () => {
    const { id } = useParams()
    const short_code = useShortCode()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const { data: project }: any = useGetProjectQuery({
        id: Number(id),
        venue_short_code: short_code,
    })

    return (
        <Layout>
            <Layout.Header sticky>
                <div className="ml-auto flex items-center space-x-2">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>
            <Layout.Body>
                <div className="mb-6 flex items-center gap-2">
                    <ChevronLeft
                        className="cursor-pointer"
                        onClick={() => navigate(`/projects/details/${project.id}`)}
                    />
                    <h1 className="text-2xl font-bold">Quality Inspections: {project?.name}</h1>
                </div>
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center relative w-[60%] ">
                        <Input
                            type='search'
                            placeholder='Search'
                        // className='md:w-[100px] lg:w-[100%] '
                        />
                        <SlidersHorizontal className='cursor-pointer absolute right-[2%]' size={20} />
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Button onClick={() => setOpen(true)}>
                            <PlusIcon className='mr-2 h-4 w-4' /> Add Inspection
                        </Button>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                        {order.map((supply: any) => (
                            <Card>
                                <div key={supply.id} className="bg-white p-4 rounded-md divide-y">
                                    <div className='pb-2 flex flex-col gap-2'>
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg font-bold">{supply.title}</h2>
                                            <Badge
                                                variant={
                                                    supply?.status === 'open'
                                                        ? 'warning'
                                                        : supply?.status === 'in_progress'
                                                            ? 'default'
                                                            : 'success'
                                                }
                                            >
                                                {supply?.status?.toUpperCase()}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground">
                                                {supply.description}
                                            </p>
                                            <div className='flex items-center space-x-1'>
                                                <Star size={16} />
                                                <Star size={16} />
                                                <Star size={16} />
                                                <Star size={16} />
                                                <Star size={16} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium text-black">Team Leader: </span>{supply.team_leader}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium text-black">Inspected In: </span>{supply.inspected_in}
                                        </p>
                                    </div>
                                    <Card className='p-3'>
                                        <p className="font-medium">
                                            {supply.suggestion}
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {supply.description}
                                        </p>
                                    </Card>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </Layout.Body >

            <CreateEditInspectionModal open={open} setOpen={setOpen} />
        </Layout >
    )
}

export default Comments

