"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { Leaf, Zap, Droplets, ShieldCheck, Settings, Wrench, GraduationCap, Eye, EyeOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const ROLES = [
  {
    id: "super_admin",
    title: "Super Admin",
    icon: ShieldCheck,
    description: "System owner with full control",
    color: "text-red-500",
  },
  {
    id: "admin",
    title: "Admin",
    icon: Settings,
    description: "Campus management & analytics",
    color: "text-blue-500",
  },
  {
    id: "facility_manager",
    title: "Facility Manager",
    icon: Wrench,
    description: "Operations & utilities monitoring",
    color: "text-orange-500",
  },
  {
    id: "faculty",
    title: "Faculty / Staff",
    icon: GraduationCap,
    description: "Academic scheduling & resources",
    color: "text-emerald-500",
  },
  {
    id: "viewer",
    title: "Viewer",
    icon: Eye,
    description: "Students & public auditors",
    color: "text-slate-500",
  },
]

export default function LoginPage() {
  const [step, setStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) {
      setError("Please select your role first")
      return
    }

    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      if (!data.user) {
        throw new Error("Login failed - no user data returned")
      }

      console.log("[v0] User logged in:", data.user.id)

      // Verify role matches profile
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single()

      if (profile && profile.role !== selectedRole) {
        // Log out if role doesn't match
        await supabase.auth.signOut()
        throw new Error(`Unauthorized: Your account does not have ${selectedRole.replace("_", " ")} permissions`)
      }

      try {
        const response = await fetch("/api/auth/ensure-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          console.error("[v0] Profile check failed, but continuing to dashboard")
        } else {
          const result = await response.json()
          console.log("[v0] Profile status:", result)
        }
      } catch (profileError) {
        // Don't block login if profile check fails
        console.error("[v0] Profile ensure error:", profileError)
      }

      // Navigate to dashboard
      window.location.href = "/dashboard"
    } catch (error: unknown) {
      console.error("[v0] Login error:", error)
      setError(error instanceof Error ? error.message : "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <Image src="/opticampus-logo.png" alt="OptiCampus-X" width={200} height={80} className="mb-8" />
          <h1 className="text-4xl font-bold text-white mb-4">Smart Resource Optimization</h1>
          <p className="text-white/80 text-lg max-w-md">
            AI-powered campus sustainability platform for VIT-AP University. Optimize energy, water, and reduce wastage
            through intelligent monitoring.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Zap className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
            <p className="text-white font-semibold">Energy</p>
            <p className="text-white/70 text-sm">Optimization</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Droplets className="w-8 h-8 text-blue-300 mx-auto mb-2" />
            <p className="text-white font-semibold">Water</p>
            <p className="text-white/70 text-sm">Conservation</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Leaf className="w-8 h-8 text-green-300 mx-auto mb-2" />
            <p className="text-white font-semibold">Sustainability</p>
            <p className="text-white/70 text-sm">Credits</p>
          </div>
        </div>
      </div>

      {/* Right side - Login Content */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-10 bg-background">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-4">
              <Image src="/opticampus-logo.png" alt="OptiCampus-X" width={150} height={60} />
            </div>

            {step === 1 ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">Select your role</h2>
                  <p className="text-muted-foreground">Choose your portal access level to continue</p>
                </div>

                <div className="grid gap-3">
                  {ROLES.map((role) => {
                    const Icon = role.icon
                    return (
                      <button
                        key={role.id}
                        onClick={() => {
                          setSelectedRole(role.id)
                          setStep(2)
                        }}
                        className="group flex items-center gap-4 p-4 rounded-xl border-2 border-muted hover:border-emerald-600/50 hover:bg-emerald-50/50 transition-all text-left"
                      >
                        <div className={`p-2 rounded-lg bg-muted group-hover:bg-white ${role.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{role.title}</p>
                          <p className="text-xs text-muted-foreground">{role.description}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <Card className="border-0 shadow-lg">
                <CardHeader className="space-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="h-8 w-8 p-0">
                      ←
                    </Button>
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                      {selectedRole?.replace("_", " ")} Portal
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
                  <CardDescription>Enter your credentials for {selectedRole?.replace("_", " ")} access</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin}>
                    <div className="flex flex-col gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@vitap.ac.in"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-11 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      {error && (
                        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">{error}</div>
                      )}
                      <Button
                        type="submit"
                        className="w-full h-11 bg-emerald-600 hover:bg-emerald-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign in"}
                      </Button>
                    </div>
                    <div className="mt-6 text-center text-sm">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/auth/signup"
                        className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-4"
                      >
                        Sign up
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <p className="text-center text-sm text-muted-foreground">VIT-AP University - Smart Campus Initiative</p>
          </div>
        </div>
      </div>
    </div>
  )
}
