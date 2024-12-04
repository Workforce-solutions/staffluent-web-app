/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import { CardTitle } from '../ui/card'
import { Input } from '../ui/input'

interface SearchWithStatusProps {
  filters: any
  handleSearch: (value: string) => void
  handleStatusChange: (status: string) => void
  title?: string
  description?: string
}

const SearchWithStatus = ({
  filters,
  handleSearch,
  handleStatusChange,
  title = '',
  description = '',
}: SearchWithStatusProps) => {
  return (
    <div className='flex items-center justify-between'>
      <div className='space-y-1'>
        <CardTitle>{title}</CardTitle>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      <div className='flex items-center space-x-2'>
        <div className='relative'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search breaks...'
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            className='w-[250px] pl-8'
          />
        </div>
        <Select value={filters.status} onValueChange={handleStatusChange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter by status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Status</SelectItem>
            <SelectItem value='paid'>Paid</SelectItem>
            <SelectItem value='pending'>Pending</SelectItem>
            <SelectItem value='overdue'>Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default SearchWithStatus
