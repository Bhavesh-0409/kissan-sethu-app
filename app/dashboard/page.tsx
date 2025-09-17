import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentAdvice } from "@/components/dashboard/recent-advice"
import { WeatherWidget } from "@/components/dashboard/weather-widget"
import { MarketPrices } from "@/components/dashboard/market-prices"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default async function DashboardPage() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {profile?.full_name || user.email?.split("@")[0]}!
            </h1>
            <p className="text-green-100">Here's what's happening with your farm today</p>
          </div>

          {/* Stats Overview */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <RecentAdvice />
              <MarketPrices />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <WeatherWidget location={profile?.location || "India"} />
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
