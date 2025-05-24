import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { PropertyFilters as PropertyFiltersType } from '../types/property';

interface PropertyFiltersProps {
  filters: PropertyFiltersType;
  setFilters: (filters: PropertyFiltersType) => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convert number inputs to numbers or null
    if (['minPrice', 'maxPrice', 'minBeds', 'minBaths', 'minRehabPotential', 'minSquareFeet', 'maxYearBuilt'].includes(name)) {
      setFilters({
        ...filters,
        [name]: value === '' ? null : Number(value),
      });
    } else {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  const handleClearFilters = () => {
    setFilters({
      location: '',
      minPrice: null,
      maxPrice: null,
      minBeds: null,
      minBaths: null,
      minRehabPotential: null,
      minSquareFeet: null,
      maxYearBuilt: null,
    });
  };

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleClearFilters}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </button>
            <button 
              onClick={toggleFilters}
              className="flex items-center text-sm text-primary-600 hover:text-primary-800 md:hidden"
            >
              {isOpen ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Hide
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className={`mt-4 md:block ${isOpen ? 'block' : 'hidden'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div>
              <label htmlFor="location" className="label">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={filters.location}
                onChange={handleChange}
                placeholder="City, address, or ZIP"
                className="input"
              />
            </div>
            
            <div>
              <label htmlFor="minPrice" className="label">Min Price</label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.minPrice === null ? '' : filters.minPrice}
                onChange={handleChange}
                placeholder="Min $"
                className="input"
              />
            </div>
            
            <div>
              <label htmlFor="maxPrice" className="label">Max Price</label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice === null ? '' : filters.maxPrice}
                onChange={handleChange}
                placeholder="Max $"
                className="input"
              />
            </div>
            
            <div>
              <label htmlFor="minBeds" className="label">Beds</label>
              <select
                id="minBeds"
                name="minBeds"
                value={filters.minBeds === null ? '' : filters.minBeds}
                onChange={handleChange}
                className="select"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="minBaths" className="label">Baths</label>
              <select
                id="minBaths"
                name="minBaths"
                value={filters.minBaths === null ? '' : filters.minBaths}
                onChange={handleChange}
                className="select"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="1.5">1.5+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="minRehabPotential" className="label">Min Rehab Potential</label>
              <select
                id="minRehabPotential"
                name="minRehabPotential"
                value={filters.minRehabPotential === null ? '' : filters.minRehabPotential}
                onChange={handleChange}
                className="select"
              >
                <option value="">Any</option>
                <option value="50">50+</option>
                <option value="60">60+</option>
                <option value="70">70+</option>
                <option value="80">80+</option>
                <option value="90">90+</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="minSquareFeet" className="label">Min Square Feet</label>
              <input
                type="number"
                id="minSquareFeet"
                name="minSquareFeet"
                value={filters.minSquareFeet === null ? '' : filters.minSquareFeet}
                onChange={handleChange}
                placeholder="Min sqft"
                className="input"
              />
            </div>
            
            <div>
              <label htmlFor="maxYearBuilt" className="label">Max Year Built</label>
              <input
                type="number"
                id="maxYearBuilt"
                name="maxYearBuilt"
                value={filters.maxYearBuilt === null ? '' : filters.maxYearBuilt}
                onChange={handleChange}
                placeholder="Max year"
                className="input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;