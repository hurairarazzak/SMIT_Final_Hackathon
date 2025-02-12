import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const token = Cookies.get("token") || localStorage.getItem("token");

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner while checking auth
  }

  if (!token || !user) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  return children; // Render the protected content
};

export default ProtectedRoute;