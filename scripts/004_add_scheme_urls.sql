-- Add official_url field to schemes table
ALTER TABLE public.schemes ADD COLUMN IF NOT EXISTS official_url TEXT;

-- Update existing schemes with actual government website URLs
UPDATE public.schemes SET official_url = CASE 
  WHEN name LIKE '%PM-KISAN%' THEN 'https://pmkisan.gov.in/'
  WHEN name LIKE '%Crop Insurance%' OR name LIKE '%PMFBY%' THEN 'https://pmfby.gov.in/'
  WHEN name LIKE '%KCC%' OR name LIKE '%Kisan Credit Card%' THEN 'https://www.nabard.org/auth/writereaddata/tender/1608180417KCC%20Guidelines%20Final.pdf'
  WHEN name LIKE '%Soil Health%' THEN 'https://soilhealth.dac.gov.in/'
  WHEN name LIKE '%Organic%' OR name LIKE '%PKVY%' THEN 'https://pgsindia-ncof.gov.in/'
  WHEN name LIKE '%Micro Irrigation%' OR name LIKE '%PMKSY%' THEN 'https://pmksy.gov.in/'
  WHEN name LIKE '%FPO%' OR name LIKE '%Producer Organization%' THEN 'https://sfac.in/fpo'
  WHEN name LIKE '%Krishi Vigyan%' OR name LIKE '%KVK%' THEN 'https://kvk.icar.gov.in/'
  WHEN name LIKE '%e-NAM%' OR name LIKE '%National Agriculture Market%' THEN 'https://enam.gov.in/'
  WHEN name LIKE '%Rashtriya Krishi%' OR name LIKE '%RKVY%' THEN 'https://rkvy.nic.in/'
  ELSE 'https://agricoop.nic.in/'
END;

-- Insert some additional real government schemes with URLs
INSERT INTO public.schemes (name, description, eligibility_criteria, benefits, application_process, state, category, official_url) VALUES
('PM-KISAN Samman Nidhi', 'Direct income support to farmers providing ₹6000 per year in three installments', 'Small and marginal farmers with cultivable land', '₹2000 per installment, 3 times a year', 'Register on PM-KISAN portal with Aadhaar and land documents', 'All India', 'subsidy', 'https://pmkisan.gov.in/'),
('Pradhan Mantri Fasal Bima Yojana (PMFBY)', 'Comprehensive crop insurance scheme covering pre-sowing to post-harvest losses', 'All farmers growing notified crops', 'Up to 90% premium subsidy, quick claim settlement', 'Apply through banks, CSCs, or insurance companies', 'All India', 'insurance', 'https://pmfby.gov.in/'),
('Kisan Credit Card (KCC)', 'Credit facility for farmers to meet agricultural and allied activities', 'Farmers with land ownership or tenant farmers', 'Easy credit access, lower interest rates, flexible repayment', 'Apply at nearest bank branch with land documents', 'All India', 'loan', 'https://www.nabard.org/auth/writereaddata/tender/1608180417KCC%20Guidelines%20Final.pdf'),
('Soil Health Card Scheme', 'Provides soil nutrient status and recommendations for appropriate dosage of nutrients', 'All farmers', 'Free soil testing, customized fertilizer recommendations', 'Contact local agriculture department or soil testing labs', 'All India', 'subsidy', 'https://soilhealth.dac.gov.in/'),
('Paramparagat Krishi Vikas Yojana (PKVY)', 'Promotes organic farming through cluster approach', 'Farmers willing to adopt organic farming', '₹50,000 per hectare over 3 years, organic certification', 'Form farmer groups and apply through state agriculture department', 'All India', 'subsidy', 'https://pgsindia-ncof.gov.in/'),
('e-National Agriculture Market (e-NAM)', 'Online trading platform for agricultural commodities', 'Farmers, traders, buyers registered on platform', 'Better price discovery, transparent transactions', 'Register on e-NAM portal with required documents', 'All India', 'training', 'https://enam.gov.in/');
