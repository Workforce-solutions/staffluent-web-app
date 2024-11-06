import { Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Star, Search, TrendingUp, ThumbsUp, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

export default function ClientFeedback() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Client Feedback
            </h2>
            <p className='text-sm text-muted-foreground'>
              Review and analyze client feedback and ratings
            </p>
          </div>
        </div>
        {/* Feedback Stats */}
        <div className='grid gap-4 md:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Average Rating
              </CardTitle>
              <Star className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>4.8/5.0</div>
              <p className='text-xs text-muted-foreground'>
                +0.2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Reviews
              </CardTitle>
              <MessageSquare className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>1,245</div>
              <p className='text-xs text-muted-foreground'>Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Satisfaction Rate
              </CardTitle>
              <ThumbsUp className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>95%</div>
              <p className='text-xs text-muted-foreground'>
                Based on all feedback
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Response Rate
              </CardTitle>
              <TrendingUp className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>98%</div>
              <p className='text-xs text-muted-foreground'>
                Responses to feedback
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feedback List */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <CardTitle>Recent Feedback</CardTitle>
                <p className='text-sm text-muted-foreground'>
                  View and respond to client feedback
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='relative'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='Search feedback...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-[250px] pl-8'
                  />
                </div>
                <Select defaultValue='all'>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Filter by rating' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Ratings</SelectItem>
                    <SelectItem value='5'>5 Stars</SelectItem>
                    <SelectItem value='4'>4 Stars</SelectItem>
                    <SelectItem value='3'>3 Stars or less</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                <CardContent className='p-4'>
                  <div className='flex items-start justify-between'>
                    <div className='space-y-1'>
                      <div className='flex items-center space-x-2'>
                        <h4 className='font-semibold'>Restaurant ABC</h4>
                        <Badge variant='outline'>Equipment Service</Badge>
                      </div>
                      <div className='flex space-x-1'>
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${j < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill='currentColor'
                          />
                        ))}
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        "Great service! The technician was professional and
                        fixed our equipment quickly."
                      </p>
                    </div>
                    <span className='text-sm text-muted-foreground'>
                      2 days ago
                    </span>
                  </div>
                  {i === 0 && (
                    <div className='mt-4 border-t pt-4'>
                      <p className='text-sm italic text-muted-foreground'>
                        Response: Thank you for your feedback! We're glad we
                        could help.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </Layout.Body>
    </Layout>
  )
}
