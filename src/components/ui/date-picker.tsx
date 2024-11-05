// components/ui/date-picker.tsx
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date?: Date
  onDateChange?: (date?: Date) => void
  className?: string
  placeholder?: string
  disabled?: boolean
  minDate?: Date
}

export function DatePicker({
  date,
  onDateChange,
  className,
  placeholder = "Pick a date",
  disabled = false,
  minDate
}: DatePickerProps) {
  const [selected, setSelected] = React.useState<Date | undefined>(date)

  React.useEffect(() => {
    setSelected(date)
  }, [date])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => {
            setSelected(date)
            onDateChange?.(date)
          }}
          disabled={(date) =>
            minDate ? date < minDate : false
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
