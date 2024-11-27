import React from 'react';
import { format } from 'date-fns';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ClockIcon } from 'lucide-react';
import EmployeAvatarName from '../pages/staff/employee/employe-avatar-name';

interface TimeEntry {
    id: number;
    employee: {
        id: number;
        name: string;
        profile_picture?: string; // Added profile_picture to match your data structure
    };
    start_time: string;
    end_time: string;
    duration: number;
    description: string;
    task: {
        id: number;
        name: string;
    };
    project: {
        project_id: number;
        project_name: string;
    };
}

const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
};

// Helper function to get initials from name
const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

interface TimeEntriesDashboardProps {
    timeEntries: TimeEntry[];
}

const TimeEntriesDashboard: React.FC<TimeEntriesDashboardProps> = ({ timeEntries = [] }) => {
    const entriesByProject = timeEntries.reduce((acc, entry) => {
        const projectId = entry.project.project_id;
        if (!acc[projectId]) {
            acc[projectId] = {
                projectName: entry.project.project_name,
                entries: [],
            };
        }
        acc[projectId].entries.push(entry);
        return acc;
    }, {} as Record<number, { projectName: string; entries: TimeEntry[] }>);

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-0">
                <h2 className="text-2xl font-bold tracking-tight">Time Entries</h2>
                <p className="text-muted-foreground">
                    Track and manage time entries across all projects
                </p>
            </div>

            <div className="space-y-6">
                {Object.entries(entriesByProject).map(([projectId, { projectName, entries }]) => (
                    <Card key={projectId}>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>{projectName}</span>
                                <span className="text-muted-foreground text-sm font-normal">
                  ({entries.length} entries)
                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Task</TableHead>
                                        <TableHead>Duration</TableHead>
                                        <TableHead>Time Period</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {entries.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">
                                                No time entries logged for this project.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        entries.map((entry) => (
                                            <TableRow key={entry.id}>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <EmployeAvatarName
                                                            profile_picture={entry.employee.profile_picture || getInitials(entry.employee.name)}
                                                        />
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{entry.employee.name}</span>
                                                            <span className="text-xs text-muted-foreground">
                                ID: {entry.employee.id}
                              </span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {entry.task?.name || 'No related with task'}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <ClockIcon className="h-4 w-4 text-muted-foreground" />
                                                        <span>{formatDuration(entry.duration)}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col text-sm">
                            <span>
                              Start: {format(new Date(entry.start_time), 'PPp')}
                            </span>
                                                        <span>
                              End: {format(new Date(entry.end_time), 'PPp')}
                            </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{entry.description}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default TimeEntriesDashboard;