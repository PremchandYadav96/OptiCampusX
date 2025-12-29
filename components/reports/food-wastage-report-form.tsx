"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

const MEAL_TYPES = ["Breakfast", "Lunch", "Snacks", "Dinner"]

const WASTAGE_TYPES = [
  "Excess Cooked Food",
  "Plate Wastage",
  "Spoiled Food",
  "Poor Quality",
  "Wrong Demand Estimation",
  "Other",
]

interface Caterer {
  id: string
  name: string
  mess_location: string
}

export function FoodWastageReportForm() {
  const router = useRouter()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [caterers, setCaterers] = useState<Caterer[]>([])
  const [catererId, setCatererId] = useState("")
  const [mealType, setMealType] = useState("")
  const [wastageType, setWastageType] = useState("")
  const [estimatedKg, setEstimatedKg] = useState("")
  const [description, setDescription] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)
  const [anonymous, setAnonymous] = useState(false)

  useEffect(() => {
    const fetchCaterers = async () => {
      try {
        const response = await fetch("/api/caterers")
        const data = await response.json()
        setCaterers(data.caterers || [])
      } catch (error) {
        console.error("[v0] Failed to fetch caterers:", error)
        toast.error("Failed to load caterers", {
          description: "Please refresh the page to try again",
        })
      }
    }
    fetchCaterers()
  }, [])

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
    const loadingToast = toast.loading("Submitting your food wastage report...")

    try {
      const formData = new FormData()
      formData.append("catererId", catererId)
      formData.append("mealType", mealType)
      formData.append("wastageType", wastageType)
      formData.append("estimatedKg", estimatedKg)
      formData.append("description", description)
      formData.append("anonymous", anonymous.toString())
      if (photo) {
        formData.append("photo", photo)
      }

      const response = await fetch("/api/reports/food-wastage", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit report")
      }

      toast.dismiss(loadingToast)

      const credits = data.creditsAwarded || 0
      toast.success("Food wastage report submitted!", {
        description: anonymous
          ? "Your report has been submitted successfully."
          : `Report submitted! You'll earn up to ${credits} credits once verified. 🍽️`,
        duration: 5000,
      })

      setCatererId("")
      setMealType("")
      setWastageType("")
      setEstimatedKg("")
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
        <Label htmlFor="caterer">Mess / Caterer *</Label>
        <Select value={catererId} onValueChange={setCatererId} required>
          <SelectTrigger id="caterer">
            <SelectValue placeholder="Select mess caterer" />
          </SelectTrigger>
          <SelectContent>
            {caterers.map((caterer) => (
              <SelectItem key={caterer.id} value={caterer.id}>
                {caterer.name} - {caterer.mess_location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mealType">Meal Type *</Label>
        <Select value={mealType} onValueChange={setMealType} required>
          <SelectTrigger id="mealType">
            <SelectValue placeholder="Select meal type" />
          </SelectTrigger>
          <SelectContent>
            {MEAL_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="wastageType">Wastage Type *</Label>
        <Select value={wastageType} onValueChange={setWastageType} required>
          <SelectTrigger id="wastageType">
            <SelectValue placeholder="Select wastage type" />
          </SelectTrigger>
          <SelectContent>
            {WASTAGE_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="estimatedKg">Estimated Wastage (kg) *</Label>
        <Input
          id="estimatedKg"
          type="number"
          step="0.1"
          min="0"
          placeholder="e.g., 5.5"
          value={estimatedKg}
          onChange={(e) => setEstimatedKg(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe the wastage incident..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="photo">Photo (Optional)</Label>
        <div className="flex items-center gap-2">
          <Input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("photo")?.click()}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            {photo ? "Change Photo" : "Upload Photo"}
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
        Submit Food Wastage Report
      </Button>
    </form>
  )
}
