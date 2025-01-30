import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  message,
  Row,
  Col,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import { AppRoutes } from "../../routes/routes";

const UserProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(AppRoutes.getMyInfo, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log("User data=>", response.data.data);
      setUserData(response.data.data);
      form.setFieldsValue(response.data.data);  // Set form values from the fetched user data
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      message.error("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (values) => {
    setLoading(true);
    try {
      const { user } = useContext(AuthContext);
      const formData = new FormData();
      
      // Add profile picture to FormData if uploaded
      if (values.profilePicture && values.profilePicture.file) {
        formData.append('profilePicture', values.profilePicture.file);
      }

      // Add other form values
      formData.append('name', values.name);
      formData.append('phone', values.phone);
      formData.append('address', values.address);
      
      const response = await axios.put(`/api/user/${user?._id}`, formData, {
     headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      setUserData(response.data);  // Update user data with the response from the API
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      message.error("Failed to update profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    // Show a loading spinner or message while the user data is being fetched
    return <div>Loading user data...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title
        level={3}
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        User Profile
      </Typography.Title>

      <Card
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
          initialValues={userData}  // Initial form values from fetched user data
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input placeholder="Enter your email" disabled />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Please enter your phone number!" }]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>

          <Form.Item label="Profile Picture" name="profilePicture">
            <Upload
              name="profile"
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
            >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserProfile;
