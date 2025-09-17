import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { WeatherDashboard } from "@/components/weather/weather-dashboard"
import { WeatherAlerts } from "@/components/weather/weather-alerts"
import { WeatherForecast } from "@/components/weather/weather-forecast"

export default async function WeatherPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get weather alerts
  const { data: alerts } = await supabase
    .from("weather_alerts")
    .select("*")
    .gte("valid_until", new Date().toISOString())
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Weather Information</h1>
            <p className="text-gray-600">Stay updated with weather conditions and alerts for your farming area</p>
          </div>

          <div className="grid gap-6">
            {/* Weather Dashboard */}
            <WeatherDashboard location={profile?.location || "India"} />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Weather Alerts */}
              <div className="lg:col-span-1">
                <WeatherAlerts alerts={alerts || []} />
              </div>

              {/* Weather Forecast */}
              <div className="lg:col-span-2">
                <WeatherForecast location={profile?.location || "India"} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
