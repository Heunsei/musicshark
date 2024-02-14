import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
    const isLogin = useSelector((state) => state.login.login)
    return !isLogin ? <Outlet /> : <Navigate to="/group" />
}

export default PublicRoute