import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react"

export interface Anomaly {
  id: string
  type: "electricity" | "water" | "occupancy"
  severity: "high" | "medium" | "low"
  location: string
  description: string
  timestamp: string
  value: number
  threshold: number
}

interface AnomalyCardProps {
  anomalies: Anomaly[]
}

const severityConfig = {
  high: {
    icon: AlertTriangle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-950",
    badge: "destructive",
  },
  medium: {
    icon: AlertCircle,
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-100 dark:bg-yellow-950",
    badge: "secondary",
  },
  low: {
    icon: CheckCircle2,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-950",
    badge: "outline",
  },
} as const

export function AnomalyCard({ anomalies }: AnomalyCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Detected Anomalies</CardTitle>
        <Badge variant="outline">{anomalies.length} Active</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {anomalies.length === 0 ? (
          <div className="flex items-center gap-2 text-muted-foreground py-4">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span>No anomalies detected</span>
          </div>
        ) : (
          anomalies.map((anomaly) => {
            const config = severityConfig[anomaly.severity]
            const Icon = config.icon
            return (
              <div key={anomaly.id} className={`flex items-start gap-3 p-3 rounded-lg ${config.bg}`}>
                <Icon className={`h-5 w-5 mt-0.5 ${config.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">{anomaly.location}</span>
                    <Badge variant={config.badge as "destructive" | "secondary" | "outline"} className="text-xs">
                      {anomaly.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{anomaly.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Value: {anomaly.value} | Threshold: {anomaly.threshold}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
