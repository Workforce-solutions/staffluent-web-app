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

const order = [
    {
        id: 1,
        title: "Install new workstation",
        status: "open",
        priorities: "High",
        start_date: "2023-01-01",
        requested_by: "John Doe",
        invoice_id: "INV-123",
    },
    {
        id: 2,
        title: "Install new workstation",
        status: "in_progress",
        priorities: "Medium",
        start_date: "2023-01-01",
        requested_by: "John Doe",
        invoice_id: "INV-123",
    },
    {
        id: 3,
        title: "Install new workstation",
        status: "closed",
        priorities: "Low",
        start_date: "2023-01-01",
        requested_by: "John Doe",
        invoice_id: "INV-123",
    },
    {
        id: 4,
        title: "Install new workstation",
        status: "closed",
        priorities: "Low",
        start_date: "2023-01-01",
        requested_by: "John Doe",
        invoice_id: "INV-123",
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
                    <h1 className="text-2xl font-bold">Work Order: {project?.name}</h1>
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
                        {order.map((supply: any) => (
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
                                    <div className='flex flex-col pt-2 gap-2'>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-medium text-black">Requested by: </span>{supply.requested_by}
                                            </p>
                                            <p className={`text-sm font-semibold ${supply.priorities === 'High' ? 'text-red-500' : supply.priorities === 'Medium' ? 'text-green-500' : 'text-yellow-500'}`}>
                                                <span className="font-medium text-black">Priorities: </span> {supply.priorities}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-medium text-black">Start Date: </span>{supply.start_date}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                <span className="font-medium text-black">Incoive ID: </span> #{supply.invoice_id}
                                            </p>
                                        </div>
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

