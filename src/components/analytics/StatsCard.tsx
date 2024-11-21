import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon?: React.ReactNode;
    description?: string;
}

export function StatsCard({ title, value, change, icon, description }: StatsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(change !== undefined || description) && (
                    <p className="text-xs text-muted-foreground">
                        {change !== undefined && (
                            <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                {change >= 0 ? '+' : ''}{change}%
              </span>
                        )}
                        {description && <span> {description}</span>}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}