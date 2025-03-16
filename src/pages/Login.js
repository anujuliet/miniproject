import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthState } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", credentials, { withCredentials: true });

      localStorage.setItem("authToken", response.data.token);
      setAuthState({ isAuthenticated: true, userType: response.data.userType });

      navigate("/home"); // ✅ Redirect to home after login
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group mt-3">
            <label className="fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mt-4 w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")} className="btn btn-link">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
