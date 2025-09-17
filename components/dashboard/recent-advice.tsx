import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentAdvice() {
  // This would be fetched from the database in a real app
  const recentAdvice = [
    {
      id: "1",
      crop: "Rice",
      type: "planting",
      advice: "Plant rice seedlings with 20cm spacing for optimal growth in current weather conditions.",
      confidence: 0.92,
      createdAt: "2 hours ago",
    },
    {
      id: "2",
      crop: "Tomato",
      type: "disease",
      advice: "Apply copper-based fungicide to prevent early blight. Ensure proper drainage.",
      confidence: 0.88,
      createdAt: "1 day ago",
    },
    {
      id: "3",
      crop: "Wheat",
      type: "care",
      advice: "Apply nitrogen fertilizer at tillering stage for better grain development.",
      confidence: 0.95,
      createdAt: "2 days ago",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Crop Advice</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAdvice.map((advice) => (
            <div key={advice.id} className="border-l-4 border-green-500 pl-4 py-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{advice.crop}</span>
                  <Badge variant="secondary" className="text-xs">
                    {advice.type}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">{advice.createdAt}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{advice.advice}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Confidence:</span>
                <div className="flex items-center gap-1">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${advice.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{Math.round(advice.confidence * 100)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
