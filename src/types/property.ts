export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  description: string;
  images: string[];
  lat: number;
  lng: number;
  rehabPotential: number; // 0-100 score
  estimatedRepairCost: number;
  afterRepairValue: number;
  potentialProfit: number;
  investmentScore: number; // 0-100 score
  listingDate: string;
  isSaved: boolean;
  features: string[];
}

export interface PropertyFilters {
  location: string;
  minPrice: number | null;
  maxPrice: number | null;
  minBeds: number | null;
  minBaths: number | null;
  minRehabPotential: number | null;
  minSquareFeet: number | null;
  maxYearBuilt: number | null;
}

export interface PropertyAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  aiSummary: string;
}