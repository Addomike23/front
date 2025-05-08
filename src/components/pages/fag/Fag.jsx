import React, { useState } from "react";
import SubNavbar from "../navbar/SubNav";
import Footer from "../footer/Footer";

const faqs = [
    {
        question: "How can I place an order?",
        answer:
            "To place an order, browse our products, add items to your cart, and proceed to checkout. You will be guided through the payment and shipping steps.",
    },
    {
        question: "What payment methods do you accept?",
        answer:
            "We accept Mobile Money, Visa, Mastercard, and bank transfers to make your shopping easy and flexible.",
    },
    {
        question: "Do you offer cash on delivery?",
        answer:
            "Currently, we do not offer cash on delivery. All orders must be paid in advance using our secure payment options.",
    },
    {
        question: "How long will my order take to arrive?",
        answer:
            "Orders typically take 2-5 business days depending on your location. You’ll receive tracking details once your order ships.",
    },
    {
        question: "How do I track my order?",
        answer:
            "After placing your order, you’ll receive an email with tracking details. You can also visit the 'Track Order' page and enter your order ID.",
    },
    {
        question: "Can I change or cancel my order?",
        answer:
            "Yes, you can change or cancel your order within 2 hours of placing it. Contact our support team immediately for assistance.",
    },
    {
        question: "Can I return or exchange a product?",
        answer:
            "Yes, products can be returned or exchanged within 7 days if they're in original condition. Check our Return Policy for more details.",
    },
    {
        question: "Do you deliver outside Ghana?",
        answer:
            "Currently, we only deliver within Ghana. We’re working on expanding to international shipping soon!",
    },
    {
        question: "Is my personal data safe?",
        answer:
            "Yes. We strictly follow Ghana’s Data Protection Act, 2012 (Act 843) and ensure that all your information is encrypted and secure.",
    },
    {
        question: "How do I create an account?",
        answer:
            "Click on the 'Sign Up' button at the top right and fill in your details. After verifying your email, your account will be active.",
    },
    {
        question: "What happens if an item is out of stock?",
        answer:
            "If a product is out of stock, it will be marked accordingly. You can subscribe to get notified when it’s back.",
    },
    {
        question: "How do I use a discount code?",
        answer:
            "At checkout, you’ll see an option to apply a discount code. Enter your code and click 'Apply' to update the total.",
    },
    {
        question: "Do you offer gift wrapping?",
        answer:
            "Yes! You can select the gift wrapping option at checkout and even include a personalized message.",
    },
    {
        question: "Where is your company located?",
        answer:
            "We’re based in Accra, Ghana. All our products are shipped from our local fulfillment centers.",
    },
    {
        question: "How do I contact customer service?",
        answer:
            "You can reach us via the Contact page, email us at support@yourwebsite.com, or call +233 20 123 4567.",
    },
];


export default function Fag() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <>
            {/* navbar */}
            <SubNavbar />
            {/* fag */}
            <div className="max-w-3xl mx-auto mt-16 px-4 py-16 text-gray-800">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-orange-600">
                    Frequently Asked Questions
                </h1>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full text-left px-6 py-4 flex justify-between items-center bg-orange-200 hover:bg-orange-400 transition duration-200"
                            >
                                <span className="font-medium">{faq.question}</span>
                                <span className="text-xl">{activeIndex === index ? "-" : "+"}</span>
                            </button>

                            <div
                                className={`px-6 pb-4 text-sm text-gray-700 transition-all duration-300 ease-in-out ${activeIndex === index ? "max-h-screen opacity-100" : "max-h-0 overflow-hidden opacity-0"
                                    }`}
                            >
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* footer */}
            <Footer />
        </>

    );
}
