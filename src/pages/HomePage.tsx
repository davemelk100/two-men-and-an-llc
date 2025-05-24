import React, { useState } from 'react';
import { MapPin, List, LayoutGrid } from 'lucide-react';
import PropertyMap from '../components/PropertyMap';
import PropertyList from '../components/PropertyList';
import PropertyFilters from '../components/PropertyFilters';
import { useProperties } from '../context/PropertyContext';

const HomePage: React.FC = () => {
  const { 
    filteredProperties, 
    isLoading, 
    error, 
    filters, 
    setFilters 
  } = useProperties();
  
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rehab Properties</h1>
          <p className="text-gray-600 mt-1">
            Find investment opportunities in Southeast Michigan
          </p>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center px-3 py-2 rounded-md ${
              viewMode === 'grid'
                ? 'bg-primary-100 text-primary-800'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LayoutGrid className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center px-3 py-2 rounded-md ${
              viewMode === 'map'
                ? 'bg-primary-100 text-primary-800'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MapPin className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Map</span>
          </button>
        </div>
      </div>
      
      <PropertyFilters filters={filters} setFilters={setFilters} />
      
      <div className="mb-4 bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
        <div className="flex items-center text-gray-600">
          <List className="h-5 w-5 mr-2" />
          <span>
            {isLoading 
              ? 'Loading properties...' 
              : `${filteredProperties.length} properties found`
            }
          </span>
        </div>
        <div>
          <select 
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            defaultValue="investment"
          >
            <option value="investment">Sort: Best Investment</option>
            <option value="rehab">Sort: Rehab Potential</option>
            <option value="price-low">Sort: Price (Low to High)</option>
            <option value="price-high">Sort: Price (High to Low)</option>
          </select>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <PropertyList 
          properties={filteredProperties}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <PropertyMap properties={filteredProperties} />
      )}
    </div>
  );
};

export default HomePage;