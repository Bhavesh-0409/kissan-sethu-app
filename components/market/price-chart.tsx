"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import type { MarketPrice } from "@/lib/types"

interface PriceChartProps {
  prices: MarketPrice[]
}

export function PriceChart({ prices }: PriceChartProps) {
  const [selectedCrop, setSelectedCrop] = useState("Rice")

  // Get unique crops
  const crops = Array.from(new Set(prices.map((price) => price.crop_name)))

  // Get price data for selected crop (last 7 days simulation)
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    const basePrice = prices.find((p) => p.crop_name === selectedCrop)?.price_per_kg || 25
    const variation = (Math.random() - 0.5) * 4 // ±2 price variation
    return {
      date: date.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      price: Math.max(basePrice + variation, 1),
    }
  })

  const maxPrice = Math.max(...chartData.map((d) => d.price))
  const minPrice = Math.min(...chartData.map((d) => d.price))
  const priceRange = maxPrice - minPrice

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Trend</CardTitle>
        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {crops.map((crop) => (
              <SelectItem key={crop} value={crop}>
                {crop}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Simple Chart Visualization */}
          <div className="h-48 flex items-end justify-between gap-2">
            {chartData.map((data, index) => {
              const height = priceRange > 0 ? ((data.price - minPrice) / priceRange) * 160 + 20 : 90
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="text-xs text-gray-600 mb-1">₹{data.price.toFixed(1)}</div>
                  <div
                    className="bg-green-500 rounded-t w-full min-h-[20px] transition-all duration-300"
                    style={{ height: `${height}px` }}
                  />
                  <div className="text-xs text-gray-500 mt-1">{data.date}</div>
                </div>
              )
            })}
          </div>

          {/* Price Summary */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-sm text-gray-500">Highest</div>
              <div className="font-bold text-green-600">₹{maxPrice.toFixed(2)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Lowest</div>
              <div className="font-bold text-red-600">₹{minPrice.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
