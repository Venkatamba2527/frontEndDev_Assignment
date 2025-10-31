// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      console.log('🔐 Auth init - Token exists:', !!token);

      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          // Test backend connection first
          await axios.get('/api/health');
          console.log('✅ Backend is reachable');

          // Get user profile
          const response = await axios.get('/api/auth/me');
          console.log('👤 User data loaded:', response.data);
          setUser(response.data.user);
        } catch (error) {
          console.error('❌ Auth initialization failed:', error);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      console.log('🔐 Attempting login...');
      const response = await axios.post('/api/auth/login', credentials);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);

      console.log('✅ Login successful:', user);
      return user;
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data);
      const errorMessage = error.response?.data?.error ||
                          error.response?.data?.message ||
                          'Login failed. Please try again.';
      throw new Error(errorMessage);
    }
  };

  const signup = async (userData) => {
    try {
      console.log('👤 Attempting signup...');
      const response = await axios.post('/api/auth/register', userData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);

      console.log('✅ Signup successful:', user);
      return user;
    } catch (error) {
      console.error('❌ Signup failed:', error.response?.data);
      const errorMessage = error.response?.data?.error ||
                          error.response?.data?.message ||
                          'Signup failed. Please try again.';
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    console.log('🚪 Logging out...');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('/api/user/profile', profileData);
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error('❌ Profile update failed:', error);
      const errorMessage = error.response?.data?.error ||
                          error.response?.data?.message ||
                          'Profile update failed. Please try again.';
      throw new Error(errorMessage);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};