// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth Components
import AuthLayout from "../features/auth/layouts/AuthLayout";
import LoginSignupWrapper from "../features/auth/components/LoginSignupWrapper";
import ForgotPassword from "../features/auth/components/ForgotPassword";
import OtpVerification from "../features/auth/components/OtpVerification";
import ResetPassword from "../features/auth/components/ResetPassword";
import AuthCallback from "../features/auth/components/AuthCallback";

// Protected & Public Components
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from '../features/landing/LandingPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* --- PUBLIC ROUTES --- */}
      {/* Landing page ab root route hai aur public hai */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Google Callback route */}
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Auth forms (Login, Signup, etc.) abhi bhi apne layout mein hain */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginSignupWrapper />} />
        <Route path="signup" element={<LoginSignupWrapper />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<OtpVerification />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* --- PROTECTED ROUTES --- */}

  
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
};

export default AppRoutes;