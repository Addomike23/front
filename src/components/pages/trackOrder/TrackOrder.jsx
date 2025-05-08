import React, { useState } from "react";
import { FiBox, FiTruck, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import SubNavbar from "../navbar/SubNav";
import Footer from "../footer/Footer";
// import mockOrders from "../../mock/mockOrders";

export default function TrackOrder() {
    const [orderId, setOrderId] = useState("");
    const [orderStatus, setOrderStatus] = useState(null);
    const [loading, setLoading] = useState(false);


    const mockOrders = [
        {
            id: "GH123456",
            status: "Processing",
            estimatedDelivery: "April 25, 2025",
            currentLocation: "Accra Distribution Hub",
        },
        {
            id: "GH654321",
            status: "Shipped",
            estimatedDelivery: "April 26, 2025",
            currentLocation: "Kumasi Dispatch Center",
        },
        {
            id: "GH111222",
            status: "Delivered",
            estimatedDelivery: "April 20, 2025",
            currentLocation: "Customer Address",
        },
    ];




    const handleTrack = () => {
        if (!orderId) return toast.error("Please enter a valid Order ID.");
        setLoading(true);

        setTimeout(() => {
            const foundOrder = mockOrders.find((order) => order.id === orderId.trim());

            if (foundOrder) {
                setOrderStatus(foundOrder);
                toast.success("Order found!");
            } else {
                setOrderStatus(null);
                toast.error("Order not found.");
            }

            setLoading(false);
        }, 1000);
    };

    const steps = ["Processing", "Shipped", "Delivered"];

    const getStepIndex = (status) => {
        return steps.indexOf(status);
    };

    return (
        <>
            {/* navbar */}
            <SubNavbar />

            {/* track */}
            <div className="min-h-screen bg-gray-50 py-16 px-6">
                <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">Track Your Order</h2>

                <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
                    <input
                        type="text"
                        placeholder="Enter Order ID (e.g., GH123456)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="w-full px-4 py-2 border rounded mb-4 outline-orange-400"
                    />

                    <button
                        onClick={handleTrack}
                        disabled={loading}
                        className="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                    >
                        {loading ? "Tracking..." : "Track Order"}
                    </button>

                    {orderStatus && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Order Status: <span className="text-orange-600">{orderStatus.status}</span>
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Estimated Delivery: <strong>{orderStatus.estimatedDelivery}</strong>
                                <br />
                                Current Location: {orderStatus.currentLocation}
                            </p>

                            {/* Progress Steps */}
                            <div className="flex items-center justify-between">
                                {steps.map((step, index) => {
                                    const isActive = index <= getStepIndex(orderStatus.status);
                                    return (
                                        <div key={step} className="flex flex-col items-center text-center">
                                            <div
                                                className={`w-12 h-12 flex items-center justify-center rounded-full transition ${isActive ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
                                                    }`}
                                            >
                                                {step === "Processing" && <FiBox className="text-2xl" />}
                                                {step === "Shipped" && <FiTruck className="text-2xl" />}
                                                {step === "Delivered" && <FiCheckCircle className="text-2xl" />}
                                            </div>
                                            <span className="mt-2 text-sm font-medium">{step}</span>
                                            {index < steps.length - 1 && (
                                                <div className={`h-1 w-16 mt-4 ${isActive ? "bg-orange-500" : "bg-gray-300"}`}></div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* footer */}
            <Footer />
        </>

    );
}
