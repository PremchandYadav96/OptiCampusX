"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import { Shield, User, Building2, BookOpen, Eye, EyeOff } from "lucide-react"

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Electronics & Communication Engineering",
  "Electrical & Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Biotechnology",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Management Studies",
  "Law",
  "Other",
]

const ROLES = [
  {
    id: "viewer",
    title: "Student / Viewer",
    description: "Report issues and track campus sustainability credits.",
    icon: User,
  },
  {
    id: "faculty",
    title: "Faculty / Staff",
    description: "Oversee department resources and student initiatives.",
    icon: BookOpen,
  },
  {
    id: "facility_manager",
    title: "Facility Manager",
    description: "Manage campus assets, water, and power systems.",
    icon: Building2,
  },
  {
    id: "admin",
    title: "Administrator",
    description: "Full oversight of campus optimization and reporting.",
    icon: Shield,
  },
]

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fullName, setFullName] = useState("")
  const [regNumber, setRegNumber] = useState("")
  const [department, setDepartment] = useState("")
  const [selectedRole, setSelectedRole] = useState("viewer")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      console.log("[v0] Starting signup process with role:", selectedRole)

      const finalRole = email === process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL ? "super_admin" : selectedRole

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName,
            registration_number: regNumber,
            department: department,
            role: finalRole,
          },
        },
      })

      if (signUpError) {
        console.error("[v0] Signup error:", signUpError)
        throw signUpError
      }

      console.log("[v0] Signup successful:", data)

      router.push("/auth/signup-success")
    } catch (error: unknown) {
      console.error("[v0] Signup exception:", error)
      setError(error instanceof Error ? error.message : "An error occurred during signup")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-[#0A0A0A] selection:bg-emerald-500/30">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col gap-8">
          <div className="flex justify-center">
            <Image src="/opticampus-logo.png" alt="OptiCampus-X" width={220} height={88} className="brightness-110" />
          </div>

          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-2xl">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold tracking-tight text-white">Join OptiCampus-X</CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Choose your role to start optimizing campus resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ROLES.map((role) => {
                    const Icon = role.icon
                    const isSelected = selectedRole === role.id
                    return (
                      <div
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer group hover:bg-emerald-500/5 ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                            : "border-gray-800 bg-gray-900 hover:border-emerald-500/50"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-2 rounded-lg ${isSelected ? "text-emerald-400" : "text-gray-500 group-hover:text-emerald-400"}`}
                          >
                            <Icon size={24} />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold text-white">{role.title}</h3>
                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{role.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-gray-300">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        className="bg-black border-gray-800 text-white focus:border-emerald-500 focus:ring-emerald-500/20"
                        placeholder="John Doe"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        VIT-AP Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className="bg-black border-gray-800 text-white focus:border-emerald-500 focus:ring-emerald-500/20"
                        placeholder="john.doe@vitap.ac.in"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="regNumber" className="text-gray-300">
                        Registration No.
                      </Label>
                      <Input
                        id="regNumber"
                        type="text"
                        placeholder="e.g., 22BCE1234"
                        className="bg-black border-gray-800 text-white focus:border-emerald-500 focus:ring-emerald-500/20"
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="department" className="text-gray-300">
                        Department
                      </Label>
                      <Select value={department} onValueChange={setDepartment}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {DEPARTMENTS.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="bg-black border-gray-800 text-white focus:border-emerald-500 focus:ring-emerald-500/20 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword" className="text-gray-300">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        className="bg-black border-gray-800 text-white focus:border-emerald-500 focus:ring-emerald-500/20 pr-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">{error}</div>}

                  <Button
                    type="submit"
                    className="w-full h-11 bg-emerald-600 hover:bg-emerald-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </div>

                <div className="mt-6 text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
