import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../../services/authService'; 
import '../css/Form.css'; 

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const resetToken = location.state?.resetToken;

  useEffect(() => {
    if (!resetToken) {
      console.error("No reset token found. Redirecting to login.");
      navigate('/login');
    }
  }, [resetToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true); 
    try {
      await authService.resetPassword({ 
        resetToken: resetToken, 
        password: password,
        confirmPassword: confirmPassword 
      });
      alert("Password has been reset successfully! Please log in with your new password.");
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. The token may be invalid or expired.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="form-box single-form">
      <h2 className="animation" style={{'--i': 0}}>Reset Password</h2>
      <p className="subtext animation" style={{'--i': 1}}>
        Create your new password. It must be at least 6 characters long.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input-box animation" style={{'--i': 2}}>
          <input 
            type={showPassword ? "text" : "password"} 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>New Password</label>
          <i 
            className={`bx ${showPassword ? 'bxs-hide' : 'bxs-show'}`} 
            style={{ cursor: 'pointer' }}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>
        <div className="input-box animation" style={{'--i': 3}}>
          <input 
            type={showConfirmPassword ? "text" : "password"} 
            required 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label>Confirm New Password</label>
          <i 
            className={`bx ${showConfirmPassword ? 'bxs-hide' : 'bxs-show'}`} 
            style={{ cursor: 'pointer' }}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          ></i>
        </div>

        {error && (
            <p className="animation" style={{ color: 'red', textAlign: 'center', fontSize: '14px', '--i': 4 }}>
                {error}
            </p>
        )}

        <button type="submit" className="btn animation" style={{'--i': 5}} disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
