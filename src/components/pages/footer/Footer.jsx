import React from 'react';
import {
    FaFacebookF,
    FaGooglePlusG,
    FaTwitter,
    FaRss
} from 'react-icons/fa';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-black text-white mt-10 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Store Info */}
                <div>
                    <h3 className="font-bold mb-3">OUR STORES</h3>
                    <p className="text-sm text-gray-50 leading-snug max-w-md">
  From the heart of Accra — between the vibrant streets of Osu and the elegance of Kumasi —
                        <span className="text-orange-400 font-semibold">MykeBern Appliance</span> 
                         was born out of a passion to make modern living simpler.
                        What started in a small corner office has now grown into a trusted name in households across Ghana,
                        bringing smart kitchen solutions closer to families, food lovers, and everyday cooks.
</p>

                    <div className="flex space-x-3 mt-4 text-white">
                        <a href="#" className="bg-blue-600 p-2 rounded-full"><FaFacebookF /></a>
                        <a href="#" className="bg-red-600 p-2 rounded-full"><FaGooglePlusG /></a>
                        <a href="#" className="bg-sky-500 p-2 rounded-full"><FaTwitter /></a>
                        <a href="#" className="bg-orange-500 p-2 rounded-full"><FaRss /></a>
                    </div>
                </div>

                {/* Blog Post */}
                <div className="text-sm text-white leading-snug max-w-md">
  <h3 className="font-bold text-white mb-2 text-base">BLOG POST</h3>
  <p>
    Your kitchen deserves more than ordinary. At <span className="text-orange-400 font-semibold">MykeBern Appliance</span>, we deliver smart, energy-efficient solutions that make everyday cooking easier and more enjoyable. From high-performance blenders to time-saving tools, we bring innovation to your home.
  </p>
</div>


                {/* Support Links */}
                <div>
                    <h3 className="font-bold mb-3">SUPPORT</h3>
                    <ul className="space-y-2">


                        <ul className="text-xs text-gray-50 space-y-1">
  <li><Link to="/terms-condition" className="hover:underline font-bold">TERMS & CONDITION</Link></li>
  <li><Link to="/faq" className="hover:underline font-bold">FAQ</Link></li>
  <li><Link to="/payments" className="hover:underline font-bold">PAYMENTS</Link></li>
  <li><Link to="/privacy-policy" className="hover:underline font-bold">PRIVACY</Link></li>
  <li><Link to="/track-order" className="hover:underline font-bold">TRACK ORDER</Link></li>
  <li><Link to="/services" className="hover:underline font-bold">SERVICES</Link></li>
</ul>


                    </ul>
                </div>

                {/* Menu Links */}
                <div>
                    <h3 className="font-bold mb-3">MENU</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline font-bold">WELCOME</a></li>
                        <li><a href="#" className="hover:underline font-bold">PRODUCTS</a></li>
                        <li><a href="#" className="hover:underline font-bold">ABOUT</a></li>
                        <li><a href="#" className="hover:underline font-bold">BLOG</a></li>
                        <li><a href="#" className="hover:underline font-bold">CONTACT</a></li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-300 py-4 px-4 text-sm flex flex-col md:flex-row justify-between items-center bg-gray-900">
                <p className="text-center">&copy; {new Date().getFullYear()}. All rights reserved.</p>
                <div className="flex space-x-3 mt-2 md:mt-0">
                    <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="w-10" />
                    <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" className="w-10" />
                    <img src="https://img.icons8.com/color/48/000000/amex.png" alt="AmEx" className="w-10" />
                    <img src="https://img.icons8.com/color/48/000000/discover.png" alt="Discover" className="w-10" />
                </div>
                <p className="text-center mt-2 md:mt-0">Designed by Michael Opare</p>
            </div>
        </footer>
    );
};

export default Footer;
