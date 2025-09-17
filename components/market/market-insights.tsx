import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { MarketPrice } from "@/lib/types"

interface MarketInsightsProps {
  prices: MarketPrice[]
}

export function MarketInsights({ prices }: MarketInsightsProps) {
  // Calculate insights
  const totalCrops = new Set(prices.map((p) => p.crop_name)).size
  const totalMarkets = new Set(prices.map((p) => p.location)).size

  // Find highest and lowest priced crops
  const cropPrices = prices.reduce(
    (acc, price) => {
      if (!acc[price.crop_name] || price.price_per_kg > acc[price.crop_name].price_per_kg) {
        acc[price.crop_name] = price
      }
      return acc
    },
    {} as Record<string, MarketPrice>,
  )

  const sortedCrops = Object.values(cropPrices).sort((a, b) => b.price_per_kg - a.price_per_kg)
  const highestPriced = sortedCrops[0]
  const lowestPriced = sortedCrops[sortedCrops.length - 1]

  // Market insights
  const insights = [
    {
      title: "Best Selling Opportunity",
      description: `${highestPriced?.crop_name} is trading at ₹${highestPriced?.price_per_kg.toFixed(2)}/kg in ${highestPriced?.location}`,
      type: "opportunity",
    },
    {
      title: "Budget-Friendly Purchase",
      description: `${lowestPriced?.crop_name} is available at ₹${lowestPriced?.price_per_kg.toFixed(2)}/kg in ${lowestPriced?.location}`,
      type: "info",
    },
    {
      title: "Market Coverage",
      description: `Tracking ${totalCrops} crops across ${totalMarkets} markets`,
      type: "stats",
    },
  ]

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "info":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getInsightBadge = (type: string) => {
    switch (type) {
      case "opportunity":
        return <Badge className="bg-green-100 text-green-800">Opportunity</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Alert</Badge>
      case "info":
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>
      default:
        return <Badge variant="secondary">Stats</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{insight.title}</h4>
                {getInsightBadge(insight.type)}
              </div>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{totalCrops}</div>
            <div className="text-sm text-gray-500">Crops Tracked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalMarkets}</div>
            <div className="text-sm text-gray-500">Markets</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">₹{highestPriced?.price_per_kg.toFixed(0)}</div>
            <div className="text-sm text-gray-500">Highest Price</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">₹{lowestPriced?.price_per_kg.toFixed(0)}</div>
            <div className="text-sm text-gray-500">Lowest Price</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
