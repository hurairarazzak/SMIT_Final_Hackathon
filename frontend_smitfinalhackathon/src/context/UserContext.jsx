import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AppRoutes } from "../routes/routes"; 

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token")
    
    if (token && !user) {
      getUser(token);
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("user");
};

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
      })
      .catch((err) => {
        console.error("Error fetching user data:", err.response || err);
      });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
