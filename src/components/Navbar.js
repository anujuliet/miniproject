import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // ✅ Import AuthContext
import logo from "../assets/logo.png";

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

export default Navbar;
