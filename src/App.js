import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./components/AuthContext"; // ✅ Auth Context
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import logo from "./assets/logo.png";

// ✅ Import Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Personal from "./pages/Personal";
import Professional from "./pages/Professional";
import AddIncome from "./pages/AddIncome";
import AddExpense from "./pages/AddExpense";
import AddRtransaction from "./pages/AddRtransaction";
import AddBudget from "./pages/AddBudget";
import ViewTransactionHistory from "./pages/ViewTransactionHistory";
import Welcome from "./pages/Welcome"; // ✅ New Welcome Page

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

// ✅ Intro Screen (Shown for 3 seconds)
const IntroScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="intro-container d-flex justify-content-center align-items-center vh-100 fade-in">
      <div className="text-center">
        <h1 className="app-name">CAPITAL CORE</h1>
        <p className="intro-text">Precision in every financial move.</p>
      </div>
    </div>
  );
};

const App = () => {
  const { isAuthenticated, setAuthState } = useAuth();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", { withCredentials: true });
        setAuthState({ isAuthenticated: true, userType: response.data.userType });
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
        <IntroScreen onFinish={() => setShowIntro(false)} />
      ) : (
        <>
          <Navbar />
          <Routes>
            {/* ✅ Show Welcome Page First */}
            <Route path="/" element={<Welcome />} />

            {/* ✅ Authentication Routes */}
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
            <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/home" />} />

            {/* ✅ Home Page (Dashboard After Login) */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />

            {/* ✅ Other Protected Routes */}
            <Route path="/personal" element={<ProtectedRoute><Personal /></ProtectedRoute>} />
            <Route path="/professional" element={<ProtectedRoute><Professional /></ProtectedRoute>} />
            <Route path="/addIncome" element={<ProtectedRoute><AddIncome /></ProtectedRoute>} />
            <Route path="/addExpense" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
            <Route path="/addRtransaction" element={<ProtectedRoute><AddRtransaction /></ProtectedRoute>} />
            <Route path="/addBudget" element={<ProtectedRoute><AddBudget /></ProtectedRoute>} />
            <Route path="/viewTransactions" element={<ProtectedRoute><ViewTransactionHistory /></ProtectedRoute>} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
