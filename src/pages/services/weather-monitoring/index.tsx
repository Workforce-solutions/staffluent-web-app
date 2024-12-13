import { Layout } from '@/components/custom/layout';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { Card, CardContent,  } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Sun,
    Cloud,
    CloudRain,
    AlertTriangle
} from 'lucide-react';

// Types
interface WeatherAlert {
    id: number;
    site: string;
    type: 'wind' | 'rain' | 'heat' | 'storm';
    severity: 'low' | 'medium' | 'high';
    message: string;
    startTime: string;
    duration: string;
    affectedOperations: string[];
}

interface SiteWeather {
    id: number;
    site: string;
    currentTemp: number;
    humidity: number;
    windSpeed: number;
    conditions: 'clear' | 'cloudy' | 'rain' | 'storm';
    forecast: Array<{
        time: string;
        temp: number;
        conditions: string;
    }>;
    alerts: WeatherAlert[];
    activeDelays: boolean;
}

// Demo data
const siteWeatherData: SiteWeather[] = [
    {
        id: 1,
        site: "Downtown Plaza Project",
        currentTemp: 72,
        humidity: 65,
        windSpeed: 12,
        conditions: "clear",
        forecast: [
            { time: "12 PM", temp: 75, conditions: "clear" },
            { time: "3 PM", temp: 78, conditions: "cloudy" },
            { time: "6 PM", temp: 73, conditions: "clear" },
        ],
        alerts: [],
        activeDelays: false,
    },
    {
        id: 2,
        site: "Tech Park Development",
        currentTemp: 68,
        humidity: 75,
        windSpeed: 18,
        conditions: "cloudy",
        forecast: [
            { time: "12 PM", temp: 70, conditions: "cloudy" },
            { time: "3 PM", temp: 72, conditions: "rain" },
            { time: "6 PM", temp: 69, conditions: "rain" },
        ],
        alerts: [
            {
                id: 1,
                site: "Tech Park Development",
                type: "wind",
                severity: "medium",
                message: "High winds may affect crane operations",
                startTime: "2024-03-12 14:00",
                duration: "6 hours",
                affectedOperations: ["Crane Operations", "External Work"],
            },
        ],
        activeDelays: true,
    },
];

const WeatherMonitoring = () => {
    const WeatherCard = ({ site }: { site: SiteWeather }) => (
        <Card className="p-4">
            <CardContent>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-medium text-lg">{site.site}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                            {site.conditions === 'clear' && <Sun className="h-4 w-4 mr-2" />}
                            {site.conditions === 'cloudy' && <Cloud className="h-4 w-4 mr-2" />}
                            {site.conditions === 'rain' && <CloudRain className="h-4 w-4 mr-2" />}
                            {site.conditions === 'storm' && <AlertTriangle className="h-4 w-4 mr-2" />}
                            {site.conditions}
                        </div>
                    </div>
                    {site.activeDelays && <Badge variant="warning">Weather Delay</Badge>}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold">{site.currentTemp}°F</div>
                        <p className="text-xs text-muted-foreground">Temperature</p>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold">{site.humidity}%</div>
                        <p className="text-xs text-muted-foreground">Humidity</p>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold">{site.windSpeed} mph</div>
                        <p className="text-xs text-muted-foreground">Wind Speed</p>
                    </div>
                </div>

                {site.alerts.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Active Alerts</p>
                        {site.alerts.map((alert, index) => (
                            <div key={index} className="flex items-start space-x-2 text-sm">
                                <AlertTriangle className="h-4 w-4 mt-1 text-yellow-500" />
                                <div>
                                    <p className="font-medium">{alert.message}</p>
                                    <p className="text-muted-foreground text-xs">Affects: {alert.affectedOperations.join(', ')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">3-Hour Forecast</p>
                        <Button variant="outline" size="sm">Details</Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {site.forecast.map((forecast, index) => (
                            <div key={index} className="text-center">
                                <p className="text-sm font-medium">{forecast.time}</p>
                                <p className="text-sm">{forecast.temp}°F</p>
                                <p className="text-xs text-muted-foreground">{forecast.conditions}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <Layout>
            <Layout.Header>
                <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Weather Monitoring</h2>
                    <p className="text-muted-foreground">
                        Real-time updates and alerts for better site management
                    </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {siteWeatherData.map((site) => (
                        <WeatherCard key={site.id} site={site}/>
                    ))}
                </div>
            </Layout.Body>
        </Layout>
    );
};

export default WeatherMonitoring;
