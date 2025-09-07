import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
const AuthContext = createContext(null);
export const useAuth = () => { return useContext(AuthContext); };
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (storedUserInfo) { setUserInfo(storedUserInfo); }
    } catch (error) { localStorage.removeItem('userInfo'); }
    setLoading(false);
  }, []);
  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUserInfo(data);
    navigate('/dashboard');
  };
  const register = async (name, email, password, interests) => {
    const { data } = await api.post('/auth/register', { name, email, password, interests });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUserInfo(data);
    navigate('/dashboard');
  };
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/login');
  };
  const value = { userInfo, loading, login, register, logout };
  return (<AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>);
};