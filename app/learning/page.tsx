import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { LearningCategories } from "@/components/learning/learning-categories"
import { FeaturedContent } from "@/components/learning/featured-content"
import { LearningContent } from "@/components/learning/learning-content"

export default async function LearningPage() {
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

  // Get learning content
  const { data: learningContent } = await supabase
    .from("learning_content")
    .select("*")
    .eq("language", profile?.language_preference || "en")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Hub</h1>
            <p className="text-gray-600">
              Expand your farming knowledge with expert articles, videos, and practical guides
            </p>
          </div>

          <div className="grid gap-8">
            {/* Categories */}
            <LearningCategories />

            {/* Featured Content */}
            <FeaturedContent content={learningContent?.slice(0, 3) || []} />

            {/* All Content */}
            <LearningContent content={learningContent || []} />
          </div>
        </div>
      </main>
    </div>
  )
}
