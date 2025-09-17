import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../../services/authService";

const SignupForm = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const phoneRegex = /^03\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Phone number must be in 03xxxxxxxxx format.");
      return;
    }

    setLoading(true);
    try {
      const userData = { fullName, email, phoneNumber, password };
      await authService.register(userData);

      navigate("/verify-otp", { state: { email, type: "email_verification" } });
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log("Attempting Google Sign-Up...");
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="form-box register">
        <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box animation" style={{ "--i": 18, "--j": 1 }}>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <label>Full Name</label>
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box animation" style={{ "--i": 19, "--j": 2 }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
            <i className="bx bxs-envelope"></i>
          </div>

          <div className="input-box animation" style={{ "--i": 20, "--j": 3 }}>
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setPhoneNumber(value);
                }
              }}
              maxLength={11} 
            />
            <label>Phone Number</label>
            <i className="bx bxs-phone"></i>
          </div>

          <div className="input-box animation" style={{ "--i": 21, "--j": 4 }}>
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

          <button
            type="submit"
            className="btn animation"
            style={{ "--i": 22, "--j": 5 }}
          >
            Sign Up
          </button>
          <div
            className="logreg-link animation"
            style={{ "--i": 23, "--j": 6 }}
          >
            <p>
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="info-text register">
        <h2 className="animation" style={{ "--i": 17, "--j": 0 }}>
          Welcome!
        </h2>
        <p className="animation" style={{ "--i": 18, "--j": 1 }}>
          Sign up to create your DevGo account.
        </p>
      </div>
    </>
  );
};
export default SignupForm;
