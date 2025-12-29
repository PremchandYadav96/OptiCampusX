"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Electronics & Communication Engineering",
  "Electrical & Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Biotechnology",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Management Studies",
  "Law",
  "Other",
]

interface ProfileOnboardingProps {
  profile: {
    full_name: string | null
    registration_number: string | null
    department: string | null
  }
  onComplete: () => void
}

export function ProfileOnboarding({ profile, onComplete }: ProfileOnboardingProps) {
  const [syncAttempted, setSyncAttempted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const needsCompletion = !profile.full_name || !profile.department

  useEffect(() => {
    const syncMetadata = async () => {
      if (needsCompletion && !syncAttempted) {
        setSyncAttempted(true)
        setIsLoading(true)

        try {
          const response = await fetch("/api/profile/sync", {
            method: "POST",
          })

          if (response.ok) {
            const data = await response.json()
            if (data.profile?.full_name) {
              onComplete()
              return
            }
          }
        } catch (error) {
          console.error("[v0] Metadata sync failed:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    syncMetadata()
  }, [needsCompletion, syncAttempted, onComplete])

  if (!needsCompletion) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-6 w-6 text-emerald-600" />
            <CardTitle>Complete Your Profile</CardTitle>
          </div>
          <CardDescription>
            Welcome to OptiCampus-X! Please complete your profile to get started with reporting and earning
            sustainability credits.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">Syncing your profile...</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={profile.full_name || ""} disabled placeholder="Loading..." />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Select value={profile.department || ""} disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Loading..." />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Registration Number</Label>
                <Input value={profile.registration_number || ""} disabled placeholder="Optional" />
              </div>

              <Button onClick={onComplete} className="w-full bg-emerald-600 hover:bg-emerald-700">
                Complete Profile Setup
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                You can update these details later from your profile page
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
