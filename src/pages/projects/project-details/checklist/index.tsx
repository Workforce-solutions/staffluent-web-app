import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Card } from '@/components/ui/card'
import { UserNav } from '@/components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetProjectQuery } from '@/services/projectApi'
import { Progress } from '@/components/ui/progress'
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import dayjs from 'dayjs'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import { Circle } from 'rc-progress';

const primary_checklist = [
    {
        id: 1,
        name: 'Task 1',
        avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Task 1',
    },
    {
        id: 2,
        name: 'Task 2',
        avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Task 2',
    },
    {
        id: 3,
        name: 'Task 3',
        avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Task 3',
    },
    {
        id: 4,
        name: 'Task 4',
        avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Task 4',
    },
    {
        id: 5,
        name: 'Task 5',
        avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Task 5',
    },
]

const Comments = () => {
    const { id } = useParams()
    const short_code = useShortCode()
    const navigate = useNavigate()

    const [handlePrimaryChecklist, setHandlePrimaryChecklist] = useState(false)

    const [handleSecondaryChecklist, setHandleSecondaryChecklist] = useState(true)

    const [handleThirdaryChecklist, setHandleThirdaryChecklist] = useState(false)

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
                    <h1 className="text-2xl font-bold">Project Checklist: {project?.name}</h1>
                </div>
                <Card className='p-4'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center space-x-3'>
                            <Avatar
                                className='inline-block border-2 border-background'
                            >
                                <AvatarImage src={project.avatar} alt={project.name} />
                                <AvatarFallback>
                                    {project.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h2>{project?.name}</h2>
                                <p className='text-gray-500'>{project?.description}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='flex items-center justify-between text-gray-500'>
                                <p>{project.progress}% Completed</p>
                                <p>2 days left</p>
                            </div>
                            <Progress value={project.progress} className='w-[60%]' />
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex -space-x-2 overflow-hidden'>
                                {project.assigned_employees?.map((employee: any, index: number) => (
                                    <Avatar
                                        key={index}
                                        className='inline-block border-2 border-background'
                                    >
                                        <AvatarImage src={employee.avatar} alt={employee.name} />
                                        <AvatarFallback>
                                            {employee.name.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                ))}
                            </div>
                            <div className='flex gap-4'>
                                <div className='flex items-center gap-2'>
                                    <Calendar />
                                    <p className='text-gray-500'>Start: {dayjs(project.start_date).format('DD/MM/YYYY')}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Calendar />
                                    <p className='text-gray-500'>Start: {dayjs(project.end_date).format('DD/MM/YYYY')}</p>
                                </div>
                            </div>
                        </div>
                        <Card className='p-4'>
                            <div className='flex items-center justify-between'>
                                <h1 className='text-lg font-semibold'>Primary Checklist</h1>
                                <div className='flex items-center gap-1'>
                                    <Checkbox
                                        onCheckedChange={() => { }}
                                        className='translate-y-[2px] rounded-full h-5 w-5'
                                        defaultChecked
                                    />
                                    <p>{primary_checklist.length} Items</p>
                                    {handlePrimaryChecklist ?
                                        <ChevronRight size={20} onClick={() => { setHandlePrimaryChecklist(!handlePrimaryChecklist) }} /> :
                                        <ChevronDown size={20} onClick={() => { setHandlePrimaryChecklist(!handlePrimaryChecklist) }} />
                                    }
                                </div>
                            </div>
                            {handlePrimaryChecklist &&
                                <div className='flex flex-col gap-2 mt-3'>
                                    {primary_checklist.map((item: any, index: number) => (
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-2'>
                                                <Checkbox
                                                    onCheckedChange={() => { }}
                                                    className='translate-y-[2px] h-5 w-5'
                                                />
                                                <p>{item.name}</p>
                                            </div>
                                            <Avatar
                                                key={index}
                                                className='inline-block border-2 border-background'
                                            >
                                                <AvatarImage src={item.avatar} alt={item.name} />
                                                <AvatarFallback>
                                                    {item.name.slice(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                    ))}
                                </div>
                            }
                        </Card>
                        <Card className='p-4'>
                            <div className='flex items-center justify-between'>
                                <h1 className='text-lg font-semibold'>Secondary Checklist</h1>
                                <div className='flex items-center gap-1'>
                                    {/* <Checkbox
                                        onCheckedChange={() => { }}
                                        className='translate-y-[2px] rounded-full h-5 w-5'
                                    /> */}
                                    <Circle percent={10} strokeWidth={4} strokeColor="#022169" trailColor="black" className='h-6 w-6' />
                                    <p>{primary_checklist.length} Items</p>
                                    {handleSecondaryChecklist ?
                                        <ChevronRight size={20} onClick={() => { setHandleSecondaryChecklist(!handleSecondaryChecklist) }} /> :
                                        <ChevronDown size={20} onClick={() => { setHandleSecondaryChecklist(!handleSecondaryChecklist) }} />
                                    }
                                </div>
                            </div>
                            {handleSecondaryChecklist &&
                                <div className='flex flex-col gap-2 mt-3'>
                                    {primary_checklist.map((item: any, index: number) => (
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-2'>
                                                <Checkbox
                                                    onCheckedChange={() => { }}
                                                    className='translate-y-[2px] h-7 w-7'
                                                />
                                                <p>{item.name}</p>
                                            </div>
                                            <Avatar
                                                key={index}
                                                className='inline-block border-2 border-background'
                                            >
                                                <AvatarImage src={item.avatar} alt={item.name} />
                                                <AvatarFallback>
                                                    {item.name.slice(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                    ))}
                                </div>
                            }
                        </Card>
                        <Card className='p-4'>
                            <div className='flex items-center justify-between'>
                                <h1 className='text-lg font-semibold'>Third Checklist</h1>
                                <div className='flex items-center gap-1'>
                                    {/* <Checkbox
                                        onCheckedChange={() => { }}
                                        className='translate-y-[2px] rounded-full h-5 w-5'
                                    /> */}
                                    <Circle percent={30} strokeWidth={4} strokeColor="#022169" trailColor="black" className='h-6 w-6' />
                                    <p>{primary_checklist.length} Items</p>
                                    {handleThirdaryChecklist ?
                                        <ChevronRight size={20} onClick={() => { setHandleThirdaryChecklist(!handleThirdaryChecklist) }} /> :
                                        <ChevronDown size={20} onClick={() => { setHandleThirdaryChecklist(!handleThirdaryChecklist) }} />
                                    }
                                </div>
                            </div>
                            {handleThirdaryChecklist &&
                                <div className='flex flex-col gap-2 mt-3'>
                                    {primary_checklist.map((item: any, index: number) => (
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-2'>
                                                <Checkbox
                                                    onCheckedChange={() => { }}
                                                    className='translate-y-[2px] h-5 w-5'
                                                />
                                                <p>{item.name}</p>
                                            </div>
                                            <Avatar
                                                key={index}
                                                className='inline-block border-2 border-background'
                                            >
                                                <AvatarImage src={item.avatar} alt={item.name} />
                                                <AvatarFallback>
                                                    {item.name.slice(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                    ))}
                                </div>
                            }
                        </Card>
                    </div>
                </Card>
            </Layout.Body >
        </Layout >
    )
}

export default Comments

