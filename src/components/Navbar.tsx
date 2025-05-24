import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Heart, Menu, X, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, login, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { path: '/', name: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/saved', name: 'Saved Properties', icon: <Heart className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Home className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-primary-900">RehabFinder</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.icon}
                <span className="ml-1">{link.name}</span>
              </Link>
            ))}
            
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <UserCircle className="w-5 h-5" />
                <span className="ml-1">Sign Out</span>
              </button>
            ) : (
              <button
                onClick={login}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-highlight-500 text-white hover:bg-highlight-600"
              >
                <UserCircle className="w-5 h-5" />
                <span className="ml-1">Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === link.path
                  ? 'bg-primary-100 text-primary-900'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={closeMenu}
            >
              {link.icon}
              <span className="ml-2">{link.name}</span>
            </Link>
          ))}
          
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              <UserCircle className="w-5 h-5" />
              <span className="ml-2">Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => {
                login();
                closeMenu();
              }}
              className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium bg-highlight-500 text-white hover:bg-highlight-600"
            >
              <UserCircle className="w-5 h-5" />
              <span className="ml-2">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;