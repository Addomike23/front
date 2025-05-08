import React from "react";
import SubNavbar from "../navbar/SubNav";
import Footer from "../footer/Footer";

export default function CookiePolicyPage() {
    return (
        <>
            {/* navbar */}
            <SubNavbar />
            <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
                <h1 className="text-3xl font-bold text-center mb-8">Cookie Policy</h1>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-orange-600">1. What Are Cookies?</h2>
                    <p className="text-sm">
                        Cookies are small text files stored on your device to enhance user experience. They help remember your preferences, track usage, and ensure smooth functionality.
                    </p>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-orange-600">2. Types of Cookies We Use</h2>
                    <ul className="list-disc ml-6 text-sm space-y-1">
                        <li><strong>Essential Cookies:</strong> Necessary for basic website functionality.</li>
                        <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
                        <li><strong>Marketing Cookies:</strong> Used to deliver personalized advertisements.</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-orange-600">3. How to Manage Cookies</h2>
                    <p className="text-sm">
                        You can change your cookie preferences through your browser settings. Disabling cookies may affect certain functionalities of our website.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2 text-orange-600">4. Contact Us</h2>
                    <p className="text-sm">
                        For questions about our Cookie Policy, email us at <strong>privacy@yourwebsite.com</strong>.
                    </p>
                </section>
            </div>
            {/* Footer */}
            <Footer />
        </>

    );
}
