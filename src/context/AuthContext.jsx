// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { jwtDecode } from 'jwt-decode'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

   useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
      localStorage.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const navigateUserByRole = (role) => {
    switch (role) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'agent':
        navigate('/agent/dashboard');
        break;
      case 'customer':
        navigate('/customer/dashboard');
        break;
      default:
        navigate('/'); 
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const { token, user: userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      navigate('/'); 

    } catch (error) {
      throw error;
    }
  };
  
    const handleLogout = async () => {
    if (!localStorage.getItem('token')) {
      return;
    }
    
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout API call failed, but logging out locally anyway:", error);
    } finally {
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

   const loginWithToken = async (token) => { 
    try {
    
      localStorage.setItem('token', token);
      const response = await userService.getUserProfile();
      const fullUserData = response.data; 
      localStorage.setItem('user', JSON.stringify(fullUserData));
      setUser(fullUserData);
      
      console.log("Successfully fetched full user data after Google login:", fullUserData);
      navigate('/');

    } catch (error) {
      console.error("Failed to login with token or fetch user profile:", error);
      handleLogout(); 
    }
  };

   const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    console.log("AuthContext user state updated:", updatedUser);
  };


  const value = { user, loading, login: handleLogin, logout: handleLogout, loginWithToken, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};