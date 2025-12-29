import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch all necessary data for the dashboard in parallel
  const [profileRes, buildingsRes, waterRes, foodRes, caterersRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("buildings").select("*").order("name"),
    supabase
      .from("water_leak_reports")
      .select("*, building:buildings(name)")
      .order("reported_at", { ascending: false })
      .limit(5),
    supabase
      .from("food_wastage_reports")
      .select("*, caterer:caterers(name)")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase.from("caterers").select("*").eq("is_active", true).order("rating", { ascending: false }),
  ])

  return (
    <DashboardContent
      profile={profileRes.data}
      buildings={buildingsRes.data || []}
      waterReports={waterRes.data || []}
      foodReports={foodRes.data || []}
      caterers={caterersRes.data || []}
    />
  )
}
