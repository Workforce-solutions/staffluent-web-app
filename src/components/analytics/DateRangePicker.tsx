import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DateRangePickerProps {
    date: DateRange | undefined;
    onDateChange: (date: DateRange | undefined) => void;
    period: string;
    onPeriodChange: (period: string) => void;
}

export function AnalyticsDateRangePicker({
                                             date,
                                             onDateChange,
                                             period,
                                             onPeriodChange,
                                         }: DateRangePickerProps) {
    return (
        <div className="flex items-center gap-2">
            <Select value={period} onValueChange={onPeriodChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="thisYear">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
            </Select>

            {period === 'custom' && (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[300px] justify-start text-left font-normal">
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
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={onDateChange}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            )}
        </div>
    );
}