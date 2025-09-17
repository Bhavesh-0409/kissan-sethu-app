import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WeatherWidgetProps {
  location: string
}

export function WeatherWidget({ location }: WeatherWidgetProps) {
  // This would be fetched from a weather API in a real app
  const weatherData = {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    rainfall: 2.5,
    alerts: [
      {
        type: "rain",
        severity: "medium",
        message: "Moderate rainfall expected in next 24 hours",
      },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
          Weather - {location}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold">{weatherData.temperature}°C</div>
            <div className="text-sm text-muted-foreground">{weatherData.condition}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Humidity</span>
              <div className="font-medium">{weatherData.humidity}%</div>
            </div>
            <div>
              <span className="text-muted-foreground">Rainfall</span>
              <div className="font-medium">{weatherData.rainfall}mm</div>
            </div>
          </div>

          {weatherData.alerts.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Weather Alerts</h4>
              {weatherData.alerts.map((alert, index) => (
                <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      {alert.severity}
                    </Badge>
                    <span className="text-xs font-medium capitalize">{alert.type}</span>
                  </div>
                  <p className="text-xs text-gray-600">{alert.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
