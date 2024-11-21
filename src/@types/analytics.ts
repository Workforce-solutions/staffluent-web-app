// types/analytics.ts
// interface ServiceAnalytics {
//     stats: {
//         total_services: number;
//         active_clients: number;
//         avg_duration: number;
//         growth_rate: number;
//         monthly_comparison: {
//             current: number;
//             previous: number;
//             change: number;
//         }
//     };
//     charts: {
//         service_usage: {
//             labels: string[];
//             datasets: {
//                 label: string;
//                 data: number[];
//                 backgroundColor: string;
//                 borderColor: string;
//                 tension: number;
//             }[];
//         };
//         category_distribution: {
//             labels: string[];
//             datasets: {
//                 data: number[];
//                 backgroundColor: string[];
//             }[];
//         };
//         revenue_by_service: {
//             labels: string[];
//             datasets: {
//                 label: string;
//                 data: number[];
//                 backgroundColor: string;
//             }[];
//         };
//     };
// }

export interface DateRange {
    date_from?: string;
    date_to?: string;
    period?: string;
}

export interface ExportButtonProps {
    onExport: () => Promise<void>;
    isLoading?: boolean;
}
