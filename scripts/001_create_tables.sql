-- Create users profile table for farmer information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  location TEXT,
  farm_size DECIMAL,
  primary_crops TEXT[],
  language_preference TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create crops table for crop information
CREATE TABLE IF NOT EXISTS public.crops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  scientific_name TEXT,
  category TEXT,
  growing_season TEXT,
  water_requirements TEXT,
  soil_type TEXT,
  climate_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create crop_advice table for AI-generated advice
CREATE TABLE IF NOT EXISTS public.crop_advice (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  crop_id UUID REFERENCES public.crops(id),
  advice_type TEXT NOT NULL, -- 'planting', 'care', 'harvest', 'disease', 'pest'
  advice_text TEXT NOT NULL,
  confidence_score DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create weather_alerts table
CREATE TABLE IF NOT EXISTS public.weather_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL,
  alert_type TEXT NOT NULL, -- 'rain', 'drought', 'storm', 'temperature'
  severity TEXT NOT NULL, -- 'low', 'medium', 'high'
  message TEXT NOT NULL,
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create market_prices table
CREATE TABLE IF NOT EXISTS public.market_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_name TEXT NOT NULL,
  location TEXT NOT NULL,
  price_per_kg DECIMAL NOT NULL,
  market_name TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create schemes table for government subsidies
CREATE TABLE IF NOT EXISTS public.schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  eligibility_criteria TEXT,
  benefits TEXT,
  application_process TEXT,
  deadline DATE,
  state TEXT,
  category TEXT, -- 'subsidy', 'loan', 'insurance', 'training'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feature_type TEXT NOT NULL, -- 'crop_advice', 'weather', 'market', 'scheme'
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create learning_content table
CREATE TABLE IF NOT EXISTS public.learning_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL, -- 'article', 'video', 'infographic'
  category TEXT NOT NULL, -- 'farming_techniques', 'pest_control', 'soil_health', 'marketing'
  language TEXT DEFAULT 'en',
  difficulty_level TEXT DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_advice ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Create RLS policies for crop_advice
CREATE POLICY "crop_advice_select_own" ON public.crop_advice FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "crop_advice_insert_own" ON public.crop_advice FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "crop_advice_update_own" ON public.crop_advice FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "crop_advice_delete_own" ON public.crop_advice FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for feedback
CREATE POLICY "feedback_select_own" ON public.feedback FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "feedback_insert_own" ON public.feedback FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "feedback_update_own" ON public.feedback FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "feedback_delete_own" ON public.feedback FOR DELETE USING (auth.uid() = user_id);

-- Allow public read access to reference tables
CREATE POLICY "crops_select_all" ON public.crops FOR SELECT TO authenticated USING (true);
CREATE POLICY "weather_alerts_select_all" ON public.weather_alerts FOR SELECT TO authenticated USING (true);
CREATE POLICY "market_prices_select_all" ON public.market_prices FOR SELECT TO authenticated USING (true);
CREATE POLICY "schemes_select_all" ON public.schemes FOR SELECT TO authenticated USING (true);
CREATE POLICY "learning_content_select_all" ON public.learning_content FOR SELECT TO authenticated USING (true);
