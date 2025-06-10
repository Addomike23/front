import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCart } from "../pages/context/Context";

const ProtectedRoute = () => {
    const { isLoggedIn } = useCart();
    const location = useLocation();

    return isLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export default ProtectedRoute;

