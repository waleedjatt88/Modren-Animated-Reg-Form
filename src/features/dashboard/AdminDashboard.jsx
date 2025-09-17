import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [isHovered, setIsHovered] = useState(false); 


  const dashboardContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', 
    width: '100vw',  
    background: '#080a13', 
    fontFamily: '"Poppins", sans-serif',
    color: '#fff',
    overflow: 'hidden' 
  };

  const cardStyle = {
    background: 'rgba(26, 29, 41, 0.7)', 
    padding: '40px 50px',
    borderRadius: '20px',
    border: '2px solid #0ef', 
    boxShadow: '0 0 25px rgba(0, 239, 255, 0.3)', 
    textAlign: 'center',
    maxWidth: '500px',
    backdropFilter: 'blur(10px)' 
  };

  const welcomeHeadingStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    margin: '0',
    color: '#0ef' 
  };

  const emailTextStyle = {
    fontSize: '1rem',
    color: '#aaa', 
    marginTop: '10px',
    marginBottom: '30px'
  };
  
  const logoutButtonStyle = {
    background: 'transparent',
    border: '2px solid #0ef',
    color: '#fff',
    padding: '10px 30px',
    borderRadius: '40px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease' 
  };
  
  const logoutButtonHoverStyle = {
    background: '#0ef', 
    color: '#080a13' 
  };
  
  const buttonFinalStyle = isHovered 
    ? { ...logoutButtonStyle, ...logoutButtonHoverStyle } 
    : logoutButtonStyle;

  return (
    <div style={dashboardContainerStyle}>
      <div style={cardStyle}>
        <h1 style={welcomeHeadingStyle}>
          Welcome, {user ? capitalizeFirstLetter(user.role) : 'User'}!
        </h1>
        <p style={emailTextStyle}>
          You are logged in as {user ? user.email : 'Loading...'}
        </p>
        <button 
          style={buttonFinalStyle}
          onClick={logout}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;