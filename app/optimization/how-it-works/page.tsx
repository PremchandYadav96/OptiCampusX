"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Database,
  Brain,
  LineChart,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Cpu,
  Network,
  Zap,
  Activity,
} from "lucide-react"
import Link from "next/link"

const steps = [
  {
    number: 1,
    title: "Data Collection & Sensor Integration",
    description:
      "Real-time data streams from 17+ VIT-AP buildings including Academic Blocks, Men's Hostels (MH-1 to MH-6), Ladies' Hostels (LH-1 to LH-4), and Support Facilities",
    icon: Database,
    details: [
      "IoT sensors capture electricity usage (kWh)",
      "Water flow meters track consumption (liters)",
      "Occupancy sensors detect room utilization",
      "Weather API integration for external conditions",
      "Academic schedule integration (class timings)",
    ],
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-950",
  },
  {
    number: 2,
    title: "Time-Series Forecasting & Anomaly Detection",
    description:
      "SARIMA models predict future demand patterns while Z-score analysis identifies resource wastage anomalies",
    icon: LineChart,
    details: [
      "SARIMA(p,d,q)(P,D,Q)s forecasting for 24-hour ahead predictions",
      "Z-score > 3 triggers critical anomaly alerts",
      "Pattern recognition for hostel timings (6 AM - 11 PM)",
      "Academic schedule-aware predictions (8 AM - 5 PM)",
      "Historical data from past 6 months for trend analysis",
    ],
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-950",
  },
  {
    number: 3,
    title: "AI-Powered Optimization Engine",
    description:
      "Google Gemini 2.0 Flash & Groq Llama 3.3 70B analyze patterns and generate intelligent resource schedules",
    icon: Brain,
    details: [
      "Gemini 2.0 Flash primary AI model (with Groq fallback)",
      "Context includes: KPIs, anomalies, occupancy, weather",
      "Considers VIT-AP specific constraints and timings",
      "Balances cost minimization with sustainability goals",
      "Generates 6-8 actionable recommendations per run",
    ],
    color: "text-emerald-600",
    bgColor: "bg-emerald-100 dark:bg-emerald-950",
  },
  {
    number: 4,
    title: "Linear Programming Solver",
    description:
      "Mathematical optimization using CBC (COIN-OR) solver to find optimal resource allocation across campus",
    icon: Cpu,
    details: [
      "Objective: Minimize (Energy_Cost + Water_Cost + Idle_Penalty + Carbon_Penalty)",
      "248 decision variables representing resource controls",
      "156 constraints including comfort levels (≥24°C), schedules, and capacity",
      "Solution time: <1 second for campus-wide optimization",
      "Optimality gap: 0.0% (proven optimal solution)",
    ],
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-950",
  },
  {
    number: 5,
    title: "Intelligent Decision Translation",
    description:
      "AI converts quantitative optimization results into human-readable action items for VIT-AP facilities management",
    icon: Network,
    details: [
      "Translate math solutions to actionable instructions",
      "Specific building names: 'Academic Block-1 (Sarvepalli Radhakrishnan)'",
      "Estimated savings in INR (Indian Rupees)",
      "Reasoning based on occupancy, schedules, comfort",
      "Priority ranking by impact and urgency",
    ],
    color: "text-pink-600",
    bgColor: "bg-pink-100 dark:bg-pink-950",
  },
  {
    number: 6,
    title: "Automated Execution & Monitoring",
    description:
      "Real-time deployment of optimization actions with continuous monitoring and feedback loop for improvement",
    icon: Activity,
    details: [
      "Auto-apply mode for approved optimization actions",
      "Real-time dashboard showing applied actions and savings",
      "Continuous monitoring of actual vs predicted consumption",
      "Feedback loop: Results feed back into AI model training",
      "Alert system for anomalies and unexpected deviations",
    ],
    color: "text-cyan-600",
    bgColor: "bg-cyan-100 dark:bg-cyan-950",
  },
]

const technologies = [
  { name: "Google Gemini 2.0 Flash", purpose: "Primary AI optimization engine", type: "AI Model" },
  { name: "Groq Llama 3.3 70B", purpose: "Backup AI model for 99.9% uptime", type: "AI Model" },
  { name: "CBC (COIN-OR)", purpose: "Linear programming solver", type: "Optimizer" },
  { name: "SARIMA", purpose: "Time-series demand forecasting", type: "Forecasting" },
  { name: "Z-Score Analysis", purpose: "Real-time anomaly detection", type: "Analytics" },
  { name: "Next.js 16", purpose: "Full-stack web application", type: "Framework" },
  { name: "Supabase", purpose: "PostgreSQL database & authentication", type: "Backend" },
  { name: "Upstash Redis", purpose: "Image storage for reports", type: "Storage" },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Process
          </Badge>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight mb-4">
            How OptiCampus-X Optimization Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A step-by-step breakdown of our AI-powered resource optimization system for VIT-AP University campus
          </p>
        </div>

        {/* Step-by-Step Process */}
        <div className="space-y-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={step.number} className="overflow-hidden">
                <div className={`p-1 ${step.bgColor}`} />
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-[auto_1fr] gap-6">
                    {/* Step Number & Icon */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                      <div className={`${step.bgColor} p-4 rounded-lg`}>
                        <Icon className={`h-8 w-8 ${step.color}`} />
                      </div>
                      <Badge variant="outline" className="text-lg font-bold px-3 py-1">
                        Step {step.number}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {step.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${step.color}`} />
                            <span className="text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center mt-6">
                      <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Technology Stack */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Technology Stack</CardTitle>
            <CardDescription>Core technologies powering OptiCampus-X optimization system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {technologies.map((tech) => (
                <div key={tech.name} className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <Badge variant="outline" className="mb-2 text-xs">
                    {tech.type}
                  </Badge>
                  <h4 className="font-semibold mb-1">{tech.name}</h4>
                  <p className="text-xs text-muted-foreground">{tech.purpose}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">What Results to Expect</CardTitle>
            <CardDescription>Typical optimization outcomes for VIT-AP University campus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-primary/10">
                <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold mb-2">20-35%</div>
                <div className="text-sm text-muted-foreground">Electricity Reduction</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Through intelligent AC, lighting, and equipment scheduling
                </p>
              </div>

              <div className="text-center p-6 rounded-lg bg-blue-100 dark:bg-blue-950">
                <div className="text-3xl font-bold mb-2 text-blue-600">15-25%</div>
                <div className="text-sm text-muted-foreground">Water Savings</div>
                <p className="text-xs text-muted-foreground mt-2">Via pump scheduling and leak detection</p>
              </div>

              <div className="text-center p-6 rounded-lg bg-green-100 dark:bg-green-950">
                <div className="text-3xl font-bold mb-2 text-green-600">₹30k-50k</div>
                <div className="text-sm text-muted-foreground">Daily Savings</div>
                <p className="text-xs text-muted-foreground mt-2">Estimated cost reduction across campus</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Ready to Optimize Your Campus?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Experience the power of AI-driven resource optimization. Run your first optimization in seconds.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/optimization">
                  <Sparkles className="h-5 w-5" />
                  Run AI Optimization
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
                <Link href="/ai-analysis">
                  <Brain className="h-5 w-5" />
                  AI Decision Intelligence
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
