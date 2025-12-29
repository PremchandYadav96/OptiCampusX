import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

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

    // Call the sync function
    const { error: syncError } = await supabase.rpc("sync_profile_from_metadata", {
      user_id: user.id,
    })

    if (syncError) {
      console.error("[v0] Profile sync error:", syncError)
      return NextResponse.json({ error: "Failed to sync profile" }, { status: 500 })
    }

    // Fetch updated profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (profileError) {
      console.error("[v0] Profile fetch error:", profileError)
      return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
    }

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error("[v0] Sync profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
