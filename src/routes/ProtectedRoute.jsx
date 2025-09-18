// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem('token'); // <-- Directly check for the token

  // While the context is figuring out the user from the token, show a loading screen.
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#080a13', color: 'white' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  // --- THIS IS THE CRITICAL FIX ---
  // If the initial check is done (loading is false) AND there is no user AND no token,
  // then the user is definitively logged out. Redirect to login.
  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }
  
  // If there IS a token but the user object is somehow null (e.g., after a refresh),
  // the context's useEffect is still working on it. We let it pass for now.
  // But if the user tries to access a page and the token is invalid, the API call will fail
  // and the error handling will log them out correctly. This prevents the redirect loop.

  return <Outlet />; // If checks pass, render the child component (e.g., LandingPage)
};

export default ProtectedRoute;