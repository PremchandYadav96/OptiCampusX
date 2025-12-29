import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, IndianRupee, TrendingUp, BarChart3, Brain, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-white/5">
          <div className="container px-4 mx-auto relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Image
                  src="/opticampus-logo.png"
                  alt="OptiCampus-X"
                  width={64}
                  height={64}
                  className="rounded-xl shadow-2xl shadow-primary/20"
                />
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                  OptiCampus-X v2.0
                </Badge>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 font-display text-balance animate-in fade-in slide-in-from-bottom-8 duration-1000">
                Optimize. Explain. Sustain.
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl text-balance animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                OptiCampus-X uses quantitative optimization algorithms and Gemini 2.5 Flash AI reasoning to
                intelligently manage electricity, water, classrooms, and food resources across campus.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
                <Button
                  size="lg"
                  className="rounded-full px-8 h-12 text-base font-semibold group bg-white text-black hover:bg-white/90"
                >
                  <Link href="/auth/signup" className="flex items-center gap-2">
                    Get started
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 h-12 text-base border-white/10 bg-white/5 hover:bg-white/10"
                >
                  <Link href="/about">Explore the Models</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* BACKGROUND DECORATION */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px]" />
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
          </div>
        </section>

        {/* METRICS GRID */}
        <section className="border-b border-white/5 bg-white/[0.02]">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {[
              { label: "18% saved", desc: "on monthly electricity", logo: "/vit-ap-logo.png" },
              { label: "6x faster", desc: "anomaly detection", icon: <TrendingUp className="h-5 w-5" /> },
              { label: "₹4.2L saved", desc: "this semester", icon: <IndianRupee className="h-5 w-5" /> },
              { label: "94% accuracy", desc: "in demand forecasting", icon: <BarChart3 className="h-5 w-5" /> },
            ].map((stat, i) => (
              <div key={i} className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-3xl md:text-4xl font-bold mb-2 font-display">{stat.label}</span>
                <span className="text-muted-foreground">{stat.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* DASHBOARD SCROLL PREVIEW */}
        <section className="py-24 relative overflow-hidden bg-black">
          <div className="container px-4 mx-auto">
            <div className="relative mx-auto max-w-6xl group animate-in fade-in slide-in-from-bottom-24 duration-1000 delay-500">
              <div className="absolute -inset-1 bg-gradient-to-b from-primary/30 to-transparent rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#0a0a0a]">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                  </div>
                  <div className="ml-4 h-5 w-64 rounded bg-white/5" />
                </div>
                <div className="p-0 bg-black/50 backdrop-blur-3xl">
                  <Image
                    src="/images/screenshot-202025-12-28-20211856.png"
                    alt="Dashboard Preview"
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM & SOLUTION SECTION */}
        <section className="py-24 border-y border-white/5">
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="outline" className="mb-4 border-red-500/20 text-red-400">
                  The Problem
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 font-display">
                  Modern campuses face serious inefficiencies.
                </h2>
                <ul className="space-y-4">
                  {[
                    "Electricity running in unused rooms",
                    "Water leaks going unnoticed",
                    "Poor classroom & lab utilization",
                    "Large-scale food wastage in mess facilities",
                    "No data-driven accountability system",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-emerald-500/5 border border-emerald-500/10 p-8 rounded-3xl">
                <Badge variant="outline" className="mb-4 border-emerald-500/20 text-emerald-400">
                  Our Solution
                </Badge>
                <h3 className="text-2xl font-bold mb-6">Quant-first decision platform</h3>
                <div className="grid gap-4">
                  {[
                    { label: "Predict", desc: "Future resource demand using ARIMA models" },
                    { label: "Optimize", desc: "Allocation using multi-objective programming" },
                    { label: "Detect", desc: "Anomalies and wastage in real time" },
                    { label: "Account", desc: "Transparent reporting for caterers like CRCL" },
                    { label: "Explain", desc: "Every decision justified by Gemini AI" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      <div>
                        <span className="font-bold mr-2">{item.label}:</span>
                        <span className="text-sm text-muted-foreground">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE INTELLIGENCE */}
        <section className="py-24 bg-white/[0.01]">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-4 font-display">Core Intelligence</h2>
              <p className="text-muted-foreground">What makes OptiCampus-X different from classical systems.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Quantitative Forecasting",
                  icon: <TrendingUp className="h-8 w-8 text-primary" />,
                  items: ["ARIMA & statistical models", "Predict electricity/water demand", "94% historical accuracy"],
                },
                {
                  title: "Optimization Engine",
                  icon: <Brain className="h-8 w-8 text-emerald-500" />,
                  items: [
                    "Multi-objective linear programming",
                    "Minimize carbon footprint",
                    "Maximize resource utilization",
                  ],
                },
                {
                  title: "Explainable AI (Gemini)",
                  icon: <Zap className="h-8 w-8 text-yellow-500" />,
                  items: [
                    "Converts numeric outputs → human actions",
                    "Justifies optimization decisions",
                    "Generates risk alerts & recs",
                  ],
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl border border-white/5 bg-white/5 hover:border-primary/20 transition-all duration-300 group"
                >
                  <div className="mb-6 p-3 rounded-xl bg-black inline-block group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-4">{card.title}</h4>
                  <ul className="space-y-2">
                    {card.items.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUANT VS CLASSICAL SECTION */}
        <section className="py-24 bg-white/[0.01] border-y border-white/5" id="about">
          <div className="container px-4 mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge
                  variant="outline"
                  className="mb-4 border-primary/20 text-primary uppercase tracking-widest text-[10px] py-1"
                >
                  Quant Advantage
                </Badge>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 font-display leading-[1.1]">
                  Better facilities through superior math.
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Classical campus management relies on reactive logic and static schedules. OptiCampus-X uses three
                  mathematically strong algorithms to move from "management" to "proactive optimization."
                </p>

                <div className="space-y-6">
                  {[
                    {
                      title: "Predictive over Reactive",
                      desc: "Classical systems wait for spikes. We forecast demand 7 days ahead using ARIMA time-series models.",
                      icon: <TrendingUp className="text-primary h-6 w-6" />,
                    },
                    {
                      title: "Optimal over Fixed",
                      desc: "Replace manual timers with Multi-Objective Linear Programming that balances comfort and cost.",
                      icon: <BarChart3 className="text-primary h-6 w-6" />,
                    },
                    {
                      title: "Automated over Manual",
                      desc: "Detect leaks and anomalies instantly with Z-Score statistical analysis before they become expensive.",
                      icon: <Zap className="text-primary h-6 w-6" />,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors bg-white/5"
                    >
                      <div className="mt-1">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-lg">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-2xl" />
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="space-y-4 pt-8">
                    <div className="p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl">
                      <span className="text-3xl font-bold font-display text-primary">Classical</span>
                      <p className="text-sm text-muted-foreground mt-2">Static Schedules</p>
                      <div className="h-1 w-full bg-white/10 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-white/30 w-1/3" />
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl border border-white/10 bg-primary/10 backdrop-blur-xl">
                      <span className="text-3xl font-bold font-display text-primary">Quant-X</span>
                      <p className="text-sm text-muted-foreground mt-2">Dynamic ARIMA</p>
                      <div className="h-1 w-full bg-primary/20 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-primary w-[92%]" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                      <span className="text-3xl font-bold font-display text-white">Rule-based</span>
                      <p className="text-sm text-muted-foreground mt-2">Limited Savings</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-white/10 bg-emerald-500/10 backdrop-blur-xl">
                      <span className="text-3xl font-bold font-display text-emerald-400">Optimal</span>
                      <p className="text-sm text-muted-foreground mt-2">Multi-Objective LP</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                      <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <div key={s} className="h-8 w-1 bg-primary/50" style={{ height: `${s * 10}px` }} />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">Anomaly Z-Score</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section className="py-24">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 font-display">Ready to optimize VIT-AP?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="rounded-full px-8 h-12 bg-white text-black hover:bg-white/90 font-bold">
                <Link href="/auth/signup">Launch Platform</Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full px-8 h-12 text-muted-foreground hover:text-white"
              >
                <Link href="/evaluation">View Metrics & Math</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
