import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from './service/UsersService'; // Assuming this is your auth service

const ProtectedRoute = ({ element: Component }) => {
  return Auth.isAuthenticated() ? Component : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
