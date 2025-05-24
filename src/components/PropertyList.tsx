import React from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '../types/property';
import { Search } from 'lucide-react';

interface PropertyListProps {
  properties: Property[];
  isLoading: boolean;
  error: string | null;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64 bg-white rounded-lg shadow-md p-8">
        <Search className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No properties found</h3>
        <p className="text-gray-500 text-center">
          Try adjusting your filters or search criteria to find more properties.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;