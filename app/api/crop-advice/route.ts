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
    const { cropName, location, season, soilType, farmSize, specificIssue, adviceType } = body

    if (!cropName || !location || !season || !adviceType) {
      return NextResponse.json(
        { error: "Missing required fields: cropName, location, season, adviceType" },
        { status: 400 },
      )
    }

    let query = supabase
      .from("crop_advice_database")
      .select("*")
      .ilike("crop_name", cropName)
      .eq("advice_type", adviceType)

    // Add filters based on available data
    if (season && season !== "all") {
      query = query.or(`season.eq.${season},season.eq.all`)
    }
    if (soilType && soilType !== "all") {
      query = query.or(`soil_type.eq.${soilType},soil_type.eq.all`)
    }

    const { data: adviceData, error: fetchError } = await query.limit(3)

    if (fetchError) {
      console.error("Error fetching advice:", fetchError)
      return NextResponse.json({ error: "Failed to fetch advice" }, { status: 500 })
    }

    // If no specific advice found, get general advice for the crop
    let finalAdvice = adviceData
    if (!adviceData || adviceData.length === 0) {
      const { data: generalAdvice } = await supabase
        .from("crop_advice_database")
        .select("*")
        .ilike("crop_name", cropName)
        .limit(2)

      finalAdvice = generalAdvice || []
    }

    // Format the advice response
    const formattedAdvice = finalAdvice.map((advice) => ({
      title: advice.advice_title,
      content: advice.advice_text,
      tips: advice.tips || [],
      warning: advice.warning,
      bestPractices: advice.best_practices || [],
    }))

    // Get crop ID if exists
    const { data: crop } = await supabase.from("crops").select("id").ilike("name", cropName).single()

    // Save advice request to database with confidence score based on match quality
    const confidence = finalAdvice.length > 0 ? 0.95 : 0.7
    const adviceText = formattedAdvice.map((a) => `${a.title}: ${a.content}`).join("\n\n")

    const { data: savedAdvice, error: saveError } = await supabase
      .from("crop_advice")
      .insert({
        user_id: user.id,
        crop_id: crop?.id || null,
        advice_type: adviceType,
        advice_text: adviceText,
        confidence_score: confidence,
      })
      .select()
      .single()

    if (saveError) {
      console.error("Error saving advice:", saveError)
      return NextResponse.json({ error: "Failed to save advice" }, { status: 500 })
    }

    return NextResponse.json({
      advice: formattedAdvice,
      confidence,
      id: savedAdvice.id,
      source: "database",
    })
  } catch (error) {
    console.error("Error in crop advice API:", error)
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
    const adviceType = searchParams.get("type")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let query = supabase
      .from("crop_advice")
      .select(`
        *,
        crops(name, category)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (adviceType) {
      query = query.eq("advice_type", adviceType)
    }

    const { data: advice, error } = await query

    if (error) {
      console.error("Error fetching advice:", error)
      return NextResponse.json({ error: "Failed to fetch advice" }, { status: 500 })
    }

    return NextResponse.json({ advice })
  } catch (error) {
    console.error("Error in crop advice GET API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
