import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Home, Star, PenTool as Tool, TrendingUp } from 'lucide-react';
import { Property } from '../types/property';
import { useProperties } from '../context/PropertyContext';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();
  const { saveProperty, unsaveProperty } = useProperties();

  const handleViewDetails = () => {
    navigate(`/property/${property.id}`);
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (property.isSaved) {
      unsaveProperty(property.id);
    } else {
      saveProperty(property.id);
    }
  };

  const getRehabPotentialColor = (score: number) => {
    if (score >= 80) return 'bg-accent-100 text-accent-700';
    if (score >= 60) return 'bg-highlight-100 text-highlight-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div
      className="property-card card cursor-pointer h-full flex flex-col"
      onClick={handleViewDetails}
    >
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.address}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <button
          onClick={handleToggleSave}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md transition-colors hover:bg-gray-100"
        >
          <Heart
            size={20}
            className={property.isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
        <div className="absolute bottom-2 left-2 flex space-x-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getRehabPotentialColor(property.rehabPotential)}`}>
            <Tool size={12} className="mr-1" />
            Rehab: {property.rehabPotential}%
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 flex items-center">
            <TrendingUp size={12} className="mr-1" />
            ROI: {((property.potentialProfit / property.price) * 100).toFixed(0)}%
          </span>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{property.address}</h3>
            <p className="text-gray-600">{property.city}, {property.state} {property.zipCode}</p>
          </div>
          <p className="font-bold text-lg text-primary-600">${property.price.toLocaleString()}</p>
        </div>
        
        <div className="flex items-center justify-between mt-3 text-sm text-gray-700">
          <span className="flex items-center">
            <Home size={16} className="mr-1" />
            {property.bedrooms} bd
          </span>
          <span>{property.bathrooms} ba</span>
          <span>{property.squareFeet.toLocaleString()} sqft</span>
          <span>{property.yearBuilt}</span>
        </div>
        
        <p className="mt-3 text-sm text-gray-600 line-clamp-3">
          {property.description}
        </p>
        
        <div className="mt-4 flex items-center text-sm">
          <div className="flex items-center mr-4">
            <Star size={16} className="text-highlight-500 mr-1" />
            <span className="font-medium">Investment Score: {property.investmentScore}/100</span>
          </div>
        </div>
        
        <div className="mt-auto pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Est. Repairs: <span className="font-medium">${property.estimatedRepairCost.toLocaleString()}</span></span>
            <span className="text-gray-600">ARV: <span className="font-medium">${property.afterRepairValue.toLocaleString()}</span></span>
          </div>
          <div className="mt-2 text-sm text-accent-700 font-medium">
            Potential Profit: ${property.potentialProfit.toLocaleString()}
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 rounded-b-lg border-t border-gray-100">
        <button className="w-full btn btn-primary text-sm">
          View Property Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;