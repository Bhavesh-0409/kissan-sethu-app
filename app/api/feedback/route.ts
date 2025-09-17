import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { feature_type, rating, comment } = body

    if (!feature_type || !rating) {
      return NextResponse.json({ error: "Missing required fields: feature_type, rating" }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    // Save feedback to database
    const { data: feedback, error: saveError } = await supabase
      .from("feedback")
      .insert({
        user_id: user.id,
        feature_type,
        rating,
        comment: comment || null,
      })
      .select()
      .single()

    if (saveError) {
      console.error("Error saving feedback:", saveError)
      return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 })
    }

    return NextResponse.json({
      message: "Feedback submitted successfully",
      feedback,
    })
  } catch (error) {
    console.error("Error in feedback API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const featureType = searchParams.get("feature_type")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let query = supabase
      .from("feedback")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (featureType) {
      query = query.eq("feature_type", featureType)
    }

    const { data: feedback, error } = await query

    if (error) {
      console.error("Error fetching feedback:", error)
      return NextResponse.json({ error: "Failed to fetch feedback" }, { status: 500 })
    }

    return NextResponse.json({ feedback })
  } catch (error) {
    console.error("Error in feedback GET API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
