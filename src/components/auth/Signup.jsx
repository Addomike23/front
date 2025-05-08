import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import "./Auth.css";

function Signup() {
    const navigate = useNavigate();
    const [input, setInput] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [mloader, setMloader] = useState(true)
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const BASE_URL = "http://localhost:5000/auth/";
    axios.defaults.withCredentials = true;

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isPasswordValid = passwordPattern.test(input.password);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true);

        try {
            if (!isPasswordValid) {
                setError("Password must be at least 8 characters long, include a number and a special character.");
                toast.error("Invalid password format");
                setLoading(false);
                return;
            }

            const response = await axios.post(`${BASE_URL}signup`, input);
            if (response.status === 201) {
                setSuccess(true);
                Cookies.set("authorization", response.data.signinToken, {
                    expires: 2,
                    secure: true,
                    sameSite: "Strict",
                });

                toast.success("Signup successful!");
                setTimeout(() => {
                    navigate("/verify-otp", { state: { email: input.email } });
                }, 1000);

                setInput({ name: "", email: "", password: "" });
            }
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Try again.");
            toast.error("Signup failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        // Simulate a loading delay (e.g., 2 seconds) before showing the page
        const timer = setTimeout(() => {
            setMloader(false);
        }, 2000);

        return () => clearTimeout(timer); // Cleanup timeout

    }, []);

    return (
        <>
            {mloader ? (
                // Loading Screen Effect
                <div className="flex items-center justify-center h-screen bg-gray-800">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-orange-400"></div>
                </div>
            ) : (
                <div className="login-bg h-screen flex items-center justify-center text-gray-900 px-10">
                    {/* Left side */}
                    <div className="w-1/2 text-center p-6 rounded-xl shadow-lg">
                        <h1 className="font-extrabold text-2xl text-white mb-4 leading-snug">
                            Welcome to <span className="text-orange-400">MykeBern Appliance</span>
                        </h1>
                        <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                            Explore premium kitchen appliances designed to make cooking effortless and enjoyable.
                        </p>
                    </div>

                    {/* Right side - Signup Form */}
                    <div className="w-1/2 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-transparent p-8 rounded-2xl shadow-lg shadow-orange-400/70 w-96"
                        >
                            <h2 className="text-2xl font-bold text-center text-orange-400 mb-4">Sign Up</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Input */}
                                <div>
                                    <label className="block text-gray-300">Full Name</label>
                                    <div className="relative">
                                        <FiUser className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={input.name}
                                            onChange={handleChange}
                                            required
                                            autoComplete="off"
                                            className="w-full pl-10 pr-4 py-2 border border-orange-400 rounded-lg bg-transparent text-white focus:ring-orange-400 focus:outline-none"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label className="block text-gray-300">Email</label>
                                    <div className="relative">
                                        <FiMail className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={input.email}
                                            onChange={handleChange}
                                            required
                                            autoComplete="off"
                                            className="w-full pl-10 pr-4 py-2 border border-orange-400 rounded-lg bg-transparent text-white focus:ring-orange-400 focus:outline-none"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label className="block text-gray-300">Password</label>
                                    <div className="relative">
                                        <FiLock className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={input.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-10 py-2 border border-orange-400 rounded-lg bg-transparent text-white focus:ring-orange-400 focus:outline-none"
                                            placeholder="Create a password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-gray-400 focus:outline-none"
                                        >
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>
                                    {/* Password pattern guidance */}
                                    <p className={`text-xs mt-1 ${isPasswordValid ? "text-green-400" : "text-red-400"}`}>
                                        Must be 8+ characters, include a number & special character.
                                    </p>
                                </div>

                                {/* Error & Success Messages */}
                                {error && <p className="text-red-400 text-sm">{error}</p>}
                                {success && <p className="text-green-400 text-sm">Signup successful! 🎉</p>}

                                {/* Signup Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="w-full bg-transparent text-orange-400 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md shadow-orange-400"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <motion.div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></motion.div>
                                    ) : "Sign Up"}
                                </motion.button>
                            </form>

                            {/* Login Link */}
                            <p className="text-sm text-center text-white mt-4">
                                Already have an account? <Link to="/login" className="text-orange-400 font-semibold">Login</Link>
                            </p>
                        </motion.div>
                    </div>
                </div>
            )}

        </>

    );
}

export default Signup;
