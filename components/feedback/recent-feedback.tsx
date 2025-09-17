import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Feedback } from "@/lib/types"

interface RecentFeedbackProps {
  feedback: Feedback[]
}

export function RecentFeedback({ feedback }: RecentFeedbackProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 48) return "1 day ago"
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  const getFeatureDisplayName = (featureType: string) => {
    const names = {
      crop_advice: "AI Crop Advisory",
      weather: "Weather Information",
      market: "Market Prices",
      scheme: "Government Schemes",
      learning: "Learning Hub",
      overall: "Overall App",
    }
    return names[featureType as keyof typeof names] || featureType
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600"
    if (rating >= 3) return "text-yellow-600"
    if (rating >= 2) return "text-orange-600"
    return "text-red-600"
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Recent Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        {feedback.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <p className="font-medium">No feedback submitted yet</p>
            <p className="text-sm">Share your experience to help us improve!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {feedback.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{getFeatureDisplayName(item.feature_type)}</Badge>
                    <div className="flex items-center gap-1">
                      {renderStars(item.rating)}
                      <span className={`text-sm font-medium ${getRatingColor(item.rating)}`}>({item.rating}/5)</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(item.created_at)}</span>
                </div>

                {item.comment && (
                  <p className="text-sm text-gray-700 mt-2 p-3 bg-gray-50 rounded border-l-4 border-blue-200">
                    "{item.comment}"
                  </p>
                )}

                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs text-green-600 font-medium">Thank you for your feedback!</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
