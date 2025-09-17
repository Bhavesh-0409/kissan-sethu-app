import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function LearningCategories() {
  const categories = [
    {
      name: "Farming Techniques",
      description: "Modern and traditional farming methods",
      icon: "🌱",
      count: 12,
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Pest Control",
      description: "Identify and manage crop pests effectively",
      icon: "🐛",
      count: 8,
      color: "bg-red-100 text-red-800",
    },
    {
      name: "Soil Health",
      description: "Maintain and improve soil fertility",
      icon: "🌍",
      count: 10,
      color: "bg-brown-100 text-brown-800",
    },
    {
      name: "Marketing",
      description: "Sell your produce at better prices",
      icon: "💰",
      count: 6,
      color: "bg-yellow-100 text-yellow-800",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link key={category.name} href={`/learning?category=${category.name.toLowerCase().replace(" ", "_")}`}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{category.description}</p>
              <div className={`inline-block px-2 py-1 rounded-full text-xs ${category.color}`}>
                {category.count} articles
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
