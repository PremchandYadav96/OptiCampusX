import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileContent } from "@/components/profile/profile-content"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/auth/login")
  }

  // Fetch user's reports
  const { data: waterReports } = await supabase
    .from("water_leak_reports")
    .select("*, building:buildings(name)")
    .eq("reporter_id", user.id)
    .order("reported_at", { ascending: false })
    .limit(10)

  const { data: foodReports } = await supabase
    .from("food_wastage_reports")
    .select("*, caterer:caterers(name)")
    .eq("reporter_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10)

  return <ProfileContent profile={profile} waterReports={waterReports || []} foodReports={foodReports || []} />
}
