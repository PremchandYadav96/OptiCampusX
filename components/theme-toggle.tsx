"use client"

import { useTheme, type Theme } from "./theme-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sun, Moon, Leaf, BarChart3, Sparkles, ChevronDown } from "lucide-react"

const themeIcons: Record<Theme, typeof Sun> = {
  light: Sun,
  dark: Moon,
  green: Leaf,
  blue: BarChart3,
  neon: Sparkles,
}

export function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme()
  const CurrentIcon = themeIcons[theme]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <CurrentIcon className="h-4 w-4" />
          <span className="hidden sm:inline">{themes.find((t) => t.id === theme)?.name}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themes.map((t) => {
          const Icon = themeIcons[t.id]
          return (
            <DropdownMenuItem key={t.id} onClick={() => setTheme(t.id)} className={theme === t.id ? "bg-accent" : ""}>
              <Icon className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span className="font-medium">{t.name}</span>
                <span className="text-xs text-muted-foreground">{t.description}</span>
              </div>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
