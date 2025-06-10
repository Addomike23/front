import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie'
import { motion } from "framer-motion";
import { Link,useLocation, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import { useCart } from "../pages/context/Context";
import "./Auth.css";


const Login = () => {
    const [input, setInput] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [mloader, setMloader] = useState(true)
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login,BASE_URL } = useCart()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";



    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            
            const response = await axios.post(`${BASE_URL}/auth/signin`, input, {
                withCredentials: true
              });
              
            if (response.status === 200) {
                login()

                toast.success("Login successful!");
                setTimeout(() => {
                 navigate(from, { replace: true });
                }, 1000);

                setInput({ email: "", password: "" });
            }


        } catch (err) {
            console.log(err);

            setError(err.response?.data?.message || "Login failed. Try again.");
            toast.error("Login failed. Try again.");
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

    // const onSave = Boolean(input.email) && Boolean(input.password)


    return (
        <>
            {mloader ?
                (
                    // Loading Screen Effect
                    <div className="flex items-center justify-center h-screen bg-gray-800">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-orange-400"></div>
                    </div>
                ) : (
                    <div className="login-bg h-screen flex flex-col md:flex-row items-center justify-center text-gray-900 px-4 md:px-10 gap-8">
                        {/* Left Side - Welcome Message */}
                        <div className="w-full md:w-1/2 text-center p-6 rounded-xl shadow-lg">
                            <h1 className="font-extrabold text-2xl text-white mb-4 leading-snug">
                                Welcome to <span className="text-orange-400">MykeBern Appliance</span>
                            </h1>
                            <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                                Explore premium kitchen appliances designed to make cooking effortless and enjoyable.
                                From high-performance blenders to smart coffee makers, we bring innovation to your kitchen.
                            </p>
                        </div>

                        {/* Right Side - Login Form */}
                        <div className="w-full md:w-1/2 flex items-center justify-center">

                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-transparent p-8 rounded-2xl shadow-lg shadow-orange-400/70 w-96"
                            >
                                <h2 className="text-2xl font-bold text-center mb-4 text-orange-400">Login</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Email Input */}
                                    <div>
                                        <label className="block text-white">Email</label>
                                        <div className="relative">
                                            <FiMail className="absolute left-3 top-3 text-gray-200" />
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
                                        <label className="block text-white">Password</label>
                                        <div className="relative">
                                            <FiLock className="absolute left-3 top-3 text-gray-200" />
                                            <input
                                                type={showPassword ? "text" : "password"} // Toggle input type
                                                name="password"
                                                value={input.password}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-10 py-2 border border-orange-400 rounded-lg bg-transparent text-white focus:ring-orange-100 focus:outline-none"
                                                placeholder="Enter your password"
                                            />
                                            {/* Eye Icon for Toggle */}
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-3 text-gray-200 focus:outline-none"
                                            >
                                                {showPassword ? <FiEyeOff /> : <FiEye />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {error && <p className="text-red-500 text-sm">{error}</p>}

                                    {/* Login Button */}
                                    <motion.button
                                        // disabled={!onSave}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        className="w-full bg-transparent text-orange-400 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md shadow-orange-400"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <motion.div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></motion.div>
                                        ) : "Login"}
                                    </motion.button>
                                </form>

                                {/* Signup Link */}
                                <p className="text-sm text-center mt-4 text-white">
                                    Don't have an account? <Link to="/signup" className="text-orange-400 font-semibold">Signup</Link>
                                </p>
                            </motion.div>
                        </div>
                    </div >
                )}
        </>

    );
};

export default Login;
