"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Menu,
  X,
  LogOut,
  User,
  Shield,
  Award,
  AlertTriangle,
  LayoutDashboard,
  Map,
  TrendingUp,
  Settings,
  Brain,
  Info,
  UtensilsCrossed,
} from "lucide-react"
import { useState } from "react"
import { useUser } from "@/hooks/use-user"
import { createClient } from "@/lib/supabase/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ROLE_PERMISSIONS } from "@/lib/types"

const getNavItems = (role: string | null) => {
  const baseItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/campus-map", label: "Campus Map", icon: Map },
    { href: "/report", label: "Report Issue", icon: AlertTriangle },
    { href: "/leaderboard", label: "Leaderboard", icon: Award },
    { href: "/caterers", label: "Caterers", icon: UtensilsCrossed },
  ]

  const analyticsItems = [
    { href: "/forecasting", label: "Forecasting", icon: TrendingUp },
    { href: "/optimization", label: "Optimization", icon: Settings },
    { href: "/ai-analysis", label: "AI Analysis", icon: Brain },
  ]

  const adminItems = [{ href: "/admin", label: "Admin Panel", icon: Shield }]

  const publicItems = [{ href: "/about", label: "About", icon: Info }]

  // Role-based navigation
  if (!role) {
    return [...publicItems]
  }

  if (role === "viewer") {
    return [...baseItems, ...publicItems]
  }

  if (role === "faculty") {
    return [...baseItems, ...analyticsItems, ...publicItems]
  }

  if (role === "facility_manager" || role === "admin" || role === "super_admin") {
    return [...baseItems, ...analyticsItems, ...adminItems, ...publicItems]
  }

  return [...baseItems, ...publicItems]
}

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, profile, role, isLoading } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = getNavItems(role)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    return email.slice(0, 2).toUpperCase()
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "admin":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "facility_manager":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "faculty":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-3">
          <Image src="/opticampus-logo.png" alt="OptiCampus-X Logo" width={40} height={40} className="rounded-lg" />
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg leading-tight">OptiCampus-X</h1>
            <p className="text-[10px] text-muted-foreground leading-none">VIT-AP Smart Resource Optimization</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                size="sm"
                className={cn("text-sm gap-2", pathname === item.href && "bg-primary/10 text-primary")}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* User Menu or Login Button */}
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : user && profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                      {getInitials(profile.full_name, profile.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-medium leading-none">{profile.full_name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{profile.email}</p>
                    <Badge variant="outline" className={cn("w-fit text-xs", getRoleBadgeColor(profile.role))}>
                      {ROLE_PERMISSIONS[profile.role]?.label || "Viewer"}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span>{profile.sustainability_credits} Credits</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t bg-background p-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn("w-full justify-start gap-2", pathname === item.href && "bg-primary/10 text-primary")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
            {!user && (
              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 mt-2">
                <Link href="/auth/login">Sign In</Link>
              </Button>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
