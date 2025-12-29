"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import {
  Sparkles,
  Send,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  FileText,
  Loader2,
  Building2,
  Download,
} from "lucide-react"
import { kpiData, sampleAnomalies, optimizationSchedule } from "@/lib/sample-data"

interface AIResponse {
  type: "decision" | "recommendation" | "analysis" | "alert"
  title: string
  content: string
  confidence?: number
}

export default function AIAnalysisPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [responses, setResponses] = useState<AIResponse[]>([
    {
      type: "analysis",
      title: "VIT-AP Daily Resource Summary",
      content:
        "Based on today's data analysis, VIT-AP campus is operating at 78% resource efficiency. Key observations:\n\n• Electricity consumption across Academic Blocks 1-3 is 12% below predicted levels due to lower attendance\n• Water usage in MH-2 (Rabindranath Tagore Block) peaked at 12 PM, 8% above threshold - recommend investigating Floor 2\n• 5 anomalies detected requiring attention across campus\n• Central Library showing optimal utilization with zone-based cooling recommendation\n• Recommended daily savings potential: ₹5,000",
      confidence: 94,
    },
    {
      type: "recommendation",
      title: "Priority Action for Academic Block-2",
      content:
        "Immediate Action Required: APJ Abdul Kalam Block Lab 3 shows unusual power consumption during non-operational hours (2:30 AM). This pattern has persisted for 3 days.\n\nRecommendation: Schedule maintenance inspection and verify equipment shutdown procedures. Estimated savings if resolved: ₹1,200/day.\n\nSecondary: SAC Gym Washroom shows continuous water flow pattern - potential leak detected.",
      confidence: 89,
    },
  ])

  const handleSubmit = async () => {
    if (!query.trim()) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          context: {
            kpiData,
            anomalies: sampleAnomalies,
            optimizationSchedule,
          },
        }),
      })

      const data = await response.json()

      if (data.error) {
        setResponses((prev) => [
          {
            type: "alert",
            title: "API Configuration Required",
            content: data.error,
          },
          ...prev,
        ])
      } else {
        setResponses((prev) => [
          {
            type: "decision",
            title: "AI Policy Decision",
            content: data.response,
            confidence: data.confidence,
          },
          ...prev,
        ])
      }
    } catch (error) {
      setResponses((prev) => [
        {
          type: "alert",
          title: "Error",
          content: "Failed to get AI response. Please check your API configuration.",
        },
        ...prev,
      ])
    } finally {
      setIsLoading(false)
      setQuery("")
    }
  }

  const generateReport = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query:
            "Generate a comprehensive executive summary report of VIT-AP campus resource status, including all anomalies across Academic Blocks, Hostels (MH-1 to MH-6, LH-1 to LH-4), and support facilities. Include optimization recommendations and predicted savings in INR. Format as a professional report for university administration.",
          context: {
            kpiData,
            anomalies: sampleAnomalies,
            optimizationSchedule,
          },
        }),
      })

      const data = await response.json()

      if (data.error) {
        setResponses((prev) => [
          {
            type: "alert",
            title: "API Configuration Required",
            content: data.error,
          },
          ...prev,
        ])
      } else {
        setResponses((prev) => [
          {
            type: "analysis",
            title: "VIT-AP Executive Summary Report",
            content: data.response,
            confidence: data.confidence,
          },
          ...prev,
        ])
      }
    } catch (error) {
      setResponses((prev) => [
        {
          type: "alert",
          title: "Error",
          content: "Failed to generate report.",
        },
        ...prev,
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const getTypeIcon = (type: AIResponse["type"]) => {
    switch (type) {
      case "decision":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "recommendation":
        return <Lightbulb className="h-5 w-5 text-yellow-600" />
      case "analysis":
        return <FileText className="h-5 w-5 text-blue-600" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
    }
  }

  const getTypeBadge = (type: AIResponse["type"]) => {
    const variants: Record<AIResponse["type"], "default" | "secondary" | "destructive" | "outline"> = {
      decision: "default",
      recommendation: "secondary",
      analysis: "outline",
      alert: "destructive",
    }
    return <Badge variant={variants[type]}>{type}</Badge>
  }

  const exportReport = (content: string, title: string) => {
    const blob = new Blob([`${title}\n\nGenerated: ${new Date().toLocaleString()}\n\n${content}`], {
      type: "text/plain",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `vitap-report-${Date.now()}.txt`
    a.click()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
                AI Decision Intelligence
              </h1>
              <p className="text-muted-foreground">Powered by Google Gemini 2.5 Flash for VIT-AP University</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Query Panel */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ask the AI</CardTitle>
                <CardDescription>
                  Get intelligent decisions and explanations for VIT-AP campus resource management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="e.g., 'What actions should we take for MH-2 water anomaly?' or 'Generate optimization plan for Academic Block-1 tomorrow'"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="min-h-[120px]"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSubmit} disabled={isLoading || !query.trim()} className="flex-1 gap-2">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    Analyze
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-transparent"
                  onClick={generateReport}
                  disabled={isLoading}
                >
                  <FileText className="h-4 w-4" />
                  Generate VIT-AP Executive Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-transparent"
                  onClick={() => {
                    setQuery(
                      "Analyze all current anomalies across VIT-AP campus including Academic Blocks, Men's Hostels (MH-1 to MH-6), and Ladies' Hostels (LH-1 to LH-4). Provide prioritized action items with expected impact in INR.",
                    )
                  }}
                  disabled={isLoading}
                >
                  <AlertTriangle className="h-4 w-4" />
                  Analyze Campus Anomalies
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-transparent"
                  onClick={() => {
                    setQuery(
                      "Based on current data, what is the optimal resource schedule for VIT-AP tomorrow? Include specific timing for Academic Blocks and Hostels with expected savings.",
                    )
                  }}
                  disabled={isLoading}
                >
                  <Lightbulb className="h-4 w-4" />
                  Tomorrow's VIT-AP Plan
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-transparent"
                  onClick={() => {
                    setQuery(
                      "Analyze resource usage patterns in Central Block (Mahatma Gandhi Block) including library and classrooms. Suggest optimizations based on occupancy patterns.",
                    )
                  }}
                  disabled={isLoading}
                >
                  <Building2 className="h-4 w-4" />
                  Central Block Analysis
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Gemini Model Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model</span>
                  <Badge variant="outline">Gemini 2.5 Flash</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role</span>
                  <span>Policy Agent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Context</span>
                  <span>VIT-AP Campus Data</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Buildings</span>
                  <span>17 monitored</span>
                </div>
                <p className="text-xs text-muted-foreground pt-2 border-t">
                  Gemini converts quantitative optimization results into intelligent, explainable policy decisions
                  specific to VIT-AP infrastructure.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Response Panel */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">AI Responses</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setResponses([])} className="gap-1">
                    <RefreshCw className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
                {responses.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No responses yet. Ask a question or run a quick action.</p>
                  </div>
                ) : (
                  responses.map((response, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-card space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(response.type)}
                          <h4 className="font-semibold">{response.title}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          {response.confidence && (
                            <span className="text-xs text-muted-foreground">{response.confidence}% confidence</span>
                          )}
                          {getTypeBadge(response.type)}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => exportReport(response.content, response.title)}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm whitespace-pre-wrap text-muted-foreground leading-relaxed">
                        {response.content}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
