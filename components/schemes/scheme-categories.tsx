import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Scheme } from "@/lib/types"

interface SchemeCategoriesProps {
  schemes: Scheme[]
}

export function SchemeCategories({ schemes }: SchemeCategoriesProps) {
  const categories = [
    {
      name: "Subsidies",
      key: "subsidy",
      description: "Direct financial assistance for farming activities",
      icon: "💰",
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Loans",
      key: "loan",
      description: "Low-interest credit facilities for farmers",
      icon: "🏦",
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Insurance",
      key: "insurance",
      description: "Crop and livestock insurance schemes",
      icon: "🛡️",
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "Training",
      key: "training",
      description: "Skill development and training programs",
      icon: "📚",
      color: "bg-orange-100 text-orange-800",
    },
  ]

  const getCategoryCount = (key: string) => {
    return schemes.filter((scheme) => scheme.category === key).length
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Scheme Categories</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const count = getCategoryCount(category.key)
          return (
            <Card key={category.key} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                <Badge className={category.color}>{count} schemes</Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
