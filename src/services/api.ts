import axios from 'axios';
import { Property } from '../types/property';

const rapidApiKey = import.meta.env.VITE_RAPIDAPI_KEY;
const baseURL = 'https://realty-in-us.p.rapidapi.com';

const api = axios.create({
  baseURL,
  headers: {
    'X-RapidAPI-Key': rapidApiKey,
    'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
  }
});

export const fetchProperties = async (filters: any): Promise<Property[]> => {
  try {
    const { data } = await api.get('/properties/v2/list-for-sale', {
      params: {
        state_code: 'MI',
        offset: 0,
        limit: 50,
        sort: 'newest',
        prop_type: 'single_family,multi_family'
      }
    });

    // Ensure we have properties data
    const properties = data?.properties || [];
    
    return properties.map((p: any) => ({
      id: p.property_id || String(Math.random()),
      address: p.address.line || '',
      city: p.address.city || '',
      state: p.address.state_code || '',
      zipCode: p.address.postal_code || '',
      price: p.price || 0,
      bedrooms: p.beds || 0,
      bathrooms: p.baths || 0,
      squareFeet: p.building_size?.size || 0,
      yearBuilt: p.year_built || 0,
      description: p.description || '',
      images: p.photos?.map((photo: any) => photo.href) || [],
      lat: p.address.lat || 0,
      lng: p.address.lon || 0,
      rehabPotential: calculateRehabPotential(p),
      estimatedRepairCost: estimateRepairCost(p),
      afterRepairValue: calculateARV(p),
      potentialProfit: calculatePotentialProfit(p),
      investmentScore: calculateInvestmentScore(p),
      listingDate: p.list_date || new Date().toISOString(),
      isSaved: false,
      features: extractFeatures(p)
    }));
  } catch (error) {
    console.error('Error fetching properties:', error);
    return []; // Return empty array on error
  }
};

// Helper functions to calculate investment metrics
const calculateRehabPotential = (property: any): number => {
  const age = new Date().getFullYear() - (property.year_built || new Date().getFullYear());
  const pricePerSqft = property.price / (property.building_size?.size || 1);
  const areaAvgPricePerSqft = 150; // Average price per sqft in Detroit area
  
  let score = 70;
  
  if (age > 30) score += 15;
  else if (age > 20) score += 10;
  else if (age > 10) score += 5;
  
  if (pricePerSqft < areaAvgPricePerSqft * 0.7) score += 15;
  else if (pricePerSqft < areaAvgPricePerSqft * 0.8) score += 10;
  else if (pricePerSqft < areaAvgPricePerSqft * 0.9) score += 5;
  
  return Math.min(Math.max(score, 0), 100);
};

const estimateRepairCost = (property: any): number => {
  const age = new Date().getFullYear() - (property.year_built || new Date().getFullYear());
  const sqft = property.building_size?.size || 0;
  
  let costPerSqft = 15;
  if (age > 30) costPerSqft = 45;
  else if (age > 20) costPerSqft = 35;
  else if (age > 10) costPerSqft = 25;
  
  return Math.round(sqft * costPerSqft);
};

const calculateARV = (property: any): number => {
  const areaAvgPricePerSqft = 150;
  return Math.round((property.building_size?.size || 0) * areaAvgPricePerSqft * 0.95);
};

const calculatePotentialProfit = (property: any): number => {
  const arv = calculateARV(property);
  const repairCost = estimateRepairCost(property);
  const purchasePrice = property.price || 0;
  
  return Math.max(0, arv - (purchasePrice + repairCost));
};

const calculateInvestmentScore = (property: any): number => {
  const rehabPotential = calculateRehabPotential(property);
  const potentialProfit = calculatePotentialProfit(property);
  const roi = property.price ? (potentialProfit / property.price) * 100 : 0;
  
  let score = 60;
  
  if (roi > 30) score += 20;
  else if (roi > 20) score += 15;
  else if (roi > 10) score += 10;
  
  score += rehabPotential * 0.2;
  
  return Math.min(Math.max(Math.round(score), 0), 100);
};

const extractFeatures = (property: any): string[] => {
  const features = [];
  
  if (property.garage_spaces > 0) features.push('Garage');
  if ((property.lot_size?.size || 0) > 8000) features.push('Large Lot');
  if (property.has_basement) features.push('Basement');
  if (property.has_fireplace) features.push('Fireplace');
  if (property.has_pool) features.push('Pool');
  if (property.cooling_type === 'central') features.push('Central Air');
  
  return features;
};

export default api;