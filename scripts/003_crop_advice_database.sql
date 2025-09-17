-- Create crop_advice_database table for storing actual agricultural advice
CREATE TABLE IF NOT EXISTS public.crop_advice_database (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_name TEXT NOT NULL,
  advice_type TEXT NOT NULL, -- 'planting', 'care', 'harvest', 'disease', 'pest', 'fertilizer'
  season TEXT, -- 'spring', 'summer', 'monsoon', 'winter', 'all'
  soil_type TEXT, -- 'clay', 'sandy', 'loamy', 'black', 'red', 'all'
  region TEXT, -- 'north', 'south', 'east', 'west', 'central', 'all'
  advice_title TEXT NOT NULL,
  advice_text TEXT NOT NULL,
  tips TEXT[], -- Array of practical tips
  warning TEXT, -- Important warnings or precautions
  best_practices TEXT[], -- Array of best practices
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert comprehensive crop advice data
INSERT INTO public.crop_advice_database (crop_name, advice_type, season, soil_type, region, advice_title, advice_text, tips, warning, best_practices) VALUES

-- Rice Advice
('Rice', 'planting', 'monsoon', 'clay', 'all', 'Rice Planting Guidelines', 
'Rice should be planted during monsoon season when there is adequate water supply. Prepare the field by plowing and puddling to create a muddy consistency perfect for rice cultivation.',
ARRAY['Soak seeds for 24 hours before sowing', 'Maintain 2-3 inches of standing water', 'Plant seedlings 15-20 cm apart', 'Use certified seeds for better yield'],
'Avoid planting in waterlogged conditions that may cause seed rot',
ARRAY['Prepare nursery beds 30 days before transplanting', 'Apply organic manure before planting', 'Ensure proper drainage channels']),

('Rice', 'care', 'all', 'clay', 'all', 'Rice Crop Management',
'Maintain consistent water levels throughout the growing period. Apply fertilizers in split doses - nitrogen at planting, tillering, and panicle initiation stages.',
ARRAY['Keep 2-3 inches water level constantly', 'Weed regularly in first 45 days', 'Apply urea in 3 split doses', 'Monitor for pest attacks'],
'Never let the field completely dry during grain filling stage',
ARRAY['Use integrated pest management', 'Apply potash during panicle initiation', 'Maintain proper plant spacing']),

-- Wheat Advice  
('Wheat', 'planting', 'winter', 'loamy', 'north', 'Wheat Sowing Best Practices',
'Wheat should be sown in November-December when temperature ranges between 10-25°C. Prepare a fine seedbed with proper moisture content.',
ARRAY['Sow seeds at 2-3 cm depth', 'Use seed rate of 100-125 kg/hectare', 'Ensure soil moisture before sowing', 'Apply basal fertilizers'],
'Late sowing after December reduces yield significantly',
ARRAY['Use certified seeds', 'Treat seeds with fungicide', 'Maintain row spacing of 20-23 cm']),

('Wheat', 'fertilizer', 'winter', 'all', 'north', 'Wheat Fertilizer Management',
'Apply balanced fertilization with NPK in ratio 120:60:40 kg/hectare. Split nitrogen application for better utilization.',
ARRAY['Apply full phosphorus and potash at sowing', 'Give nitrogen in 2-3 splits', 'First nitrogen dose at 20-25 days', 'Second dose at tillering stage'],
'Excess nitrogen can cause lodging and disease susceptibility',
ARRAY['Soil test before fertilizer application', 'Use organic manure along with chemical fertilizers', 'Apply micronutrients if deficient']),

-- Cotton Advice
('Cotton', 'planting', 'summer', 'black', 'central', 'Cotton Cultivation Guidelines',
'Cotton requires warm weather and adequate moisture. Plant when soil temperature reaches 18°C and maintain proper spacing for good aeration.',
ARRAY['Plant seeds 2-3 cm deep', 'Maintain 45-60 cm row spacing', 'Use 1.5-2 kg seeds per hectare', 'Ensure good drainage'],
'Avoid planting in waterlogged or saline soils',
ARRAY['Use certified Bt cotton seeds', 'Apply organic matter before planting', 'Install drip irrigation if possible']),

('Cotton', 'pest', 'all', 'all', 'all', 'Cotton Pest Management',
'Cotton is susceptible to bollworm, aphids, and whitefly. Implement integrated pest management with regular monitoring.',
ARRAY['Install pheromone traps', 'Spray neem oil for early control', 'Use biological pesticides first', 'Monitor weekly for pest damage'],
'Overuse of chemical pesticides can lead to resistance',
ARRAY['Maintain beneficial insects', 'Rotate different pesticide groups', 'Use sticky traps for monitoring']),

-- Tomato Advice
('Tomato', 'planting', 'winter', 'loamy', 'all', 'Tomato Cultivation',
'Tomatoes grow best in cool, dry weather. Prepare raised beds with good drainage and organic matter incorporation.',
ARRAY['Start with nursery seedlings', 'Transplant 4-5 week old seedlings', 'Space plants 45-60 cm apart', 'Provide support stakes'],
'Avoid planting during heavy rains to prevent fungal diseases',
ARRAY['Use disease-resistant varieties', 'Apply mulching around plants', 'Ensure proper air circulation']),

('Tomato', 'disease', 'all', 'all', 'all', 'Tomato Disease Management',
'Common diseases include early blight, late blight, and bacterial wilt. Prevention is better than cure through proper cultural practices.',
ARRAY['Remove infected plant parts immediately', 'Avoid overhead watering', 'Apply copper-based fungicides', 'Rotate crops annually'],
'Bacterial wilt has no cure - prevention is essential',
ARRAY['Use certified disease-free seeds', 'Maintain field sanitation', 'Avoid working in wet conditions']),

-- Sugarcane Advice
('Sugarcane', 'planting', 'spring', 'all', 'all', 'Sugarcane Planting Method',
'Plant sugarcane using healthy seed cane with 2-3 buds per sett. Ensure proper soil preparation and moisture.',
ARRAY['Use 3-bud setts for planting', 'Plant in furrows 4-5 cm deep', 'Maintain 90-120 cm row spacing', 'Apply organic manure'],
'Avoid using diseased or old cane for planting',
ARRAY['Treat setts with fungicide', 'Ensure continuous moisture for 15 days', 'Apply balanced fertilization']),

-- Maize Advice
('Maize', 'planting', 'summer', 'all', 'all', 'Maize Sowing Guidelines',
'Maize requires well-drained soil and adequate moisture during grain filling. Plant when soil temperature is above 15°C.',
ARRAY['Sow seeds 3-4 cm deep', 'Maintain 60-75 cm row spacing', 'Use 20-25 kg seeds per hectare', 'Ensure uniform plant population'],
'Avoid planting in waterlogged conditions',
ARRAY['Use hybrid varieties for better yield', 'Apply starter fertilizer', 'Maintain weed-free conditions']),

-- Soybean Advice
('Soybean', 'planting', 'monsoon', 'all', 'central', 'Soybean Cultivation',
'Soybean is a monsoon crop requiring good drainage. Plant early in monsoon for better pod filling.',
ARRAY['Sow seeds 2-3 cm deep', 'Use 75-80 kg seeds per hectare', 'Inoculate seeds with rhizobium', 'Maintain 30-45 cm row spacing'],
'Late planting reduces yield due to shorter day length',
ARRAY['Use certified seeds', 'Apply phosphorus and potash', 'Avoid excess nitrogen fertilizer']);

-- Allow public read access to crop advice database
CREATE POLICY "crop_advice_database_select_all" ON public.crop_advice_database FOR SELECT TO authenticated USING (true);
