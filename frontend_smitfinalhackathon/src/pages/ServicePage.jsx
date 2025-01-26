import React from "react";
import { FaCode, FaMobileAlt, FaDatabase, FaCloud, FaPaintBrush } from "react-icons/fa";

const services = [
  {
    icon: <FaCode size={48} className="text-blue-600" />,
    title: "Web Development",
    description: "Building responsive and modern web applications tailored to your needs.",
  },
  {
    icon: <FaMobileAlt size={48} className="text-green-600" />,
    title: "Mobile App Development",
    description: "Creating sleek and user-friendly mobile applications for Android and iOS.",
  },
  {
    icon: <FaDatabase size={48} className="text-orange-600" />,
    title: "Database Management",
    description: "Efficient and scalable database solutions to handle your data needs.",
  },
  {
    icon: <FaCloud size={48} className="text-purple-600" />,
    title: "Cloud Solutions",
    description: "Cloud-based services and deployment for scalable business growth.",
  },
  {
    icon: <FaPaintBrush size={48} className="text-pink-600" />,
    title: "UI/UX Design",
    description: "Crafting intuitive and visually appealing user experiences.",
  },
];

const ServicesPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800">Our Services</h1>
        <p className="mt-4 text-lg text-gray-600">
          We provide a wide range of IT solutions to help your business thrive in the digital age.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;