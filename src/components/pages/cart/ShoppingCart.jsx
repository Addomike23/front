import React,{useEffect,useState} from "react";
import Footer from "../footer/Footer";
import { useCart } from "../context/Context";
import { Link } from "react-router-dom";
import SubNav from "../navbar/SubNav"
import { FiTrash2 } from "react-icons/fi";


export default function ShoppingCart() {

    const { BASE_URL, totalPrice, totalQuantity, cartItems, increaseItemQuantity, decreaseItemQuantity, removeFromCart } = useCart()
    let Delivery;
    const shipCharge = totalQuantity > 0 ? Delivery = 5 : Delivery = 0;
    const [loading, setLoading] = useState(true);





    useEffect(() => {

        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);

    }, [])


    return (
        <div>
            {loading ? (
                <div className="flex items-center justify-center h-screen  bg-gray-800">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-orange-400"></div>
                </div>
            ) : (
                <div>
                    {/* navbar */}
                    <SubNav />

                    <div className="mt-20 min-h-screen bg-gray-100 p-4 md:p-10">
                        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">

                            {/* Cart Items Section */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 w-full lg:w-2/3">
                                <h2 className="text-2xl font-bold mb-6">
                                    Shopping Cart{" "}
                                    <span className="text-base font-normal">
                                        ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
                                    </span>
                                </h2>
                                <div className="space-y-6">
                                    {/* cartItems */}
                                    {cartItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 border-b pb-4"
                                        >
                                            {/* Product Image */}
                                            <img
                                                src={`${BASE_URL}/images/` + item.image}
                                                alt={item.title}
                                                className="w-20 h-20 object-cover rounded"
                                            />

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-[140px]">
                                                <h4 className="font-semibold text-lg">{item.name}</h4>
                                                <p className="text-sm text-gray-500">{item.category}</p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => decreaseItemQuantity(item._id)}
                                                    className="px-2 py-1 bg-gray-200"
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => increaseItemQuantity(item._id)}
                                                    className="px-2 py-1 bg-gray-200"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Unit Price */}
                                            <div className="text-gray-700 font-medium text-sm sm:text-base w-16 text-center">
                                                ₵{item.price.toFixed(2)}
                                            </div>

                                            {/* Total Price */}
                                            <div className="font-bold text-green-700 text-sm sm:text-base w-20 text-center">
                                                ₵{(item.price * item.quantity).toFixed(2)}
                                            </div>

                                            {/* Trash Icon (no overlap) */}
                                            <div className="w-8 text-center">
                                                <button
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="text-red-500 hover:text-red-700 text-lg"
                                                    title="Remove Item"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                    ))}



                                </div>
                                <div className="mt-6 text-gray-300 p-2 bg-gray-800 w-fit hover:bg-blue-700 cursor-pointer rounded">
                                    <Link to="/">← Continue Shopping</Link>
                                </div>
                            </div>

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

                                    {/* Promo Code */}
                                    <div>
                                        <label htmlFor="promo" className="block mb-1 font-medium">
                                            Promo Code
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                id="promo"
                                                type="text"
                                                placeholder="Enter your code"
                                                className="flex-1 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                                            />
                                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                                Apply
                                            </button>
                                        </div>
                                    </div>

                                    {/* Total Cost */}
                                    <div className="flex justify-between font-bold text-lg border-t pt-4 text-gray-800">
                                        <span>Total</span>
                                        <span> ₵{(totalPrice + shipCharge).toFixed(2)}</span>
                                    </div>

                                    {/* Checkout Button */}
                                    <Link to="/shipping-form">
                                        <button
                                            disabled={totalPrice === 0}
                                            className={`w-full py-3 rounded-lg mt-4 font-medium transition-colors ${totalPrice === 0
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                                                }`}
                                        // onClick={savCart}
                                        >

                                            Proceed to Checkout
                                        </button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>


                    {/* footer */}
                    <Footer />
                </div>
            )
            }


        </div>

    );
}
