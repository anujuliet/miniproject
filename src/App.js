import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom"; // ❌ Removed BrowserRouter
import axios from "axios";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Personal from "./pages/Personal";
import Professional from "./pages/Professional";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./components/AuthContext"; // ✅ Corrected AuthContext import
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import logo from "./assets/logo.png";

// ✅ Navbar Component
const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <img src={logo} alt="Capital Core Logo" className="logo me-2" width="60" />
        <span className="fw-bold text-light">Capital Core</span>
      </Link>
      <div className="ms-auto">
        {isAuthenticated ? (
          <button className="btn btn-outline-light" onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
            <Link to="/signup" className="btn btn-primary">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

// ✅ Home Screen
const Home = () => {
  return (
    <div className="home-container d-flex flex-column justify-content-center align-items-center vh-100 fade-in">
      <h1 className="mb-3">Welcome to CAPITAL CORE</h1>
      <p className="mb-4">Manage your finances with ease.</p>
      <Link to="/login" className="btn btn-primary btn-lg">Start Now</Link>
    </div>
  );
};

const App = () => {
  const { isAuthenticated, setAuthState } = useAuth();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const introTimer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", { withCredentials: true });
        setAuthState({ isAuthenticated: true, userType: response.data.userType }); // ✅ Store user type
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (localStorage.getItem("authToken")) {
      fetchUser();
    }
  }, [setAuthState]);

  return (
    <>
      {showIntro ? (
        <div className="intro-container d-flex justify-content-center align-items-center vh-100 fade-in">
          <div className="text-center">
            <h1 className="app-name">CAPITAL CORE</h1>
            <p className="intro-text">Precision in every financial move.</p>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/personal" />} />
            <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/personal" />} />
            <Route path="/personal" element={<ProtectedRoute><Personal /></ProtectedRoute>} />
            <Route path="/professional" element={<ProtectedRoute><Professional /></ProtectedRoute>} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
