import React from "react";
import { motion } from "framer-motion";
import { FaShippingFast, FaLock, FaHeadset, FaTags } from "react-icons/fa";
import SubNavbar from "../navbar/SubNav";
import Footer from "../footer/Footer";

const services = [
    {
        icon: <FaShippingFast size={40} className="text-orange-500" />,
        title: "Fast Delivery",
        description: "We deliver your items quickly and safely across the country within 1–3 business days.",
    },
    {
        icon: <FaLock size={40} className="text-orange-500" />,
        title: "Secure Payments",
        description: "All payments are encrypted and processed securely for your peace of mind.",
    },
    {
        icon: <FaHeadset size={40} className="text-orange-500" />,
        title: "24/7 Support",
        description: "Need help? Our support team is available around the clock to assist you.",
    },
    {
        icon: <FaTags size={40} className="text-orange-500" />,
        title: "Best Deals",
        description: "Enjoy exclusive discounts and promotions on top-quality appliances.",
    },
];

export default function Services() {
    return (
        <>
            {/* nav */}
            {/* <SubNavbar /> */}
            {/* service */}
            <div className="min-h-screen bg-white py-16 px-6 md:px-16">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-black">Our Services</h2>
                    <p className="text-gray-500 mt-2 max-w-xl mx-auto">
                        We go beyond just selling appliances. Here’s what makes shopping with us different.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.7, delay: index * 0.2 }}
                            className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-500 text-center"
                        >
                            <div className="mb-4">{service.icon}</div>
                            <h3 className="text-xl font-semibold text-black mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* footer */}
            {/* <Footer /> */}
        </>

    );
}
