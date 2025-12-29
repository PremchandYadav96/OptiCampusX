"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { electricityData, waterData, weeklyForecast } from "@/lib/sample-data"
import { useState } from "react"
import { Calendar, TrendingUp, AlertCircle, CheckCircle2, Building2, MapPin } from "lucide-react"

export default function ForecastingPage() {
  const [forecastHorizon, setForecastHorizon] = useState("7")
  const [selectedBuilding, setSelectedBuilding] = useState("all")

  const metrics = [
    { label: "RMSE (Electricity)", value: "12.4 kWh", status: "good" },
    { label: "MAPE (Electricity)", value: "3.2%", status: "good" },
    { label: "RMSE (Water)", value: "45.2 L", status: "good" },
    { label: "MAPE (Water)", value: "4.1%", status: "warning" },
  ]

  const buildings = [
    { value: "all", label: "All VIT-AP Campus" },
    { value: "ab1", label: "Academic Block-1 (Radhakrishnan)" },
    { value: "central", label: "Central Block (Gandhi)" },
    { value: "ab2", label: "Academic Block-2 (Kalam)" },
    { value: "hostels-m", label: "Men's Hostels (MH-1 to MH-6)" },
    { value: "hostels-l", label: "Ladies' Hostels (LH-1 to LH-4)" },
    { value: "sac", label: "Student Activity Centre" },
    { value: "library", label: "Central Library" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              VIT-AP University
            </Badge>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
            Demand Forecasting
          </h1>
          <p className="text-muted-foreground mt-1">
            Time-series predictions using ARIMA and Prophet models for VIT-AP campus
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Building" />
              </SelectTrigger>
              <SelectContent>
                {buildings.map((b) => (
                  <SelectItem key={b.value} value={b.value}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={forecastHorizon} onValueChange={setForecastHorizon}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Forecast Horizon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Next 24 Hours</SelectItem>
                <SelectItem value="7">Next 7 Days</SelectItem>
                <SelectItem value="30">Next 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">Refresh Predictions</Button>
        </div>

        {/* Model Accuracy Metrics */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                    <p className="text-xl font-bold mt-1">{metric.value}</p>
                  </div>
                  {metric.status === "good" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="electricity" className="space-y-6">
          <TabsList>
            <TabsTrigger value="electricity">Electricity</TabsTrigger>
            <TabsTrigger value="water">Water</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="electricity">
            <Card className="bg-card border-border shadow-sm overflow-hidden">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Electricity Demand Forecast - VIT-AP</CardTitle>
                    <CardDescription>Hourly predictions vs actual for all academic blocks</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-emerald-500 border-emerald-500/20">
                    96.8% Accuracy
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={electricityData}>
                      <defs>
                        <linearGradient id="elecGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(0.62 0.17 160)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="oklch(0.62 0.17 160)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                      <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          borderRadius: "8px",
                          border: "1px solid hsl(var(--border))",
                        }}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Area
                        type="monotone"
                        dataKey="actual"
                        stroke="oklch(0.62 0.17 160)"
                        fill="url(#elecGradient)"
                        strokeWidth={2}
                        name="Actual Consumption (kWh)"
                      />
                      <Area
                        type="monotone"
                        dataKey="predicted"
                        stroke="oklch(0.6 0.12 210)"
                        fill="transparent"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="AI Prediction (kWh)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="water">
            <Card>
              <CardHeader>
                <CardTitle>Water Consumption Forecast - VIT-AP Hostels</CardTitle>
                <CardDescription>Hourly predictions for MH-1 to MH-6 and LH-1 to LH-4 combined</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={waterData}>
                      <defs>
                        <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(0.6 0.12 200)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="oklch(0.6 0.12 200)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="actual"
                        stroke="oklch(0.6 0.12 200)"
                        fill="url(#waterGradient)"
                        strokeWidth={2}
                        name="Actual (Liters)"
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="oklch(0.55 0.15 160)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Predicted (Liters)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly">
            <Card className="bg-card border-border shadow-sm overflow-hidden">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle>Weekly Resource Forecast - VIT-AP Campus</CardTitle>
                <CardDescription>7-day prediction comparison across all buildings</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyForecast}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                      />
                      <YAxis
                        yAxisId="left"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                      />
                      <Tooltip />
                      <Legend verticalAlign="top" height={36} />
                      <Bar
                        yAxisId="left"
                        dataKey="electricity"
                        fill="oklch(0.62 0.17 160)"
                        name="Elec (kWh)"
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="predicted_elec"
                        fill="oklch(0.62 0.17 160)"
                        fillOpacity={0.3}
                        name="Pred Elec (kWh)"
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="water"
                        fill="oklch(0.6 0.12 210)"
                        name="Water (L)"
                        radius={[4, 4, 0, 0]}
                        barSize={30}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Model Information */}
        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Model Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Primary Model</span>
                <Badge>Prophet</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Seasonality</span>
                <span className="text-sm">Daily + Weekly</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Training Data</span>
                <span className="text-sm">6 months VIT-AP historical</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <span className="text-sm">Today, 6:00 AM</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">VIT-AP Forecast Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <p className="text-sm font-medium">Peak Demand Expected</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Thursday 12 PM - 2 PM in Central Block (exam week pattern detected)
                </p>
              </div>
              <div className="p-3 rounded-lg bg-accent/50">
                <p className="text-sm font-medium">Low Usage Period</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Sunday 6 AM - 10 AM (optimal for maintenance in Academic Blocks)
                </p>
              </div>
              <div className="p-3 rounded-lg bg-secondary">
                <p className="text-sm font-medium">Hostel Pattern</p>
                <p className="text-xs text-muted-foreground mt-1">MH-1 to MH-6: Peak water usage 7-9 AM and 6-8 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
