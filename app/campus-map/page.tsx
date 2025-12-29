"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Zap,
  Droplets,
  Users,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Home,
  GraduationCap,
  Library,
  Utensils,
} from "lucide-react"
import { useState } from "react"
import { vitapBuildings, buildingResourceData, getHourlyDataForBuilding } from "@/lib/vitap-data"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const getBuildingIcon = (type: string) => {
  switch (type) {
    case "academic":
      return GraduationCap
    case "support":
      return Library
    case "hostel":
      return Home
    default:
      return Building2
  }
}

const getStatusColor = (savings: number) => {
  if (savings >= 15) return "text-green-600"
  if (savings >= 10) return "text-yellow-600"
  return "text-red-600"
}

const getStatusBadge = (savings: number) => {
  if (savings >= 15) return { variant: "default" as const, text: "Optimized" }
  if (savings >= 10) return { variant: "secondary" as const, text: "Good" }
  return { variant: "destructive" as const, text: "Needs Attention" }
}

export default function CampusMapPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("academic")

  const selectedBuildingData = selectedBuilding
    ? buildingResourceData.find((b) => b.building.toLowerCase().includes(selectedBuilding.toLowerCase()))
    : null

  const hourlyData = selectedBuilding ? getHourlyDataForBuilding(selectedBuilding) : []

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
            VIT-AP Campus Map
          </h1>
          <p className="text-muted-foreground mt-1">Building-wise resource monitoring and analytics</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Building Selector */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Building</CardTitle>
                <CardDescription>Choose a building to view detailed analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="academic">Academic</TabsTrigger>
                    <TabsTrigger value="hostels">Hostels</TabsTrigger>
                  </TabsList>

                  <TabsContent value="academic" className="space-y-2">
                    {vitapBuildings.academic.map((building) => (
                      <Button
                        key={building.id}
                        variant={selectedBuilding === building.id ? "secondary" : "ghost"}
                        className="w-full justify-start gap-2 h-auto py-3"
                        onClick={() => setSelectedBuilding(building.id)}
                      >
                        <GraduationCap className="h-4 w-4 shrink-0" />
                        <div className="text-left">
                          <p className="font-medium text-sm">{building.name}</p>
                          <p className="text-xs text-muted-foreground">{building.alias}</p>
                        </div>
                      </Button>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <p className="text-xs text-muted-foreground mb-2 px-2">Support Facilities</p>
                      {vitapBuildings.support.map((building) => (
                        <Button
                          key={building.id}
                          variant={selectedBuilding === building.id ? "secondary" : "ghost"}
                          className="w-full justify-start gap-2 h-auto py-2"
                          onClick={() => setSelectedBuilding(building.id)}
                        >
                          {building.id === "cafeteria" ? (
                            <Utensils className="h-4 w-4 shrink-0" />
                          ) : (
                            <Library className="h-4 w-4 shrink-0" />
                          )}
                          <span className="text-sm">{building.name}</span>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="hostels" className="space-y-2">
                    <p className="text-xs text-muted-foreground mb-2 px-2">Men's Hostels</p>
                    {vitapBuildings.mensHostels.map((hostel) => (
                      <Button
                        key={hostel.id}
                        variant={selectedBuilding === hostel.id ? "secondary" : "ghost"}
                        className="w-full justify-start gap-2 h-auto py-2"
                        onClick={() => setSelectedBuilding(hostel.id)}
                      >
                        <Home className="h-4 w-4 shrink-0" />
                        <div className="text-left">
                          <p className="font-medium text-sm">{hostel.name}</p>
                          <p className="text-xs text-muted-foreground">{hostel.alias}</p>
                        </div>
                      </Button>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <p className="text-xs text-muted-foreground mb-2 px-2">Ladies' Hostels</p>
                      {vitapBuildings.ladiesHostels.map((hostel) => (
                        <Button
                          key={hostel.id}
                          variant={selectedBuilding === hostel.id ? "secondary" : "ghost"}
                          className="w-full justify-start gap-2 h-auto py-2"
                          onClick={() => setSelectedBuilding(hostel.id)}
                        >
                          <Home className="h-4 w-4 shrink-0" />
                          <div className="text-left">
                            <p className="font-medium text-sm">{hostel.name}</p>
                            <p className="text-xs text-muted-foreground">{hostel.alias}</p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Campus Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Buildings</span>
                  <span className="font-semibold">17</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Academic Blocks</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Men's Hostels</span>
                  <span className="font-semibold">6 (MH-1 to MH-6)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Ladies' Hostels</span>
                  <span className="font-semibold">4 (LH-1 to LH-4)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Support Facilities</span>
                  <span className="font-semibold">4</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Building Details */}
          <div className="lg:col-span-2">
            {selectedBuilding ? (
              <div className="space-y-6">
                {/* Building Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">
                          {selectedBuildingData?.building || "Building Details"}
                        </CardTitle>
                        <CardDescription>Real-time resource monitoring</CardDescription>
                      </div>
                      {selectedBuildingData && (
                        <Badge {...getStatusBadge(selectedBuildingData.savings)}>
                          {getStatusBadge(selectedBuildingData.savings).text}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-4">
                      <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/30">
                        <Zap className="h-5 w-5 text-yellow-600 mb-2" />
                        <p className="text-2xl font-bold">{selectedBuildingData?.electricity || 0}</p>
                        <p className="text-xs text-muted-foreground">kWh Today</p>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                        <Droplets className="h-5 w-5 text-blue-600 mb-2" />
                        <p className="text-2xl font-bold">{selectedBuildingData?.water || 0}</p>
                        <p className="text-xs text-muted-foreground">Liters Today</p>
                      </div>
                      <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30">
                        <Users className="h-5 w-5 text-purple-600 mb-2" />
                        <p className="text-2xl font-bold">{selectedBuildingData?.occupancy || 0}%</p>
                        <p className="text-xs text-muted-foreground">Occupancy</p>
                      </div>
                      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30">
                        <TrendingDown className="h-5 w-5 text-green-600 mb-2" />
                        <p className="text-2xl font-bold">{selectedBuildingData?.savings || 0}%</p>
                        <p className="text-xs text-muted-foreground">Savings</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Hourly Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Hourly Consumption</CardTitle>
                    <CardDescription>Today's electricity and water usage pattern</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={hourlyData}>
                          <defs>
                            <linearGradient id="elecGradientMap" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="waterGradientMap" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="time" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="electricity"
                            stroke="#eab308"
                            fill="url(#elecGradientMap)"
                            name="Electricity (kWh)"
                          />
                          <Area
                            yAxisId="right"
                            type="monotone"
                            dataKey="water"
                            stroke="#3b82f6"
                            fill="url(#waterGradientMap)"
                            name="Water (L)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Active Alerts for Building */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Building Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-sm">All systems operational</p>
                          <p className="text-xs text-muted-foreground">No critical alerts for this building</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/30">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-sm">Optimization pending</p>
                          <p className="text-xs text-muted-foreground">AC efficiency can be improved by 12%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Building2 className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Building</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Choose a building from the list to view detailed resource analytics and real-time monitoring data
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Building Comparison Table */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Building Comparison</CardTitle>
            <CardDescription>Resource usage across all VIT-AP buildings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Building</th>
                    <th className="text-right py-3 px-4 font-medium">Electricity (kWh)</th>
                    <th className="text-right py-3 px-4 font-medium">Water (L)</th>
                    <th className="text-right py-3 px-4 font-medium">Occupancy</th>
                    <th className="text-right py-3 px-4 font-medium">Savings</th>
                    <th className="text-right py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {buildingResourceData.map((building) => (
                    <tr key={building.building} className="border-b last:border-0">
                      <td className="py-3 px-4 font-medium">{building.building}</td>
                      <td className="text-right py-3 px-4">{building.electricity.toLocaleString()}</td>
                      <td className="text-right py-3 px-4">{building.water.toLocaleString()}</td>
                      <td className="text-right py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Progress value={building.occupancy} className="w-16 h-2" />
                          <span>{building.occupancy}%</span>
                        </div>
                      </td>
                      <td className={`text-right py-3 px-4 font-semibold ${getStatusColor(building.savings)}`}>
                        {building.savings}%
                      </td>
                      <td className="text-right py-3 px-4">
                        <Badge {...getStatusBadge(building.savings)}>{getStatusBadge(building.savings).text}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
