import React, { useEffect, useState } from "react";

export default function CookiePolicy() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setTimeout(() => setShowBanner(true), 1000); // Show banner after 1s
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "true");
        setShowBanner(false);
    };

    return (
        <>
            {/* Cookie Policy Banner */}
            {showBanner && (
                <div className="fixed bottom-4 left-4 right-4 z-50 bg-white border border-gray-300 shadow-lg p-4 rounded-lg max-w-xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="text-sm text-gray-700">
                        We use cookies to ensure you get the best experience on our website.{" "}
                        <a href="/cookie-policy" className="text-blue-500 underline">
                            Learn more
                        </a>
                    </div>
                    <button
                        onClick={handleAccept}
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                    >
                        Accept
                    </button>
                </div>
            )}
        </>
    );
}
