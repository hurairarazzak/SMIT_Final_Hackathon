import React from "react";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div className="pt-20 px-5 sm:px-10 lg:px-20">
      {/* Footer Grid */}
      <div className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-10 sm:gap-14 my-10 text-sm">
        {/* Logo and Description */}
        <div className="flex flex-col">
          <img
            src={logo}
            className="w-48 sm:w-64 mb-5" // Responsive width and bottom margin
            alt="logo"
          />
          <p className="text-gray-600 leading-relaxed">
            Saylani Welfare International Trust has been working for the last 22
            years to improve the conditions of the less privileged, helpless,
            and handicapped individuals. The organization is working day and
            night to make life happier, especially for the middle class, lower
            middle class, and even lower class.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <li className="hover:text-indigo-500 cursor-pointer">Home</li>
            <li className="hover:text-indigo-500 cursor-pointer">About</li>
            <li className="hover:text-indigo-500 cursor-pointer">Services</li>
            <li className="hover:text-indigo-500 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <p className="text-lg font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-3 text-gray-600">
            <li>(+0092-213) 4130786-90</li>
            <li>
              <a
                href="mailto:adnanshaikh84482@gmail.com"
                className="hover:text-indigo-500"
              >
                info@saylaniwelfare.com
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/SaylaniWelfareInternationalTrust/"
                className="hover:text-indigo-500"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/"
                className="hover:text-indigo-500"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
<div>
  <hr className="border-gray-300" />
  <div className="flex flex-col sm:flex-row justify-between items-center">
    <p className="py-5 text-sm text-left text-gray-500 w-full sm:w-auto">
      © Copyright 2025 Saylani Welfare Microfinance Bank - All Rights Reserved.
    </p>
    <p className="py-5 text-sm text-right text-gray-500 w-full sm:w-auto">
      Developed by Huraira Razzak
    </p>
  </div>
</div>

    </div>
  );
};

export default Footer;
