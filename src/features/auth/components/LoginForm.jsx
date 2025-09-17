import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const { login } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = () => {
   window.location.href = 'http://localhost:3000/api/auth/google';

    console.log("Attempting Google Sign-In...");
  };

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    <>
    
      <div className="form-box login">
        <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>
          Log In
        </h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            <label>Email</label>
            <i className="bx bxs-user"></i>
          </div>
          
          <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
            <input 
              type={showPassword ? "text" : "password"} 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
            <i 
              className={`bx ${showPassword ? 'bxs-hide' : 'bxs-show'}`} 
              style={{ cursor: 'pointer' }}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
        
          <div className="forgot-link animation" style={{ '--i': 3, '--j': 23, textAlign: 'right', margin: '-15px 0 15px' }}>
            <Link to="/forgot-password" style={{color: '#fff', textDecoration: 'none', fontSize: '14.5px', fontWeight: 500}}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn animation" style={{ '--i': 4, '--j': 24 }}>
            Login
          </button>
          
          <div className="divider animation" style={{ '--i': 5, '--j': 25 }}>
            <span>OR</span>
          </div>

          <button type="button" className="btn animation" onClick={handleGoogleSignIn} style={{ '--i': 6, '--j': 26, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <i className='bx bxl-google' style={{fontSize: '20px'}}></i>
            Sign in with Google
          </button>
          
          {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}

          <div className="logreg-link animation" style={{ '--i': 7, '--j': 27 }}>
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="register-link">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
      
      <div className="info-text login">
        <h2 className="animation" style={{ '--i': 0, '--j': 20 }}>
          Welcome Back!
        </h2>
        <p className="animation" style={{ '--i': 1, '--j': 21 }}>
          Login to your DevGo account to continue.
        </p>
      </div>
    </>
  );
};
export default LoginForm;

