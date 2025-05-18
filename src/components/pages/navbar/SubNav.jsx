import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/Context";
import { FiShoppingCart, FiMenu, FiX, FiUser } from "react-icons/fi";

export default function SubNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { totalQuantity,logout,isLoggedIn } = useCart();
    
    

    const handleLogout = () => {
        logout()
        toast.success("Logged out successfully!");
        setUserMenuOpen(false);
        setTimeout(() => navigate("/login"), 1000);
    };

    return (
        <div className="fixed top-0 w-full z-10 bg-black shadow-lg">
            {/* Hotline & Right Controls */}
            <div className="flex items-center justify-between px-4 py-2 text-white">
                <h1 className="text-lg text-orange-400">
                    HOTLINE: <span className="text-sm px-3 text-white">+233 553 435 026</span>
                </h1>
                <div className="flex items-center gap-4">
                    {/* Cart Icon with Badge */}
                    <Link to="/cart" className="relative text-white">
                        <FiShoppingCart className="text-2xl" />
                        {totalQuantity > 0 && (
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {totalQuantity}
                            </span>
                        )}
                    </Link>

                    {/* User Icon with Dropdown */}
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

            {/* Branding & Navigation */}
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

            {/* Mobile Nav Menu */}
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
    );
}
