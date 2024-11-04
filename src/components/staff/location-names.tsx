// components/staff/location-names.tsx
import { useGetCitiesQuery, useGetCountriesQuery, useGetStatesQuery } from '@/services/appConfigsApi'

interface LocationNamesProps {
    cityId?: number
    stateId?: number
    countryId?: number
    short_code: string
}

export function LocationNames({ cityId, stateId, countryId, short_code }: LocationNamesProps) {
    const { data: city } = useGetCitiesQuery(
        { state_id: stateId || 0, short_code },
        { skip: !stateId || !cityId }
    )
    const { data: state } = useGetStatesQuery(
        { country_id: countryId || 0, short_code },
        { skip: !countryId || !stateId }
    )
    const { data: country } = useGetCountriesQuery(short_code, {
        skip: !countryId
    })

    const cityName = city?.data.find(c => c.id === cityId)?.name
    const stateName = state?.data.find(s => s.id === stateId)?.name
    const countryName = country?.data.find(c => c.id === countryId)?.name

    return (
        <span>
      {[cityName, stateName, countryName].filter(Boolean).join(', ')}
    </span>
    )
}