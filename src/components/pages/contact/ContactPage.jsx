import React, { useState } from "react";
import { FiMail, FiPhone, FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { useCart } from "../context/Context";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { BASE_URL } = useCart();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            return toast.error("Please fill in all fields");
        }

        setLoading(true);
        try {
            await axios.post(`${BASE_URL}/api/contact`, { name, email, message });
            toast.success("Message sent successfully!");
            setName("");
            setEmail("");
            setMessage("");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen px-6 py-16 bg-gradient-to-br from-orange-200 via-gray-100 to-orange-200">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">Contact Us</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <FiMail className="text-orange-500 text-2xl" />
                            <span className="text-sm text-gray-700">hello@mykebern.com</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FiPhone className="text-orange-500 text-2xl" />
                            <span className="text-sm text-gray-700">+233 553 435 026</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            We're happy to hear from you. Drop your message and we'll get back shortly!
                        </p>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            autoComplete="off"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        ></textarea>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <FiLoader className="animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                "Send Message"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
