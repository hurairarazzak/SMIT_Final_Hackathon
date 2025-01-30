import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AppRoutes } from "../routes/routes"; 

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading state to handle async

  useEffect(() => {
    const token = Cookies.get("token");
    
    if (token && !user) {
      getUser(token);
    } else {
      setLoading(false);  // If no token, set loading to false
    }
  }, [user]);

  const getUser = (token) => {
    axios
      .get(AppRoutes.getMyInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data?.data) {
          setUser(res.data.data);
        }
        setLoading(false);  // Set loading to false after user is fetched
      })
      .catch((err) => {
        console.error("Error fetching user data:", err.response || err);
        setLoading(false);  // Set loading to false in case of error
      });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
