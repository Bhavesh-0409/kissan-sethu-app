export interface Profile {
  id: string
  full_name?: string
  phone?: string
  location?: string
  farm_size?: number
  primary_crops?: string[]
  language_preference?: string
  created_at: string
  updated_at: string
}

export interface Crop {
  id: string
  name: string
  scientific_name?: string
  category?: string
  growing_season?: string
  water_requirements?: string
  soil_type?: string
  climate_requirements?: string
  created_at: string
}

export interface CropAdvice {
  id: string
  user_id: string
  crop_id?: string
  advice_type: "planting" | "care" | "harvest" | "disease" | "pest"
  advice_text: string
  confidence_score?: number
  created_at: string
}

export interface WeatherAlert {
  id: string
  location: string
  alert_type: "rain" | "drought" | "storm" | "temperature"
  severity: "low" | "medium" | "high"
  message: string
  valid_until?: string
  created_at: string
}

export interface MarketPrice {
  id: string
  crop_name: string
  location: string
  price_per_kg: number
  market_name?: string
  date: string
  created_at: string
}

export interface Scheme {
  id: string
  name: string
  description: string
  eligibility_criteria?: string
  benefits?: string
  application_process?: string
  deadline?: string
  state?: string
  category: "subsidy" | "loan" | "insurance" | "training"
  is_active: boolean
  official_url?: string
  created_at: string
}

export interface Feedback {
  id: string
  user_id: string
  feature_type: "crop_advice" | "weather" | "market" | "scheme"
  rating: number
  comment?: string
  created_at: string
}

export interface LearningContent {
  id: string
  title: string
  content: string
  content_type: "article" | "video" | "infographic"
  category: "farming_techniques" | "pest_control" | "soil_health" | "marketing"
  language: string
  difficulty_level: "beginner" | "intermediate" | "advanced"
  created_at: string
}
