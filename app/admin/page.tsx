import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile to check role
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Check if user has admin privileges
  if (!profile || !["super_admin", "admin", "facility_manager"].includes(profile.role)) {
    redirect("/dashboard")
  }

  // Fetch all users for admin management
  const { data: users } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  // Fetch pending reports counts
  const { count: pendingWaterCount } = await supabase
    .from("water_leak_reports")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: pendingFoodCount } = await supabase
    .from("food_wastage_reports")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  // Fetch caterers
  const { data: caterers } = await supabase.from("caterers").select("*").order("name")

  return (
    <AdminDashboard
      currentUser={profile}
      users={users || []}
      pendingWaterCount={pendingWaterCount || 0}
      pendingFoodCount={pendingFoodCount || 0}
      caterers={caterers || []}
    />
  )
}
