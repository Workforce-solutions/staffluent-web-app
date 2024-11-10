import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps {
    className?: string
    value?: DateRange | undefined
    onValueChange?: (value: DateRange | undefined) => void
}

export function DateRangePicker({
                                    className,
                                    value,
                                    onValueChange,
                                }: DateRangePickerProps) {
    const [date, setDate] = React.useState<DateRange | undefined>(value)

    React.useEffect(() => {
        if (value) {
            setDate(value)
        }
    }, [value])

    const handleDateChange = (newDate: DateRange | undefined) => {
        setDate(newDate)
        if (onValueChange) {
            onValueChange(newDate)
        }
    }

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date range</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleDateChange}
                        numberOfMonths={2}
                        footer={
                            date?.from && date?.to ? (
                                <div className="px-4 pb-4 pt-0 text-sm">
                                    Selected: {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </div>
                            ) : null
                        }
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}