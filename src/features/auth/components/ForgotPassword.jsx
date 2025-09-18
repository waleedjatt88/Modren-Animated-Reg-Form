import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../../services/authService";
import "../css/Form.css";
import { handleApiCall, showSuccessToast, showErrorToast } from "../../../helpers/toast.helper";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    await handleApiCall(
      async () => {
        await authService.sendOtp({ email, type: "password_reset" });
        showSuccessToast("✅ OTP sent successfully!");
        navigate("/verify-otp", { state: { email, type: "password_reset" } });
      },
      setLoading,
      "Failed to send OTP. Please try again."
    );
  };

  return (
    <div className="form-box single-form">
      <h2 className="animation" style={{ "--i": 0 }}>Forgot Password</h2>
      <p className="subtext animation" style={{ "--i": 1 }}>
        Enter your email and we'll send you an OTP to reset your password.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input-box animation" style={{ "--i": 2 }}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email Address</label>
          <i className="bx bxs-envelope"></i>
        </div>
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}
        <button
          type="submit"
          className="btn animation"
          style={{ "--i": 3 }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
