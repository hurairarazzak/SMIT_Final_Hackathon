import { useState } from "react";
import {
  Card,
  Select,
  Input,
  Button,
  Typography,
  Alert,
  message,
  Modal,
  Form,
  Spin,
} from "antd";
import axios from "axios";
import { AppRoutes } from "../routes/routes";

const { Title, Paragraph } = Typography;
const { Option } = Select;
const loanCategories = {
  "Wedding Loans": {
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxLoan: 500000,
    period: 3,
  },
  "Home Construction Loans": {
    subcategories: ["Structure", "Finishing", "Loan"],
    maxLoan: 1000000,
    period: 5,
  },
  "Business Startup Loans": {
    subcategories: [
      "Buy Stall",
      "Advance Rent for Shop",
      "Shop Assets",
      "Shop Machinery",
    ],
    maxLoan: 1000000,
    period: 5,
  },
  "Education Loans": {
    subcategories: ["University Fees", "Child Fees Loan"],
    maxLoan: "Based on requirement",
    period: 4,
  },
};

export default function LoanCalculator() {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [subcategory, setSubcategory] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [loanBreakdown, setLoanBreakdown] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubcategory("");
    setLoanPeriod(loanCategories[value]?.period || "");
  };

  const calculateLoan = () => {
    if (!category || !subcategory || !initialAmount || !depositAmount) {
      message.error("Please fill all fields");
      return;
    }

    const maxLoan = loanCategories[category].maxLoan;
    const requestedAmount =
      parseFloat(initialAmount) - parseFloat(depositAmount);

    if (maxLoan !== "Based on requirement" && requestedAmount > maxLoan) {
      message.error(`Maximum loan allowed is PKR ${maxLoan}`);
      return;
    }

    // Calculate total payable amount without interest
    const totalPayable = requestedAmount;
    const monthlyInstallment = totalPayable / (loanPeriod * 12);

    setLoanBreakdown({ totalPayable, monthlyInstallment });
  };

  const generateRandomPassword = (length = 6) => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields(); // Validate fields before submission
      // console.log("Form values:", values);

      const uniquePassword = generateRandomPassword(); // Generate a unique password for the user

      setLoading(true);
      // Make API request
      const res = await axios.post(AppRoutes.sendLoginPassword, {
        senderName: values.name,
        sender: "hurairarazzak125@gmail.com",
        receiver: values.email,
        subject: "Your Account Password",
        message: `
              <html>
<head>
  <style>
    body {
      font-family: 'Roboto', sans-serif;
      background: linear-gradient(to right, #6a11cb, #2575fc);
      margin: 0;
      padding: 0;
      color: #ffffff;
    }
    .container {
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 15px;
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
      color: #333;
    }
    h1 {
      font-size: 28px;
      text-align: center;
      margin-bottom: 15px;
      color: #4a00e0;
    }
    p {
      line-height: 1.8;
      font-size: 16px;
      margin: 10px 0;
    }
    .highlight {
      color: #e63946;
      font-weight: 600;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      color: #555;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background: #4a00e0;
      color: #fff;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      text-align: center;
      box-shadow: 0 4px 10px rgba(74, 0, 224, 0.5);
    }
    .btn:hover {
      background: #3700b3;
      box-shadow: 0 6px 15px rgba(74, 0, 224, 0.6);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Our Platform!</h1>
    <p>Hello, <span class="highlight">${values.name}</span>,</p>
    <p>We're thrilled to have you on board. Here is your account password:</p>
    <p style="font-size: 18px; text-align: center; background: #f9f9f9; padding: 10px; border-radius: 8px; font-weight: bold;">
      ${uniquePassword}
    </p>
    <p>Make sure to keep your password private and secure.</p>
    <div class="footer">
      <p>Need help? Reach out to our <strong>Support Team</strong>.</p>
      <p>&copy; 2025 Saylani Microfinance. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
           `,
      });
      // console.log("Email sent:", res);
      const newUser = await axios
        .post(AppRoutes.register, {
          fullName: values.name,
          email: values.email,
          password: uniquePassword,
          cnic: values.cnic,
          imageUrl: values.imageUrl || "https://e7.pngegg.com/pngimages/636/141/png-clipart-computer-icons-user-s-included-miscellaneous-user-profile.png",
        })
        .then((res) => {
          message.success(
            "Form submitted successfully, Check your email for login details!"
          );
          setCategory("");
          setSubcategory("");
          setInitialAmount("");
          setDepositAmount("");
          setLoanPeriod("");
          setLoanBreakdown(null);
          setLoading(false);
        })
        .catch((err) => {
          message.error(
            "User already requested before. Please try again later."
          );
          setLoading(false);
        });

      setLoading(false);
      setIsModalVisible(false);
      form.resetFields(); // Clear form after submission
    } catch (error) {
      if (error.name === "ValidationError") {
        message.error("Please fill in all fields correctly.");
      } else {
        // console.error("Failed to submit form:", error);
        message.error("Failed to submit form. Please try again later.");
      }
    }
  };

  return (
    <>
      <Card
        style={{
          maxWidth: 700,
          margin: "30px auto",
          padding: "20px", // Reduced padding here
          borderRadius: "20px",
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)",
          background: "linear-gradient(135deg, #00b09b, #96c93d)",
          color: "#ffffff",
          textAlign: "center",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          boxSizing: "border-box",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0px 15px 30px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0px 10px 25px rgba(0, 0, 0, 0.15)";
        }}
      >
        <div
          style={{
            padding: "1px 20px", // Reduced padding here
            margin: "15px 0", // Reduced margin here
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            Saylani Microfinance App <br />
            Loan Calculator
          </h1>
        </div>
        <Select
          placeholder="Select Category"
          onChange={handleCategoryChange}
          style={{ width: "100%", marginBottom: 20 }}
        >
          {Object.keys(loanCategories).map((cat) => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>

        {category && (
          <Select
            placeholder="Select Subcategory"
            onChange={setSubcategory}
            style={{ width: "100%", marginBottom: 20 }}
          >
            {loanCategories[category].subcategories.map((sub) => (
              <Option key={sub} value={sub}>
                {sub}
              </Option>
            ))}
          </Select>
        )}

        <Input
          type="number"
          placeholder="Enter request amount"
          value={initialAmount}
          onChange={(e) => setInitialAmount(e.target.value)}
          style={{ marginBottom: 20 }}
        />

        <Input
          type="number"
          placeholder="Enter Deposit amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          style={{ marginBottom: 20 }}
        />

        {loanPeriod && <Paragraph>Loan Period: {loanPeriod} years</Paragraph>}

        <Button block onClick={calculateLoan} style={{ width: "100%" }}>
          Calculate
        </Button>

        {loanBreakdown && (
          <>
            <div style={{ marginTop: 20 }}>
              <Paragraph>
                Total Payable: PKR {loanBreakdown.totalPayable.toFixed(2)}
              </Paragraph>
              <Paragraph>
                Monthly Installment: PKR{" "}
                {loanBreakdown.monthlyInstallment.toFixed(2)}
              </Paragraph>
            </div>
            <Button
              style={{ width: "100%" }}
              type="primary"
              onClick={() => setIsModalVisible(true)}
            >
              Proceed
            </Button>
          </>
        )}
      </Card>

      <Modal
        title="Enter Your Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="CNIC"
            name="cnic"
            rules={[
              {
                required: true,
                message: "Please enter your CNIC (without dashes).",
              },
              {
                pattern: /^\d{5}\d{7}\d{1}$/,
                message: "Please enter a valid CNIC.",
              },
            ]}
          >
            <Input placeholder="Enter your CNIC" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input placeholder="Enter your Email" />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your Name" },
              {
                pattern: /^[a-zA-Z\s]+$/,
                message: "Name should only contain letters and spaces",
              },
            ]}
          >
            <Input placeholder="Enter your Name" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: "100%" }}
          >
            {loading ? <Spin /> : "Submit"}
          </Button>
        </Form>
      </Modal>
    </>
  );
}
