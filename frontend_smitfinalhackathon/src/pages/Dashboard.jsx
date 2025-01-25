import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal, Form, Input } from "antd";
import { getItems, addItem, updateItem, deleteItem } from "../api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  // Fetch items
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await getItems();
      setItems(res.data);
    } catch (err) {
      toast.error("Failed to fetch items.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Add/Edit
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (currentItem) {
        await updateItem(currentItem._id, values);
        toast.success("Item updated successfully!");
      } else {
        await addItem(values);
        toast.success("Item added successfully!");
      }
      fetchItems();
      setIsModalOpen(false);
      setCurrentItem(null);
      form.resetFields();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed.");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      toast.success("Item deleted successfully!");
      fetchItems();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete item.");
    }
  };

  // Open Modal
  const openModal = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
    if (item) {
      form.setFieldsValue(item);
    }
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    form.resetFields();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const columns = [
    { title: "Name", dataIndex: "title", key: "title" },
    { title: "description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Actions",
      render: (item) => (
        <div className="space-x-2">
          <Button
            type="primary"
            onClick={() => openModal(item)}
            className="bg-blue-500"
          >
            Edit
          </Button>
          <Button
            danger
            onClick={() => handleDelete(item._id)}
            className="bg-red-500"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button
          type="primary"
          className="bg-green-500"
          onClick={() => openModal(null)}
        >
          Add Item
        </Button>
      </div>
      <Table
        dataSource={items}
        columns={columns}
        loading={loading}
        rowKey="_id"
        className="bg-white shadow-md rounded"
      />
      <Modal
        title={currentItem ? "Edit Item" : "Add Item"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="title"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input placeholder="Enter item name" />
          </Form.Item>
          <Form.Item
            label="description"
            name="description"
            rules={[{ required: true, message: "Please enter description!" }]}
          >
            <Input placeholder="Enter item description" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter a price" }]}
          >
            <Input placeholder="Enter item price" />
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
