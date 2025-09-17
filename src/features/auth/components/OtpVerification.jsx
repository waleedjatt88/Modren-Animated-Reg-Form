import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../../services/authService';
import '../css/OtpVerification.css';
import '../css/Form.css';

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const otpType = location.state?.type || 'email_verification';

  useEffect(() => {
    if (!email) {
      console.error("No email provided to OTP screen. Redirecting...");
      navigate('/login');
    }
  }, [email, navigate]);
  
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleResendOtp = async (e) => {
    e.preventDefault(); 
    if (timer === 0) {
      try {
        await authService.sendOtp({ email, type: 'resend_otp' });
        setTimer(60);
        setError('');
        setOtp(new Array(6).fill(""));
        
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
        alert("A new OTP has been sent.");
      } catch (err) {
        setError("Failed to resend OTP.");
      }
    }
  };
  
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false; 
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const response = await authService.verifyOtp({ email, otp: enteredOtp, type: otpType });

      if (otpType === 'password_reset') {
        const { resetToken } = response.data;
        alert("OTP Verified! Please set your new password.");
        navigate('/reset-password', { state: { resetToken: resetToken } });
      } else { 
        alert("Email verified successfully! You can now log in.");
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="form-box single-form otp-verification">
        <h2 className="animation" style={{'--i': 0}}>
            {otpType === 'password_reset' ? 'Password Reset OTP' : 'Email Verification'}
        </h2>
        <p className="subtext animation" style={{'--i': 1}}>
            Please enter the 6-digit OTP sent to {email}.
        </p>
        <form onSubmit={handleSubmit}>
            <div className="otp-inputs animation" style={{'--i': 2}}>
                {otp.map((data, index) => (
                    <input 
                      ref={el => (inputRefs.current[index] = el)} 
                      className="otp-input" 
                      type="text" 
                      name="otp" 
                      maxLength="1" 
                      key={index} 
                      value={data} 
                      onChange={e => handleChange(e.target, index)} 
                      onKeyDown={e => handleKeyDown(e, index)} 
                      // ---
                      onFocus={e => e.target.select()} 
                    />
                ))}
            </div>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <button type="submit" className="btn animation" style={{'--i': 3}} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify'}
            </button>
            <div className="logreg-link animation" style={{'--i': 4}}>
                <p>
                    Didn't receive code?{' '}
                    {timer > 0 ? (
                      <span style={{ color: '#aaa', cursor: 'not-allowed' }}>
                        Resend in {`00:${timer < 10 ? '0' : ''}${timer}`}
                      </span>
                    ) : (
                      <a href="#" className="resend-link" onClick={handleResendOtp}>
                        Resend OTP
                      </a>
                    )}
                </p>
            </div>
        </form>
    </div>
  );
};

export default OtpVerification;