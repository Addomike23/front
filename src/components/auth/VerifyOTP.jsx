import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import "./Auth.css";

const VerifyOTP = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const inputRefs = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    const BASE_URL = "http://localhost:5000";
    axios.defaults.withCredentials = true;

    if (!email) navigate("/signup");

    // Countdown timer for resend OTP
    useEffect(() => {
        if (timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        }
    }, [timer]);

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }

        // Auto submit if all digits entered
        if (newOtp.every((d) => d !== "")) {
            setTimeout(() => {
                document.getElementById("otp-form").requestSubmit();
            }, 200);
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const providedCode = otp.join("");

        try {
            const response = await axios.patch(`${BASE_URL}/auth/verify-code`, { email, providedCode });
            Cookies.set("Authorization", response.data.token, { expires: 2 });

            toast.success("OTP verified! Redirecting...");
            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            setError(error.response?.data?.message || "Invalid OTP");
            toast.error("Invalid OTP code");
        } finally {
            setLoading(false);
        }
    };

    const resendOTP = async (e) => {
        e.preventDefault();
        if (timer > 0) return;

        try {
            const res = await axios.patch(`${BASE_URL}/auth/send-verification-code`, { email });
            toast.success(res.data.message);
            setTimer(60); // Reset timer
        } catch (error) {
            toast.error("Failed to resend OTP");
        }
    };

    return (
        <div className="login-bg flex items-center justify-center min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-transparent p-8 rounded-2xl shadow-lg shadow-orange-400/90 w-96"
            >
                <h2 className="text-2xl font-bold text-center text-orange-400 mb-4">Verify OTP</h2>
                <p className="text-sm text-center text-white dark:text-gray-400">
                    Enter the 6-digit OTP sent to <span className="font-semibold">{email}</span>
                </p>

                <form id="otp-form" onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div className="flex justify-center gap-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                maxLength={1}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="w-12 h-12 text-center text-white bg-transparent text-2xl font-semibold border-1 border-orange-400 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                            />
                        ))}
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-transparent text-orange-400 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md shadow-orange-400"
                        disabled={loading}
                    >
                        {loading ? (
                            <motion.div
                                className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"
                            ></motion.div>
                        ) : "Verify OTP"}
                    </motion.button>
                </form>

                <p className="text-sm text-center text-white mt-4">
                    Didn’t receive an OTP?{" "}
                    <span
                        onClick={resendOTP}
                        className={`cursor-pointer  ${timer > 0 ? "text-green-600" : "text-orange-400"}`}
                    >
                        {timer > 0 ? `Resend in ${timer}s` : "Resend"}
                    </span>
                </p>
            </motion.div>
        </div>
    );
};

export default VerifyOTP;
