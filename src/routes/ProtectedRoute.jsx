import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const ProtectedRoute = ({ allowedRoles }) => {
  
  const { user, loading } = useAuth(); // 

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#080a13', color: 'white' }}>
        <h2>Loading...</h2>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />; 
  }

  return <Outlet />; 
};

export default ProtectedRoute;