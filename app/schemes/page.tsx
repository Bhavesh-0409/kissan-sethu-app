import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SchemeCategories } from "@/components/schemes/scheme-categories"
import { SchemeList } from "@/components/schemes/scheme-list"
import { SchemeStats } from "@/components/schemes/scheme-stats"

export default async function SchemesPage() {
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

  // Get schemes
  const { data: schemes } = await supabase
    .from("schemes")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Government Schemes</h1>
            <p className="text-gray-600">
              Discover and apply for agricultural subsidies, loans, and benefits available to farmers
            </p>
          </div>

          <div className="grid gap-8">
            {/* Stats */}
            <SchemeStats schemes={schemes || []} />

            {/* Categories */}
            <SchemeCategories schemes={schemes || []} />

            {/* Scheme List */}
            <SchemeList schemes={schemes || []} userLocation={profile?.location} />
          </div>
        </div>
      </main>
    </div>
  )
}
