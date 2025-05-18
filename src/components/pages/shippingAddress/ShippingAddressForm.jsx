import React, { useState, useEffect } from 'react';
import SubNavbar from '../navbar/SubNav';
import axios from 'axios';
import Footer from '../footer/Footer';
import { useCart } from '../context/Context';
import toast from 'react-hot-toast';




export default function ShippingAddressForm() {
    // Address formfunction
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        email: '',
        city: '',
        region: '',
        town: '',
        country: '',
        phone: '',
    });
    const {BASE_URL, clearCart, cartItems, totalPrice, totalQuantity } = useCart()
    // const BASE_URL = "http://localhost:5000"
    // paystack public key
    const payStackKey = `${import.meta.env.VITE_PAYSTACK_PUBLIC_LIVE_KEY}`


    const shipCharge = totalQuantity > 0 ? 50 : 0;
    const [loading, setLoading] = useState(true);
    // callback handler
    const handleSuccess = async (reference) => {
        try {
            const orderPayload = {
                ...formData,
                cartItems,
                totalAmount: totalPrice + shipCharge,
            };

            const response = await axios.post(
                `${BASE_URL}/api/paystack/verify/${reference.reference}`,
                orderPayload
            );

            toast.success("Payment verified and saved to DB!");
            //  Clear cart
            clearCart();

            // Reset form fields
            setFormData({
                fullName: '',
                address: '',
                email: '',
                city: '',
                region: '',
                town: '',
                country: '',
                phone: '',
            });

            // console.log(response.data);
        } catch (error) {
            console.error("Verification failed", error);
            toast.error("Verification failed");
        }
    };

    const isFormComplete = Object.values(formData).every(val => val.trim() !== '');
    const canPay = isFormComplete && totalPrice > 0;

    // paywithPayStack

    const payWithPaystack = () => {
        const values = Object.values(formData);
        if (values.some(val => !val)) {
            toast.error("Please fill in all the shipping details.");
            return;
        }

        // Prepare metadata
        const metadata = {
            cartItems: cartItems.map(item => ({
                _id: item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
            shipping: {
                fullName: formData.fullName,
                address: formData.address,
                phone: formData.phone,
                city: formData.city,
                region: formData.region,
                town: formData.town,
                country: formData.country,
            }
        };

        const handler = window.PaystackPop.setup({
            key: payStackKey,
            email: formData.email,
            amount: totalPrice * 100,
            currency: "GHS",
            metadata,
            callback: function (response) {
                handleSuccess(response);
            },
        });

        handler.openIframe();
    }



    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);

    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // send data to parent
    };

    return (
        <div>
            {loading ? (
                <div className="flex items-center justify-center h-screen  bg-gray-800">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-orange-400"></div>
                </div>
            ) : (
                <div>
                    {/* nav */}
                    <SubNavbar />
                    <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto mt-35 px-4">
                        {/* form side */}
                        <div className="flex-1 bg-white shadow-2xl shadow-gray-900/60 rounded-xl p-6">

                            <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block mb-1 font-medium">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Home Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-1 font-medium">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Region</label>
                                        <input
                                            type="text"
                                            name="region"
                                            value={formData.region}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-1 font-medium">Town</label>
                                        <input
                                            type="text"
                                            name="town"
                                            value={formData.town}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                            </form>
                        </div>


                        {/* <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-lg p-6"> */}
                        {/* Order Summary */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 w-full lg:w-1/3 h-fit">
                            <h3 className="text-xl font-semibold mb-6 text-gray-800">Order Summary</h3>

                            <div className="space-y-4 text-sm text-gray-700">
                                {/* Items Total */}
                                <div className="flex justify-between">
                                    <span>Items Total</span>
                                    <span className="font-medium"> ₵{totalPrice.toFixed(2)}</span>
                                </div>

                                {/* Shipping Option */}
                                <div>
                                    <label htmlFor="shipping" className="block mb-1 font-medium">
                                        Shipping
                                    </label>
                                    <select
                                        id="shipping"
                                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                                        disabled
                                    >
                                        <option>{`Standard Delivery -  ₵${shipCharge.toFixed(2)}`}</option>
                                    </select>
                                </div>


                                {/* Total Cost */}
                                <div className="flex justify-between font-bold text-lg border-t pt-4 text-gray-800">
                                    <span>Total</span>
                                    <span> ₵{(totalPrice + shipCharge).toFixed(2)}</span>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    disabled={!canPay}
                                    onClick={payWithPaystack}
                                    className={`w-full py-3 rounded-lg mt-4 font-medium transition-colors ${!canPay
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                                        }`}
                                >
                                    Proceed to Payment
                                </button>

                            </div>

                        </div>
                        {/* </div> */}
                    </div>
                    {/* footer */}
                    <Footer />
                </div>
            )
            }

        </div>

    );
}
