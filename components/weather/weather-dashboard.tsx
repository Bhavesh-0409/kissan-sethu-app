import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WeatherDashboardProps {
  location: string
}

export function WeatherDashboard({ location }: WeatherDashboardProps) {
  // In a real app, this would fetch from a weather API
  const currentWeather = {
    temperature: 28,
    feelsLike: 32,
    humidity: 65,
    windSpeed: 12,
    windDirection: "NW",
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    condition: "Partly Cloudy",
    icon: "partly-cloudy",
    rainfall: 2.5,
    soilMoisture: 45,
  }

  const getUVIndexColor = (uv: number) => {
    if (uv <= 2) return "bg-green-100 text-green-800"
    if (uv <= 5) return "bg-yellow-100 text-yellow-800"
    if (uv <= 7) return "bg-orange-100 text-orange-800"
    if (uv <= 10) return "bg-red-100 text-red-800"
    return "bg-purple-100 text-purple-800"
  }

  const getUVIndexLabel = (uv: number) => {
    if (uv <= 2) return "Low"
    if (uv <= 5) return "Moderate"
    if (uv <= 7) return "High"
    if (uv <= 10) return "Very High"
    return "Extreme"
  }

  return (
    <div className="grid gap-6">
      {/* Current Weather */}
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
            Current Weather - {location}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Temperature */}
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">{currentWeather.temperature}°C</div>
              <div className="text-sm text-gray-500">Feels like {currentWeather.feelsLike}°C</div>
              <div className="text-sm font-medium mt-1">{currentWeather.condition}</div>
            </div>

            {/* Wind */}
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">{currentWeather.windSpeed}</div>
              <div className="text-sm text-gray-500">km/h {currentWeather.windDirection}</div>
              <div className="text-sm font-medium mt-1">Wind Speed</div>
            </div>

            {/* Humidity */}
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{currentWeather.humidity}%</div>
              <div className="text-sm text-gray-500">{currentWeather.pressure} hPa</div>
              <div className="text-sm font-medium mt-1">Humidity</div>
            </div>

            {/* UV Index */}
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{currentWeather.uvIndex}</div>
              <Badge className={`text-xs ${getUVIndexColor(currentWeather.uvIndex)}`}>
                {getUVIndexLabel(currentWeather.uvIndex)}
              </Badge>
              <div className="text-sm font-medium mt-1">UV Index</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agricultural Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Rainfall</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{currentWeather.rainfall}mm</div>
                <div className="text-sm text-gray-500">Last 24 hours</div>
              </div>
              <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Soil Moisture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{currentWeather.soilMoisture}%</div>
                <div className="text-sm text-gray-500">Estimated</div>
              </div>
              <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                />
              </svg>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Visibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-600">{currentWeather.visibility}km</div>
                <div className="text-sm text-gray-500">Clear visibility</div>
              </div>
              <svg className="h-8 w-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
