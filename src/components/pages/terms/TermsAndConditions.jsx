import React, { useState } from "react";
import SubNavbar from "../navbar/SubNav";
import Footer from "../footer/Footer";

const termsData = [
    {
        title: "1. Introduction",
        content: "By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree, please do not use the website.",
    },
    {
        title: "2. Use of Our Services",
        content: "You agree to use the platform only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the platform.",
    },
    {
        title: "3. Account Registration",
        content: "You may be required to register for an account to access some features. You are responsible for maintaining the confidentiality of your account information.",
    },
    {
        title: "4. Product Information",
        content: "We strive to ensure that product descriptions and pricing are accurate. However, we do not warrant that product descriptions or other content is error-free.",
    },
    {
        title: "5. Payments",
        content: "All payments are processed securely. We do not store your card information on our servers. Transactions are subject to local banking and mobile money regulations in Ghana.",
    },
    {
        title: "6. Intellectual Property",
        content: "All content, trademarks, logos, and other intellectual property are the property of this website and may not be used without permission.",
    },
    {
        title: "7. Termination",
        content: "We reserve the right to terminate or suspend your access to the site without prior notice for any conduct that violates these terms or is harmful to other users or us.",
    },
    {
        title: "8. Limitation of Liability",
        content: "We are not liable for any indirect, incidental, or consequential damages arising from the use of this website or products sold on it.",
    },
    {
        title: "9. Contact Information",
        content: "For questions or concerns about these Terms & Conditions, please contact: support@yourwebsite.com or call +233 20 123 4567.",
    },
];

export default function TermsAndConditions() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleSection = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <>
            {/* navbar */}
            <SubNavbar />

            {/* terms section */}
            <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
                <h1 className="text-4xl font-bold text-orange-600 text-center mb-10">Terms & Conditions</h1>

                {termsData.map((term, index) => (
                    <div key={index} className="mb-4 border-b pb-3">
                        <button
                            onClick={() => toggleSection(index)}
                            className="text-left w-full text-lg font-semibold text-orange-500 hover:text-orange-600 transition-all duration-200"
                        >
                            {term.title}
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? "max-h-96 mt-2 opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <p className="text-sm text-gray-600">{term.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* footer section */}
            <Footer />

        </>

    );
}
