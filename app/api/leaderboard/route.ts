import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("full_name, email, sustainability_credits, valid_reports, total_reports")
      .order("sustainability_credits", { ascending: false })
      .limit(50)

    if (error) {
      console.error("[v0] Leaderboard error:", error)
      // <CHANGE> Return empty array for graceful degradation
      return NextResponse.json({ leaderboard: [] })
    }

    // <CHANGE> Added null safety and filtering for incomplete profiles
    const leaderboard = (profiles || [])
      .filter((profile) => profile.full_name && profile.sustainability_credits > 0)
      .map((profile, index) => ({
        rank: index + 1,
        full_name: profile.full_name || "Anonymous User",
        email: profile.email || "",
        sustainability_credits: profile.sustainability_credits || 0,
        valid_reports: profile.valid_reports || 0,
        total_reports: profile.total_reports || 0,
      }))

    return NextResponse.json({ leaderboard })
  } catch (error) {
    console.error("[v0] Leaderboard error:", error)
    // <CHANGE> Return empty array to prevent UI crashes
    return NextResponse.json({ leaderboard: [] })
  }
}
