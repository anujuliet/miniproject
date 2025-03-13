import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./components/AuthContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter> {/* ✅ BrowserRouter is used ONLY here */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
