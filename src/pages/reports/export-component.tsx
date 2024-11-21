import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import {
  useExportClientAnalyticsMutation,
  useExportRevenueAnalyticsMutation,
  useExportServiceAnalyticsMutation,
} from '@/services/adminAnalyticsApi'

type AnalyticsType = 'service' | 'client' | 'revenue'

interface ExportComponentProps {
  type: AnalyticsType
  venue_short_code: string
  date_from?: string
  date_to?: string
  period?: string
  className?: string
}

const ExportComponent = ({
  type,
  venue_short_code,
  date_from,
  date_to,
  period,
  className,
}: ExportComponentProps) => {
  const [isExporting, setIsExporting] = useState(false)

  const [exportServiceAnalytics] = useExportServiceAnalyticsMutation()
  const [exportClientAnalytics] = useExportClientAnalyticsMutation()
  const [exportRevenueAnalytics] = useExportRevenueAnalyticsMutation()

  const handleExport = async () => {
    try {
      setIsExporting(true)
      const params = {
        venue_short_code,
        date_from,
        date_to,
        period,
      }

      let response: Blob
      switch (type) {
        case 'service':
          response = await exportServiceAnalytics(params).unwrap()
          break
        case 'client':
          response = await exportClientAnalytics(params).unwrap()
          break
        case 'revenue':
          response = await exportRevenueAnalytics(params).unwrap()
          break
        default:
          throw new Error('Invalid analytics type')
      }

      const url = window.URL.createObjectURL(response)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${type}-analytics.csv`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      toast({
        title: 'Export Successful',
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} analytics exported successfully`,
      })
    } catch (error) {
      console.error('Export failed:', error)
      toast({
        title: 'Export Failed',
        description: 'There was an error exporting the analytics data',
        variant: 'destructive',
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      variant='outline'
      className={className}
      onClick={handleExport}
      disabled={isExporting}
    >
      <Download className='mr-2 h-4 w-4' />
      {isExporting ? 'Exporting...' : 'Export'}
    </Button>
  )
}

export default ExportComponent
