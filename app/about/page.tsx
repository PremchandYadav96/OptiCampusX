import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  Zap,
  Droplets,
  Brain,
  Target,
  Lightbulb,
  BarChart3,
  Shield,
  Leaf,
  CheckCircle2,
  Sparkles,
  LineChart,
  Settings2,
  AlertTriangle,
  FileText,
  Globe,
  MapPin,
  Building2,
  Users,
  GraduationCap,
  Cloud,
  Heart,
} from "lucide-react"

const features = [
  {
    icon: LineChart,
    title: "Time-Series Forecasting",
    description: "Predict future resource demand using ARIMA and Prophet models with seasonal decomposition",
    tech: ["Python", "Prophet", "statsmodels"],
  },
  {
    icon: Settings2,
    title: "Quantitative Optimization",
    description: "Linear programming-based scheduling to minimize costs while respecting constraints",
    tech: ["PuLP", "OR-Tools", "NumPy"],
  },
  {
    icon: AlertTriangle,
    title: "Anomaly Detection",
    description: "Z-score and Isolation Forest algorithms to detect unusual patterns and waste",
    tech: ["scikit-learn", "pandas"],
  },
  {
    icon: Sparkles,
    title: "AI Decision Intelligence",
    description: "Gemini 2.5 Flash converts quantitative results into explainable policy decisions",
    tech: ["Google Gemini API", "AI SDK"],
  },
  {
    icon: BarChart3,
    title: "Impact Measurement",
    description: "Real-time dashboards showing measurable savings in cost, resources, and carbon",
    tech: ["Recharts", "Real-time data"],
  },
  {
    icon: FileText,
    title: "Executive Reporting",
    description: "AI-generated reports with actionable recommendations for stakeholders",
    tech: ["Automated generation", "PDF export"],
  },
]

const impactMetrics = [
  { label: "Electricity Waste Reduction", value: "25-35%", icon: Zap },
  { label: "Water Waste Reduction", value: "15-25%", icon: Droplets },
  { label: "Room Utilization Improvement", value: "+30%", icon: Target },
  { label: "Monthly Cost Savings", value: "₹40K-60K", icon: BarChart3 },
  { label: "CO₂ Reduction", value: "3+ tons/month", icon: Leaf },
]

const alignmentPoints = [
  {
    icon: Target,
    title: "Real Campus Problem",
    description:
      "Addresses genuine challenges of resource wastage, inefficient scheduling, and sustainability at VIT-AP University, Amaravati",
  },
  {
    icon: Brain,
    title: "Google Technology",
    description:
      "Leverages Google Gemini 2.5 Flash API for intelligent decision-making and natural language explanations",
  },
  {
    icon: Lightbulb,
    title: "Innovation & Practicality",
    description:
      "Combines research-grade quantitative methods (forecasting, optimization) with practical, deployable solutions",
  },
  {
    icon: BarChart3,
    title: "Measurable Impact",
    description:
      "Every feature tied to quantifiable outcomes - cost savings, resource reduction, carbon footprint metrics",
  },
]

const googleRoadmap = [
  {
    title: "Google Cloud IoT Core",
    description: "Future integration with campus-wide hardware sensors for direct real-time data ingestion.",
  },
  {
    title: "BigQuery & Looker",
    description: "Advanced data warehousing and business intelligence for multi-year campus sustainability trends.",
  },
  {
    title: "Vertex AI",
    description: "Moving from API calls to custom-tuned models for specific VIT-AP resource usage patterns.",
  },
  {
    title: "Google Maps Platform",
    description: "Enhanced spatial analysis for water leak detection using advanced geospatial APIs.",
  },
]

