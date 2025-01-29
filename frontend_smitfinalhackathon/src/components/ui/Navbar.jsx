import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import logo1 from "../../assets/logo.png";

const Navbar = () => {
  const menuItems = [
    { label: <Link to="/">Home</Link>, key: "home" },
    { label: <Link to="/auth/login">Login</Link>, key: "login" },
  ];

  return (
    <Layout.Header
      className="bg-white shadow-md flex items-center justify-between px-4 md:px-8 lg:px-12 xl:px-20"
      style={{
        backgroundColor: "#fff", // Ensures white background
      }}
    >
      <img src={logo1} alt="Saylani Logo" className="h-10 md:h-12" />
      <Menu
        mode="horizontal"
        theme="light"
        items={menuItems}
        className="hidden md:flex flex-1 justify-end"
      />
    </Layout.Header>
  );
};

export default Navbar;