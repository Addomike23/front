import React, { useState } from "react";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useCart } from "../context/Context";

export default function NewsletterSection() {
    const [email, setEmail] = useState("");
    const { BASE_URL } = useCart()

    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            const res = await axios.post(`${BASE_URL}/api/subscribe`, { email });
            toast.success("Subscribed successfully!");
            setEmail(""); // clear the field on success
        } catch (error) {
            if (error.response?.status === 409) {
                toast.error("You are already subscribed!");
            } else if (error.response?.status === 401) {
                toast.error(error.response.data.message || "Invalid email.");
            } else {
                console.error(error);
                toast.error("Something went wrong. Please try again later.");
            }
        }
    };



    return (
        <div
            className="w-full bg-cover bg-center bg-no-repeat py-20 px-6 md:px-12 relative"
        // ← use your image path
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 "></div>

            <div className="relative max-w-4xl mx-auto text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
                <p className="mb-8 text-sm md:text-base text-gray-200">
                    Stay updated with the latest arrivals, exclusive deals, and special offers!
                </p>

                <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <div className="relative w-full sm:max-w-md">
                        <Mail
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            type="email"
                            placeholder="Enter your email, must be valid"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-md border  focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-semibold px-6 py-3 rounded-md transition"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
}