const vitapInfrastructure = {
  academic: [
    { name: "Academic Block-1", alias: "Sarvepalli Radhakrishnan Block", rooms: 45, labs: 12 },
    { name: "Central Block", alias: "Mahatma Gandhi Block", rooms: 60, labs: 8 },
    { name: "Academic Block-2", alias: "APJ Abdul Kalam Block", rooms: 40, labs: 15 },
  ],
  mensHostels: [
    "MH-1 (Sarojini Naidu)",
    "MH-2 (Rabindranath Tagore)",
    "MH-3 (Neelam Sanjiva Reddy)",
    "MH-4",
    "MH-5",
    "MH-6",
  ],
  ladiesHostels: ["LH-1", "LH-2", "LH-3", "LH-4"],
  support: ["Student Activity Centre (SAC)", "Central Library", "Main Cafeteria", "VITRINA Guest House"],
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="container relative">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <Badge className="mb-4">Google Solution Challenge 2025</Badge>
                <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  OptiCampus-X
                </h1>
                <p className="text-xl text-muted-foreground mb-4">Quant-Driven Smart Campus Resource Optimization</p>
                <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Designed for VIT-AP University, Amaravati</span>
                </div>
                <p className="text-muted-foreground max-w-xl">
                  An AI-powered system that uses time-series forecasting, mathematical optimization, and Google Gemini
                  to minimize resource wastage and maximize campus efficiency with measurable, real-world impact.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/opticampus-logo.png"
                  alt="OptiCampus-X Logo"
                  width={280}
                  height={280}
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-primary/5">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">Target Campus</Badge>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-4">
                VIT-AP University Infrastructure
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                OptiCampus-X monitors and optimizes resources across all major buildings at VIT-AP University campus
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Academic Blocks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {vitapInfrastructure.academic.map((block) => (
                    <div key={block.name} className="text-sm">
                      <p className="font-medium">{block.name}</p>
                      <p className="text-xs text-muted-foreground">{block.alias}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    Men's Hostels (6)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {vitapInfrastructure.mensHostels.map((hostel) => (
                      <Badge key={hostel} variant="secondary" className="text-xs">
                        {hostel}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-pink-600" />
                    Ladies' Hostels (4)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {vitapInfrastructure.ladiesHostels.map((hostel) => (
                      <Badge key={hostel} variant="secondary" className="text-xs">
                        {hostel}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Support Facilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {vitapInfrastructure.support.map((facility) => (
                      <p key={facility} className="text-sm">
                        {facility}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-4">The Problem We Solve</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                VIT-AP University faces significant challenges in resource management that impact both finances and
                sustainability goals.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Zap className="h-10 w-10 mx-auto text-yellow-600 mb-4" />
                  <h3 className="font-semibold mb-2">Electricity Wastage</h3>
                  <p className="text-sm text-muted-foreground">
                    Lights, ACs, and equipment running in unused spaces across 17+ buildings
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Droplets className="h-10 w-10 mx-auto text-blue-600 mb-4" />
                  <h3 className="font-semibold mb-2">Water Wastage</h3>
                  <p className="text-sm text-muted-foreground">
                    Leaks, overuse in 10 hostel blocks serving 5000+ students
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Target className="h-10 w-10 mx-auto text-red-600 mb-4" />
                  <h3 className="font-semibold mb-2">Underutilization</h3>
                  <p className="text-sm text-muted-foreground">145+ classrooms and labs not efficiently scheduled</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-10 w-10 mx-auto text-gray-600 mb-4" />
                  <h3 className="font-semibold mb-2">Reactive Management</h3>
                  <p className="text-sm text-muted-foreground">
                    No predictive system; decisions are manual and delayed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-4">
                Core Features & Technologies
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A comprehensive system combining quantitative methods with AI intelligence
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.tech.map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Google Gemini Role */}
        <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <Badge className="mb-4">Google Technology</Badge>
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-6">
                  Role of Gemini 2.5 Flash
                </h2>
                <p className="text-muted-foreground mb-6">
                  Unlike typical AI projects that use LLMs for everything, we use Gemini strategically as a{" "}
                  <strong>Decision Intelligence Agent</strong>.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Converts Numbers to Policies</h4>
                      <p className="text-sm text-muted-foreground">
                        Transforms optimization outputs into human-readable action plans for VIT-AP administrators
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Explains Decisions</h4>
                      <p className="text-sm text-muted-foreground">
                        Provides justification for why specific optimizations are recommended
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Risk & Exception Handling</h4>
                      <p className="text-sm text-muted-foreground">
                        Identifies edge cases and alerts on situations requiring human attention
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Executive Reporting</h4>
                      <p className="text-sm text-muted-foreground">
                        Generates professional summaries for stakeholders automatically
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-6 bg-card/80 backdrop-blur">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Sample Gemini Prompt for VIT-AP
                  </div>
                  <div className="p-4 rounded-lg bg-muted font-mono text-xs leading-relaxed">
                    <p className="text-muted-foreground mb-2">
                      You are an AI campus resource manager for VIT-AP University.
                    </p>
                    <p className="mb-2">Given:</p>
                    <p className="pl-2">- Predicted electricity demand across 3 academic blocks</p>
                    <p className="pl-2">- Water usage in MH-1 to MH-6 and LH-1 to LH-4</p>
                    <p className="pl-2">- Room occupancy in Central Block (Mahatma Gandhi)</p>
                    <p className="pl-2">- Cost targets and sustainability goals</p>
                    <p className="mt-2">Generate:</p>
                    <p className="pl-2 text-primary">1. A clear action plan for each building</p>
                    <p className="pl-2 text-primary">2. Risk alerts for anomalies</p>
                    <p className="pl-2 text-primary">3. Justification of decisions</p>
                    <p className="pl-2 text-primary">4. Expected savings in INR</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="py-16 px-4">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-4">Measurable Impact</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every feature is tied to quantifiable, real-world outcomes for VIT-AP
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {impactMetrics.map((metric) => (
                <Card key={metric.label} className="text-center">
                  <CardContent className="pt-6">
                    <metric.icon className="h-8 w-8 mx-auto text-primary mb-3" />
                    <p className="text-2xl font-bold text-primary mb-1">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Future Roadmap (Google Cloud) */}
        <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="outline">
                Future Roadmap
              </Badge>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-4">
                Google Cloud & Product Integration
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Planned expansion using the broader Google ecosystem to scale OptiCampus-X for enterprise-grade campus
                governance.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {googleRoadmap.map((product) => (
                <Card key={product.title} className="border-primary/10 bg-gradient-to-b from-card to-primary/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Cloud className="h-5 w-5 text-primary" />
                      <h4 className="font-bold">{product.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Competition Alignment */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <Badge className="mb-4">Competition Alignment</Badge>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-4">
                How We Meet the Challenge Criteria
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                "Participants can select any real problem from their campus or community and build a solution using
                Google technologies. The aim is to address meaningful local challenges through creativity, research, and
                practical implementation."
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {alignmentPoints.map((point) => (
                <Card key={point.title}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <point.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{point.title}</h3>
                        <p className="text-sm text-muted-foreground">{point.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                  <h3 className="font-semibold text-lg">Our One-Line Pitch</h3>
                </div>
                <p className="text-lg italic text-center py-4">
                  "OptiCampus-X uses quantitative optimization and Gemini-powered decision intelligence to cut VIT-AP
                  campus resource wastage through explainable, data-driven policies with measurable sustainability
                  impact."
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technical Stack */}
        <section className="py-16 px-4">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-4">Technology Stack</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Frontend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Framework</span>
                    <span>Next.js 16</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Styling</span>
                    <span>Tailwind CSS v4</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Components</span>
                    <span>shadcn/ui</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Charts</span>
                    <span>Recharts</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI & ML</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">LLM</span>
                    <span>Gemini 2.5 Flash</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">SDK</span>
                    <span>Vercel AI SDK</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Forecasting</span>
                    <span>Prophet / ARIMA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Optimization</span>
                    <span>PuLP / OR-Tools</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Processing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Analysis</span>
                    <span>Pandas / NumPy</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Anomaly Detection</span>
                    <span>scikit-learn</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Visualization</span>
                    <span>Matplotlib</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Simulation</span>
                    <span>Monte Carlo</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Acknowledgments */}
        <section className="py-16 px-4 bg-muted/30 border-t">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-4 fill-red-500" />
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-6">
                Special Acknowledgments
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="p-6 rounded-2xl bg-card border shadow-sm">
                  <h4 className="font-bold text-lg mb-2 text-primary">Vercel</h4>
                  <p className="text-sm text-muted-foreground">
                    Special thanks to Vercel for the seamless deployment infrastructure, enabling us to bridge the gap
                    between development and production for VIT-AP.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-card border shadow-sm">
                  <h4 className="font-bold text-lg mb-2 text-primary">Google Anti-Gravity IDE</h4>
                  <p className="text-sm text-muted-foreground">
                    Grateful for the support of Google Anti-Gravity IDE (Project IDX / v0) in providing a high-velocity,
                    AI-augmented development environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
