import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WeatherForecastProps {
  location: string
}

export function WeatherForecast({ location }: WeatherForecastProps) {
  // In a real app, this would fetch from a weather API
  const forecast = [
    {
      date: "Today",
      high: 32,
      low: 24,
      condition: "Partly Cloudy",
      rainfall: 0,
      humidity: 65,
      windSpeed: 12,
    },
    {
      date: "Tomorrow",
      high: 29,
      low: 22,
      condition: "Light Rain",
      rainfall: 5,
      humidity: 78,
      windSpeed: 15,
    },
    {
      date: "Day 3",
      high: 31,
      low: 23,
      condition: "Sunny",
      rainfall: 0,
      humidity: 58,
      windSpeed: 8,
    },
    {
      date: "Day 4",
      high: 33,
      low: 25,
      condition: "Partly Cloudy",
      rainfall: 2,
      humidity: 62,
      windSpeed: 10,
    },
    {
      date: "Day 5",
      high: 28,
      low: 21,
      condition: "Heavy Rain",
      rainfall: 15,
      humidity: 85,
      windSpeed: 20,
    },
  ]

  const getConditionIcon = (condition: string) => {
    if (condition.includes("Rain")) {
      return (
        <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      )
    }
    if (condition.includes("Sunny")) {
      return (
        <svg className="h-5 w-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
          />
        </svg>
      )
    }
    return (
      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    )
  }

  const getRainfallColor = (rainfall: number) => {
    if (rainfall === 0) return "text-gray-500"
    if (rainfall < 5) return "text-blue-400"
    if (rainfall < 10) return "text-blue-500"
    return "text-blue-600"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-16 text-sm font-medium">{day.date}</div>
                <div className="flex items-center gap-2">
                  {getConditionIcon(day.condition)}
                  <span className="text-sm">{day.condition}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="font-medium">{day.high}°</div>
                  <div className="text-gray-500">{day.low}°</div>
                </div>

                <div className="text-center">
                  <div className={`font-medium ${getRainfallColor(day.rainfall)}`}>{day.rainfall}mm</div>
                  <div className="text-gray-500 text-xs">Rain</div>
                </div>

                <div className="text-center">
                  <div className="font-medium">{day.humidity}%</div>
                  <div className="text-gray-500 text-xs">Humidity</div>
                </div>

                <div className="text-center">
                  <div className="font-medium">{day.windSpeed}km/h</div>
                  <div className="text-gray-500 text-xs">Wind</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Farming Recommendations */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">Farming Recommendations</h4>
          <div className="space-y-2 text-sm text-green-700">
            <p>• Heavy rain expected on Day 5 - ensure proper drainage for your crops</p>
            <p>• Good weather for field work today and Day 3</p>
            <p>• Consider covering sensitive crops during tomorrow's light rain</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
