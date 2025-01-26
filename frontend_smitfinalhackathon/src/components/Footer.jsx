import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="pt-20">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm">
        <div className="flex flex-col">
          {/* Larger logo with fixed width and added margin */}
          <img
            src={logo}
            className="w-64 mr-7" /* Increased width to w-64 and added left margin */
            alt="logo"
          />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
            fugit et omnis a in neque, iusto quas quam vitae praesentium tempore
            ad, molestiae cum possimus!
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+92 330 5012870</li>
            <li>
              <a href="mailto:hurairarazzak125@gmail.com">
                hurairarazzak125@gmail.com
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/SaylaniWelfareInternationalTrust/">
              Facebook
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          © Copyright 2024 Saylaniwelafare - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
