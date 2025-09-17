import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import { useAuth } from '../../../context/AuthContext';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth(); 

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      loginWithToken(token);
    } else {
      console.error("Google login failed, no token received.");
      navigate('/login');
    }
  }, []); 

  return (
    <div style={{ color: 'white', padding: '50px', fontFamily: 'Poppins, sans-serif' }}>
      <h2>Loading, please wait...</h2>
      <p>Finalizing your authentication.</p>
    </div>
  );
};

export default AuthCallback;