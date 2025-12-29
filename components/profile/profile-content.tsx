"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Profile, WaterLeakReport, FoodWastageReport } from "@/lib/types"
import { ROLE_PERMISSIONS } from "@/lib/types"
import { User, Award, Droplets, Utensils, Save, Clock, CheckCircle, XCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface ProfileContentProps {
  profile: Profile
  waterReports: WaterLeakReport[]
  foodReports: FoodWastageReport[]
}

export function ProfileContent({ profile, waterReports, foodReports }: ProfileContentProps) {
  const [fullName, setFullName] = useState(profile.full_name || "")
  const [phone, setPhone] = useState(profile.phone || "")
  const [department, setDepartment] = useState(profile.department || "")
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const handleSave = async () => {
    setIsSaving(true)
    const supabase = createClient()

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        phone: phone,
        department: department,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id)

    if (error) {
      alert("Failed to update profile: " + error.message)
    } else {
      router.refresh()
    }

    setIsSaving(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-600">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container py-8 px-4 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your account and view your contribution history</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Award className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{profile.sustainability_credits}</div>
            <p className="text-sm text-muted-foreground">Credits</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{profile.valid_reports}</div>
            <p className="text-sm text-muted-foreground">Verified</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{waterReports.length}</div>
            <p className="text-sm text-muted-foreground">Water Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Utensils className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">{foodReports.length}</div>
            <p className="text-sm text-muted-foreground">Food Reports</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="water" className="gap-2">
            <Droplets className="h-4 w-4" />
            Water Reports
          </TabsTrigger>
          <TabsTrigger value="food" className="gap-2">
            <Utensils className="h-4 w-4" />
            Food Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={profile.email} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <div className="flex items-center h-10">
                    <Badge variant="outline">{ROLE_PERMISSIONS[profile.role]?.label || profile.role}</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="regNumber">Registration Number</Label>
                  <Input id="regNumber" value={profile.registration_number || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <Button onClick={handleSave} disabled={isSaving} className="bg-emerald-600 hover:bg-emerald-700">
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="water">
          <Card>
            <CardHeader>
              <CardTitle>My Water Leak Reports</CardTitle>
              <CardDescription>History of your water leak submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {waterReports.length > 0 ? (
                  waterReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">
                          {(report.building as { name: string })?.name || "Unknown Building"}
                        </p>
                        <p className="text-sm text-muted-foreground">{report.location_description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(report.reported_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(report.status)}
                        {report.credits_awarded > 0 && (
                          <p className="text-sm text-emerald-600 mt-1">+{report.credits_awarded} credits</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No water leak reports yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="food">
          <Card>
            <CardHeader>
              <CardTitle>My Food Wastage Reports</CardTitle>
              <CardDescription>History of your food wastage submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {foodReports.length > 0 ? (
                  foodReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{(report.caterer as { name: string })?.name || "Unknown Caterer"}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.meal_type} - {report.estimated_wastage_kg} kg
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(report.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(report.status)}
                        {report.credits_awarded > 0 && (
                          <p className="text-sm text-emerald-600 mt-1">+{report.credits_awarded} credits</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No food wastage reports yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
