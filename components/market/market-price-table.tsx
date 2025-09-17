"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { MarketPrice } from "@/lib/types"

interface MarketPriceTableProps {
  prices: MarketPrice[]
}

export function MarketPriceTable({ prices }: MarketPriceTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")

  // Get unique locations
  const locations = Array.from(new Set(prices.map((price) => price.location)))

  // Filter prices
  const filteredPrices = prices.filter((price) => {
    const matchesSearch = price.crop_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = locationFilter === "all" || price.location === locationFilter
    return matchesSearch && matchesLocation
  })

  // Group by crop and get latest price for each crop-location combination
  const latestPrices = filteredPrices.reduce(
    (acc, price) => {
      const key = `${price.crop_name}-${price.location}`
      if (!acc[key] || new Date(price.created_at) > new Date(acc[key].created_at)) {
        acc[key] = price
      }
      return acc
    },
    {} as Record<string, MarketPrice>,
  )

  const sortedPrices = Object.values(latestPrices).sort((a, b) => a.crop_name.localeCompare(b.crop_name))

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    })
  }

  const getPriceChangeIndicator = (price: number) => {
    // Simulate price change - in real app, this would compare with previous prices
    const change = Math.random() * 10 - 5 // Random change between -5 and +5
    if (change > 2) return { color: "text-green-600", symbol: "↗", value: `+${change.toFixed(1)}%` }
    if (change < -2) return { color: "text-red-600", symbol: "↘", value: `${change.toFixed(1)}%` }
    return { color: "text-gray-600", symbol: "→", value: "0.0%" }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Prices</CardTitle>
        <div className="flex gap-4">
          <Input
            placeholder="Search crops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="All locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {sortedPrices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No market prices found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sortedPrices.map((price) => {
              const change = getPriceChangeIndicator(price.price_per_kg)
              return (
                <div
                  key={price.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="font-medium">{price.crop_name}</div>
                    <div className="text-sm text-gray-500">
                      {price.location} • {price.market_name || "Local Market"}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-lg">₹{price.price_per_kg.toFixed(2)}/kg</div>
                    <div className={`text-sm flex items-center gap-1 ${change.color}`}>
                      <span>{change.symbol}</span>
                      <span>{change.value}</span>
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <Badge variant="outline" className="text-xs">
                      {formatDate(price.date)}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
