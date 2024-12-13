import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

export function WorkOrderFilters({ onFilterChange }: any) {
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        priority: '',
        type: '',
        assignee: '',
        dateRange: ''
    })

    const [activeFilters, setActiveFilters] = useState<string[]>([])

    // not needed for now (maybe use it in the future)
    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value }
        setFilters(newFilters)

        // Update active filters
        if (value && !activeFilters.includes(key)) {
            setActiveFilters([...activeFilters, key])
        } else if (!value && activeFilters.includes(key)) {
            setActiveFilters(activeFilters.filter(f => f !== key))
        }

        onFilterChange(newFilters)
    }

    const clearFilter = (key: string) => {
        handleFilterChange(key, '')
    }

    const clearAllFilters = () => {
        setFilters({
            search: '',
            status: '',
            priority: '',
            type: '',
            assignee: '',
            dateRange: ''
        })
        setActiveFilters([])
        onFilterChange({})
    }

    return (
        <div className="space-y-4">
            {/* Search and Main Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search work orders..."
                        className="pl-8"
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                    />
                </div>
                <Select
                    value={filters.status}
                    onValueChange={(value) => handleFilterChange('status', value)}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="not_started">Not Started</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    value={filters.priority}
                    onValueChange={(value) => handleFilterChange('priority', value)}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
                <div className="flex items-center gap-2">
                    <div className="flex flex-wrap gap-2">
                        {activeFilters.map((filter) => (
                            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                                {filter}
                                <X
                                    className="h-3 w-3 cursor-pointer"
                                    onClick={() => clearFilter(filter)}
                                />
                            </Badge>
                        ))}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                    >
                        Clear all
                    </Button>
                </div>
            )}
        </div>
    )
}

// Example of usage in WorkOrders component:
export function WorkOrdersWithFilters() {
    const handleFilterChange = (filters: any) => {
        console.log('Filters changed:', filters)
        // Apply filters to your data
    }

    return (
        <div className="space-y-6">
            <WorkOrderFilters onFilterChange={handleFilterChange} />
            {/* Your work orders list */}
        </div>
    )
}