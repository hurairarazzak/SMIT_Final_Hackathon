import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { Form, Input, Button, Card, notification } from "antd";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await login(values);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        notification.success({
          message: "Login Successful!",
          description: "Welcome to the Dashboard",
        });
        navigate("/dashboard");
      } else {
        notification.error({
          message: "Login Failed",
          description: res.data.message,
        });
      }
    } catch (err) {
      console.error(err);
      notification.error({
        message: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters long" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <span>Don't have an account? </span>
          <a
            className="text-blue-500 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Signup here
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Login;
