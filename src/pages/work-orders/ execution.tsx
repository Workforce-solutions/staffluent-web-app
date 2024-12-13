import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
    Clock,
    Play,
    Pause,
    Plus,
    Trash2,
    User,
    // Package,
    // AlertCircle
} from 'lucide-react'

interface TimeEntry {
    id: string
    startTime: string
    endTime: string | null
    duration: number
    worker: string
    notes: string
}

interface MaterialEntry {
    id: string
    name: string
    quantity: number
    unit: string
    cost: number
}

export default function WorkOrderExecution() {
    const [status, setStatus] = useState('in_progress')
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [startTime, setStartTime] = useState<Date | null>(null)
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
    const [materialEntries, setMaterialEntries] = useState<MaterialEntry[]>([])

    // Timer functions
    const startTimer = () => {
        setIsTimerRunning(true)
        setStartTime(new Date())
    }

    const stopTimer = () => {
        if (startTime) {
            setIsTimerRunning(false)
            const endTime = new Date()
            const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60) // minutes

            setTimeEntries([...timeEntries, {
                id: Date.now().toString(),
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                duration,
                worker: 'Current User',
                notes: ''
            }])
        }
    }

    const addMaterial = () => {
        setMaterialEntries([...materialEntries, {
            id: Date.now().toString(),
            name: '',
            quantity: 1,
            unit: 'pcs',
            cost: 0
        }])
    }

    const removeMaterial = (id: string) => {
        setMaterialEntries(materialEntries.filter(m => m.id !== id))
    }

    const updateMaterial = (id: string, field: string, value: string | number) => {
        setMaterialEntries(materialEntries.map(m =>
            m.id === id ? { ...m, [field]: value } : m
        ))
    }

    return (

        <div className="space-y-6">
            {/* Status Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Work Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="not_started">Not Started</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="on_hold">On Hold</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                        <Badge variant={
                            status === 'completed' ? 'success' :
                                status === 'in_progress' ? 'warning' :
                                    status === 'on_hold' ? 'destructive' :
                                        'secondary'
                        }>
                            {status.replace('_', ' ')}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Time Tracking */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Time Tracking</CardTitle>
                        <Button
                            variant={isTimerRunning ? "destructive" : "default"}
                            onClick={isTimerRunning ? stopTimer : startTimer}
                        >
                            {isTimerRunning ? (
                                <>
                                    <Pause className="h-4 w-4 mr-2" />
                                    Stop Timer
                                </>
                            ) : (
                                <>
                                    <Play className="h-4 w-4 mr-2" />
                                    Start Timer
                                </>
                            )}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {timeEntries.map((entry) => (
                            <div key={entry.id} className="flex items-start justify-between border-b pb-4 last:border-0">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{entry.worker}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>
                                            {new Date(entry.startTime).toLocaleTimeString()} -
                                            {entry.endTime ? new Date(entry.endTime).toLocaleTimeString() : 'Ongoing'}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="font-medium">{Math.round(entry.duration)} minutes</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Materials Used */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Materials Used</CardTitle>
                        <Button onClick={addMaterial}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Material
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {materialEntries.map((material) => (
                            <div key={material.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                                <div className="flex-1 grid grid-cols-4 gap-4">
                                    <div className="space-y-2">
                                        <Label>Material</Label>
                                        <Input
                                            value={material.name}
                                            onChange={(e) => updateMaterial(material.id, 'name', e.target.value)}
                                            placeholder="Material name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Quantity</Label>
                                        <Input
                                            type="number"
                                            value={material.quantity}
                                            onChange={(e) => updateMaterial(material.id, 'quantity', parseFloat(e.target.value))}
                                            min="0"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Unit</Label>
                                        <Select
                                            value={material.unit}
                                            onValueChange={(value) => updateMaterial(material.id, 'unit', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pcs">Pieces</SelectItem>
                                                <SelectItem value="kg">Kilograms</SelectItem>
                                                <SelectItem value="l">Liters</SelectItem>
                                                <SelectItem value="m">Meters</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Cost</Label>
                                        <Input
                                            type="number"
                                            value={material.cost}
                                            onChange={(e) => updateMaterial(material.id, 'cost', parseFloat(e.target.value))}
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeMaterial(material.id)}
                                >
                                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            </div>
                        ))}

                        {materialEntries.length > 0 && (
                            <div className="flex justify-end pt-4 border-t">
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Total Cost</p>
                                    <p className="text-xl font-bold">
                                        ${materialEntries.reduce((sum, m) => sum + m.cost, 0).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Summary Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Execution Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Total Time</p>
                            <p className="text-2xl font-bold">
                                {Math.round(timeEntries.reduce((sum, entry) => sum + entry.duration, 0))} min
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Materials Used</p>
                            <p className="text-2xl font-bold">{materialEntries.length}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Total Cost</p>
                            <p className="text-2xl font-bold">
                                ${materialEntries.reduce((sum, m) => sum + m.cost, 0).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}