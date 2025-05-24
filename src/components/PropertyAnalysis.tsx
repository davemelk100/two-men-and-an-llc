import React, { useState } from 'react';
import { Property, PropertyAnalysis as PropertyAnalysisType } from '../types/property';
import { 
  TrendingUp, 
  ArrowDown, 
  Lightbulb, 
  AlertTriangle,
  Hammer,
  PiggyBank,
  BarChart3,
  Landmark
} from 'lucide-react';

interface PropertyAnalysisProps {
  property: Property;
  onAnalyze: (propertyId: string) => Promise<void>;
  isLoading: boolean;
}

// Mock analysis data - in a real app this would come from OpenAI
const mockAnalysis: PropertyAnalysisType = {
  strengths: [
    'Located in a growing neighborhood with rising property values',
    'Good structural foundation with minimal major repairs needed',
    'Newer roof (less than 5 years old) reduces immediate capital expenses',
    'Spacious lot with potential for expansion or outdoor improvements'
  ],
  weaknesses: [
    'Outdated kitchen requires full renovation',
    'Bathroom fixtures and finishes are worn and dated',
    'Some electrical systems need updating to meet current code',
    'HVAC system is functioning but approaching end of useful life'
  ],
  opportunities: [
    'Open concept layout modification would significantly increase value',
    'Adding a half bathroom would improve marketability',
    'Finishing the basement could add 500+ sqft of living space',
    'Energy efficiency upgrades would reduce operating costs and attract eco-conscious buyers'
  ],
  threats: [
    'Several competing renovated properties recently listed in same neighborhood',
    'Rising material costs could impact renovation budget',
    'Potential zoning changes in adjacent areas might affect future value',
    'Labor shortages could extend project timeline beyond optimal market window'
  ],
  aiSummary: 'This property presents a solid investment opportunity with a projected 22% ROI. The primary value-add opportunities are in modernizing the kitchen and bathrooms, which account for approximately 65% of the estimated renovation budget. The property\'s location in a transitioning neighborhood provides additional upside potential, as comparable renovated homes have seen 15-20% price appreciation in the last 18 months. Recommend proceeding with acquisition if purchase price can be secured below $180,000, which would improve margins and provide a buffer against potential material cost increases.'
};

const PropertyAnalysis: React.FC<PropertyAnalysisProps> = ({ property, onAnalyze, isLoading }) => {
  const [analysis, setAnalysis] = useState<PropertyAnalysisType | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleAnalyze = async () => {
    await onAnalyze(property.id);
    // In a real app, the analysis would come from the API
    setAnalysis(mockAnalysis);
    setShowAnalysis(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-primary-800 p-4 text-white">
        <h3 className="text-xl font-semibold flex items-center">
          <Lightbulb className="mr-2 h-5 w-5" />
          AI Property Analysis
        </h3>
      </div>
      
      {!showAnalysis ? (
        <div className="p-6 flex flex-col items-center">
          <div className="text-center mb-6">
            <BarChart3 className="h-16 w-16 text-primary-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium mb-2">Unlock AI-Powered Investment Insights</h4>
            <p className="text-gray-600 max-w-md mx-auto">
              Our AI analyzes this property's potential, provides a detailed SWOT analysis, and gives you a comprehensive investment recommendation.
            </p>
          </div>
          
          <button 
            onClick={handleAnalyze}
            disabled={isLoading}
            className="btn btn-primary px-6 py-3 flex items-center"
          >
            {isLoading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                Analyzing Property...
              </>
            ) : (
              <>
                <Hammer className="mr-2 h-5 w-5" />
                Analyze Rehab Potential
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="p-6">
          <div className="mb-6">
            <h4 className="font-medium text-lg mb-2 text-primary-800">Investment Summary</h4>
            <p className="text-gray-700">
              {analysis?.aiSummary}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-medium flex items-center text-green-800 mb-2">
                <TrendingUp className="mr-1 h-4 w-4" />
                Strengths
              </h5>
              <ul className="space-y-2">
                {analysis?.strengths.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <h5 className="font-medium flex items-center text-red-800 mb-2">
                <ArrowDown className="mr-1 h-4 w-4" />
                Weaknesses
              </h5>
              <ul className="space-y-2">
                {analysis?.weaknesses.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium flex items-center text-blue-800 mb-2">
                <Lightbulb className="mr-1 h-4 w-4" />
                Opportunities
              </h5>
              <ul className="space-y-2">
                {analysis?.opportunities.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h5 className="font-medium flex items-center text-yellow-800 mb-2">
                <AlertTriangle className="mr-1 h-4 w-4" />
                Threats
              </h5>
              <ul className="space-y-2">
                {analysis?.threats.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <span className="text-yellow-500 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
              <PiggyBank className="h-8 w-8 text-primary-500 mb-2" />
              <h5 className="font-medium">Investment Score</h5>
              <p className="text-2xl font-bold text-primary-600">{property.investmentScore}/100</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
              <Hammer className="h-8 w-8 text-highlight-500 mb-2" />
              <h5 className="font-medium">Rehab Potential</h5>
              <p className="text-2xl font-bold text-highlight-600">{property.rehabPotential}%</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
              <Landmark className="h-8 w-8 text-accent-500 mb-2" />
              <h5 className="font-medium">Estimated ROI</h5>
              <p className="text-2xl font-bold text-accent-600">
                {((property.potentialProfit / property.price) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyAnalysis;