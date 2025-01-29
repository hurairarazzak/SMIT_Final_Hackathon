import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AppRoutes } from "../routes/routes";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null); // Initialize user as null for better state handling
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      getUser(token); // If token exists, fetch user data
    }

    // Redirect based on user role after data is fetched
    if (user) {
      if (user.role === "admin") navigate("/admin-dashboard");
      if (user.role === "user") navigate("/user-dashboard");
    }
  }, [user]);

  // Function to fetch user data
  const getUser = (token) => {
    axios
      .get(AppRoutes.getMyInfo, {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token as Bearer in the header
        },
      })
      .then((res) => {
        console.log("response from get my info API=>", res.data);
        setUser(res.data.data); // Update the user state with response data
      })
      .catch((err) => {
        console.log("Error fetching user:", err);
        setUser(null); // Reset user state in case of error
      });
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
