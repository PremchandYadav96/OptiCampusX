import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  // and ensuring we use the correct environment variable names provided by the integration
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}
