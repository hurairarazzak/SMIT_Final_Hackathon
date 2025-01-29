import React from "react";
import { Steps } from "antd";
import { FileTextOutlined, UploadOutlined, CheckCircleOutlined, CreditCardOutlined } from "@ant-design/icons";

const { Step } = Steps;

const LoanProcess = () => {
  const iconStyle = { fontSize: "24px", color: "#1890ff" }; // Uniform blue color for all icons

  const steps = [
    { title: "Apply Online", icon: <FileTextOutlined style={iconStyle} />, description: "Fill out the online application form." },
    { title: "Upload Documents", icon: <UploadOutlined style={iconStyle} />, description: "Submit required documents for verification." },
    { title: "Approval Process", icon: <CheckCircleOutlined style={iconStyle} />, description: "Our team reviews and approves your loan." },
    { title: "Receive Loan", icon: <CreditCardOutlined style={iconStyle} />, description: "Received Funds from the branch." },
  ];

  return (
    <div className="p-10 max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-6">How Loan Process Works?</h2>
      <Steps current={0} size="default">
        {steps.map((step, index) => (
          <Step key={index} title={<span className="text-base font-semibold">{step.title}</span>} icon={step.icon} description={step.description} />
        ))}
      </Steps>
    </div>
  );
};

export default LoanProcess;