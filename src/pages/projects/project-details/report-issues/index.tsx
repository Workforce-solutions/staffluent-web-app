import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { UserNav } from '@/components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetProjectQuery } from '@/services/projectApi'
import { ChevronLeft, SlidersHorizontal } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

const issues = [
    {
        id: 1,
        title: "Cannot commit",
        status: "open",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
        reported_on: "2023-01-01",
        priorities: "High",
    },
    {
        id: 2,
        title: "Cannot commit",
        status: "in_progress",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
        reported_on: "2023-01-01",
        priorities: "Medium",
    },
    {
        id: 3,
        title: "Cannot commit",
        status: "closed",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
        reported_on: "2023-01-01",
        priorities: "Low",
    },
    {
        id: 4,
        title: "Cannot commit",
        status: "closed",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, quia.",
        reported_on: "2023-01-01",
        priorities: "Low",
    },
]

const Comments = () => {
    const { id } = useParams()
    const short_code = useShortCode()
    const navigate = useNavigate()

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
                    <h1 className="text-2xl font-bold">Report Issues: {project?.name}</h1>
                </div>
                <div className="mb-6 flex items-center gap-2">
                    <Input
                        type='search'
                        placeholder='Search'
                        className='md:w-[100px] lg:w-[50%] relative'
                    />
                    <SlidersHorizontal className='cursor-pointer absolute left-[55%]' size={20} />
                </div>
                <div className="space-y-6">
                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
                        {issues.map((supply: any) => (
                            <Card>
                                <div key={supply.id} className="bg-white p-4 rounded-md divide-y">
                                    <div className='pb-2'>
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
                                        <p className="text-sm text-muted-foreground">
                                            {supply.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-medium text-black">Reported on: </span>{supply.reported_on}
                                        </p>
                                        <p className={`text-sm font-semibold ${supply.priorities === 'High' ? 'text-red-500' : supply.priorities === 'Medium' ? 'text-green-500' : 'text-yellow-500'}`}>
                                            <span className="font-medium text-black">Priorities: </span> {supply.priorities}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </Layout.Body >
        </Layout >
    )
}

export default Comments

