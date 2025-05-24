import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { Property } from '../types/property';
import { Home } from 'lucide-react';

interface PropertyMapProps {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ 
  properties,
  center = [42.3314, -83.0458], // Default center for Detroit area
  zoom = 9 // Wider view to show more of Southeast Michigan
}) => {
  const navigate = useNavigate();
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);

  const getMarkerColor = (rehabPotential: number) => {
    if (rehabPotential >= 80) return 'text-accent-500';
    if (rehabPotential >= 60) return 'text-highlight-500';
    return 'text-primary-500';
  };

  const handleMarkerClick = (property: Property) => {
    setActiveProperty(property);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="h-[500px] md:h-[600px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((property) => (
          <Marker 
            key={property.id}
            position={[property.lat, property.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(property),
            }}
          >
            <Popup className="property-popup">
              <div className="w-64">
                <img 
                  src={property.images[0]} 
                  alt={property.address}
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <h3 className="font-semibold text-base">{property.address}</h3>
                <p className="text-gray-700 text-sm">{property.city}, {property.state} {property.zipCode}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold text-primary-600">${property.price.toLocaleString()}</p>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center justify-center p-1 rounded-full ${getMarkerColor(property.rehabPotential)}`}>
                      <Home size={16} />
                    </span>
                    <span className="ml-1 text-sm font-medium">{property.rehabPotential}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-700">
                  <span>{property.bedrooms} bd</span>
                  <span>{property.bathrooms} ba</span>
                  <span>{property.squareFeet.toLocaleString()} sqft</span>
                </div>
                <button
                  onClick={() => handleViewDetails(property.id)}
                  className="mt-3 w-full btn btn-primary text-sm py-1"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;