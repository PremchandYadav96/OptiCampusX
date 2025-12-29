import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WaterLeakReportForm } from "@/components/reports/water-leak-report-form"
import { FoodWastageReportForm } from "@/components/reports/food-wastage-report-form"
import { RecentReports } from "@/components/reports/recent-reports"
import { Droplets, UtensilsCrossed } from "lucide-react"

export default function ReportPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8">
        <div className="mb-6">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">Report Wastage</h1>
          <p className="text-muted-foreground mt-1">
            Help make VIT-AP more sustainable by reporting water leaks and food wastage
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="water" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="water" className="gap-2">
                  <Droplets className="h-4 w-4" />
                  Water Leak
                </TabsTrigger>
                <TabsTrigger value="food" className="gap-2">
                  <UtensilsCrossed className="h-4 w-4" />
                  Food Wastage
                </TabsTrigger>
              </TabsList>

              <TabsContent value="water">
                <Card>
                  <CardHeader>
                    <CardTitle>Report Water Leak</CardTitle>
                    <CardDescription>Report leaking taps, overflowing tanks, or broken pipelines</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WaterLeakReportForm />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="food">
                <Card>
                  <CardHeader>
                    <CardTitle>Report Food Wastage</CardTitle>
                    <CardDescription>Report excess cooked food, plate wastage, or spoiled food in mess</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FoodWastageReportForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Report?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Environmental Impact</p>
                    <p className="text-xs text-muted-foreground">
                      Save water and reduce food waste for a sustainable campus
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Earn Credits</p>
                    <p className="text-xs text-muted-foreground">
                      Get sustainability credits for valid reports and climb the leaderboard
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Quick Resolution</p>
                    <p className="text-xs text-muted-foreground">
                      Reports are prioritized and escalated automatically for fast fixes
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <span className="text-2xl">🎭</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Anonymous Option</p>
                    <p className="text-xs text-muted-foreground">Submit reports anonymously if you prefer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <RecentReports />
        </div>
      </main>

      <Footer />
    </div>
  )
}
