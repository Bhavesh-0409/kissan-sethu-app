import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CropAdviceForm } from "@/components/crop-advice/crop-advice-form"
import { AdviceHistory } from "@/components/crop-advice/advice-history"

export default async function CropAdvicePage() {
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

  // Get available crops
  const { data: crops } = await supabase.from("crops").select("*").order("name")

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Crop Advisory</h1>
            <p className="text-gray-600">
              Get personalized farming advice powered by artificial intelligence for your crops
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Advice Form */}
            <div>
              <CropAdviceForm crops={crops || []} />
            </div>

            {/* Advice History */}
            <div>
              <AdviceHistory />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
