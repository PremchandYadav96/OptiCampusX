import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface KPICardProps {
  title: string
  value: string | number
  unit?: string
  change?: number
  changeLabel?: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
  className?: string
}

export function KPICard({
  title,
  value,
  unit,
  change,
  changeLabel,
  icon: Icon,
  trend = "neutral",
  className,
}: KPICardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus
  const trendColor =
    trend === "up"
      ? "text-green-600 dark:text-green-400"
      : trend === "down"
        ? "text-red-600 dark:text-red-400"
        : "text-muted-foreground"

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight">{value}</span>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
            {change !== undefined && (
              <div className={cn("flex items-center gap-1 text-sm", trendColor)}>
                <TrendIcon className="h-4 w-4" />
                <span>
                  {change > 0 ? "+" : ""}
                  {change}%
                </span>
                {changeLabel && <span className="text-muted-foreground">{changeLabel}</span>}
              </div>
            )}
          </div>
          <div className="rounded-lg bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
