import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import SavedPropertiesPage from './pages/SavedPropertiesPage';
import { PropertyProvider } from './context/PropertyContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="property/:id" element={<PropertyDetailsPage />} />
            <Route path="saved" element={<SavedPropertiesPage />} />
          </Route>
        </Routes>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;