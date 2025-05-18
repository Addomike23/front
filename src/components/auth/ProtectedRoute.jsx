import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useCart } from "../pages/context/Context";

const ProtectedRoute = ({children}) => {
    const {isLoggedIn}= useCart()

    return isLoggedIn? children: <Navigate to="/login" replace />;
};

export default ProtectedRoute;
