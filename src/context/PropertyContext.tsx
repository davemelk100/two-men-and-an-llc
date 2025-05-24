import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Property, PropertyFilters } from '../types/property';
import { fetchProperties } from '../services/api';

interface PropertyContextType {
  properties: Property[];
  filteredProperties: Property[];
  isLoading: boolean;
  error: string | null;
  selectedProperty: Property | null;
  savedProperties: Property[];
  filters: PropertyFilters;
  setFilters: (filters: PropertyFilters) => void;
  selectProperty: (id: string) => void;
  saveProperty: (id: string) => void;
  unsaveProperty: (id: string) => void;
  analyzeWithAI: (propertyId: string) => Promise<void>;
}

const defaultFilters: PropertyFilters = {
  location: '',
  minPrice: null,
  maxPrice: null,
  minBeds: null,
  minBaths: null,
  minRehabPotential: null,
  minSquareFeet: null,
  maxYearBuilt: null,
};

const PropertyContext = createContext<PropertyContextType>({
  properties: [],
  filteredProperties: [],
  isLoading: false,
  error: null,
  selectedProperty: null,
  savedProperties: [],
  filters: defaultFilters,
  setFilters: () => {},
  selectProperty: () => {},
  saveProperty: () => {},
  unsaveProperty: () => {},
  analyzeWithAI: async () => {},
});

export const useProperties = () => useContext(PropertyContext);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);

  const { data: properties = [], isLoading, error } = useQuery(
    ['properties', filters],
    () => fetchProperties(filters),
    {
      refetchOnWindowFocus: false,
      staleTime: 300000, // 5 minutes
    }
  );

  // Apply filters to the properties array (ensuring it exists first)
  const filteredProperties = properties ? properties.filter(property => {
    if (filters.location && !property.city.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }
    if (filters.minBeds && property.bedrooms < filters.minBeds) {
      return false;
    }
    if (filters.minBaths && property.bathrooms < filters.minBaths) {
      return false;
    }
    if (filters.minRehabPotential && property.rehabPotential < filters.minRehabPotential) {
      return false;
    }
    if (filters.minSquareFeet && property.squareFeet < filters.minSquareFeet) {
      return false;
    }
    if (filters.maxYearBuilt && property.yearBuilt > filters.maxYearBuilt) {
      return false;
    }
    return true;
  }) : [];

  // Load saved properties from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedProperties');
    if (saved && properties) {
      const savedIds = JSON.parse(saved) as string[];
      const savedProps = properties.filter(property => savedIds.includes(property.id));
      setSavedProperties(savedProps);
      
      // Update isSaved property
      properties.forEach(property => {
        property.isSaved = savedIds.includes(property.id);
      });
    }
  }, [properties]);

  const selectProperty = (id: string) => {
    const property = properties?.find(p => p.id === id) || null;
    setSelectedProperty(property);
  };

  const saveProperty = (id: string) => {
    const propertyToSave = properties?.find(p => p.id === id);
    if (propertyToSave) {
      propertyToSave.isSaved = true;
      const updatedSavedProperties = [...savedProperties, propertyToSave];
      setSavedProperties(updatedSavedProperties);
      
      // Save to localStorage
      const savedIds = updatedSavedProperties.map(p => p.id);
      localStorage.setItem('savedProperties', JSON.stringify(savedIds));
    }
  };

  const unsaveProperty = (id: string) => {
    const updatedSavedProperties = savedProperties.filter(p => p.id !== id);
    setSavedProperties(updatedSavedProperties);
    
    // Update isSaved status
    const property = properties?.find(p => p.id === id);
    if (property) {
      property.isSaved = false;
    }
    
    // Update localStorage
    const savedIds = updatedSavedProperties.map(p => p.id);
    localStorage.setItem('savedProperties', JSON.stringify(savedIds));
  };

  const analyzeWithAI = async (propertyId: string) => {
    // Implementation remains the same
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`Property ${propertyId} analyzed with OpenAI`);
    } catch (err) {
      console.error('Failed to analyze property with AI:', err);
    }
  };

  return (
    <PropertyContext.Provider
      value={{
        properties: properties || [],
        filteredProperties,
        isLoading,
        error: error ? 'Failed to fetch properties' : null,
        selectedProperty,
        savedProperties,
        filters,
        setFilters,
        selectProperty,
        saveProperty,
        unsaveProperty,
        analyzeWithAI,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};