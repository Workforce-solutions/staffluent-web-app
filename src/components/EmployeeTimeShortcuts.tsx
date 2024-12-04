import {useParams} from 'react-router-dom';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Badge} from '@/components/ui/badge';
import {useShortCode} from '@/hooks/use-local-storage';
import {useGetEmployeeTimeDataQuery} from '@/services/staffApi';
import {format, parseISO} from "date-fns";
// import {
//     Clock,
//     Calendar,
//     Coffee,
//     FileText,
//     BriefcaseIcon,
//     CheckCircle2,
//     XCircle,
//     AlertCircle,
//     Timer,
//     ClockCheck
// } from 'lucide-react';

const EmployeeTimeShortcuts = () => {
    const {id} = useParams();
    const shortCode = useShortCode();

    const formatDate = (dateString: string | null | undefined, formatStr = 'dd MMM yyyy') => {
        if (!dateString) return 'N/A';
        try {
            if (dateString.includes('/')) {
                const [day, month, year] = dateString.split('/');
                return format(new Date(`${year}-${month}-${day}`), formatStr);
            }
            return format(parseISO(dateString), formatStr);
        } catch {
            return dateString;
        }
    };

    const {data: timeData, isLoading} = useGetEmployeeTimeDataQuery({
        id: Number(id),
        venue_short_code: shortCode
    });

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Employee Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 w-3/4 rounded bg-muted"/>
                        <div className="h-4 w-1/2 rounded bg-muted"/>
                        <div className="h-4 w-2/3 rounded bg-muted"/>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const getShiftStatusBadge = (status: string) => {
        switch (status) {
            case 'scheduled':
                return <Badge variant="outline">Scheduled</Badge>;
            case 'time_off':
                return <Badge variant="secondary">Time Off</Badge>;
            case 'completed':
                return <Badge variant="success">Completed</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Employee Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="current" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="current">Current Status</TabsTrigger>
                        <TabsTrigger value="shifts">Shifts</TabsTrigger>
                        <TabsTrigger value="timesheets">Timesheets</TabsTrigger>
                        <TabsTrigger value="timeoff">Time Off</TabsTrigger>
                    </TabsList>

                    <TabsContent value="current">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Current Session Status */}
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Current Session</span>
                                            <Badge
                                                variant={timeData?.current_session?.has_active_session ? "success" : "secondary"}>
                                                {timeData?.current_session?.has_active_session ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                        {timeData?.current_session?.active_session && (
                                            <div className="mt-2">
                                                <div className="text-xl font-bold">
                                                    {timeData.current_session.active_session.project?.name}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    Started: {formatDate(timeData.current_session.active_session.clock_in_time, 'HH:mm')}
                                                </div>
                                            </div>
                                        )}
                                        {timeData?.current_session?.current_break && (
                                            <div className="mt-2 text-orange-500">
                                                On Break
                                                since {formatDate(timeData.current_session.current_break.break_start, 'HH:mm')}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Current Shift & Check In/Out Status */}
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Check In Status</span>
                                            <div className="space-x-2">
                                                {timeData?.attendance?.current_status?.can_check_in && (
                                                    <Badge variant="success">Can Check In</Badge>
                                                )}
                                                {timeData?.attendance?.current_status?.can_check_out && (
                                                    <Badge variant="destructive">Can Check Out</Badge>
                                                )}
                                            </div>
                                        </div>
                                        {timeData?.attendance?.current_status?.current_shift && (
                                            <div className="mt-2">
                                                <div className="text-xl font-bold">Current Shift</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {formatDate(timeData.attendance.current_status.current_shift.date)}
                                                    ({timeData.attendance.current_status.current_shift.start_time} -
                                                    {timeData.attendance.current_status.current_shift.end_time})
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Stats Summary */}
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            <div>
                                                <span className="text-sm font-medium">Monthly Stats</span>
                                                <div className="mt-2 space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span>Total Hours</span>
                                                        <span>{timeData?.stats?.total_hours_this_month}h</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Daily Average</span>
                                                        <span>{timeData?.stats?.average_hours_per_day.toFixed(2)}h</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Breaks Taken</span>
                                                        <span>{timeData?.stats?.total_breaks_taken}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Performance Metrics */}
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            <div>
                                                <span className="text-sm font-medium">Performance</span>
                                                <div className="mt-2 space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span>Punctuality Rate</span>
                                                        <span>{timeData?.stats?.punctuality_rate}%</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Overtime Hours</span>
                                                        <span>{timeData?.stats?.overtime_hours}h</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Time Entries Overview */}
                            <div className="rounded-md border">
                                <div className="px-4 py-3 bg-muted/50 flex justify-between items-center">
                                    <h3 className="font-semibold">Recent Time Entries</h3>
                                    <div className="text-sm text-muted-foreground">
                                        Page {timeData?.time_entries?.current_page} of {timeData?.time_entries?.total_pages}
                                    </div>
                                </div>
                                <div className="divide-y">
                                    {/*// @ts-ignore*/}
                                    {timeData?.time_entries?.data?.map((entry, idx) => (
                                        <div key={idx} className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-medium">{entry.project?.name}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Duration: {entry.duration}h
                                                    </div>
                                                </div>
                                                <Badge>{entry.status}</Badge>
                                            </div>
                                        </div>
                                    ))}
                                    {(!timeData?.time_entries?.data || timeData.time_entries.data.length === 0) && (
                                        <div className="p-4 text-center text-muted-foreground">
                                            No time entries found
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="shifts">
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Current Status</span>
                                            <Badge>{timeData?.employee?.status}</Badge>
                                        </div>
                                        <div className="mt-2 text-2xl font-bold">
                                            {timeData?.attendance?.current_status?.is_checked_in ? 'Checked In' : 'Checked Out'}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Last
                                            activity: {formatDate(timeData?.attendance?.current_status?.last_record?.scanned_at, 'dd MMM yyyy HH:mm')}
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Upcoming Shift</span>
                                        </div>
                                        {timeData?.attendance?.shifts?.upcoming_shift ? (
                                            <div className="mt-2">
                                                <div className="text-xl font-bold">
                                                    {timeData.attendance.shifts.upcoming_shift.start_time} -
                                                    {timeData.attendance.shifts.upcoming_shift.end_time}
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {timeData.attendance.shifts.upcoming_shift.venue}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="mt-2 text-muted-foreground">
                                                No upcoming shifts scheduled
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Monthly Overview</span>
                                        </div>
                                        <div className="mt-2 space-y-2">
                                            <div className="flex justify-between">
                                                <span>Total Shifts</span>
                                                <span>{timeData?.attendance?.shifts?.monthly_shifts?.length || 0}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Time Off Days</span>
                                                <span>
                                                    {/*// @ts-ignore*/}
                                                   {timeData?.attendance?.shifts?.monthly_shifts?.filter(s => s.is_time_off).length || 0}
                                               </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="rounded-md border">
                                <div className="px-4 py-3 bg-muted/50">
                                    <h3 className="font-semibold">Monthly Shifts</h3>
                                </div>
                                <div className="divide-y">
                                    {/*// @ts-ignore*/}
                                    {timeData?.attendance?.shifts?.monthly_shifts?.map((shift, idx) => (
                                        <div key={idx} className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <span className="font-medium">{formatDate(shift.date)}</span>
                                                    <div className="text-sm text-muted-foreground">
                                                        {shift.start_time} - {shift.end_time}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm">{shift.venue}</span>
                                                    {getShiftStatusBadge(shift.status)}
                                                </div>
                                            </div>
                                            {shift.leave_type && (
                                                <div className="text-sm text-muted-foreground">
                                                    Leave Type: {shift.leave_type}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {(!timeData?.attendance?.shifts?.monthly_shifts ||
                                        timeData.attendance.shifts.monthly_shifts.length === 0) && (
                                        <div className="p-4 text-center text-muted-foreground">
                                            No shifts scheduled this month
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="timesheets">
                        <div className="space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Total Hours</span>
                                        </div>
                                        <div className="mt-2 text-2xl font-bold">
                                            {timeData?.stats?.total_hours_this_month || 0}h
                                        </div>
                                        <p className="text-xs text-muted-foreground">This Month</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Daily Average</span>
                                        </div>
                                        <div className="mt-2 text-2xl font-bold">
                                            {timeData?.stats?.average_hours_per_day.toFixed(2) || 0}h
                                        </div>
                                        <p className="text-xs text-muted-foreground">Per Day</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Breaks</span>
                                        </div>
                                        <div className="mt-2 text-2xl font-bold">
                                            {timeData?.stats?.total_breaks_taken || 0}
                                        </div>
                                        <p className="text-xs text-muted-foreground">Total Breaks</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Overtime</span>
                                        </div>
                                        <div className="mt-2 text-2xl font-bold">
                                            {timeData?.stats?.overtime_hours || 0}h
                                        </div>
                                        <p className="text-xs text-muted-foreground">Extra Hours</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Breaks Data Summary if Available */}
                            {timeData?.timesheets?.breaks_data && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm">Breaks Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-4 gap-4">
                                        <div>
                                            <span className="text-sm text-muted-foreground">Total Breaks</span>
                                            <p className="text-lg font-bold">{timeData.timesheets.breaks_data.summary.total_breaks}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-muted-foreground">Total Duration</span>
                                            <p className="text-lg font-bold">{timeData.timesheets.breaks_data.summary.total_break_minutes}m</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-muted-foreground">Meal Breaks</span>
                                            <p className="text-lg font-bold">{timeData.timesheets.breaks_data.summary.meal_breaks_taken}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-muted-foreground">Rest Breaks</span>
                                            <p className="text-lg font-bold">{timeData.timesheets.breaks_data.summary.rest_breaks_taken}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Timesheets List */}
                            <div className="rounded-md border">
                                <div className="px-4 py-3 bg-muted/50">
                                    <h3 className="font-semibold">Recent Timesheets</h3>
                                </div>
                                <div className="divide-y">
                                    {/*// @ts-ignore*/}
                                    {timeData?.timesheets?.current_month?.map((timesheet, idx) => (
                                        <div key={idx} className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <div className="font-medium">{timesheet.project?.name}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {formatDate(timesheet.clock_in_time, 'dd MMM yyyy HH:mm')} -
                                                        {timesheet.clock_out_time ? formatDate(timesheet.clock_out_time, 'HH:mm') : 'Ongoing'}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {/* <Badge variant="outline">{timesheet.total_hours}h</Badge>
                                                    <Badge>{timesheet.status}</Badge> */}
                                                    {getShiftStatusBadge(timesheet.status)}
                                                </div>
                                            </div>
                                            {timesheet.work_description && (
                                                <div className="text-sm text-muted-foreground">
                                                    {timesheet.work_description}
                                                </div>
                                            )}
                                            {timesheet.breaks && timesheet.breaks.length > 0 && (
                                                <div className="mt-2 text-sm">
                                                    <span className="text-muted-foreground">Breaks:</span>
                                                    <div className="ml-4 space-y-1">
                                                        {/*// @ts-ignore*/}
                                                        {timesheet.breaks.map((breakItem, breakIdx) => (
                                                            <div key={breakIdx} className="flex justify-between">
                                                                <span>{breakItem.break_type}</span>
                                                                <span>{formatDate(breakItem.break_start, 'HH:mm')} - {breakItem.break_end ? formatDate(breakItem.break_end, 'HH:mm') : 'Ongoing'}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {(!timeData?.timesheets?.current_month || timeData.timesheets.current_month.length === 0) && (
                                        <div className="p-4 text-center text-muted-foreground">
                                            No timesheets found for this month
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="timeoff">
                        <div className="space-y-4">
                            {/* Time Off Summary */}
                            <div className="grid grid-cols-3 gap-4">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Days Taken</span>
                                        </div>
                                        <div className="mt-2 text-2xl font-bold">
                                            {timeData?.time_off?.stats?.days_taken_this_year || 0}
                                        </div>
                                        <p className="text-xs text-muted-foreground">This Year</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Requests</span>
                                        </div>
                                        <div className="mt-2 text-2xl font-bold">
                                            {timeData?.time_off?.stats?.total_requests || 0}
                                        </div>
                                        <p className="text-xs text-muted-foreground">Total</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Upcoming</span>
                                        </div>
                                        <div className="mt-2 text-2xl font-bold">
                                            {timeData?.time_off?.stats?.upcoming_requests || 0}
                                        </div>
                                        <p className="text-xs text-muted-foreground">Pending Leaves</p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Leave Requests Sections */}
                            {timeData?.time_off?.requests?.current && timeData.time_off.requests.current.length > 0 && (
                                <div className="rounded-md border">
                                    <div className="px-4 py-3 bg-muted/50">
                                        <h3 className="font-semibold">Current Leave</h3>
                                    </div>
                                    <div className="divide-y">
                                        {/*// @ts-ignore*/}
                                        {timeData.time_off.requests.current.map((request, idx) => (
                                            <div key={idx} className="p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <div className="font-medium">{request.type}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {formatDate(request.start_date)} - {formatDate(request.end_date)}
                                                        </div>
                                                    </div>
                                                    <Badge>{request.total_days} days</Badge>
                                                </div>
                                                {request.reason && (
                                                    <div className="text-sm text-muted-foreground">
                                                        {request.reason}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="rounded-md border">
                                <div className="px-4 py-3 bg-muted/50">
                                    <h3 className="font-semibold">Upcoming Leaves</h3>
                                </div>
                                <div className="divide-y">
                                    {/*// @ts-ignore*/}
                                    {timeData?.time_off?.requests?.upcoming?.map((request, idx) => (
                                        <div key={idx} className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <div className="font-medium">{request.type}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {formatDate(request.start_date)} - {formatDate(request.end_date)}
                                                    </div>
                                                </div>
                                                <Badge>{request.total_days} days</Badge>
                                            </div>
                                            {request.reason && (
                                                <div className="text-sm text-muted-foreground">
                                                    {request.reason}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {(!timeData?.time_off?.requests?.upcoming || timeData.time_off.requests.upcoming.length === 0) && (
                                        <div className="p-4 text-center text-muted-foreground">
                                            No upcoming leave requests
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="rounded-md border">
                                <div className="px-4 py-3 bg-muted/50">
                                    <h3 className="font-semibold">Past Leaves</h3>
                                </div>
                                <div className="divide-y">
                                    {/*// @ts-ignore*/}
                                    {timeData?.time_off?.requests?.past?.map((request, idx) => (
                                        <div key={idx} className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <div className="font-medium">{request.type}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {formatDate(request.start_date)} - {formatDate(request.end_date)}
                                                    </div>
                                                </div>
                                                <Badge>{request.total_days} days</Badge>
                                            </div>
                                            {request.reason && (
                                                <div className="text-sm text-muted-foreground">
                                                    {request.reason}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {(!timeData?.time_off?.requests?.past || timeData.time_off.requests.past.length === 0) && (
                                        <div className="p-4 text-center text-muted-foreground">
                                            No past leave records
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default EmployeeTimeShortcuts;