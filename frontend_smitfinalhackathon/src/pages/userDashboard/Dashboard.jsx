import React, { useContext, useState, useEffect } from "react";
import { Layout, Menu, Button, Typography, Avatar, Row, Col, Card } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../context/UserContext"; // Update the import
import ViewRequest from "./Request";
import UserProfile from "./Profile";
import GuarantorAndPersonalDetails from "./Guarantor";
import User from "./User";
import ApplicationForm from "./ApplicationForm";
import axios from "axios";
import { AppRoutes } from "../../routes/routes";
import { useNavigate } from "react-router-dom"; // Add this import

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const UserDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const { user, loading, logout } = useContext(AuthContext); 
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // Add useNavigate for navigation

  useEffect(() => {
    if (user && user._id) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${AppRoutes.updateUser}/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch user data:",
        error.response?.data || error.message
      );
    }
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function from AuthContext
      localStorage.removeItem("token"); // Clear token from localStorage
      navigate("/auth/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  

  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return <User userData={userData} />;
      case "profile":
        return <UserProfile />;
      case "form":
        return <ApplicationForm />;
      case "guarantor":
        return <GuarantorAndPersonalDetails />;
      case "request":
        return <ViewRequest />;
      case "logout":
        handleLogout();
        return null;
      default:
        return <Title>Welcome!</Title>;
    }
  };

  if (loading || !userData) {
    return <Title>Loading...</Title>;
  }

  const currentUser = {
    imageUrl: userData?.imageUrl || (
      <Avatar
        size={50}
        icon={<UserOutlined />}
        style={{ marginBottom: 5, backgroundColor: "#87d068" }}
      />
    ),
    name: userData?.fullName || "Guest",
    email: userData?.email || "N/A",
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <PieChartOutlined />,
      label: "Dashboard",
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "form",
      icon: <FormOutlined />,
      label: "Application",
    },
    {
      key: "request",
      icon: <DesktopOutlined />,
      label: "View Request",
    },
    {
      key: "guarantor",
      icon: <UsergroupAddOutlined />,
      label: "Guarantors Info",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="sm"
        collapsedWidth={0}
        onBreakpoint={(broken) => {
          if (broken) setCollapsed(true);
        }}
        style={{
          background: "#001529",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            height: "64px",
            margin: "16px",
            color: "white",
            textAlign: "center",
            lineHeight: "32px",
            fontSize: "18px",
          }}
        >
          {collapsed ? "" : "Saylani Microfinance"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          onClick={({ key }) => setSelectedMenu(key)}
          items={menuItems}
          style={{
            background: "#001529",
          }}
        />
      </Sider>

      <Layout className="site-layout">
        <Header
          style={{
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
            color: "#fff",
          }}
        >
          <Button
            type="text"
            onClick={toggleSidebar}
            style={{
              transition: "all 0.3s",
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Title level={4} style={{ margin: 0, marginLeft: "16px" }}>
            User Dashboard
          </Title>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "white", fontSize: "1.2rem" }}>
              {currentUser.name.toLocaleUpperCase()}
            </Text>
            <Avatar
              src={currentUser.imageUrl}
              size={40}
              style={{ border: "2px solid #fff" }}
            />
          </div>
        </Header>
        <Content
          style={{
            padding: "16px",
            background: "#f0f2f5",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;