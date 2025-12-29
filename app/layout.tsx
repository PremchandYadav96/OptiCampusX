import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })

export const metadata: Metadata = {
  title: "OptiCampus-X | VIT-AP Smart Campus Resource Optimization",
  description:
    "AI-powered campus resource optimization system for VIT-AP University, Amaravati. Uses Google Gemini 2.5 Flash for predictive analytics, smart scheduling, and sustainable resource management across 17+ buildings.",
  generator: "v0.app",
  keywords: [
    "VIT-AP",
    "campus optimization",
    "AI",
    "sustainability",
    "resource management",
    "Gemini AI",
    "smart campus",
    "Amaravati",
  ],
  authors: [
    { name: "V C Premchand Yadav" },
    { name: "P R Kiran Kumar Reddy" },
    { name: "Edupulapati Sai Praneeth" },
    { name: "Sanjana Pasam" },
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/opticampus-icon.jpg", type: "image/png", sizes: "32x32" },
    ],
    apple: "/opticampus-icon.jpg",
    shortcut: "/opticampus-icon.jpg",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#10B981" },
    { media: "(prefers-color-scheme: dark)", color: "#065F46" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
