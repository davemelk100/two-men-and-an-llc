import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, MapPin, Calendar, Home, Ruler, DollarSign, PenTool as Tool, TrendingUp, Clock, Hammer, BuildingIcon } from 'lucide-react';
import PropertyMap from '../components/PropertyMap';
import PropertyAnalysis from '../components/PropertyAnalysis';
import { useProperties } from '../context/PropertyContext';

const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    properties, 
    selectProperty, 
    selectedProperty, 
    saveProperty, 
    unsaveProperty,
    analyzeWithAI,
    isLoading
  } = useProperties();
  
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) {
      selectProperty(id);
    }
  }, [id, selectProperty]);

  if (!selectedProperty) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleSave = () => {
    if (selectedProperty.isSaved) {
      unsaveProperty(selectedProperty.id);
    } else {
      saveProperty(selectedProperty.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={handleBack}
        className="flex items-center text-primary-600 hover:text-primary-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        Back to properties
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="relative">
              <img
                src={selectedProperty.images[activeImage]}
                alt={selectedProperty.address}
                className="w-full h-[400px] object-cover"
              />
              <button
                onClick={handleToggleSave}
                className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md transition-colors hover:bg-gray-100"
              >
                <Heart
                  size={24}
                  className={selectedProperty.isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                />
              </button>
              
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <div className="flex space-x-2 bg-black bg-opacity-30 rounded-full px-3 py-1">
                  {selectedProperty.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`h-2 w-2 rounded-full ${
                        activeImage === index ? 'bg-white' : 'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                <h1 className="text-2xl font-bold">{selectedProperty.address}</h1>
                <p className="text-2xl font-bold text-primary-600 mt-2 md:mt-0">
                  ${selectedProperty.price.toLocaleString()}
                </p>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-1" />
                <span>
                  {selectedProperty.city}, {selectedProperty.state} {selectedProperty.zipCode}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm flex items-center">
                    <Home className="h-4 w-4 mr-1" />
                    Bedrooms
                  </span>
                  <span className="font-medium">{selectedProperty.bedrooms}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm flex items-center">
                    <BuildingIcon className="h-4 w-4 mr-1" />
                    Bathrooms
                  </span>
                  <span className="font-medium">{selectedProperty.bathrooms}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm flex items-center">
                    <Ruler className="h-4 w-4 mr-1" />
                    Square Feet
                  </span>
                  <span className="font-medium">{selectedProperty.squareFeet.toLocaleString()}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Year Built
                  </span>
                  <span className="font-medium">{selectedProperty.yearBuilt}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700">{selectedProperty.description}</p>
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <h2 className="text-xl font-semibold mb-3">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedProperty.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <h2 className="text-xl font-semibold mb-3">Investment Metrics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Tool className="h-5 w-5 mr-1 text-highlight-500" />
                      <span className="text-sm">Estimated Repair Cost</span>
                    </div>
                    <p className="text-lg font-semibold">
                      ${selectedProperty.estimatedRepairCost.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 mb-1">
                      <DollarSign className="h-5 w-5 mr-1 text-accent-500" />
                      <span className="text-sm">After Repair Value</span>
                    </div>
                    <p className="text-lg font-semibold">
                      ${selectedProperty.afterRepairValue.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-gray-600 mb-1">
                      <TrendingUp className="h-5 w-5 mr-1 text-primary-500" />
                      <span className="text-sm">Potential Profit</span>
                    </div>
                    <p className="text-lg font-semibold text-primary-600">
                      ${selectedProperty.potentialProfit.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center bg-primary-50 p-4 rounded-lg">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <Hammer className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Rehab Potential</p>
                    <p className="text-xl font-bold text-primary-800">{selectedProperty.rehabPotential}%</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">Listed</p>
                    <p className="text-xl font-bold text-primary-800">
                      {new Date(selectedProperty.listingDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="h-[400px] rounded-lg overflow-hidden">
                <PropertyMap 
                  properties={[selectedProperty]} 
                  center={[selectedProperty.lat, selectedProperty.lng]}
                  zoom={14}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <PropertyAnalysis 
            property={selectedProperty}
            onAnalyze={analyzeWithAI}
            isLoading={isLoading}
          />
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Agent</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="label">Name</label>
                  <input type="text" id="name" className="input" placeholder="Your name" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="label">Email</label>
                  <input type="email" id="email" className="input" placeholder="Your email" />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="label">Phone</label>
                  <input type="tel" id="phone" className="input" placeholder="Your phone number" />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="label">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="input" 
                    placeholder="I'm interested in this property..."
                    defaultValue={`I'm interested in ${selectedProperty.address} and would like more information.`}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;