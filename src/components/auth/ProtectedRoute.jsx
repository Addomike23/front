import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useCart } from "../pages/context/Context";

const ProtectedRoute = () => {
    const {isLoggedIn}= useCart()

    return isLoggedIn? <Outlet/> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
