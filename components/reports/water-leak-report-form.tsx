"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Upload, X } from "lucide-react"
import { useUser } from "@/hooks/use-user"
import { Checkbox } from "@/components/ui/checkbox"

const ISSUE_TYPES = [
  "Leaking Tap",
  "Overflowing Tank",
  "Broken Pipeline",
  "Running Water (Unused)",
  "Washroom Leak",
  "Other",
]

const SEVERITY_LEVELS = [
  { value: "low", label: "Low", description: "Minor drip" },
  { value: "medium", label: "Medium", description: "Steady leak" },
  { value: "high", label: "High", description: "Major water loss" },
]

export function WaterLeakReportForm() {
  const router = useRouter()
  const { user, profile } = useUser()
  const [loading, setLoading] = useState(false)
  const [buildingId, setBuildingId] = useState("")
  const [issueType, setIssueType] = useState("")
  const [severity, setSeverity] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)
  const [anonymous, setAnonymous] = useState(false)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error("Authentication required", {
        description: "Please sign in to submit a report",
      })
      router.push("/auth/login")
      return
    }

    setLoading(true)
    const loadingToast = toast.loading("Submitting your water leak report...")

    try {
      const formData = new FormData()
      formData.append("buildingId", buildingId)
      formData.append("issueType", issueType)
      formData.append("severity", severity)
      formData.append("location", location)
      formData.append("description", description)
      formData.append("anonymous", anonymous.toString())
      if (photo) {
        formData.append("photo", photo)
      }

      const response = await fetch("/api/reports/water-leak", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit report")
      }

      toast.dismiss(loadingToast)

      const credits = data.creditsAwarded || 0
      toast.success("Water leak report submitted!", {
        description: anonymous
          ? "Your report has been submitted successfully."
          : `Report submitted! You'll earn up to ${credits} credits once verified. 💧`,
        duration: 5000,
      })

      setBuildingId("")
      setIssueType("")
      setSeverity("")
      setLocation("")
      setDescription("")
      setPhoto(null)
      setAnonymous(false)

      router.refresh()
    } catch (error) {
      toast.dismiss(loadingToast)

      toast.error("Failed to submit report", {
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="building">Building / Location *</Label>
        <Input
          id="building"
          placeholder="e.g., MH-1, Radhakrishnan Block, SAC"
          value={buildingId}
          onChange={(e) => setBuildingId(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="issueType">Issue Type *</Label>
        <Select value={issueType} onValueChange={setIssueType} required>
          <SelectTrigger id="issueType">
            <SelectValue placeholder="Select issue type" />
          </SelectTrigger>
          <SelectContent>
            {ISSUE_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="severity">Severity *</Label>
        <Select value={severity} onValueChange={setSeverity} required>
          <SelectTrigger id="severity">
            <SelectValue placeholder="Select severity level" />
          </SelectTrigger>
          <SelectContent>
            {SEVERITY_LEVELS.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                <div>
                  <div className="font-medium">{level.label}</div>
                  <div className="text-xs text-muted-foreground">{level.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Specific Location *</Label>
        <Input
          id="location"
          placeholder="e.g., Floor 2, Room 204, Near Washroom"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          placeholder="Additional details about the water leak..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="photo">Photo / Video (Optional)</Label>
        <div className="flex items-center gap-2">
          <Input id="photo" type="file" accept="image/*,video/*" onChange={handlePhotoChange} className="hidden" />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("photo")?.click()}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            {photo ? "Change File" : "Upload File"}
          </Button>
          {photo && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground truncate max-w-[200px]">{photo.name}</span>
              <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => setPhoto(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="anonymous" checked={anonymous} onCheckedChange={(checked) => setAnonymous(checked === true)} />
        <label
          htmlFor="anonymous"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Submit anonymously
        </label>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit Water Leak Report
      </Button>
    </form>
  )
}
