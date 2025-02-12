import React, { useState, useEffect, useContext } from "react";
import { Form, Input, Button, Typography, message, Spin } from "antd";
import { AuthContext } from "../../context/UserContext";
import axios from "axios";
import { AppRoutes } from "../../routes/routes";

const { Title } = Typography;

const Profile = () => {
    const [form] = Form.useForm(); 
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        if (user && user._id) {
            fetchUserData();
        } else {
            setFetching(false);
        }
    }, [user]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${AppRoutes.updateUser}/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const userData = response.data.data;

            setTimeout(() => {
                form.setFieldsValue({
                    fullName: userData.fullName || "",
                    email: userData.email || "",
                    cnic: userData.cnic || "",
                    mobileNo: userData.mobileNo || "",
                    fatherName: userData.fatherName || "",
                    address: userData.address || "",
                });
            }, 0); 

        } catch (error) {
            console.error("Failed to fetch user data:", error);
            message.error("Failed to fetch user data");
        } finally {
            setFetching(false);
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.put(`${AppRoutes.updateUser}/${user._id}`, values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            setUser(response.data.data);
            message.success("Profile updated successfully");

            setTimeout(() => {
                form.setFieldsValue(response.data.data);
            }, 0);

        } catch (error) {
            message.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <Spin size="large" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }} />;
    }

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <Title level={2}>Profile</Title>
            {/* ✅ Pass form instance correctly */}
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item label="Name" name="fullName">
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input disabled />
                </Form.Item>
                <Form.Item label="CNIC" name="cnic">
                    <Input disabled />
                </Form.Item>
                <Form.Item label="Mobile No" name="mobileNo">
                    <Input />
                </Form.Item>
                <Form.Item label="Father's Name" name="fatherName">
                    <Input />
                </Form.Item>
                <Form.Item label="Address" name="address">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Update Profile
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Profile;
