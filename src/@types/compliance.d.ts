export interface ComplianceStatusResponse {
    overview: ComplianceOverview;
    break_compliance: ComplianceBreak;
    overtime_compliance: ComplianceOvertime;
    recent_violations: RecentViolations[];
    violations_by_department: ViolationsByDepartment[];
}

export interface ComplianceOverview {
    total_employees: number;
    active_employees: number;
    total_hours: number;
    total_overtime: number;
}

export interface ComplianceBreak {
    missing_meal_breaks: number;
    total_required_breaks: number;
    total_taken_breaks: number;
    violations: string[];
}

export interface ComplianceOvertime {
    unapproved_overtime: number;
    pending_approval: number;
    excessive_hours: number;
}

export interface RecentViolations {
    employee_name: string;
    violation_type: string;
    timestamp: string;
    status: string;
    severity: string;
}

export interface ViolationsByDepartment {
    active_employees: number;
    break_violations: number;
    department_id: number;
    department_name: string;
    overtime_hours: number | null;
    overtime_violations: number;
    total_employees: number;
    total_hours: string;
    status: string;
    type: string;
}


export interface ComplianceReportsResponse {
    by_department: ViolationsByDepartment[];
    by_employee: ViolationsByEmployee[];
    compliance_issues: ComplianceIssues;
    period: Period;
    summary: ViolationsSummary;
}

export interface ViolationsByEmployee {
    department: {
        id: number;
        name: string;
    };
    employee_name: string;
    total_hours: number;
    total_overtime: number;
    total_violations: number;
}

export interface ViolationsByDepartment {
    active_employees: number;
    break_violations: number;
    employee_count: number;
    excessive_hours_violations: number;
    id: number;
    name: string;
    overtime_hours: number;
    overtime_violations: number;
    total_hours: number;
    total_violations: number;
}

export interface ComplianceIssues {
    break_violations: BreakViolations[];
    excessive_hours_violations: ExcessiveHoursViolations[];
    overtime_violations: OvertimeViolations[];
}

export interface Period {
    end_date: string;
    start_date: string;
}

export interface ViolationsSummary {
    active_projects: number;
    departments_count: number;
    total_breaks_taken: number;
    total_employees: number;
    total_hours: number;
    total_overtime_hours: number;
}

export interface OvertimeViolations {
    employee_name: string;
    overtime_hours: number;
    status: string;
}

export interface ExcessiveHoursViolations {
    employee_name: string;
    hours: number;
}

export interface BreakViolations {
    employee_name: string;
    break_type: string;
    duration: number;
}

