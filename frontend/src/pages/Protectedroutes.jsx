import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        <Outlet/>
    } catch (error) {
        console.error("Invalid token:", error);
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
