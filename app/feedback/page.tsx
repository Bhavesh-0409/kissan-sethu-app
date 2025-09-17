import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { FeedbackForm } from "@/components/feedback/feedback-form"
import { FeedbackStats } from "@/components/feedback/feedback-stats"
import { RecentFeedback } from "@/components/feedback/recent-feedback"

export default async function FeedbackPage() {
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

  // Get user's feedback history
  const { data: userFeedback } = await supabase
    .from("feedback")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback & Support</h1>
            <p className="text-gray-600">Help us improve Kissan Sethu by sharing your experience and suggestions</p>
          </div>

          <div className="grid gap-8">
            {/* Feedback Stats */}
            <FeedbackStats feedback={userFeedback || []} />

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Feedback Form */}
              <div>
                <FeedbackForm />
              </div>

              {/* Recent Feedback */}
              <div>
                <RecentFeedback feedback={userFeedback || []} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
