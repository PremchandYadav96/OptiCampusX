import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    // <CHANGE> Fetch with error handling and null safety
    const { data: waterReports, error: waterError } = await supabase
      .from("water_leak_reports")
      .select("id, location_description, severity, status, reported_at")
      .order("reported_at", { ascending: false })
      .limit(5)

    // Fetch recent food wastage reports with caterer info
    const { data: foodReports, error: foodError } = await supabase
      .from("food_wastage_reports")
      .select(`
        id,
        notes,
        status,
        created_at,
        caterers (name)
      `)
      .order("created_at", { ascending: false })
      .limit(5)

    // <CHANGE> Handle errors gracefully by returning empty arrays instead of failing
    if (waterError) {
      console.error("[v0] Water reports fetch error:", waterError)
    }

    if (foodError) {
      console.error("[v0] Food reports fetch error:", foodError)
    }

    // Format water reports with null safety
    const formattedWaterReports = (waterReports || []).map((report) => ({
      id: report.id,
      type: "water" as const,
      location: report.location_description || "Unknown Location",
      status: report.status || "unknown",
      created_at: report.reported_at,
      severity: report.severity || "unknown",
    }))

    // Format food reports with null safety
    const formattedFoodReports = (foodReports || []).map((report) => ({
      id: report.id,
      type: "food" as const,
      location: (report.caterers as any)?.name || "Unknown Caterer",
      status: report.status || "unknown",
      created_at: report.created_at,
      caterer_name: (report.caterers as any)?.name || "Unknown",
    }))

    // Combine and sort by date
    const allReports = [...formattedWaterReports, ...formattedFoodReports].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )

    return NextResponse.json({ reports: allReports.slice(0, 10) })
  } catch (error) {
    console.error("[v0] Recent reports error:", error)
    // <CHANGE> Return empty array instead of error to prevent UI crashes
    return NextResponse.json({ reports: [] })
  }
}
