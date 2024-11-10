import { useState } from 'react'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Alert } from '@/components/ui/alerts/Alert'
import { AlertTitle } from '@/components/ui/alerts/AlertTitle'
import { AlertDescription } from '@/components/ui/alerts/AlertDescription'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  XIcon,
  AlertCircle,
  AlertTriangle,
  InfoIcon,
  Plus,
  Settings,
} from 'lucide-react'

type AlertType = 'default' | 'success' | 'error' | 'warning' | 'info'
type AlertCategory = 'inactivity' | 'attendance' | 'performance' | 'system'

interface AlertItem {
  id: number
  title: string
  description: string
  type: AlertType
  date: string
  category: AlertCategory
}

interface AlertConfig {
  enabled: boolean
  threshold?: number
  sensitivity?: 'low' | 'medium' | 'high'
}

const initialAlertsData: AlertItem[] = [
  {
    id: 1,
    title: 'Extended Inactivity',
    description: 'Employee John Doe has been inactive for 3 hours.',
    type: 'warning',
    date: '2024-10-14',
    category: 'inactivity',
  },
  {
    id: 2,
    title: 'Missed Clock-in',
    description: 'Jane Smith missed their scheduled clock-in at 9:00 AM.',
    type: 'error',
    date: '2024-10-13',
    category: 'attendance',
  },
  {
    id: 3,
    title: 'Performance Anomaly',
    description: 'Unusual drop in productivity detected for Team Alpha.',
    type: 'info',
    date: '2024-10-12',
    category: 'performance',
  },
]

const alertCategories: AlertCategory[] = [
  'inactivity',
  'attendance',
  'performance',
  'system',
]

export default function Alerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlertsData)
  const [filter, setFilter] = useState<AlertType | 'all'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const [newAlert, setNewAlert] = useState<Omit<AlertItem, 'id' | 'date'>>({
    title: '',
    description: '',
    type: 'info',
    category: 'system',
  })
  const [alertConfigs, setAlertConfigs] = useState<
    Record<AlertCategory, AlertConfig>
  >({
    inactivity: { enabled: true, threshold: 2 },
    attendance: { enabled: true },
    performance: { enabled: true, sensitivity: 'medium' },
    system: { enabled: true },
  })

  const handleDismiss = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const handleAddAlert = () => {
    const newAlertItem: AlertItem = {
      ...newAlert,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    }
    setAlerts([...alerts, newAlertItem])
    setNewAlert({
      title: '',
      description: '',
      type: 'info',
      category: 'system',
    })
    setIsConfigOpen(false)
  }

  const handleConfigChange = (
    category: AlertCategory,
    key: string,
    value: boolean | number | string
  ) => {
    setAlertConfigs((prev) => ({
      ...prev,
      [category]: { ...prev[category], [key]: value },
    }))
  }

  const filteredAlerts = alerts.filter(
    (alert) =>
      (filter === 'all' || alert.type === filter) &&
      (alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case 'error':
        return <AlertCircle className='h-4 w-4' />
      case 'warning':
        return <AlertTriangle className='h-4 w-4' />
      default:
        return <InfoIcon className='h-4 w-4' />
    }
  }

  return (
    <Layout>
      <Layout.Header>
        <Search />

        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className='space-y-4'>
        <div className='flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Alerts
          </h1>
          <div className='flex space-x-2'>
            <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
              <DialogTrigger asChild>
                <Button variant='outline'>
                  <Plus className='mr-2 h-4 w-4' /> Add Alert
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Add New Alert</DialogTitle>
                  <DialogDescription>
                    Create a new alert to be displayed in the system.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='title' className='text-right'>
                      Title
                    </Label>
                    <Input
                      id='title'
                      value={newAlert.title}
                      onChange={(e) =>
                        setNewAlert({ ...newAlert, title: e.target.value })
                      }
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='description' className='text-right'>
                      Description
                    </Label>
                    <Input
                      id='description'
                      value={newAlert.description}
                      onChange={(e) =>
                        setNewAlert({
                          ...newAlert,
                          description: e.target.value,
                        })
                      }
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='type' className='text-right'>
                      Type
                    </Label>
                    <Select
                      value={newAlert.type}
                      onValueChange={(value: AlertType) =>
                        setNewAlert({ ...newAlert, type: value })
                      }
                    >
                      <SelectTrigger className='col-span-3'>
                        <SelectValue placeholder='Select type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='info'>Info</SelectItem>
                        <SelectItem value='warning'>Warning</SelectItem>
                        <SelectItem value='error'>Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='category' className='text-right'>
                      Category
                    </Label>
                    <Select
                      value={newAlert.category}
                      onValueChange={(value: AlertCategory) =>
                        setNewAlert({ ...newAlert, category: value })
                      }
                    >
                      <SelectTrigger className='col-span-3'>
                        <SelectValue placeholder='Select category' />
                      </SelectTrigger>
                      <SelectContent>
                        {alertCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type='submit' onClick={handleAddAlert}>
                    Add Alert
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='outline'>
                  <Settings className='mr-2 h-4 w-4' /> Configure
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Alert Configurations</DialogTitle>
                  <DialogDescription>
                    Adjust the settings for different alert categories.
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  {(
                    Object.entries(alertConfigs) as [
                      AlertCategory,
                      AlertConfig,
                    ][]
                  ).map(([category, config]) => (
                    <div
                      key={category}
                      className='flex items-center justify-between'
                    >
                      <Label htmlFor={category} className='text-right'>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Label>
                      <Switch
                        id={category}
                        checked={config.enabled}
                        onCheckedChange={(checked) =>
                          handleConfigChange(category, 'enabled', checked)
                        }
                      />
                      {category === 'inactivity' && (
                        <Input
                          type='number'
                          value={config.threshold}
                          onChange={(e) =>
                            handleConfigChange(
                              category,
                              'threshold',
                              parseInt(e.target.value)
                            )
                          }
                          className='ml-2 w-16'
                          placeholder='Hours'
                        />
                      )}
                      {category === 'performance' && (
                        <Select
                          value={config.sensitivity}
                          onValueChange={(value: 'low' | 'medium' | 'high') =>
                            handleConfigChange(category, 'sensitivity', value)
                          }
                        >
                          <SelectTrigger className='ml-2 w-24'>
                            <SelectValue placeholder='Sensitivity' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='low'>Low</SelectItem>
                            <SelectItem value='medium'>Medium</SelectItem>
                            <SelectItem value='high'>High</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button type='submit'>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className='flex space-x-2'>
          <Input
            placeholder='Search alerts...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='max-w-sm'
          />
          <Select
            value={filter}
            onValueChange={(value: AlertType | 'all') => setFilter(value)}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='info'>Info</SelectItem>
              <SelectItem value='warning'>Warning</SelectItem>
              <SelectItem value='error'>Error</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          {filteredAlerts.map((alert) => (
            <Alert key={alert.id} variant={alert.type}>
              <AlertTitle className='flex items-center'>
                {getAlertIcon(alert.type)}
                <span className='ml-2'>{alert.title}</span>
              </AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
              <div className='mt-2 flex items-center justify-between text-sm text-muted-foreground'>
                <span>{alert.date}</span>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => handleDismiss(alert.id)}
                >
                  <XIcon className='h-4 w-4' />
                </Button>
              </div>
            </Alert>
          ))}
          {filteredAlerts.length === 0 && (
            <p className='text-center text-muted-foreground'>
              No alerts found.
            </p>
          )}
        </div>
      </Layout.Body>
    </Layout>
  )
}
