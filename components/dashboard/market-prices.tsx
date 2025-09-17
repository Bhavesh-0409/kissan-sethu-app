import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function MarketPrices() {
  // This would be fetched from the database in a real app
  const marketPrices = [
    { crop: "Rice", price: 25.5, change: "+2.5%", location: "Delhi" },
    { crop: "Wheat", price: 22.0, change: "-1.2%", location: "Punjab" },
    { crop: "Tomato", price: 18.0, change: "+5.8%", location: "Maharashtra" },
    { crop: "Onion", price: 12.5, change: "-3.1%", location: "Karnataka" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Market Prices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {marketPrices.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{item.crop}</div>
                <div className="text-sm text-muted-foreground">{item.location}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">₹{item.price}/kg</div>
                <Badge variant={item.change.startsWith("+") ? "default" : "destructive"} className="text-xs">
                  {item.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
