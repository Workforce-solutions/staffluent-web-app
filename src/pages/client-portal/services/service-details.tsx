// pages/client-portal/services/service-details.tsx
import
{ Layout } from '@/components/custom/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
  Calendar,
  MessageSquare,
  FileText,
  ArrowLeft,
  Star
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { FeedbackDialog } from '@/components/client-portal/feedback-dialog'
import { InfoItem } from '@/components/client-portal/info-item'
import { useState } from 'react'
import {useGetServiceDetailsQuery} from "../../../services/clientPortalApi";
import {getStatusVariant} from "../../../utils/status";
import {formatDate} from "date-fns";

export default function ServiceDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [openFeedback, setOpenFeedback] = useState(false)
  // @ts-ignore
  const { data: service } = useGetServiceDetailsQuery(id)

  return (
    <Layout>
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <div className='flex items-center space-x-4'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => navigate('/client-portal/services')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>
            <h2 className='text-2xl font-bold tracking-tight'>{service?.name}</h2>
            <p className='text-muted-foreground'>{service?.description}</p>
          </div>
          {/*// @ts-ignore*/}
          <Badge variant={getStatusVariant(service?.status)}>
            {service?.status}
          </Badge>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          {/* Service Information */}
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <InfoItem
                icon={<FileText className="h-4 w-4" />}
                label="Service Type"
                // @ts-ignore
                value={service?.type}
              />
              <InfoItem
                icon={<Calendar className="h-4 w-4" />}
                label="Start Date"
                // @ts-ignore
                value={formatDate(service?.startDate)}
              />
              <InfoItem
                icon={<Calendar className="h-4 w-4" />}
                label="Next Service"
                // @ts-ignores
                value={formatDate(service?.nextDate)}
              />
              {service?.notes && (
                <InfoItem
                  icon={<FileText className="h-4 w-4" />}
                  label="Notes"
                  // @ts-ignore
                  value={service?.notes}
                />
              )}
            </CardContent>
          </Card>

          {/* Progress & Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Progress & Actions</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {service?.progress_updates?.map(update => (
                <div key={update.id} className="flex items-start space-x-4">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <div className="space-y-1">
                    {/*// @ts-ignore*/}
                    <p className="text-sm font-medium">{update.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {/*// @ts-ignore*/}
                      {formatDate(update.date)}
                    </p>
                  </div>
                </div>
              ))}

              <Separator className="my-4" />

              <div className="flex space-x-4">
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
                {service?.status === 'completed' && !service?.feedback && (
                  <Button
                    className="w-full"
                    onClick={() => setOpenFeedback(true)}
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Leave Feedback
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {service?.activities?.map(activity => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="mt-1">
                    {/*// @ts-ignore*/}
                    <activity.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    {/*// @ts-ignore*/}
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {/*// @ts-ignore*/}
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Layout.Body>

      <FeedbackDialog
        open={openFeedback}
        setOpen={setOpenFeedback}
        serviceId={id}
      />
    </Layout>
  )
}
