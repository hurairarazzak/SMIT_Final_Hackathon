import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AppRoutes } from "../routes/routes"; // Make sure this path is correct

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    // Check if user is already set or if token is available
    const token = Cookies.get("token");
    
    if (token && !user) {
      getUser(token);
    }

  }, [user]);

  // Fetch user data using the token
  const getUser = (token) => {
    axios
      .get(AppRoutes.getMyInfo, {
        headers: {
          Authorization: `Bearer ${token}`,  // Pass the token in Authorization header
        },
      })
      .then((res) => {
        if (res.data?.data) {
          console.log("User data fetched successfully:", res.data);
          setUser(res.data.data);
        } else {
          console.log("No user data found");
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err.response || err);
      });
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
