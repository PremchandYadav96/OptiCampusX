import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  return NextResponse.next({
    request,
  })

  /* Original code - will re-enable once template error is fixed
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const protectedPaths = [
    "/dashboard",
    "/report",
    "/admin",
    "/leaderboard",
    "/ai-analysis",
    "/forecasting",
    "/optimization",
    "/campus-map",
    "/profile",
    "/caterers",
  ]

  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (isProtectedPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  if (user && request.nextUrl.pathname.startsWith("/auth/") && !request.nextUrl.pathname.includes("signup-success")) {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
  */
}
