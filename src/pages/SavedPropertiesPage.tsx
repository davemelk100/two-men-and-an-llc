import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, AlertTriangle } from 'lucide-react';
import PropertyList from '../components/PropertyList';
import { useProperties } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';

const SavedPropertiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { savedProperties, isLoading } = useProperties();
  const { isAuthenticated, login } = useAuth();

  const handleBack = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={handleBack}
          className="flex items-center text-primary-600 hover:text-primary-800 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to properties
        </button>
        
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <AlertTriangle className="h-16 w-16 text-highlight-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            You need to sign in to view and manage your saved properties.
          </p>
          <button 
            onClick={login}
            className="btn btn-primary px-6"
          >
            Sign In to View Saved Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={handleBack}
        className="flex items-center text-primary-600 hover:text-primary-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        Back to properties
      </button>
      
      <div className="flex items-center mb-6">
        <Heart className="h-6 w-6 text-red-500 mr-2" />
        <h1 className="text-3xl font-bold">Saved Properties</h1>
      </div>
      
      {savedProperties.length === 0 && !isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Saved Properties</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            You haven't saved any properties yet. Browse properties and click the heart icon to save them for later.
          </p>
          <button 
            onClick={handleBack}
            className="btn btn-primary px-6"
          >
            Browse Properties
          </button>
        </div>
      ) : (
        <PropertyList 
          properties={savedProperties}
          isLoading={isLoading}
          error={null}
        />
      )}
    </div>
  );
};

export default SavedPropertiesPage;