"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, AlertTriangle, AlertCircle, Info, CheckCircle2, X } from "lucide-react"
import { useState } from "react"
import { realtimeAlerts } from "@/lib/sample-data"

interface Alert {
  id: string
  type: "critical" | "warning" | "info"
  title: string
  location: string
  time: string
  action: string
}

export function RealtimeAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(realtimeAlerts as Alert[])
  const [dismissed, setDismissed] = useState<string[]>([])

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const getAlertBadge = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "warning":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Warning
          </Badge>
        )
      case "info":
        return <Badge variant="outline">Info</Badge>
    }
  }

  const dismissAlert = (id: string) => {
    setDismissed([...dismissed, id])
  }

  const visibleAlerts = alerts.filter((a) => !dismissed.includes(a.id))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Real-time Alerts
        </CardTitle>
        <Badge variant="outline" className="font-normal">
          {visibleAlerts.length} active
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {visibleAlerts.length === 0 ? (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/30">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-sm">All clear!</p>
              <p className="text-xs text-muted-foreground">No active alerts at this time</p>
            </div>
          </div>
        ) : (
          visibleAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start justify-between gap-3 p-3 rounded-lg ${
                alert.type === "critical"
                  ? "bg-red-50 dark:bg-red-950/30"
                  : alert.type === "warning"
                    ? "bg-yellow-50 dark:bg-yellow-950/30"
                    : "bg-blue-50 dark:bg-blue-950/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{alert.title}</p>
                    {getAlertBadge(alert.type)}
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.time} • {alert.action}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => dismissAlert(alert.id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
