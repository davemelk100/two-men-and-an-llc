import React from 'react';
import { Home, Mail, Phone, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <Home className="h-6 w-6 text-primary-400" />
              <span className="ml-2 text-xl font-bold">RehabFinder</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              AI-powered property investment tool for finding rehab opportunities in Southeast Michigan.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/saved" className="text-gray-400 hover:text-white transition-colors">
                  Saved Properties
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400" />
                <a href="mailto:contact@rehabfinder.com" className="ml-2 text-gray-400 hover:text-white transition-colors">
                  contact@rehabfinder.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-gray-400">(248) 555-0123</span>
              </div>
              <div className="flex items-center">
                <Github className="h-5 w-5 text-gray-400" />
                <a href="#" className="ml-2 text-gray-400 hover:text-white transition-colors">
                  Follow our project
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} RehabFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;