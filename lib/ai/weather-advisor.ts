import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface WeatherAlert {
  location: string
  alertType: "rain" | "drought" | "storm" | "temperature"
  severity: "low" | "medium" | "high"
  description: string
}

export async function generateWeatherAlert(
  location: string,
  weatherData: {
    temperature: number
    humidity: number
    rainfall: number
    windSpeed: number
    forecast: string
  },
): Promise<WeatherAlert | null> {
  const prompt = `Analyze the following weather data for ${location} and determine if farmers need any alerts:

Temperature: ${weatherData.temperature}°C
Humidity: ${weatherData.humidity}%
Rainfall: ${weatherData.rainfall}mm
Wind Speed: ${weatherData.windSpeed} km/h
Forecast: ${weatherData.forecast}

Based on this data, determine:
1. If there's any weather condition that requires farmer attention
2. The type of alert (rain/drought/storm/temperature)
3. Severity level (low/medium/high)
4. A clear, actionable message for farmers

Respond with JSON format:
{
  "needsAlert": boolean,
  "alertType": "rain|drought|storm|temperature",
  "severity": "low|medium|high",
  "message": "Clear message for farmers"
}

Only generate alerts for conditions that actually require farmer action.`

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
      maxTokens: 200,
    })

    const response = JSON.parse(text)

    if (response.needsAlert) {
      return {
        location,
        alertType: response.alertType,
        severity: response.severity,
        description: response.message,
      }
    }

    return null
  } catch (error) {
    console.error("Error generating weather alert:", error)
    return null
  }
}
