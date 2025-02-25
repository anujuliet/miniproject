import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import './SignUpLogin.css';

const Signup = ({ onSwitchToLogin, onRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    accountType: 'personal',
    gender: '',
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (!captchaValue) {
      setError('Please complete the reCAPTCHA verification.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/signup', {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        accountType: formData.accountType,
        gender: formData.gender,
        recaptcha: captchaValue,
      });

      if (response.status === 201) {
        setSuccessMessage('Account created successfully! Redirecting...');
        setTimeout(() => {
          onSwitchToLogin();
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Sign Up</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

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

              <div className="form-group text-center mt-3">
                <ReCAPTCHA
                  sitekey="YOUR_RECAPTCHA_SITE_KEY"
                  onChange={setCaptchaValue}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block mt-4">
                Sign Up
              </button>
            </form>

            <p className="text-center mt-3">
              Already have an account?{' '}
              <button onClick={onSwitchToLogin} className="btn btn-link">
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
