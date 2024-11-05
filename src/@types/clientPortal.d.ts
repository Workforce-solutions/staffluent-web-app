// @types/clientPortal.d.ts

export interface ClientService {
    id: number;
    name: string;
    type: string;
    status: string;
    description: string;
    startDate: string;
    nextDate: string;
    notes?: string;
    progress_updates?: ProgressUpdate[];
    activities?: ActivityLog[];
    feedback?: ServiceFeedback;
}

export interface ProgressUpdate {
    id: number;
    date: string;
    update: string;
}

export interface ActivityLog {
    id: number;
    activity: string;
    timestamp: string;
}

export interface ServiceFeedback {
    rating: number; // Example: 1-5 scale
    comments: string;
}

export interface Invoice {
    id: number;
    number: string;
    service_name: string;
    date: string;
    due_date: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
}

export interface SupportTicket {
    id: number;
    number: string;
    subject: string;
    description: string;
    status: 'open' | 'in_progress' | 'resolved';
    updated_at: string;
}

export interface ServiceRequest {
    client_id: number;
    service_type: string;
    details: string;
    requested_date: string;
}

export interface FeedbackSubmission {
    serviceId: number;
    rating: number;
    comments: string;
}
