-- Insert sample crops data
INSERT INTO public.crops (name, scientific_name, category, growing_season, water_requirements, soil_type, climate_requirements) VALUES
('Rice', 'Oryza sativa', 'Cereal', 'Kharif', 'High', 'Clay loam', 'Tropical'),
('Wheat', 'Triticum aestivum', 'Cereal', 'Rabi', 'Medium', 'Loam', 'Temperate'),
('Cotton', 'Gossypium', 'Cash Crop', 'Kharif', 'Medium', 'Black soil', 'Semi-arid'),
('Sugarcane', 'Saccharum officinarum', 'Cash Crop', 'Year-round', 'High', 'Rich loam', 'Tropical'),
('Tomato', 'Solanum lycopersicum', 'Vegetable', 'Year-round', 'Medium', 'Well-drained loam', 'Warm temperate'),
('Onion', 'Allium cepa', 'Vegetable', 'Rabi', 'Low', 'Sandy loam', 'Cool temperate'),
('Potato', 'Solanum tuberosum', 'Vegetable', 'Rabi', 'Medium', 'Sandy loam', 'Cool temperate'),
('Maize', 'Zea mays', 'Cereal', 'Kharif', 'Medium', 'Well-drained loam', 'Warm temperate');

-- Insert sample schemes data
INSERT INTO public.schemes (name, description, eligibility_criteria, benefits, application_process, deadline, state, category, is_active) VALUES
('PM-KISAN', 'Direct income support to farmers', 'Small and marginal farmers with cultivable land', 'Rs. 6000 per year in 3 installments', 'Online application through PM-KISAN portal', '2024-12-31', 'All India', 'subsidy', true),
('Crop Insurance Scheme', 'Insurance coverage for crop losses', 'All farmers growing notified crops', 'Coverage against natural calamities', 'Through banks and insurance companies', '2024-12-31', 'All India', 'insurance', true),
('Soil Health Card Scheme', 'Soil testing and nutrient management', 'All farmers', 'Free soil testing and recommendations', 'Through agriculture department', '2024-12-31', 'All India', 'training', true),
('Kisan Credit Card', 'Credit facility for farmers', 'Farmers with land ownership documents', 'Low interest agricultural loans', 'Through banks', '2024-12-31', 'All India', 'loan', true);

-- Insert sample learning content
INSERT INTO public.learning_content (title, content, content_type, category, language, difficulty_level) VALUES
('Organic Farming Basics', 'Learn the fundamentals of organic farming including soil preparation, natural fertilizers, and pest control methods.', 'article', 'farming_techniques', 'en', 'beginner'),
('Integrated Pest Management', 'Comprehensive guide to managing pests using biological, cultural, and chemical methods in an integrated approach.', 'article', 'pest_control', 'en', 'intermediate'),
('Soil Health Management', 'Understanding soil composition, pH levels, nutrient management, and maintaining soil fertility for better crop yields.', 'article', 'soil_health', 'en', 'beginner'),
('Digital Marketing for Farmers', 'How to use digital platforms to market your produce directly to consumers and get better prices.', 'article', 'marketing', 'en', 'intermediate');

-- Insert sample market prices
INSERT INTO public.market_prices (crop_name, location, price_per_kg, market_name, date) VALUES
('Rice', 'Delhi', 25.50, 'Azadpur Mandi', CURRENT_DATE),
('Wheat', 'Punjab', 22.00, 'Ludhiana Mandi', CURRENT_DATE),
('Tomato', 'Maharashtra', 18.00, 'Pune Market', CURRENT_DATE),
('Onion', 'Karnataka', 12.50, 'Bangalore Market', CURRENT_DATE),
('Cotton', 'Gujarat', 5500.00, 'Ahmedabad Cotton Market', CURRENT_DATE),
('Sugarcane', 'Uttar Pradesh', 350.00, 'Lucknow Sugar Mill', CURRENT_DATE);
