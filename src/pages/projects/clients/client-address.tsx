import { AddressResponse } from '@/@types/clients'
import { InfoItem } from '@/components/info-item'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Globe, Building, MapPinned } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ClientAddressProps {
  address: AddressResponse
}

const ClientAddress = ({ address }: ClientAddressProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Address Information</CardTitle>
      </CardHeader>
      <CardContent className='relative grid gap-4'>
        <div className='absolute right-4 top-0'>
          <InfoItem label='Status'>
            <Badge
              variant={address.active ? 'default' : 'destructive'}
              className={
                address.active
                  ? 'bg-green-700 hover:bg-green-700'
                  : 'bg-red-700 hover:bg-red-700'
              }
            >
              {address.active ? 'Active' : 'Inactive'}
            </Badge>
          </InfoItem>
        </div>
        <InfoItem icon={<MapPin className='h-4 w-4' />} label='Address'>
          {address.address_line1}
          {address.address_line2 && <>, {address.address_line2}</>}
        </InfoItem>
        <InfoItem icon={<Building className='h-4 w-4' />} label='City'>
          {address.city.name}
          {address.city.name_translations && (
            <Badge variant='outline' className='ml-2'>
              {address.city.name_translations}
            </Badge>
          )}
        </InfoItem>
        <InfoItem icon={<MapPinned className='h-4 w-4' />} label='State'>
          {address.state.name}
        </InfoItem>
        <InfoItem icon={<Globe className='h-4 w-4' />} label='Country'>
          {address.country.name} ({address.country.code})
        </InfoItem>
        <InfoItem label='Postcode'>{address.postcode}</InfoItem>

        <InfoItem label='Currency'>{address.country.currency}</InfoItem>
        <InfoItem label='Main Language'>
          {address.country.main_language}
        </InfoItem>

        {address.country.other_languages && (
          <InfoItem label='Other Languages'>
            {address.country.other_languages}
          </InfoItem>
        )}
        {address.country.entity && (
          <InfoItem label='Entity'>{address.country.entity}</InfoItem>
        )}
        {(address.latitude || address.longitude) && (
          <InfoItem label='Coordinates'>
            {address.latitude}, {address.longitude}
          </InfoItem>
        )}
      </CardContent>
    </Card>
  )
}

export default ClientAddress
