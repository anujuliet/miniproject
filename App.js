import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard'; // Assuming you have a Dashboard component
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import custom styles

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Show intro screen for 4 seconds, then redirect to the main page
    setTimeout(() => setShowIntro(false), 4000);
  }, []);

  const handleLogin = (email) => {
    setIsAuthenticated(true);
    localStorage.setItem('userEmail', email); // Store user session
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('userEmail');
  };

  return (
    <Router>
      <div className="container mt-5">
        {showIntro ? (
          <div className="intro-container d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
              <h1 className="app-name">CAPITAL CORE</h1>
              <p className="intro-text">Precision in every financial move.</p>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
