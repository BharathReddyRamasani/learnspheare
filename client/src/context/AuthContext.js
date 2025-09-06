import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Box, CircularProgress } from '@mui/material'; // Import components for the loading screen

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This provides a much clearer error message if the provider is ever missing
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // This effect runs once when the app starts to check for a logged-in user
  useEffect(() => {
    try {
      const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (storedUserInfo) {
        setUserInfo(storedUserInfo);
      }
    } catch (error) {
        console.error("Failed to parse user info from localStorage", error);
        // If stored data is corrupted, remove it
        localStorage.removeItem('userInfo');
    }
    // This is the most important part: setting loading to false
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUserInfo(data);
    navigate('/dashboard');
  };

  const register = async (name, email, password, interests, skillLevel) => {
    const { data } = await api.post('/auth/register', { name, email, password, interests, skillLevel });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUserInfo(data);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/login');
  };

  const value = { userInfo, loading, login, register, logout, setUserInfo };

  // --- THE DEFINITIVE FIX IS HERE ---
  // If the app is still in a loading state, we show a full-screen spinner.
  // This is much safer than the old method and provides a better user experience.
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Once loading is false, we render the actual application.
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};