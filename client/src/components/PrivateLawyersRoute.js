import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// Outlet allows us to render children wrapped inside this route component

// hook determines authentication state
const useAuth = () => {
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");
	// is token in LS?
	return token && role === "lawyer" ? true : false;
};

export default function PrivateRoute() {
	// if user is authenticated, then render all children of this component, otherwise navigate to login page
	const isAuth = useAuth();
	console.log(isAuth);
	return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
