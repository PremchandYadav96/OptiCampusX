import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data: caterers, error } = await supabase
      .from("caterers")
      .select("*")
      .eq("is_active", true)
      .order("rating", { ascending: false })

    if (error) {
      console.error("[v0] Caterers performance error:", error)
      // <CHANGE> Return empty array for graceful degradation
      return NextResponse.json({ caterers: [] })
    }

    // <CHANGE> Calculate accountability score with null safety
    const caterersWithScores = (caterers || []).map((caterer) => {
      // Score components (0-100) with null coalescing
      const reportFrequencyScore = Math.max(0, 100 - (caterer.total_wastage_reports || 0) * 5)
      const wastageScore = Math.max(0, 100 - (caterer.avg_wastage_percentage || 0) * 2)
      const penaltyScore = Math.max(0, 100 - (caterer.penalty_points || 0) * 10)
      const resolutionScore = (caterer.rating || 0) * 20

      // Weighted average
      const accountabilityScore = Math.round(
        reportFrequencyScore * 0.3 + resolutionScore * 0.2 + wastageScore * 0.3 + penaltyScore * 0.2,
      )

      return {
        ...caterer,
        accountability_score: accountabilityScore,
      }
    })

    return NextResponse.json({ caterers: caterersWithScores })
  } catch (error) {
    console.error("[v0] Caterers performance error:", error)
    // <CHANGE> Return empty array instead of error
    return NextResponse.json({ caterers: [] })
  }
}
