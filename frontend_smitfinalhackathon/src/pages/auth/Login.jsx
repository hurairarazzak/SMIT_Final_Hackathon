import React, { useState, useContext } from "react";
import { Form, Input, Button, Card, Typography, Spin, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../routes/routes";
import { AuthContext } from "../../context/UserContext"; // Import AuthContext

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext); // Get setUser from context
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(AppRoutes.login, values);

      if (response?.status === 200) {
        const { token, user } = response.data.data;

        // Save token to cookies and update AuthContext
        Cookies.set("token", token);
        setUser(user); // Update user state globally

        message.success("Login successful!");

        // Redirect user based on role
        setTimeout(() => {
          if (user.role === "admin") {
            navigate("/admin-dashboard");
          } else if (user.role === "user") {
            navigate("/user-dashboard");
          } else {
            message.error("You are not authorized to login.");
          }
        }, 500);
      } else {
        message.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error(error.response?.data?.message || "Login failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg rounded-xl p-8">
        <Typography.Title level={2} className="text-center text-blue-600">
          Welcome Back
        </Typography.Title>
        <Typography.Text type="secondary" className="block text-center mb-4">
          Please login to your account
        </Typography.Text>

        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your email" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters long!" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" disabled={loading}>
              {loading ? <Spin /> : "Login"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
