import React, { useState } from 'react'; // Make sure this line is at the top
import './SignUpLogin.css';
import ReCAPTCHA from "react-google-recaptcha";


const Signup = ({ onSwitchToLogin, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState('personal');
  const [gender, setGender] = useState('');
  const [capVal,setCapVal]=useState('null');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onRegister({ email, username, accountType, gender }); // Pass all relevant information
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            required
          />
        </div>

        {/* Account Type Field */}
        <div className="form-group">
          <label htmlFor="accountType" className="form-label">
            Account Type
          </label>
          <select
            id="accountType"
            className="form-select"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="personal">Personal Use</option>
            <option value="professional">Professional Use</option>
          </select>
        </div>

        {/* Gender Field (Optional) */}
        <div className="form-group">
          <label htmlFor="gender" className="form-label">
            Gender (Optional)
          </label>
          <select
            id="gender"
            className="form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <ReCAPTCHA
            sitekey="6Lf6WdwqAAAAAIuuTzra27uTp1KBGkNJ9MEanzdM"
            onChange={ (val)=> setCapVal(val)}
          />
        </div>
        <p></p>
        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
      </form>

      <p>
        <p></p>
        <p></p>
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="btn btn-link">
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;