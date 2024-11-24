import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UserNav } from '@/components/user-nav'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetProjectQuery } from '@/services/projectApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, MessageCircle, Reply, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const createCommentSchema = z.object({
    comment: z.string().min(1, 'Comment cannot be empty'),
})

const Comments = () => {
    const { id } = useParams()
    const short_code = useShortCode()
    const navigate = useNavigate()

    const { data: project }: any = useGetProjectQuery({
        id: Number(id),
        venue_short_code: short_code,
    })

    const [comments, setComments] = useState<any[]>([])
    console.log("🚀 ~ Comments ~ comments:", comments)

    const form = useForm({
        resolver: zodResolver(createCommentSchema),
        defaultValues: {
            comment: '',
        },
    })

    const [replyingTo, setReplyingTo] = useState<number | null>(null)

    const handleAddComment = (data: any) => {
        const newComment = {
            id: comments.length + 1,
            comment: data.comment,
            timestamp: new Date().toLocaleString(),
            replies: [],
        }
        setComments([...comments, newComment])
        form.reset()
    }

    const handleAddReply = (data: any, commentId: number) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [
                        ...comment.replies,
                        {
                            id: comment.replies.length + 1,
                            comment: data.comment,
                            timestamp: new Date().toLocaleString(),
                        },
                    ],
                }
            }
            return comment
        })
        setComments(updatedComments)
        setReplyingTo(null)
        form.reset()
    }

    const handleRemoveReply = (replyId: number, commentId: number) => {
        setComments(
            comments.map((comment) =>
                comment.id === commentId
                    ? {
                        ...comment,
                        replies: comment.replies.filter((reply: any) => reply.id !== replyId),
                    }
                    : comment
            )
        )
    }

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
                    <h1 className="text-2xl font-bold">Project Comments: {project?.name}</h1>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Comments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FormProvider {...form}>
                            <form
                                onSubmit={form.handleSubmit(replyingTo === null ? handleAddComment : (data) => handleAddReply(data, replyingTo))}
                                className="space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="text" placeholder={replyingTo === null ? 'Add Comment...' : 'Add Reply...'} {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">{replyingTo === null ? 'Add Comment' : 'Reply'}</Button>
                            </form>
                        </FormProvider>
                        <div className="mt-6 space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="space-y-3">
                                    {/* Parent Comment */}
                                    <div className="flex items-start space-x-3">
                                        <Avatar className="flex-shrink-0">
                                            <AvatarFallback>GG</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div>
                                                <p className="text-sm text-gray-800">{comment.comment}</p>
                                                <p className="text-xs text-gray-500">{comment.timestamp}</p>
                                            </div>
                                            <div className='flex justify-between'>
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    onClick={() => setReplyingTo(comment.id)}
                                                    className='text-blue-950'
                                                >
                                                    <Reply className="text-primary h-4 w-4" />
                                                    Reply
                                                </Button>
                                                <Trash2 className='cursor-pointer' color='red' size={18} onClick={() => setComments(comments.filter((c) => c.id !== comment.id))} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Replies */}
                                    <div className="ml-8 space-y-2" >
                                        {
                                            comment.replies.map((reply: any) => (
                                                <div key={reply.id} className="flex space-x-3">
                                                    <Avatar className="flex-shrink-0">
                                                        <AvatarFallback>RR</AvatarFallback>
                                                    </Avatar>
                                                    <div className='flex-1'>
                                                        <div className=''>
                                                            <p className="text-sm text-gray-800">{reply.comment}</p>
                                                            <p className="text-xs text-gray-500">{reply.timestamp}</p>
                                                        </div>
                                                    </div>
                                                    <Trash2 className='cursor-pointer' color='red' size={18} onClick={() => handleRemoveReply(reply.id, comment.id)} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))}
                            {comments.length === 0 && (
                                <div className="flex flex-col items-center text-center text-muted-foreground">
                                    <MessageCircle className="h-8 w-8" />
                                    No comments yet. Be the first to add one!
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </Layout.Body >
        </Layout >
    )
}

export default Comments

