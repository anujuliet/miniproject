import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext"; // ✅ Import AuthContext

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
