import { Layout } from '@/components/custom/layout'
import { InfoItem } from '@/components/info-item'
import EmptyState from '@/components/table/empty-state'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getInitials } from '@/hooks/common/common-functions'
import { useShortCode } from '@/hooks/use-local-storage'
import { useGetClientByIdQuery } from '@/services/clientsApi'
import { Building2, FileText, Mail, Phone, User } from 'lucide-react'
import { useParams } from 'react-router-dom'
import ClientAddress from './client-address'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

export default function ClientDetails() {
  const { id } = useParams()
  const short_code = useShortCode()
  const {
    data: client,
    isFetching,
    isError,
  } = useGetClientByIdQuery(
    { id: Number(id), short_code },
    {
      skip: !id || isNaN(Number(id)),
    }
  )

  if (isFetching || isError || !client)
    return <EmptyState isLoading={isFetching} isError={isError} />

  return (
    <Layout>
      <Layout.Header>
        <div className='flex w-full justify-between'>
          <div className='ml-auto flex items-center space-x-2 sm:space-x-4'>
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
      </Layout.Header>

      <Layout.Body className='grid grid-cols-2 gap-5'>
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>General Information</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-6'>
            <div className='flex items-center space-x-4'>
              <Avatar className='h-20 w-20'>
                <AvatarImage
                  src={`https://api.dicebear.com/5.x/initials/svg?seed=${client.contact_person}`}
                />
                <AvatarFallback>
                  {getInitials(client.contact_person)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className='text-2xl font-semibold'>{client.name}</h3>
                <p className='text-muted-foreground'>{client.contact_person}</p>
              </div>
            </div>
            <div className='grid gap-2'>
              <InfoItem
                icon={
                  client.type === 'company' ? (
                    <Building2 className='h-4 w-4' />
                  ) : (
                    <User className='h-4 w-4' />
                  )
                }
                label='Type'
              >
                <Badge variant='outline' className='capitalize'>
                  {client.type}
                </Badge>
              </InfoItem>
              <InfoItem icon={<Mail className='h-4 w-4' />} label='Email'>
                {client.email || 'N/A'}
              </InfoItem>
              <InfoItem icon={<Phone className='h-4 w-4' />} label='Phone'>
                {client.phone || 'N/A'}
              </InfoItem>
              {client.notes && (
                <InfoItem icon={<FileText className='h-4 w-4' />} label='Notes'>
                  {client.notes}
                </InfoItem>
              )}
            </div>
          </CardContent>
        </Card>

        {client.address && <ClientAddress address={client.address} />}
      </Layout.Body>
    </Layout>
  )
}
