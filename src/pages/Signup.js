import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css"; // Custom styles

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "personal",
    gender: "",
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle signup submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Validate reCAPTCHA is completed
    if (!captchaValue) {
      setError("Please complete the reCAPTCHA verification.");
      return;
    }

    // Simulate account creation success
    setSuccessMessage("Account created successfully! Redirecting...");
    setTimeout(() => {
      navigate("/login"); // Redirect to dashboard after "signup"
    }, 2000);
  };

  return (
    <div className="signup-container d-flex align-items-center justify-content-center vh-100">
      <div className="card signup-card p-4 shadow-lg">
        <h2 className="text-center mb-4">Sign Up</h2>

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Success Message */}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Account Type</label>
            <select
              name="accountType"
              className="form-select"
              value={formData.accountType}
              onChange={handleChange}
            >
              <option value="personal">Personal Use</option>
              <option value="professional">Professional Use</option>
            </select>
          </div>

          <div className="form-group mt-3">
            <label>Gender (Optional)</label>
            <select
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* reCAPTCHA */}
          <div className="form-group text-center mt-3">
            <ReCAPTCHA
              sitekey="6LdmnrcqAAAAAEdVU8OIvtHjPzCaxYMCzXOXVh8O"
              onChange={setCaptchaValue}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary btn-block mt-4 w-100" disabled={!captchaValue}>
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-3">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="btn btn-link">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
