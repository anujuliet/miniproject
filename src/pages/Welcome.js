import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="mb-3">Welcome to Capital Core</h1>
      <p className="mb-4">Precision in every financial move.</p>
      <button className="btn btn-primary" onClick={() => navigate("/signup")}>Start Now</button>
      <div className="mt-3">
        <button className="btn btn-outline-dark me-2" onClick={() => navigate("/login")}>Login</button>
        <button className="btn btn-outline-dark" onClick={() => navigate("/signup")}>Signup</button>
      </div>
    </div>
  );
};

export default Welcome;
