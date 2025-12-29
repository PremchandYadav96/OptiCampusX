import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "water" // water or food
    const format = searchParams.get("format") || "csv" // csv

    // Verify admin access
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
    if (!profile || !["super_admin", "admin", "facility_manager"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    let csvContent = ""
    let filename = ""

    if (type === "water") {
      const { data: reports } = await supabase
        .from("water_leak_reports")
        .select("*, profiles!reporter_id(full_name, email)")
        .order("reported_at", { ascending: false })

      filename = `water_leak_reports_${new Date().toISOString().split("T")[0]}.csv`
      csvContent = "ID,Location,Severity,Status,Reporter,Email,Date\n"
      reports?.forEach((r) => {
        csvContent += `"${r.id}","${r.location_description}","${r.severity}","${r.status}","${(r.profiles as any)?.full_name || "Anonymous"}","${(r.profiles as any)?.email || "N/A"}","${r.reported_at}"\n`
      })
    } else {
      const { data: reports } = await supabase
        .from("food_wastage_reports")
        .select("*, caterers(name), profiles!reporter_id(full_name, email)")
        .order("created_at", { ascending: false })

      filename = `food_wastage_reports_${new Date().toISOString().split("T")[0]}.csv`
      csvContent = "ID,Caterer,Meal,Amount(kg),Status,Reporter,Email,Date\n"
      reports?.forEach((r) => {
        csvContent += `"${r.id}","${(r.caterers as any)?.name}","${r.meal_type}","${r.estimated_wastage_kg}","${r.status}","${(r.profiles as any)?.full_name || "Anonymous"}","${(r.profiles as any)?.email || "N/A"}","${r.created_at}"\n`
      })
    }

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("[Export API] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
