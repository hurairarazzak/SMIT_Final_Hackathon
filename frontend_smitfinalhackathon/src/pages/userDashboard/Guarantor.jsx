import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, Row, Col, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const GuarantorAndPersonalDetails = () => {
  const [form] = Form.useForm();
  const [statementFileList, setStatementFileList] = useState([]);
  const [salarySheetFileList, setSalarySheetFileList] = useState([]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Submitted Data:", values);
      message.success("Details submitted successfully!");
    } catch (error) {
      console.error("Validation Failed:", error);
      message.error("Please fill in all required fields correctly.");
    }
  };

  const handleStatementUpload = ({ fileList }) => {
    setStatementFileList(fileList);
  };

  const handleSalarySheetUpload = ({ fileList }) => {
    setSalarySheetFileList(fileList);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
        Provide Additional Details
      </Typography.Title>

      <Card style={{ maxWidth: "800px", margin: "0 auto", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
        <Form layout="vertical" form={form}>
          {/* Personal Information */}
          <Typography.Title level={4}>Personal Information</Typography.Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please enter your full name" }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true, message: "Please enter your phone number" }]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Please enter your address" }]}
              >
                <Input.TextArea placeholder="Enter your address" rows={3} />
              </Form.Item>
            </Col>
          </Row>

          {/* Guarantor Information */}
          <Typography.Title level={4}>Guarantors' Information</Typography.Title>
          {[1, 2].map((guarantor) => (
            <Row gutter={[16, 16]} key={guarantor}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label={`Guarantor ${guarantor} Name`}
                  name={`guarantor${guarantor}Name`}
                  rules={[{ required: true, message: "Please enter the guarantor's name" }]}
                >
                  <Input placeholder="Enter guarantor's name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label={`Guarantor ${guarantor} Email`}
                  name={`guarantor${guarantor}Email`}
                  rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
                >
                  <Input placeholder="Enter guarantor's email" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label={`Guarantor ${guarantor} Location`}
                  name={`guarantor${guarantor}Location`}
                  rules={[{ required: true, message: "Please enter the guarantor's location" }]}
                >
                  <Input placeholder="Enter guarantor's location" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label={`Guarantor ${guarantor} CNIC`}
                  name={`guarantor${guarantor}Cnic`}
                  rules={[
                    { required: true, message: "Please enter the guarantor's CNIC" },
                    { pattern: /^\d{5}-\d{7}-\d{1}$/, message: "Invalid CNIC format. Use XXXXX-XXXXXXX-X" },
                  ]}
                >
                  <Input placeholder="Enter guarantor's CNIC" />
                </Form.Item>
              </Col>
            </Row>
          ))}

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleSubmit} style={{ width: "100%" }}>
              Submit Details
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default GuarantorAndPersonalDetails;