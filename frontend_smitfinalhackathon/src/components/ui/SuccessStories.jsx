import React from "react";
import { Card } from "antd";

const testimonials = [
  {
    title: "Haroon Khan",
    description: "Haroon Khan secured funding and pursue his education in the UK.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw2Dj6jnK6ACrHyAOY75OYIbM6W9Lj8ciHLg&s",
  },
  {
    title: "Rizwan Shah",
    description: "Rizwan Shah owns “Mobile & Accessories” shop in Lahore.",
    image: "https://finca.pk/wp-content/uploads/sites/4/2020/02/Rizwan-Shah.jpg",
  },
  {
    title: "Javed Iqbal",
    description: "Javed Iqbal owns “Auto & Cycle Spare Parts” shop in Lahore",
    image: "https://finca.pk/wp-content/uploads/sites/4/2020/02/Javed-Iqbal-320x202.jpg",
  }
];

const Testimonials = () => {
  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-black">Success Stories & Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            hoverable
            cover={<img src={testimonial.image} alt="Success Story" className="h-60 object-cover" />}
            className="shadow-lg rounded-lg"
          >
            <h3 className="text-lg font-semibold text-[#003366]">{testimonial.title}</h3>
            <p className="text-gray-700">{testimonial.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
