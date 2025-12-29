"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Award, Star, TrendingUp } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  full_name: string
  email: string
  sustainability_credits: number
  valid_reports: number
  total_reports: number
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard")
        const data = await response.json()
        setLeaderboard(data.leaderboard || [])
      } catch (error) {
        console.error("[v0] Failed to fetch leaderboard:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchLeaderboard()
  }, [])

  const getInitials = (name: string, email: string) => {
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

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 3:
        return <Trophy className="h-5 w-5 text-orange-600" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-8 w-8 text-primary" />
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
              Sustainability Leaderboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            Top contributors making VIT-AP more sustainable through wastage reporting
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
              <CardDescription>Ranked by sustainability credits earned</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : leaderboard.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No contributors yet. Be the first!</p>
              ) : (
                <div className="space-y-2">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={entry.email}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                        entry.rank <= 3 ? "bg-primary/5 border border-primary/20" : "bg-secondary/50 hover:bg-secondary"
                      }`}
                    >
                      <div className="flex items-center justify-center w-8">{getRankBadge(entry.rank)}</div>

                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                          {getInitials(entry.full_name, entry.email)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{entry.full_name || "Anonymous User"}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>
                            {entry.valid_reports} / {entry.total_reports} valid reports
                          </span>
                          <span>
                            {entry.total_reports > 0
                              ? `${Math.round((entry.valid_reports / entry.total_reports) * 100)}%`
                              : "0%"}{" "}
                            accuracy
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 text-lg font-bold text-primary">
                          <Star className="h-5 w-5 fill-primary" />
                          {entry.sustainability_credits}
                        </div>
                        <p className="text-xs text-muted-foreground">credits</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How Credits Work</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <p className="font-medium text-sm">+5 Credits</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Verified water leak report</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <p className="font-medium text-sm">+10 Credits</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Verified food wastage report</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <p className="font-medium text-sm">+15 Credits</p>
                  </div>
                  <p className="text-xs text-muted-foreground">High severity issue report</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <p className="font-medium text-sm">Bonus Multiplier</p>
                  </div>
                  <p className="text-xs text-muted-foreground">×1.5 for 90%+ accuracy rate</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Participate?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <span className="text-xl">🌍</span>
                  <div>
                    <p className="font-medium text-sm">Make Real Impact</p>
                    <p className="text-xs text-muted-foreground">Help save resources and reduce waste</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className="text-xl">🏆</span>
                  <div>
                    <p className="font-medium text-sm">Recognition</p>
                    <p className="text-xs text-muted-foreground">Get recognized for your contributions</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className="text-xl">📊</span>
                  <div>
                    <p className="font-medium text-sm">Track Progress</p>
                    <p className="text-xs text-muted-foreground">See your environmental impact grow</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
