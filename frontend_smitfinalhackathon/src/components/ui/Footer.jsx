import React from "react";
import logo from "../../assets/logo.png";

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
            Saylani Welfare International Trust has been working for the last 22
            years to improve the conditions of the less privileged, helpless,
            and handicapped individuals. The organization is working day and
            night to make life happier, especially for the middle class, lower
            middle class and even lower class. At time of establishing the
            organization, the founder of Saylani Welfare International Trust and
            a few of his associates had made a commitment to serve the
            distressed people living in Pakistan and abroad in all stages of
            life. It is a blessing in disguise that today the organization is
            serving humanity in more than 63 areas of life without any
            discrimination.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+92 304 3712471</li>
            <li>
              <a href="mailto:adnanshaikh84482@gmail.com">
              adnanshaikh84482@gmail.com
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/SaylaniWelfareInternationalTrust/">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          © Copyright 2025 Saylaniwelafare - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;