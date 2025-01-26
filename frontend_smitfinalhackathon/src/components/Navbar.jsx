import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import logo from "../assets/logo.png";

const Navbar = () => {
  const menuItems = [
    { label: <Link to="/">Home</Link>, key: "home" },
    { label: <Link to="/about">About</Link>, key: "about" },
    { label: <Link to="/services">Services</Link>, key: "services" },
    { label: <Link to="/contact">Contact</Link>, key: "contact" },
    { label: <Link to="/login">Login</Link>, key: "login" },
    { label: <Link to="/signup">Signup</Link>, key: "signup" },
  ];

  return (
    <Layout.Header
      className="bg-white shadow-md flex items-center justify-between px-4 md:px-8 lg:px-12 xl:px-20"
      style={{
        backgroundColor: "#fff", // Ensures white background
      }}
    >
      <img src={logo} alt="Saylani Logo Design" className="h-10 md:h-12" />
      <Menu
        mode="horizontal"
        theme="light"
        items={menuItems}
        className="hidden md:flex flex-1 justify-end"
      />
      <div className="md:hidden">
        {/* Add a responsive menu icon for mobile screens */}
        <button className="text-black focus:outline-none">
          {/* Use an icon library like Lucide React for better icons */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </Layout.Header>
  );
};

export default Navbar;