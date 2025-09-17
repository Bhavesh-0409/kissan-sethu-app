"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function FeedbackForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    featureType: "",
    rating: "",
    comment: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feature_type: formData.featureType,
          rating: Number.parseInt(formData.rating),
          comment: formData.comment || null,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit feedback")
      }

      setIsSubmitted(true)
      setFormData({ featureType: "", rating: "", comment: "" })
    } catch (error) {
      console.error("Error submitting feedback:", error)
      alert("Failed to submit feedback. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const StarRating = ({ rating, onRatingChange }: { rating: string; onRatingChange: (rating: string) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star.toString())}
            className={`text-2xl transition-colors ${
              Number.parseInt(rating) >= star ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"
            }`}
          >
            ★
          </button>
        ))}
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Thank you for your feedback!</h3>
          <p className="text-gray-600 mb-4">Your input helps us improve Kissan Sethu for all farmers.</p>
          <Button onClick={() => setIsSubmitted(false)}>Submit Another Feedback</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="featureType">Which feature are you providing feedback about? *</Label>
            <Select value={formData.featureType} onValueChange={(value) => handleInputChange("featureType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a feature" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crop_advice">AI Crop Advisory</SelectItem>
                <SelectItem value="weather">Weather Information</SelectItem>
                <SelectItem value="market">Market Prices</SelectItem>
                <SelectItem value="scheme">Government Schemes</SelectItem>
                <SelectItem value="learning">Learning Hub</SelectItem>
                <SelectItem value="overall">Overall App Experience</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>How would you rate this feature? *</Label>
            <div className="mt-2">
              <StarRating rating={formData.rating} onRatingChange={(rating) => handleInputChange("rating", rating)} />
              <div className="text-sm text-gray-500 mt-1">
                {formData.rating && (
                  <span>
                    {formData.rating} star{Number.parseInt(formData.rating) !== 1 ? "s" : ""} -{" "}
                    {Number.parseInt(formData.rating) >= 4
                      ? "Excellent"
                      : Number.parseInt(formData.rating) >= 3
                        ? "Good"
                        : Number.parseInt(formData.rating) >= 2
                          ? "Fair"
                          : "Poor"}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="comment">Additional Comments (Optional)</Label>
            <Textarea
              id="comment"
              placeholder="Tell us more about your experience, suggestions for improvement, or any issues you encountered..."
              value={formData.comment}
              onChange={(e) => handleInputChange("comment", e.target.value)}
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || !formData.featureType || !formData.rating}>
            {isLoading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>

        {/* Contact Information */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Need Direct Support?</h4>
          <div className="space-y-2 text-sm text-blue-700">
            <p>📞 Helpline: 1800-XXX-XXXX (Toll-free)</p>
            <p>📧 Email: support@kissansethu.gov.in</p>
            <p>🕒 Available: Monday to Friday, 9 AM to 6 PM</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
