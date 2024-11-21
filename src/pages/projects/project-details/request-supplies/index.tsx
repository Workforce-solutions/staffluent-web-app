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

const supplies = [
    {
        id: 1,
        title: "I need suuplier 1",
        status: "open",
        requested_date: "2023-01-01",
        requested_by: "John Doe",
        suppervison: "John Doe",
        required_date: "2023-01-01",
        remarks: ""
    },
    {
        id: 2,
        title: "I need suuplier 2",
        status: "in_progress",
        requested_date: "2023-01-01",
        requested_by: "John Doe",
        suppervison: "John Doe",
        required_date: "2023-01-01",
        remarks: ""
    },
    {
        id: 3,
        title: "I need suuplier 3",
        status: "pending",
        requested_date: "2023-01-01",
        requested_by: "John Doe",
        suppervison: "John Doe",
        required_date: "2023-01-01",
        remarks: ""
    }
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
                    <h1 className="text-2xl font-bold">Request Supplies: {project?.name}</h1>
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
                        {supplies.map((supply: any) => (
                            <Card>
                                <div key={supply.id} className="bg-white p-4 rounded-md">
                                    <div className="flex items-center justify-between mb-3">
                                        <h2 className="text-lg font-bold">{supply.title}</h2>
                                        {/* <p className="text-muted-foreground">{supply.status}</p> */}
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
                                    <p className="text-muted-foreground"><span className='font-bold text-black'>Requested Date:</span> {supply.requested_date}</p>
                                    <p className="text-muted-foreground"><span className='font-bold text-black'>Requested By:</span> {supply.requested_by}</p>
                                    <p className="text-muted-foreground"><span className='font-bold text-black'>Supervisor:</span> {supply.suppervison}</p>
                                    <p className="text-muted-foreground"><span className='font-bold text-black'>Required Date:</span> {supply.required_date}</p>
                                    <p className="text-muted-foreground"><span className='font-bold text-black'>Remarks:</span> {supply.remarks}</p>
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

