"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { Scheme } from "@/lib/types"

interface SchemeListProps {
  schemes: Scheme[]
  userLocation?: string
}

export function SchemeList({ schemes, userLocation }: SchemeListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stateFilter, setStateFilter] = useState("all")

  // Get unique values for filters
  const categories = Array.from(new Set(schemes.map((scheme) => scheme.category)))
  const states = Array.from(new Set(schemes.map((scheme) => scheme.state).filter(Boolean)))

  // Filter schemes
  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || scheme.category === categoryFilter
    const matchesState = stateFilter === "all" || scheme.state === stateFilter || scheme.state === "All India"

    return matchesSearch && matchesCategory && matchesState
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "subsidy":
        return "bg-green-100 text-green-800"
      case "loan":
        return "bg-blue-100 text-blue-800"
      case "insurance":
        return "bg-purple-100 text-purple-800"
      case "training":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDeadline = (deadline: string | null) => {
    if (!deadline) return "No deadline"
    const date = new Date(deadline)
    const now = new Date()
    const diffInDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays < 0) return "Expired"
    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Tomorrow"
    if (diffInDays <= 30) return `${diffInDays} days left`
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  }

  const getDeadlineColor = (deadline: string | null) => {
    if (!deadline) return "bg-gray-100 text-gray-800"
    const date = new Date(deadline)
    const now = new Date()
    const diffInDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays < 0) return "bg-red-100 text-red-800"
    if (diffInDays <= 7) return "bg-yellow-100 text-yellow-800"
    if (diffInDays <= 30) return "bg-orange-100 text-orange-800"
    return "bg-green-100 text-green-800"
  }

  const handleSchemeClick = (url: string | null, schemeName: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    } else {
      // Fallback to general agriculture department website
      window.open("https://agricoop.nic.in/", "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Available Schemes</h2>
        <div className="text-sm text-gray-500">{filteredSchemes.length} schemes found</div>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Input placeholder="Search schemes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={stateFilter} onValueChange={setStateFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All states" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            {userLocation && <SelectItem value={userLocation}>My Location ({userLocation})</SelectItem>}
            {states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Scheme Cards */}
      {filteredSchemes.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg font-medium">No schemes found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredSchemes.map((scheme) => (
            <Card
              key={scheme.id}
              className="hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-l-green-500 hover:border-l-green-600"
              onClick={() => handleSchemeClick(scheme.official_url, scheme.name)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 flex items-center gap-2 text-green-700 hover:text-green-800">
                      {scheme.name}
                      <ExternalLink className="h-4 w-4" />
                    </CardTitle>
                    <p className="text-gray-600 mb-3">{scheme.description}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getCategoryColor(scheme.category)}>
                        {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)}
                      </Badge>
                      <Badge variant="outline">{scheme.state}</Badge>
                      {scheme.deadline && (
                        <Badge className={getDeadlineColor(scheme.deadline)}>{formatDeadline(scheme.deadline)}</Badge>
                      )}
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Official Website
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Eligibility Criteria</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {scheme.eligibility_criteria || "Contact local authorities for eligibility details"}
                    </p>

                    <h4 className="font-medium mb-2">Benefits</h4>
                    <p className="text-sm text-gray-600">
                      {scheme.benefits || "Various benefits available - check official documentation"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Application Process</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {scheme.application_process || "Visit local agriculture office or apply online"}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSchemeClick(scheme.official_url, scheme.name)
                        }}
                      >
                        Visit Official Site
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSchemeClick(scheme.official_url, scheme.name)
                        }}
                      >
                        Apply Now
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
