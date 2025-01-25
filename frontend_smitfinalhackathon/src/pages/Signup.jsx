import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";
import { Input, Button, Form, Card, Typography, notification } from "antd";

const { Title } = Typography;

const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const res = await signup(values);
      if (res.data.success) {
        notification.success({ message: "Signup Successful!" });
        navigate("/login");
      } else {
        notification.error({ message: res.data.message });
      }
    } catch (err) {
      console.error(err);
      notification.error({ message: "Signup Failed", description: err.message });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <Title level={3} className="text-center mb-6 text-orange-600">
          SignUp
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter your name" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Enter your email" size="large" type="email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" size="large" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
            size="large"
          >
            Signup
          </Button>
        </Form>

        <div className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-orange-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
