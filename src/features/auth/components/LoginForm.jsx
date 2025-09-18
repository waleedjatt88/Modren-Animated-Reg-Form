// src/features/auth/components/LoginForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
// --- FIX: Import showSuccessToast and use handleApiCall correctly ---
import { handleApiCall } from "../../../helpers/toast.helper";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth(); // Get the login function from context

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // --- THIS IS THE CORRECT WAY TO USE THE HELPER ---
    // 1. Create the promise by calling the login function.
    const loginPromise = login({ email, password });

    // 2. Pass the promise and the message configuration to handleApiCall.
    handleApiCall(loginPromise, {
      pending: 'Logging in...',
      success: '✅ Logged in successfully! Welcome back.',
      // The error message will be automatically taken from the API response
      error: 'Login failed. Please check your credentials.'
    });
  };
  // --- END OF FIX ---


  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="form-box login">
        <h2 className="animation" style={{ "--i": 0, "--j": 21 }}>
          Login
        </h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="input-box animation" style={{ "--i": 1, "--j": 22 }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
            <i className="bx bxs-user"></i>
          </div>

          <div className="input-box animation" style={{ "--i": 2, "--j": 23 }}>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
            <i
              className={`bx ${showPassword ? "bxs-hide" : "bxs-show"}`}
              style={{ cursor: "pointer" }}
              onClick={togglePasswordVisibility}
            ></i>
          </div>

          <div
            className="forgot-link animation"
            style={{
              "--i": 3,
              "--j": 23,
              textAlign: "right",
              margin: "-15px 0 15px",
            }}
          >
            <Link
              to="/forgot-password"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "14.5px",
                fontWeight: 500,
              }}
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn animation"
            style={{ "--i": 4, "--j": 24 }}
          >
            Login
          </button>

          <div className="divider animation" style={{ "--i": 5, "--j": 25 }}>
            <span>OR</span>
          </div>

          <button
            type="button"
            className="btn animation"
            onClick={handleGoogleSignIn}
            style={{
              "--i": 6,
              "--j": 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <i className="bx bxl-google" style={{ fontSize: "20px" }}></i>
            Sign in with Google
          </button>

          <div className="logreg-link animation" style={{ "--i": 7, "--j": 27 }}>
            <p>
              Don't have an account?{" "}
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
          Login to your account to continue.
        </p>
      </div>
    </>
  );
};

export default LoginForm;