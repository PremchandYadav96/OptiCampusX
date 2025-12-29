"use client"

import type * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export type Theme = "light" | "dark" | "green" | "blue" | "neon"

interface ThemeConfig {
  id: Theme
  name: string
  description: string
}

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: ThemeConfig[]
}

const themes: ThemeConfig[] = [
  { id: "light", name: "Classic Light", description: "Clean & professional" },
  { id: "dark", name: "Dark Ops", description: "Mission control style" },
  { id: "green", name: "Sustainability", description: "Eco-focused theme" },
  { id: "blue", name: "Analytics Blue", description: "Data science focus" },
  { id: "neon", name: "AI Neon", description: "Futuristic AI aesthetic" },
]

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => {},
  themes: themes,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("opticampus-theme") as Theme | null
    if (stored && themes.some((t) => t.id === stored)) {
      setThemeState(stored)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    // Remove all theme classes
    themes.forEach((t) => root.classList.remove(`theme-${t.id}`))
    // Add current theme class
    root.classList.add(`theme-${theme}`)
    // Store preference
    localStorage.setItem("opticampus-theme", theme)
  }, [theme, mounted])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return <ThemeContext.Provider value={{ theme, setTheme, themes }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  return context
}
