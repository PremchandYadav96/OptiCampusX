"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { Profile, Building, WaterLeakReport, FoodWastageReport, Caterer } from "@/lib/types"
import {
  Zap,
  Droplets,
  Leaf,
  AlertTriangle,
  TrendingUp,
  Building2,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Sparkles,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { UsageChart } from "./usage-chart"
import { sampleUsageData } from "@/lib/sample-data"
import { ProfileOnboarding } from "@/components/profile/profile-onboarding"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface DashboardContentProps {
  profile: Profile | null
  buildings: Building[]
  waterReports: WaterLeakReport[]
  foodReports: FoodWastageReport[]
  caterers: Caterer[]
}

export function DashboardContent({ profile, buildings, waterReports, foodReports, caterers }: DashboardContentProps) {
  const [showOnboarding, setShowOnboarding] = useState(profile && (!profile.full_name || !profile.department))
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationStatus, setOptimizationStatus] = useState<
    "idle" | "collecting" | "analyzing" | "optimizing" | "complete"
  >("idle")
  const router = useRouter()

  const handleRunOptimization = async () => {
    setIsOptimizing(true)

    setOptimizationStatus("collecting")
    toast.info("Step 1/4: Collecting campus data...", {
      description: "Gathering real-time sensor data from 17+ buildings",
      icon: <Activity className="h-4 w-4 animate-pulse" />,
    })

    await new Promise((resolve) => setTimeout(resolve, 800))

    setOptimizationStatus("analyzing")
    toast.info("Step 2/4: Analyzing patterns...", {
      description: "Running SARIMA forecasting and anomaly detection",
      icon: <TrendingUp className="h-4 w-4 animate-pulse" />,
    })

    await new Promise((resolve) => setTimeout(resolve, 800))

    setOptimizationStatus("optimizing")
    toast.info("Step 3/4: AI optimization in progress...", {
      description: "Gemini 2.0 Flash generating optimal schedule",
      icon: <Sparkles className="h-4 w-4 animate-pulse" />,
    })

    await new Promise((resolve) => setTimeout(resolve, 900))

    setOptimizationStatus("complete")
    setIsOptimizing(false)

    toast.success("Step 4/4: Optimization complete!", {
      description: "1,247 kWh identified for reduction. View recommendations now.",
      icon: <CheckCircle className="h-4 w-4" />,
      duration: 6000,
      action: {
        label: "View Results",
        onClick: () => router.push("/optimization"),
      },
    })

    setTimeout(() => setOptimizationStatus("idle"), 2000)
    router.refresh()
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    router.refresh()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
            <TrendingUp className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalBuildings = buildings.length
  const academicBlocks = buildings.filter((b) => b.type === "academic").length
  const hostels = buildings.filter((b) => b.type === "hostel").length

  const pendingWaterReports = waterReports.filter((r) => r.status === "pending").length
  const pendingFoodReports = foodReports.filter((r) => r.status === "pending").length

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {showOnboarding && profile && <ProfileOnboarding profile={profile} onComplete={handleOnboardingComplete} />}

      <main className="flex-1 container py-8 px-4 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-display">
              Welcome back, {profile?.full_name?.split(" ")[0] || "User"}!
            </h1>
            <p className="text-muted-foreground">OptiCampus-X: Monitoring {buildings.length} VIT-AP campus buildings</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleRunOptimization}
              disabled={isOptimizing}
              className={cn(
                "bg-primary hover:bg-primary/90 text-primary-foreground font-medium relative overflow-hidden",
                isOptimizing && "animate-pulse",
              )}
            >
              {isOptimizing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {optimizationStatus === "collecting" && "Collecting Data..."}
                  {optimizationStatus === "analyzing" && "Analyzing Patterns..."}
                  {optimizationStatus === "optimizing" && "AI Optimizing..."}
                  {optimizationStatus === "complete" && "Complete!"}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Run AI Optimization
                </>
              )}
            </Button>
            <Button asChild variant="outline" className="border-border bg-transparent">
              <Link href="/report">
                <AlertTriangle className="w-4 h-4 mr-2 text-amber-500" />
                Report
              </Link>
            </Button>
          </div>
        </div>

        {/* Optimization Status Indicator Card */}
        {isOptimizing && (
          <Card className="bg-gradient-to-r from-primary/20 via-primary/10 to-background border-primary/30 animate-in fade-in slide-in-from-top-4">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/20">
                  <Sparkles className="h-6 w-6 text-primary animate-pulse" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">AI Optimization in Progress</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {optimizationStatus === "collecting" && "Collecting real-time data from VIT-AP campus sensors..."}
                    {optimizationStatus === "analyzing" &&
                      "Running SARIMA forecasting and Z-score anomaly detection..."}
                    {optimizationStatus === "optimizing" && "Gemini 2.0 Flash generating optimal resource schedule..."}
                    {optimizationStatus === "complete" && "Processing complete! Preparing results..."}
                  </p>
                  <Progress
                    value={
                      optimizationStatus === "collecting"
                        ? 25
                        : optimizationStatus === "analyzing"
                          ? 50
                          : optimizationStatus === "optimizing"
                            ? 75
                            : 100
                    }
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* User Stats Card */}
        {profile && (
          <Card className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border-emerald-500/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">{profile.sustainability_credits}</div>
                  <div className="text-sm text-muted-foreground">Sustainability Credits</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{profile.total_reports}</div>
                  <div className="text-sm text-muted-foreground">Total Reports</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{profile.valid_reports}</div>
                  <div className="text-sm text-muted-foreground">Verified Reports</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {profile.total_reports > 0
                      ? `${Math.round((profile.valid_reports / profile.total_reports) * 100)}%`
                      : "0%"}
                  </div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Buildings</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBuildings}</div>
              <p className="text-xs text-muted-foreground">
                {academicBlocks} Academic, {hostels} Hostels
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Water Reports</CardTitle>
              <Droplets className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingWaterReports}</div>
              <p className="text-xs text-muted-foreground">Awaiting verification</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Food Reports</CardTitle>
              <Leaf className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingFoodReports}</div>
              <p className="text-xs text-muted-foreground">From {caterers.length} caterers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Energy Saved Today</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247 kWh</div>
              <p className="text-xs text-emerald-600">+ 12% from yesterday</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Resource Consumption Analytics</CardTitle>
                <CardDescription>VIT-AP real-time vs predicted trends</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                Live Data
              </Badge>
            </CardHeader>
            <CardContent>
              <UsageChart
                title=""
                data={sampleUsageData.electricity}
                dataKey="electricity"
                color="oklch(0.62 0.17 160)"
              />
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Caterer Accountability</CardTitle>
              <CardDescription>Performance tracking for mess providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {caterers.map((caterer) => (
                <div key={caterer.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center font-bold text-xs">
                        {caterer.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-sm leading-none">{caterer.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{caterer.mess_location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{caterer.rating}/5.0</p>
                      <Badge variant="outline" className="text-[10px] py-0 h-4 border-emerald-500/30 text-emerald-600">
                        Top Rated
                      </Badge>
                    </div>
                  </div>
                  <Progress value={caterer.rating * 20} className="h-1.5 bg-muted" />
                </div>
              ))}
              {caterers.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No caterers found. Run the seed script first.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Water Leak Reports */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  Recent Water Leak Reports
                </CardTitle>
                <CardDescription>Latest reported water issues</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/reports/water">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {waterReports.length > 0 ? (
                  waterReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">
                          {(report.building as { name: string })?.name || "Unknown Building"}
                        </p>
                        <p className="text-sm text-muted-foreground">{report.location_description}</p>
                      </div>
                      {getStatusBadge(report.status)}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No water leak reports yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Food Wastage Reports */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-500" />
                  Recent Food Wastage Reports
                </CardTitle>
                <CardDescription>Latest meal wastage data</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/reports/food">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {foodReports.length > 0 ? (
                  foodReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{(report.caterer as { name: string })?.name || "Unknown Caterer"}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.meal_type} - {report.estimated_wastage_kg} kg wasted
                        </p>
                      </div>
                      {getStatusBadge(report.status)}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No food wastage reports yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
