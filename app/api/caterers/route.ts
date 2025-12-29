import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data: caterers, error } = await supabase
      .from("caterers")
      .select("id, name, mess_location")
      .eq("is_active", true)
      .order("name")

    if (error) {
      console.error("[v0] Caterers error:", error)
      // <CHANGE> Return empty array instead of error for graceful degradation
      return NextResponse.json({ caterers: [] })
    }

    // <CHANGE> Ensure we always return an array even if data is null
    return NextResponse.json({ caterers: caterers || [] })
  } catch (error) {
    console.error("[v0] Caterers error:", error)
    // <CHANGE> Return empty array to prevent UI crashes
    return NextResponse.json({ caterers: [] })
  }
}
