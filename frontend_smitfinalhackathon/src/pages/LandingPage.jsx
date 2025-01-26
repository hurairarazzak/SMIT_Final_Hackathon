import React, { useState, useRef } from "react";
import {
  Button,
  Carousel,
  Typography,
  Row,
  Col,
  Card,
  Form,
  Input,
  message,
  Tooltip,
  Modal,
} from "antd";
import NewsLetter from "../components/NewsLetter.jsx";

// Import images
import weddingImage from "../assets/wedding.jpg";
import homeImage from "../assets/home.jpg";
import educationImage from "../assets/edu.jpg";

const LandingPage = () => {
  const categories = [
    {
      _id: 1,
      name: "Wedding Loans",
      description:
        "Loans for wedding expenses including valima, furniture, etc.",
      image: weddingImage,
      subcategories: [
        { name: "Valima", maxLoan: 500000, period: 3 },
        { name: "Furniture", maxLoan: 500000, period: 3 },
      ],
    },
    {
      _id: 2,
      name: "Home Construction Loans",
      description:
        "Loans for home construction including structure and finishing.",
      image: homeImage,
      subcategories: [
        { name: "Structure", maxLoan: 1000000, period: 5 },
        { name: "Finishing", maxLoan: 1000000, period: 5 },
      ],
    },
    {
      _id: 3,
      name: "Business Startup Loans",
      description:
        "Loans for Buy Stall, Advance Rent for Shop, Shop Assets, Shop Machinery, etc.",
      image: weddingImage,
      subcategories: [
        { name: "Buy Stall", maxLoan: 1000000, period: 5 },
        { name: "Advance Rent for Shop", maxLoan: 500000, period: 5 },
        { name: "Shop Assets", maxLoan: 500000, period: 5 },
        { name: "Shop Machinery", maxLoan: 500000, period: 5 },
      ],
    },
    {
      _id: 4,
      name: "Education Loans",
      description: "Loans for University Fees, Child Fees, etc.",
      image: educationImage,
      subcategories: [
        { name: "University Fees", maxLoan: 500000, period: 4 },
        { name: "Child Fees", maxLoan: 500000, period: 4 },
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for Modal visibility

  const subcategorySectionRef = useRef(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);

    // Ensure that the ref is not null
    if (subcategorySectionRef.current) {
      subcategorySectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleFormSubmit = (values) => {
    if (values.loanPeriod < 1) {
      message.error("Loan period cannot be less than 1 year.");
      return;
    }
    if (values.loanPeriod > selectedSubcategory.period) {
      message.error(
        `Loan period cannot exceed ${selectedSubcategory.period} years.`
      );
      return;
    }
    if (values.loanAmount > selectedSubcategory.maxLoan) {
      message.error(
        `Loan amount cannot exceed PKR ${selectedSubcategory.maxLoan}.`
      );
      return;
    }
    message.success("Loan application submitted successfully!");
    console.log(values);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalSubmit = (values) => {
    const { cnic, email, name } = values;

    // Validation for CNIC: should be 13 digits only
    if (!/^\d{13}$/.test(cnic)) {
      message.error("CNIC should be exactly 13 digits.");
      return;
    }

    // Validation for Email: proper email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      message.error("Please enter a valid email address.");
      return;
    }

    // Validation for Name: should be a string
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      message.error("Name should only contain alphabets and spaces.");
      return;
    }

    message.success("Form submitted successfully!");
    console.log(values);
    setIsModalVisible(false); // Close the modal on successful submission
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Carousel Section */}
      <Carousel autoplay effect="fade">
        {categories.map((category) => (
          <div key={category._id} className="relative">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <Typography.Title level={2} className="text-white">
                {category.name}
              </Typography.Title>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Loan Categories Section */}
      <div className="py-12 px-4 text-center">
        <Typography.Title level={2}>
          Explore Our Loan Categories
        </Typography.Title>
        <Typography.Paragraph>
          Select the loan category that best suits your needs. Each loan has
          different subcategories and benefits.
        </Typography.Paragraph>
        <Row gutter={[16, 16]}>
          {categories.map((category) => (
            <Col xs={24} sm={12} md={6} key={category._id}>
              <Card
                hoverable
                cover={<img alt={category.name} src={category.image} />}
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleCategorySelect(category)}
                  >
                    Get Started
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={category.name}
                  description={category.description}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Subcategories and Loan Form */}
      {selectedCategory && (
        <div ref={subcategorySectionRef} className="py-12 px-4 text-center">
          <Typography.Title level={2}>
            Select Subcategory for {selectedCategory.name}
          </Typography.Title>
          <Row gutter={[16, 16]} justify="center">
            {selectedCategory.subcategories.map((subcategory) => (
              <Col span={12} md={6} key={subcategory.name}>
                <Tooltip
                  title={`Maximum Loan: PKR ${subcategory.maxLoan} | Period: ${subcategory.period} years`}
                >
                  <Card
                    hoverable
                    onClick={() => handleSubcategorySelect(subcategory)}
                    className="transition-transform duration-300 hover:scale-105"
                  >
                    <Card.Meta
                      title={subcategory.name}
                      description={`Max Loan: PKR ${subcategory.maxLoan}`}
                    />
                  </Card>
                </Tooltip>
              </Col>
            ))}
          </Row>

          {selectedSubcategory && (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
              <Form
                onFinish={handleFormSubmit}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <h4 className="text-xl font-semibold text-gray-700 text-center mb-6">
                  Loan Details
                </h4>

                {/* Loan Amount */}
                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">
                    Loan Amount (PKR)
                  </label>
                  <input
                    placeholder="Enter loan amount"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="loanAmount"
                    required
                  />
                  <p className="text-sm text-red-500 mt-1 hidden">
                    Loan amount must not be greater than the initial deposit.
                  </p>
                </div>

                {/* Initial Deposit */}
                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">
                    Initial Deposit (PKR)
                  </label>
                  <input
                    placeholder="Enter initial deposit"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="initialDeposit"
                    required
                  />
                </div>

                {/* Loan Period */}
                <div className="mb-6">
                  <label className="block text-gray-600 font-medium mb-2">
                    Loan Period (Years, Max: {selectedSubcategory.period})
                  </label>
                  <input
                    placeholder="Enter loan period"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    max={selectedSubcategory.period}
                    name="loanPeriod"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                  onClick={showModal}
                >
                  Proceed
                </button>
              </Form>
            </div>
          )}
        </div>
      )}

      {/* Modal for CNIC, Email, Name */}
      <div>
        {/* Modal for CNIC, Email, Name */}
        <Modal
          title="Personal Information"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          destroyOnClose
        >
          <Form onFinish={handleModalSubmit}>
            <Form.Item
              label="CNIC"
              name="cnic"
              rules={[
                { required: true, message: "Please enter your CNIC!" },
                {
                  pattern: /^\d{13}$/,
                  message: "CNIC must be 13 digits.",
                },
              ]}
            >
              <Input placeholder="Enter your CNIC" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter your name!" },
                {
                  pattern: /^[a-zA-Z\s]+$/,
                  message: "Name should only contain alphabets and spaces.",
                },
              ]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div>
        <NewsLetter />
      </div>

      <div className="text-center py-12">
        <Typography.Title level={2}>
          Get the Loan You Need, When You Need It!
        </Typography.Title>
        <Typography.Paragraph>
          Choose your category and start the loan application process today!
        </Typography.Paragraph>
        <Button
          type="primary"
          size="large"
          className="mt-6"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
