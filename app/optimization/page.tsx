"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { optimizationSchedule } from "@/lib/sample-data"
import { useState } from "react"
import { Settings2, Play, Zap, Droplets, Building2, Leaf, MapPin, CheckCircle2 } from "lucide-react"
import { toast } from "react-toastify"

export default function OptimizationPage() {
  const [costWeight, setCostWeight] = useState([60])
  const [sustainabilityWeight, setSustainabilityWeight] = useState([40])
  const [comfortEnabled, setComfortEnabled] = useState(true)
  const [autoMode, setAutoMode] = useState(false)
  const [appliedActions, setAppliedActions] = useState<string[]>([])

  const totalSavings = optimizationSchedule.reduce((acc, item) => {
    const num = Number.parseInt(item.savings.replace(/[₹,]/g, ""))
    return acc + num
  }, 0)

  const applyAction = (id: string) => {
    if (!appliedActions.includes(id)) {
      setAppliedActions([...appliedActions, id])
      const action = optimizationSchedule.find((a) => a.id === id)
      if (action) {
        toast.success("Optimization applied!", {
          description: `${action.recommendedAction} at ${action.location}`,
        })
      }
    }
  }

  const handleRunOptimization = async () => {
    const loadingToast = toast.loading("Running OptiCampus-X LP Solver...", {
      description: "Analyzing 17+ VIT-AP buildings for optimal resource allocation",
    })

    // Simulate optimization process
    await new Promise((resolve) => setTimeout(resolve, 2500))

    toast.dismiss(loadingToast)
    toast.success("Optimization complete!", {
      description: `Potential savings: ₹${totalSavings.toLocaleString()}/day identified across campus`,
      duration: 6000,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  VIT-AP University
                </Badge>
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
                Resource Optimization
              </h1>
              <p className="text-muted-foreground mt-1">
                Linear programming-based scheduling for VIT-AP campus buildings
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Switch id="auto-mode" checked={autoMode} onCheckedChange={setAutoMode} />
                <Label htmlFor="auto-mode" className="text-sm">
                  Auto-Apply
                </Label>
              </div>
              <Button className="gap-2" onClick={handleRunOptimization}>
                <Play className="h-4 w-4" />
                Run Optimization
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {/* Configuration Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings2 className="h-5 w-5" />
                Optimization Parameters
              </CardTitle>
              <CardDescription>Adjust weights for VIT-AP objective function</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Cost Minimization</Label>
                  <span className="text-sm font-medium">{costWeight}%</span>
                </div>
                <Slider value={costWeight} onValueChange={setCostWeight} max={100} step={5} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Sustainability Priority</Label>
                  <span className="text-sm font-medium">{sustainabilityWeight}%</span>
                </div>
                <Slider value={sustainabilityWeight} onValueChange={setSustainabilityWeight} max={100} step={5} />
              </div>

              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <Label className="text-sm">Comfort Constraints</Label>
                  <p className="text-xs text-muted-foreground">Maintain student comfort levels</p>
                </div>
                <Switch checked={comfortEnabled} onCheckedChange={setComfortEnabled} />
              </div>

              <div className="pt-3 border-t">
                <h4 className="text-sm font-medium mb-3">VIT-AP Constraints</h4>
                <div className="space-y-2">
                  <Badge variant="outline" className="mr-2">
                    Class Schedules
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    Hostel Timings
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    Min Temp: 24°C
                  </Badge>
                  <Badge variant="outline">Library Hours</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">VIT-AP Optimization Results</CardTitle>
              <CardDescription>
                Objective: Minimize (Energy_Cost + Water_Cost + Idle_Penalty + Carbon_Penalty)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="p-4 rounded-lg bg-primary/10 text-center">
                  <Zap className="h-6 w-6 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold">28%</p>
                  <p className="text-xs text-muted-foreground">Electricity Reduction</p>
                </div>
                <div className="p-4 rounded-lg bg-accent/20 text-center">
                  <Droplets className="h-6 w-6 mx-auto text-accent mb-2" />
                  <p className="text-2xl font-bold">22%</p>
                  <p className="text-xs text-muted-foreground">Water Reduction</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary text-center">
                  <Building2 className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-2xl font-bold">+35%</p>
                  <p className="text-xs text-muted-foreground">Utilization Improvement</p>
                </div>
                <div className="p-4 rounded-lg bg-green-100 dark:bg-green-950 text-center">
                  <Leaf className="h-6 w-6 mx-auto text-green-600 mb-2" />
                  <p className="text-2xl font-bold">3.2t</p>
                  <p className="text-xs text-muted-foreground">CO₂ Saved/Month</p>
                </div>
              </div>

              <div className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Total Estimated Daily Savings for VIT-AP</h4>
                    <p className="text-sm text-muted-foreground">Based on current optimization schedule</p>
                  </div>
                  <span className="text-3xl font-bold text-primary">₹{totalSavings.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">VIT-AP Optimization Schedule</CardTitle>
            <CardDescription>Recommended actions for Academic Blocks, Hostels, and Support Facilities</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resource</TableHead>
                  <TableHead>VIT-AP Location</TableHead>
                  <TableHead>Current</TableHead>
                  <TableHead>Recommendation</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Savings</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {optimizationSchedule.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.resource}</TableCell>
                    <TableCell>
                      <div>
                        <p>{item.location.split("(")[0].trim()}</p>
                        {item.location.includes("(") && (
                          <p className="text-xs text-muted-foreground">
                            ({item.location.split("(")[1].replace(")", "")})
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.currentStatus}</Badge>
                    </TableCell>
                    <TableCell className="text-primary font-medium">{item.recommendedAction}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px]">{item.reason}</TableCell>
                    <TableCell className="text-right font-semibold text-green-600">{item.savings}</TableCell>
                    <TableCell className="text-right">
                      {appliedActions.includes(item.id) ? (
                        <Badge className="gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Applied
                        </Badge>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => applyAction(item.id)}>
                          Apply
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Mathematical Model Info */}
        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Objective Function</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-muted font-mono text-sm">
                <p className="mb-2">Minimize:</p>
                <p className="pl-4 text-primary">w₁ × Energy_Cost + w₂ × Water_Cost +</p>
                <p className="pl-4 text-primary">w₃ × Idle_Room_Penalty + w₄ × Carbon_Penalty</p>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Optimized for VIT-AP's 17+ buildings including 3 Academic Blocks, 10 Hostels, and 4 Support Facilities.
                Using Linear Programming solver (PuLP).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Solver Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Solver Type</span>
                <Badge>CBC (COIN-OR)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Variables</span>
                <span className="text-sm font-medium">248</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Constraints</span>
                <span className="text-sm font-medium">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Solution Time</span>
                <span className="text-sm font-medium">0.34s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Optimality Gap</span>
                <span className="text-sm font-medium text-green-600">0.0%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
