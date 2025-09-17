"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CropAdvice } from "@/lib/types"

export function AdviceHistory() {
  const [advice, setAdvice] = useState<(CropAdvice & { crops?: { name: string; category: string } })[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    fetchAdvice()
  }, [filter])

  const fetchAdvice = async () => {
    setIsLoading(true)
    try {
      const url = new URL("/api/crop-advice", window.location.origin)
      if (filter !== "all") {
        url.searchParams.set("type", filter)
      }
      url.searchParams.set("limit", "10")

      const response = await fetch(url)
      if (!response.ok) throw new Error("Failed to fetch advice")

      const result = await response.json()
      setAdvice(result.advice || [])
    } catch (error) {
      console.error("Error fetching advice:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 48) return "1 day ago"
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  const getAdviceTypeColor = (type: string) => {
    const colors = {
      planting: "bg-green-100 text-green-800",
      care: "bg-blue-100 text-blue-800",
      harvest: "bg-yellow-100 text-yellow-800",
      disease: "bg-red-100 text-red-800",
      pest: "bg-purple-100 text-purple-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Advice History</CardTitle>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="planting">Planting</SelectItem>
              <SelectItem value="care">Care</SelectItem>
              <SelectItem value="harvest">Harvest</SelectItem>
              <SelectItem value="disease">Disease</SelectItem>
              <SelectItem value="pest">Pest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : advice.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No advice history found.</p>
            <p className="text-sm">Get your first AI advice using the form!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {advice.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {item.crops && <span className="font-medium text-sm">{item.crops.name}</span>}
                    <Badge className={`text-xs ${getAdviceTypeColor(item.advice_type)}`}>{item.advice_type}</Badge>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(item.created_at)}</span>
                </div>

                <p className="text-sm text-gray-700 mb-3 line-clamp-3">{item.advice_text}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Confidence:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${(item.confidence_score || 0) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{Math.round((item.confidence_score || 0) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {advice.length >= 10 && (
              <div className="text-center pt-4">
                <Button variant="outline" onClick={fetchAdvice}>
                  Load More
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
