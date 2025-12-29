import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Zap, Target, ShieldAlert, BarChart3 } from "lucide-react"

const n = 10 // Example declaration for n
const y = 5 // Example declaration for y
const y_t = 4 // Example declaration for y_t
const energy = 2 // Example declaration for energy
const water = 3 // Example declaration for water
const idle = 1 // Example declaration for idle
const carbon = 5 // Example declaration for carbon
const X = 10 // Example declaration for X
const mu = 5 // Example declaration for mu
const sigma = 2 // Example declaration for sigma

export default function EvaluationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-12">
        <div className="max-w-4xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-primary/20 text-primary uppercase tracking-widest text-[10px] py-1"
          >
            Quant Methodology
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold font-display mb-6 tracking-tight">Evaluation & Metrics</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            OptiCampus-X isn't a black box. Our systems are built on verifiable statistical models and rigorous
            mathematical optimization.
          </p>
        </div>

        <Tabs defaultValue="forecasting" className="space-y-8">
          <TabsList className="bg-white/5 border border-white/10 p-1 rounded-full h-12">
            <TabsTrigger
              value="forecasting"
              className="rounded-full px-6 data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Forecasting (ARIMA)
            </TabsTrigger>
            <TabsTrigger
              value="optimization"
              className="rounded-full px-6 data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Optimization (LP)
            </TabsTrigger>
            <TabsTrigger
              value="anomalies"
              className="rounded-full px-6 data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Anomalies (Z-Score)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forecasting" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/5 border-white/10 overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="text-primary h-5 w-5" />
                    <CardTitle className="text-lg">Seasonal ARIMA</CardTitle>
                  </div>
                  <CardDescription>Time-series demand prediction for electricity and water.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-black/50 font-mono text-sm border border-white/5">
                    <p className="text-primary mb-2">// ARIMA(p,d,q)</p>
                    <p className="text-white">
                      {"$$\\Phi_P(B^s)\\phi_p(B)(1-B)^d(1-B^s)^D Y_t = \\Theta_Q(B^s)\\theta_q(B)\\epsilon_t$$"}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We decompose VIT-AP usage into Trend ($T_t$), Seasonality ($S_t$), and Residual ($R_t$). This allows
                    the system to anticipate high-load periods like exam weeks or hostel peak hours.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="text-primary h-5 w-5" />
                    <CardTitle className="text-lg">Accuracy Metrics</CardTitle>
                  </div>
                  <CardDescription>How we measure forecasting success.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-white">RMSE</span>
                      <span className="text-muted-foreground">
                        {"$$RMSE = \\sqrt{\\frac{1}{n} \\sum_{t=1}^{n} (y_t - \\hat{y}_t)^2}$$"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-t border-white/5 pt-3">
                      <span className="font-semibold text-white">MAPE</span>
                      <span className="text-muted-foreground">
                        {"$$MAPE = \\frac{100\\%}{n} \\sum_{t=1}^{n} \\left| \\frac{y_t - \\hat{y}_t}{y_t} \\right|$$"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="text-primary h-5 w-5" />
                  <CardTitle className="text-lg">Multi-Objective Linear Programming</CardTitle>
                </div>
                <CardDescription>Balancing comfort, sustainability, and budget.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg bg-black/50 font-mono text-center border border-white/5">
                  <p className="text-primary text-xs mb-4 uppercase tracking-widest">Objective Function</p>
                  <p className="text-2xl text-white">
                    {
                      "$$\\min Z = \\sum_{j \\in J} \\omega_j \\left( \\sum_{i \\in I} c_{ij} x_i \\right) + \\lambda \\cdot \\text{Penalty}(\\text{Comfort})$$"
                    }
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-xl border border-white/5">
                    <h4 className="font-bold mb-2">Decision Variables</h4>
                    <p className="text-sm text-muted-foreground">
                      Power state, water flow rates, and classroom scheduling slots.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5">
                    <h4 className="font-bold mb-2">Hard Constraints</h4>
                    <p className="text-sm text-muted-foreground">
                      Capacity limits, safety protocols, and essential facility power.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5">
                    <h4 className="font-bold mb-2">Soft Constraints</h4>
                    <p className="text-sm text-muted-foreground">
                      Human comfort zones (AC temps), light levels, and noise.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="anomalies" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldAlert className="text-primary h-5 w-5" />
                    <CardTitle className="text-lg">Z-Score Analysis</CardTitle>
                  </div>
                  <CardDescription>Statistical waste detection.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-black/50 font-mono text-center border border-white/5">
                    <p className="text-white text-xl">{"$$z_i = \\frac{x_i - \\bar{x}}{s}$$"}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    By monitoring real-time flow data against historical means (mu) and standard deviations (sigma), we
                    flag any |Z| &gt; 3 as a critical anomaly (leak or wasteful usage).
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="text-primary h-5 w-5" />
                    <CardTitle className="text-lg">Governance Scoring</CardTitle>
                  </div>
                  <CardDescription>Accountability for mess caterers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-black/50 font-mono text-center border border-white/5">
                    <p className="text-white text-lg">
                      {"$$S_{caterer} = \\frac{\\sum_{i=1}^{m} w_i R_i}{\\sum_{j=1}^{k} \text{Log}(1 + f_j)}$$"}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Caterers like CRCL and Fusion are evaluated based on weighted indicators: Resolution Speed, Wastage
                    Frequency, and Reported Incidents.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
