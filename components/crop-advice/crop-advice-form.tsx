"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, Lightbulb, Database } from "lucide-react"
import type { Crop } from "@/lib/types"
import { useLanguage } from "@/lib/i18n/context"

interface CropAdviceFormProps {
  crops: Crop[]
}

interface AdviceResponse {
  advice: Array<{
    title: string
    content: string
    tips: string[]
    warning?: string
    bestPractices: string[]
  }>
  confidence: number
  id: string
  source: "database" | "ai"
}

export function CropAdviceForm({ crops }: CropAdviceFormProps) {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [advice, setAdvice] = useState<AdviceResponse | null>(null)
  const [formData, setFormData] = useState({
    cropName: "",
    location: "",
    season: "",
    soilType: "",
    farmSize: "",
    specificIssue: "",
    adviceType: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAdvice(null)

    try {
      const response = await fetch("/api/crop-advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cropName: formData.cropName,
          location: formData.location,
          season: formData.season,
          soilType: formData.soilType || undefined,
          farmSize: formData.farmSize ? Number.parseFloat(formData.farmSize) : undefined,
          specificIssue: formData.specificIssue || undefined,
          adviceType: formData.adviceType,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get advice")
      }

      const result = await response.json()
      setAdvice(result)
    } catch (error) {
      console.error("Error getting advice:", error)
      alert("Failed to get crop advice. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("cropAdvice.getAdvice")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cropName">{t("cropAdvice.crop")} *</Label>
                <Select value={formData.cropName} onValueChange={(value) => handleInputChange("cropName", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("cropAdvice.selectCrop")} />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop.id} value={crop.name}>
                        {crop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">{t("cropAdvice.location")} *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Punjab, Maharashtra"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="season">{t("cropAdvice.season")} *</Label>
                <Select value={formData.season} onValueChange={(value) => handleInputChange("season", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("cropAdvice.selectSeason")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monsoon">Kharif (Monsoon)</SelectItem>
                    <SelectItem value="winter">Rabi (Winter)</SelectItem>
                    <SelectItem value="summer">Zaid (Summer)</SelectItem>
                    <SelectItem value="all">Year Round</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="adviceType">{t("cropAdvice.adviceType")} *</Label>
                <Select value={formData.adviceType} onValueChange={(value) => handleInputChange("adviceType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("cropAdvice.selectAdviceType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planting">Planting</SelectItem>
                    <SelectItem value="care">Crop Care</SelectItem>
                    <SelectItem value="harvest">Harvesting</SelectItem>
                    <SelectItem value="disease">Disease Management</SelectItem>
                    <SelectItem value="pest">Pest Control</SelectItem>
                    <SelectItem value="fertilizer">Fertilizer Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="soilType">Soil Type (Optional)</Label>
                <Select value={formData.soilType} onValueChange={(value) => handleInputChange("soilType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="loamy">Loamy</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="black">Black Soil</SelectItem>
                    <SelectItem value="red">Red Soil</SelectItem>
                    <SelectItem value="all">All Soil Types</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="farmSize">Farm Size (acres)</Label>
                <Input
                  id="farmSize"
                  type="number"
                  placeholder="e.g., 2.5"
                  value={formData.farmSize}
                  onChange={(e) => handleInputChange("farmSize", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="specificIssue">Specific Issue or Question (Optional)</Label>
              <Textarea
                id="specificIssue"
                placeholder="Describe any specific problems or questions you have..."
                value={formData.specificIssue}
                onChange={(e) => handleInputChange("specificIssue", e.target.value)}
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Getting Advice..." : "Get Expert Advice"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {advice && (
        <div className="space-y-4">
          {advice.advice.map((adviceItem, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-green-600" />
                    {adviceItem.title}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Confidence: {Math.round(advice.confidence * 100)}%</Badge>
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      {advice.source === "database" ? "Expert Database" : "AI Generated"}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">{adviceItem.content}</p>
                </div>

                {/* Tips Section */}
                {adviceItem.tips && adviceItem.tips.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                      <h4 className="font-semibold text-blue-800">Practical Tips</h4>
                    </div>
                    <ul className="space-y-1">
                      {adviceItem.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm text-blue-700">
                          <CheckCircle className="h-3 w-3 mt-1 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Warning Section */}
                {adviceItem.warning && (
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                      <strong>Important:</strong> {adviceItem.warning}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Best Practices Section */}
                {adviceItem.bestPractices && adviceItem.bestPractices.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <h4 className="font-semibold text-green-800">Best Practices</h4>
                    </div>
                    <ul className="space-y-1">
                      {adviceItem.bestPractices.map((practice, practiceIndex) => (
                        <li key={practiceIndex} className="flex items-start gap-2 text-sm text-green-700">
                          <CheckCircle className="h-3 w-3 mt-1 flex-shrink-0" />
                          {practice}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Note:</strong> This advice is based on expert agricultural knowledge and research. Always consider
              local conditions and consult with agricultural extension officers for specific situations.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
