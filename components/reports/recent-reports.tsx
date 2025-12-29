"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, UtensilsCrossed, Clock, MapPin, AlertTriangle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Report {
  id: string
  type: "water" | "food"
  location: string
  status: string
  created_at: string
  severity?: string
  caterer_name?: string
}

export function RecentReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports/recent")
        const data = await response.json()
        setReports(data.reports || [])
      } catch (error) {
        console.error("[v0] Failed to fetch reports:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "verified":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "resolved":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
      case "rejected":
        return "bg-red-500/10 text-red-600 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-orange-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports from Campus</CardTitle>
        <CardDescription>Latest wastage reports submitted by the community</CardDescription>
      </CardHeader>
      <CardContent>
        {reports.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No reports yet. Be the first to report!</p>
        ) : (
          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      report.type === "water"
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : "bg-orange-100 dark:bg-orange-900/30"
                    }`}
                  >
                    {report.type === "water" ? (
                      <Droplets className="h-5 w-5 text-blue-600" />
                    ) : (
                      <UtensilsCrossed className="h-5 w-5 text-orange-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm">{report.type === "water" ? "Water Leak" : "Food Wastage"}</p>
                      <Badge variant="outline" className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      {report.severity && (
                        <Badge variant="outline" className="text-xs">
                          <AlertTriangle className={`h-3 w-3 mr-1 ${getSeverityColor(report.severity)}`} />
                          {report.severity}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {report.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(report.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    {report.caterer_name && (
                      <p className="text-xs text-muted-foreground mt-1">Caterer: {report.caterer_name}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
