"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { UtensilsCrossed, TrendingDown, AlertTriangle, CheckCircle2, Clock } from "lucide-react"

interface Caterer {
  id: string
  name: string
  mess_location: string
  rating: number
  total_wastage_reports: number
  avg_wastage_percentage: number
  penalty_points: number
  accountability_score: number
}

export default function CaterersPage() {
  const [caterers, setCaterers] = useState<Caterer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCaterers = async () => {
      try {
        const response = await fetch("/api/caterers/performance")
        const data = await response.json()
        setCaterers(data.caterers || [])
      } catch (error) {
        console.error("[v0] Failed to fetch caterers:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCaterers()
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" }
    if (score >= 60) return { label: "Good", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" }
    return { label: "Needs Improvement", color: "bg-red-500/10 text-red-600 border-red-500/20" }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <UtensilsCrossed className="h-8 w-8 text-primary" />
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
              Caterer Accountability Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            Performance monitoring and wastage accountability for mess caterers at VIT-AP
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : caterers.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <UtensilsCrossed className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No caterers registered yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caterers.map((caterer) => {
              const scoreBadge = getScoreBadge(caterer.accountability_score)
              return (
                <Card key={caterer.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{caterer.name}</CardTitle>
                        <CardDescription>{caterer.mess_location}</CardDescription>
                      </div>
                      <Badge variant="outline" className={scoreBadge.color}>
                        {scoreBadge.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Accountability Score</span>
                        <span className={`text-2xl font-bold ${getScoreColor(caterer.accountability_score)}`}>
                          {caterer.accountability_score}
                        </span>
                      </div>
                      <Progress value={caterer.accountability_score} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                      <div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                          <AlertTriangle className="h-3 w-3" />
                          Reports
                        </div>
                        <p className="text-lg font-semibold">{caterer.total_wastage_reports}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                          <TrendingDown className="h-3 w-3" />
                          Avg Wastage
                        </div>
                        <p className="text-lg font-semibold">{caterer.avg_wastage_percentage}%</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                          <Clock className="h-3 w-3" />
                          Penalty Points
                        </div>
                        <p className="text-lg font-semibold text-red-600">{caterer.penalty_points}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Rating
                        </div>
                        <p className="text-lg font-semibold">{caterer.rating.toFixed(1)} ⭐</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How Accountability Scores Work</CardTitle>
            <CardDescription>Transparent performance metrics for caterer accountability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <p className="font-medium text-sm">Report Frequency</p>
                </div>
                <p className="text-xs text-muted-foreground">Weight: 30%</p>
                <p className="text-xs text-muted-foreground mt-1">Fewer reports = better score</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-orange-600" />
                  </div>
                  <p className="font-medium text-sm">Resolution Speed</p>
                </div>
                <p className="text-xs text-muted-foreground">Weight: 20%</p>
                <p className="text-xs text-muted-foreground mt-1">Faster fixes = better score</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <TrendingDown className="h-4 w-4 text-yellow-600" />
                  </div>
                  <p className="font-medium text-sm">Wastage Amount</p>
                </div>
                <p className="text-xs text-muted-foreground">Weight: 30%</p>
                <p className="text-xs text-muted-foreground mt-1">Less waste = better score</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="font-medium text-sm">Recurrence Rate</p>
                </div>
                <p className="text-xs text-muted-foreground">Weight: 20%</p>
                <p className="text-xs text-muted-foreground mt-1">No repeats = better score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
