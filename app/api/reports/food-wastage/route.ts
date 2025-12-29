import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { storeImageInRedis } from "@/lib/redis-storage"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const catererId = formData.get("catererId") as string
    const mealType = formData.get("mealType") as string
    const wastageType = formData.get("wastageType") as string
    const estimatedKg = Number.parseFloat(formData.get("estimatedKg") as string)
    const description = formData.get("description") as string
    const anonymous = formData.get("anonymous") === "true"
    const photo = formData.get("photo") as File | null

    if (!catererId || !mealType || !wastageType || isNaN(estimatedKg) || estimatedKg <= 0) {
      return NextResponse.json({ error: "Missing or invalid required fields" }, { status: 400 })
    }

    const wastagePercentage = Math.min((estimatedKg / 50) * 100, 100)
    const creditsAwarded = estimatedKg > 10 ? 15 : estimatedKg > 5 ? 10 : 5

    // <CHANGE> Store photo in Redis if provided
    let photoUrl: string | null = null
    if (photo && photo.size > 0) {
      const uploadResult = await storeImageInRedis(photo, {
        reportType: "food_wastage",
        uploaderId: anonymous ? undefined : user.id,
      })

      if (uploadResult.success) {
        photoUrl = uploadResult.imageUrl || null
      } else {
        console.error("[v0] Failed to upload photo:", uploadResult.error)
      }
    }

    // Insert food wastage report
    const { data: reportData, error: insertError } = await supabase
      .from("food_wastage_reports")
      .insert({
        reporter_id: anonymous ? null : user.id,
        caterer_id: catererId,
        meal_type: mealType,
        estimated_wastage_kg: estimatedKg,
        wastage_percentage: wastagePercentage,
        notes: `${wastageType}: ${description}`,
        status: "pending",
        credits_awarded: 0,
        report_date: new Date().toISOString().split("T")[0],
        photo_url: photoUrl, // <CHANGE> Store Redis image URL
      })
      .select()
      .single()

    if (insertError) {
      console.error("[v0] Insert error:", insertError)
      return NextResponse.json(
        { error: "Failed to submit report", details: insertError.message },
        { status: 500 },
      )
    }

    if (!anonymous && user) {
      try {
        const { error: rpcError } = await supabase.rpc("increment_user_credits", {
          user_id: user.id,
          credits: creditsAwarded,
        })

        if (rpcError) {
          console.error("[v0] Credits RPC error:", rpcError)
          const { error: updateError } = await supabase
            .from("profiles")
            .update({
              sustainability_credits: supabase.raw(`COALESCE(sustainability_credits, 0) + ${creditsAwarded}`),
              total_reports: supabase.raw("COALESCE(total_reports, 0) + 1"),
            })
            .eq("id", user.id)

          if (updateError) {
            console.error("[v0] Fallback credit update error:", updateError)
          }
        }
      } catch (creditError) {
        console.error("[v0] Credit award error:", creditError)
      }
    }

    try {
      const { error: statsError } = await supabase.rpc("update_caterer_stats", {
        caterer_id: catererId,
      })

      if (statsError) {
        console.error("[v0] Caterer stats RPC error:", statsError)
      }
    } catch (statsError) {
      console.error("[v0] Caterer stats error:", statsError)
    }

    return NextResponse.json({
      success: true,
      creditsAwarded: anonymous ? 0 : creditsAwarded,
      message: "Food wastage report submitted successfully",
      photoUrl, // <CHANGE> Return photo URL for confirmation
    })
  } catch (error) {
    console.error("[v0] Food wastage report error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
