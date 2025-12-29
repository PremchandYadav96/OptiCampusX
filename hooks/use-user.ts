"use client"

import { createClient } from "@/lib/supabase/client"
import type { Profile, UserRole } from "@/lib/types"
import type { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

interface UseUserReturn {
  user: User | null
  profile: Profile | null
  role: UserRole | null
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchUser = async () => {
    try {
      setIsLoading(true)
      console.log("[v0] Supabase URL available:", !!process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log("[v0] Supabase Anon Key available:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

      const supabase = createClient()

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) throw userError

      setUser(user)

      if (user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError && profileError.code !== "PGRST116") {
          throw profileError
        }

        setProfile(profile)
      } else {
        setProfile(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch user"))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()

    const supabase = createClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUser()
      } else {
        setProfile(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    user,
    profile,
    role: profile?.role ?? null,
    isLoading,
    error,
    refetch: fetchUser,
  }
}
