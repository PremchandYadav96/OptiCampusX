import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient()

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Check if profile exists
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (profileError || !profile) {
      // Profile doesn't exist, create it
      const assignedRole =
        user.email === "premchandyadavplnr@gmail.com" ? "super_admin" : user.user_metadata?.role || "viewer"

      const { error: insertError } = await supabase.from("profiles").insert({
        id: user.id,
        email: user.email!,
        role: assignedRole,
        full_name: user.user_metadata?.full_name || "",
        registration_number: user.user_metadata?.registration_number || "",
        department: user.user_metadata?.department || "",
      })

      if (insertError) {
        console.error("[v0] Error creating profile:", insertError)
        return NextResponse.json({ error: "Failed to create profile", details: insertError.message }, { status: 500 })
      }

      // Fetch the newly created profile
      const { data: newProfile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

      return NextResponse.json({
        success: true,
        profile: newProfile,
        created: true,
      })
    }

    return NextResponse.json({
      success: true,
      profile,
      created: false,
    })
  } catch (error) {
    console.error("[v0] Ensure profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
