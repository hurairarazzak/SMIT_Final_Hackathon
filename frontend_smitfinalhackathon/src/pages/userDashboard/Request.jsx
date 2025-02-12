import React from "react";
import { Card, Typography, Row, Col, Table, Spin } from "antd";

const LoanRequestDetails = ({ loanDetails }) => {
  // Sample data structure for loanDetails
  const {
    category,
    subcategory,
    loanAmount,
    loanPeriod,
    guarantors,
    personalInfo,
    tokenNumber,
    appointmentDetails,
  } = loanDetails || {};

  // Add a unique key to each guarantor
  const guarantorsWithKeys = guarantors
    ? guarantors.map((guarantor, index) => ({ ...guarantor, key: index }))
    : [];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "CNIC",
      dataIndex: "cnic",
      key: "cnic",
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Typography.Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
        Loan Request Details
      </Typography.Title>

      {/* Loan Details Card */}
      <Card
        title="Loan Details"
        style={{ marginBottom: "24px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Typography.Text strong>Category:</Typography.Text>
            <Typography.Text> {category || "N/A"}</Typography.Text>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Typography.Text strong>Subcategory:</Typography.Text>
            <Typography.Text> {subcategory || "N/A"}</Typography.Text>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Typography.Text strong>Loan Amount:</Typography.Text>
            <Typography.Text> PKR {loanAmount || "N/A"}</Typography.Text>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Typography.Text strong>Loan Period:</Typography.Text>
            <Typography.Text> {loanPeriod || "N/A"} years</Typography.Text>
          </Col>
        </Row>
      </Card>

      {/* Guarantors Card */}
      <Card
        title="Guarantors"
        style={{ marginBottom: "24px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <Table
          dataSource={guarantorsWithKeys}
          columns={columns}
          pagination={false}
          bordered
          scroll={{ x: true }} // Make table scrollable on small screens
          loading={!guarantors} // Show loading spinner if data is not available
        />
      </Card>

      {/* Personal Information Card */}
      <Card
        title="Personal Information"
        style={{ marginBottom: "24px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Typography.Text strong>Address:</Typography.Text>
            <Typography.Text> {personalInfo?.address || "N/A"}</Typography.Text>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Typography.Text strong>Phone:</Typography.Text>
            <Typography.Text> {personalInfo?.phone || "N/A"}</Typography.Text>
          </Col>
        </Row>
      </Card>

      {/* Token and Appointment Details Card */}
      <Card
        title="Additional Details"
        style={{ marginBottom: "24px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Typography.Text strong>Token Number:</Typography.Text>
            <Typography.Text> {tokenNumber || "N/A"}</Typography.Text>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Typography.Text strong>Appointment Details:</Typography.Text>
            <Typography.Text> {appointmentDetails || "N/A"}</Typography.Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

// Example usage with mock data
const mockLoanDetails = {
  category: "Business Startup Loans",
  subcategory: "Shop Machinery",
  loanAmount: 800000,
  loanPeriod: 5,
  guarantors: [
    { name: "John Doe", email: "john@example.com", location: "Karachi", cnic: "42101-1234567-1" },
    { name: "Jane Smith", email: "jane@example.com", location: "Lahore", cnic: "42101-7654321-1" },
  ],
  personalInfo: { address: "123 Street, Karachi", phone: "0301-1234567" },
  tokenNumber: "12345",
  appointmentDetails: "Office A, 10:00 AM, 25th Jan 2025",
};

export default function ViewRequest() {
  return <LoanRequestDetails loanDetails={mockLoanDetails} />;
}