import React, { useState } from "react";
import Footer from "../footer/Footer";
import SubNavbar from "../navbar/SubNav";

const policySections = [
  {
    title: "1. Introduction",
    content:
      "We value your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, disclose, and safeguard your information in accordance with the Data Protection Act, 2012 (Act 843) of Ghana.",
  },
  {
    title: "2. Information We Collect",
    content: (
      <ul className="list-disc ml-5 text-sm space-y-1 text-gray-600">
        <li>Personal identifiers (name, email, phone number, etc.)</li>
        <li>Device and usage data (IP address, browser type, etc.)</li>
        <li>Payment and transaction information (when applicable)</li>
      </ul>
    ),
  },
  {
    title: "3. How We Use Your Information",
    content:
      "We use the data to provide services, improve our platform, communicate with users, and ensure compliance with legal obligations.",
  },
  {
    title: "4. Data Sharing & Disclosure",
    content:
      "Your data may be shared with third-party service providers (e.g., payment processors) under strict confidentiality agreements. We do not sell your personal information.",
  },
  {
    title: "5. Data Retention",
    content:
      "We retain your personal data only as long as necessary for the purposes outlined in this policy or as required by law.",
  },
  {
    title: "6. Your Rights",
    content: (
      <>
        <p className="text-sm mb-2">
          Under Ghana's Data Protection Act, you have the right to:
        </p>
        <ul className="list-disc ml-5 text-sm space-y-1 text-gray-600">
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Object to the processing of your data</li>
          <li>Withdraw your consent at any time</li>
        </ul>
      </>
    ),
  },
  {
    title: "7. Data Security",
    content:
      "We implement technical and organizational measures to protect your personal data from unauthorized access, loss, or misuse.",
  },
  {
    title: "8. Changes to This Policy",
    content:
      "We may update this policy periodically. We will notify you of significant changes by updating the effective date at the top of the policy.",
  },
  {
    title: "9. Contact Us",
    content: (
      <p className="text-sm">
        If you have any questions about this Privacy Policy or how your data is handled, contact us at:
        <br />
        📧 <strong>privacy@yourwebsite.com</strong>
        <br />
        📞 <strong>+233 20 123 4567</strong>
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
    {/* navbar */}
    <SubNavbar/>
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-bold text-orange-600 text-center mb-10">Privacy Policy</h1>

      {policySections.map((section, index) => (
        <div key={index} className="mb-4 border-b pb-3">
          <button
            onClick={() => toggle(index)}
            className="text-left w-full text-lg font-semibold text-orange-500 hover:text-orange-600 transition-all duration-200"
          >
            {section.title}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              activeIndex === index ? "max-h-96 mt-2 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="text-sm text-gray-600">{section.content}</div>
          </div>
        </div>
      ))}
    </div>
    {/* footer */}
    <Footer/>
    </>
    
  );
}
