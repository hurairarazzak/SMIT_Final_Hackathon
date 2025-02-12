import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const token = Cookies.get("token") || localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  return children; // Render the protected content
};

export default ProtectedRoute;