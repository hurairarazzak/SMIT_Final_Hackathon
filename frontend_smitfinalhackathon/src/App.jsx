import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import Service from "./pages/ServicePage";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/LoginPage";
import Signup from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar */}
      <Routes>
         <Route path="/" element={<LandingPage />} /> {/* Home Page */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
