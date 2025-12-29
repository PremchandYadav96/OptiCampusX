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
    const buildingId = formData.get("buildingId") as string
    const issueType = formData.get("issueType") as string
    const severity = formData.get("severity") as string
    const location = formData.get("location") as string
    const description = formData.get("description") as string
    const anonymous = formData.get("anonymous") === "true"
    const photo = formData.get("photo") as File | null

    if (!buildingId || !issueType || !severity || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const estimatedLoss = severity === "high" ? 100 : severity === "medium" ? 50 : 20
    const creditsAwarded = severity === "high" ? 15 : severity === "medium" ? 10 : 5

    // <CHANGE> Store photo in Redis if provided
    let photoUrl: string | null = null
    if (photo && photo.size > 0) {
      const uploadResult = await storeImageInRedis(photo, {
        reportType: "water_leak",
        uploaderId: anonymous ? undefined : user.id,
      })

      if (uploadResult.success) {
        photoUrl = uploadResult.imageUrl || null
      } else {
        console.error("[v0] Failed to upload photo:", uploadResult.error)
      }
    }

    // Insert water leak report
    const { data: reportData, error: insertError } = await supabase
      .from("water_leak_reports")
      .insert({
        reporter_id: anonymous ? null : user.id,
        building_id: null,
        location_description: `${buildingId} - ${location} - ${issueType}`,
        severity,
        estimated_water_loss_liters: estimatedLoss,
        status: "pending",
        credits_awarded: 0,
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

    // <CHANGE> Update image metadata with report ID
    if (photoUrl && reportData) {
      // Extract image ID from URL
      const imageId = photoUrl.split("/").pop()
      if (imageId) {
        // Note: In production, you'd want to update the metadata in Redis
        // For now, the image is stored and accessible
      }
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

    return NextResponse.json({
      success: true,
      creditsAwarded: anonymous ? 0 : creditsAwarded,
      message: "Water leak report submitted successfully",
      photoUrl, // <CHANGE> Return photo URL for confirmation
    })
  } catch (error) {
    console.error("[v0] Water leak report error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
