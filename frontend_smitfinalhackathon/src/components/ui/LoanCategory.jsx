import { Button } from 'antd';
import React from 'react';

const LoanCategories = () => {
  const loanCategories = [
    {
      title: "Wedding Loans",
      subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
      maxLoan: "PKR 5 Lakh",
      loanPeriod: "3 years",
    },
    {
      title: "Home Construction Loans",
      subcategories: ["Structure", "Finishing", "Loan"],
      maxLoan: "PKR 10 Lakh",
      loanPeriod: "5 years",
    },
    {
      title: "Business Startup Loans",
      subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
      maxLoan: "PKR 10 Lakh",
      loanPeriod: "5 years",
    },
    {
      title: "Education Loans",
      subcategories: ["University Fees", "Child Fees Loan"],
      maxLoan: "On Requirements",
      loanPeriod: "4 years",
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-r text-black container px-5 pt-20 mx-auto">
      <div className='container mx-auto flex items-center justify-between mb-10'>
        <div className='text-3xl font-bold tracking-tight'>
          Loan Categories
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            href='/loan-calculator'
          >
            Apply for Loan
          </Button>
        </div>
      </div>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loanCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-gray-900"
          >
            <h3 className="text-lg font-semibold mb-4 text-indigo-800">{category.title}</h3>
            <ul className="list-disc list-inside text-base text-gray-700 mb-4">
              {category.subcategories.map((subcategory) => (
                <li key={subcategory}>{subcategory}</li>
              ))}
            </ul>
            <div className="flex justify-between text-base mt-4">
              <span>Max Loan:</span>
              <span>{category.maxLoan}</span>
            </div>
            <div className="flex justify-between text-base">
              <span>Loan Period:</span>
              <span>{category.loanPeriod}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LoanCategories;
