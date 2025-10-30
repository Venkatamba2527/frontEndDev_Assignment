import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContexts';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');
  return token && user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
