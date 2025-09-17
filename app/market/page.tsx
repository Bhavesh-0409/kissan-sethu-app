import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MarketPriceTable } from "@/components/market/market-price-table"
import { PriceChart } from "@/components/market/price-chart"
import { MarketInsights } from "@/components/market/market-insights"

export default async function MarketPage() {
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

  // Get market prices
  const { data: marketPrices } = await supabase
    .from("market_prices")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50)

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Prices</h1>
            <p className="text-gray-600">Stay updated with real-time crop prices across different markets</p>
          </div>

          <div className="grid gap-6">
            {/* Market Insights */}
            <MarketInsights prices={marketPrices || []} />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Price Table */}
              <div className="lg:col-span-2">
                <MarketPriceTable prices={marketPrices || []} />
              </div>

              {/* Price Chart */}
              <div className="lg:col-span-1">
                <PriceChart prices={marketPrices || []} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
