import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiShoppingCart, FiMenu, FiX, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import './Nav.css';
import Cookies from 'js-cookie';
import axios from "axios";
import { useCart } from "../context/Context";
import { imageSlider } from "../../../assets/Assets";

export default function Navbar() {
    const { BASE_URL, totalQuantity } = useCart();
    const [scrolling, setScrolling] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [welcomeText, setWelcomeText] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const {logout,isLoggedIn} = useCart()

    

    useEffect(() => {
        const fetchWelcomeText = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/welcome-text`);
                const data = response.data;
                setWelcomeText(data.welcomeMessages[0]);
            } catch (error) {
                console.error("Error fetching welcome messages:", error);
            }
        };
        fetchWelcomeText();
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolling(window.scrollY > 400);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % imageSlider.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        logout()
        toast.success("Logged out successfully!");
        setIsAuthenticated(false);
        setUserMenuOpen(false);
        setTimeout(() => navigate("/login"), 1000);
    };

    return (
        <div>
            <nav className="w-full">
                <div className={`fixed top-0 w-full z-10 transition-all duration-300 ${scrolling ? "bg-black shadow-lg" : "bg-transparent"}`}>
                    <div className="flex items-center justify-between px-4 py-3 text-white">
                        <h1 className="text-lg text-orange-400">
                            HOTLINE: <span className="text-sm px-3 text-white">+233 553 435 026</span>
                        </h1>
                        <div className="flex items-center gap-4">
                            <Link to="/cart" className="relative text-white">
                                <FiShoppingCart className="text-2xl" />
                                {totalQuantity > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-orange-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {totalQuantity}
                                    </span>
                                )}
                            </Link>

                            <div className="relative">
                                <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
                                    <FiUser className="text-2xl text-white" />
                                </button>
                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-36 bg-orange-400 text-black shadow-md rounded-lg z-50">
                                        {isLoggedIn ? (
                                            <button
                                                onClick={handleLogout}
                                                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        ) : (
                                            <Link
                                                to="/login"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="block px-4 py-2 hover:bg-gray-100"
                                            >
                                                Sign In
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-4 py-2">
                        <h1 className="text-2xl font-bold text-white border-2 border-orange-400 px-2 py-2">
                            <Link to="/">Myke-<span className="text-orange-400">Bern</span></Link>
                        </h1>

                        <div className="hidden md:flex gap-6 text-white">
                            <Link to="/" className="hover:text-orange-400">Home</Link>
                            <Link to="/product" className="hover:text-orange-600">Products</Link>
                            <Link to="/service" className="hover:text-orange-600">Service</Link>
                            <Link to="/about" className="hover:text-orange-600">About</Link>
                            <Link to="/contact" className="hover:text-orange-600">Contact</Link>
                        </div>

                        <div className="md:hidden">
                            <button onClick={() => setMenuOpen(!menuOpen)}>
                                {menuOpen ? <FiX className="text-3xl text-white" /> : <FiMenu className="text-3xl text-white" />}
                            </button>
                        </div>
                    </div>

                    {menuOpen && (
                        <div className="md:hidden flex flex-col items-center bg-black w-full py-4 space-y-4">
                            <Link to="/" className="text-white hover:text-orange-400" onClick={() => setMenuOpen(false)}>Home</Link>
                            <Link to="/product" className="text-white hover:text-orange-600" onClick={() => setMenuOpen(false)}>Products</Link>
                            <Link to="/service" className="text-white hover:text-orange-600" onClick={() => setMenuOpen(false)}>Service</Link>
                            <Link to="/about" className="text-white hover:text-orange-600" onClick={() => setMenuOpen(false)}>About</Link>
                            <Link to="/contact" className="text-white hover:text-orange-600" onClick={() => setMenuOpen(false)}>Contact</Link>
                        </div>
                    )}
                </div>

                <div className="relative w-full h-screen overflow-hidden">
                    <div className="absolute inset-0 w-full h-full">
                        {imageSlider.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Slide ${index}`}
                                className={`absolute w-full h-full object-center transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
                            />
                        ))}
                    </div>

                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center px-4">
                        <motion.h1
                            key={`${welcomeText?.title}-${Date.now()}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-4xl md:text-5xl text-orange-400 py-2"
                        >
                            {welcomeText?.title}
                        </motion.h1>

                        <motion.p
                            key={welcomeText?.subtitle}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="text-lg md:text-2xl text-gray-300 py-4"
                        >
                            {welcomeText?.subtitle}
                        </motion.p>

                        <motion.a
                            href="#shop"
                            className="text-lg md:text-2xl text-white cursor-pointer px-6 md:px-10 py-2 md:py-3 rounded-xl bg-orange-400 mt-6 shadow-lg hover:bg-orange-500 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Shop Now
                        </motion.a>
                    </div>
                </div>
            </nav>
        </div>
    );
}
