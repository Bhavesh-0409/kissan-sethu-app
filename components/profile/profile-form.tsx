"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import type { Profile } from "@/lib/types"
import { useRouter } from "next/navigation"

interface ProfileFormProps {
  user: User
  profile: Profile | null
}

export function ProfileForm({ user, profile }: ProfileFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
    farm_size: profile?.farm_size?.toString() || "",
    primary_crops: profile?.primary_crops || [],
    language_preference: profile?.language_preference || "en",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      const updateData = {
        id: user.id,
        full_name: formData.full_name || null,
        phone: formData.phone || null,
        location: formData.location || null,
        farm_size: formData.farm_size ? Number.parseFloat(formData.farm_size) : null,
        primary_crops: formData.primary_crops,
        language_preference: formData.language_preference,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from("profiles").upsert(updateData)

      if (error) throw error

      alert("Profile updated successfully!")
      router.refresh()
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCropToggle = (crop: string) => {
    const currentCrops = formData.primary_crops
    const updatedCrops = currentCrops.includes(crop) ? currentCrops.filter((c) => c !== crop) : [...currentCrops, crop]
    handleInputChange("primary_crops", updatedCrops)
  }

  const commonCrops = ["Rice", "Wheat", "Cotton", "Sugarcane", "Tomato", "Onion", "Potato", "Maize"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => handleInputChange("full_name", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g., Punjab, Maharashtra"
              />
            </div>

            <div>
              <Label htmlFor="farm_size">Farm Size (acres)</Label>
              <Input
                id="farm_size"
                type="number"
                step="0.1"
                value={formData.farm_size}
                onChange={(e) => handleInputChange("farm_size", e.target.value)}
                placeholder="e.g., 2.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="language_preference">Preferred Language</Label>
            <Select
              value={formData.language_preference}
              onValueChange={(value) => handleInputChange("language_preference", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="pa">Punjabi</SelectItem>
                <SelectItem value="mr">Marathi</SelectItem>
                <SelectItem value="gu">Gujarati</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
                <SelectItem value="te">Telugu</SelectItem>
                <SelectItem value="kn">Kannada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Primary Crops</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {commonCrops.map((crop) => (
                <label key={crop} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.primary_crops.includes(crop)}
                    onChange={() => handleCropToggle(crop)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{crop}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
