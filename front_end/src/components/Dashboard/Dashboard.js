// src/components/Dashboard/Dashboard.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import MyProperties from './MyProperties';
import AddProperty from './AddProperty';
import PropertyListings from './PropertyListings';
import Contracts from './Contracts';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/my-properties" element={<MyProperties />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/listings" element={<PropertyListings />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="*" element={<Navigate to="/my-properties" replace />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
