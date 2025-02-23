import React, { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import './App.css';

function App() {
  const [isSignup, setIsSignup] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [showMainPage, setShowMainPage] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
 
    if (showIntro) {
      setTimeout(() => {
        setShowIntro(false);
        setShowMainPage(true);
      }, 4000);
    }
  }, [showIntro]);

  const switchToSignup = () => setIsSignup(true);
  const switchToLogin = () => setIsSignup(false);

  const handleRegister = (email) => {
    setLoggedInEmail(email);
    setIsSignup(false);
  };

  const handleLogin = (email) => {
    setLoggedInEmail(email);
  };

  const handleStartNow = () => {
    setShowMainPage(false); 
    setShowLogin(true);     
  };

  return (
    <div className="App">
      {showIntro ? (
        <div className="intro-container d-flex justify-content-center align-items-center">
          <div className="text-center">
            <h1 className="app-name">CAPITAL CORE</h1>
            <p className="intro-text">Precision in every financial move.</p>
          </div>
        </div>
      ) : showMainPage ? (
        <div className="main-page d-flex justify-content-center align-items-center">
          <div className="text-center">
            <h2>Welcome to Capital Core</h2>
            <p>Precision in every financial move.</p>
            <button className="btn btn-primary" onClick={handleStartNow}>
              Start Now
            </button>
          </div>
        </div>
      ) : showLogin ? (
        <div className="container d-flex justify-content-center align-items-center">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              {isSignup ? (
                <Signup onSwitchToLogin={switchToLogin} onRegister={handleRegister} />
              ) : (
                <Login onSwitchToSignup={switchToSignup} onLogin={handleLogin} />
              )}
            </div>
          </div>
        </div>
      ) : loggedInEmail ? (
        <div className="text-center">
          <h2>Welcome, {loggedInEmail}!</h2>
          <p>You are logged in.</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
