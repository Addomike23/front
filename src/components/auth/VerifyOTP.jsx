import React,{ useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import "./Auth.css"
// import { FiLock } from "react-icons/fi";

const VerifyOTP = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    const BASE_URL = "http://localhost:5000/auth/";
    axios.defaults.withCredentials = true


    if (!email) navigate("/signup");

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return; // Only allow numbers
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to the next input field if a number is entered
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
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
            const response = await axios.patch(`${BASE_URL}`+"verify-code", { email, providedCode });
            Cookies.set("token", response.data.token, { expires: 2 }); // Store token in cookies
            
            // setTime out for better user ui
            setTimeout(()=>{
                navigate("/") //redirect to dashboard
            },1000)
            
            toast.success("OTP code Verified")
        } catch (error) {
            setError(error.response?.data?.message || "Invalid OTP");
            toast.error("Invalid OTP code");
        } finally {
            setLoading(false);
            
        }
    };

    return (
        <div className="login-bg flex items-center justify-center min-h-screen ">
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

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    {/* OTP Input Fields */}
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
                    Didn't receive an OTP? <span className="text-orange-400 cursor-pointer">Resend</span>
                </p>
            </motion.div>
        </div>
    );
};

export default VerifyOTP;
