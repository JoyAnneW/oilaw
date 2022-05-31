import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// Outlet allows us to render children wrapped inside this route component

// hook determines authentication state
const useAuth = () => {
	const token = localStorage.getItem("token");
	// is token in LS?
	return token ? true : false;
};

export default function PrivateRoute() {
	// if user is authenticated, then render all children of this component, otherwise navigate to login page
	const isAuth = useAuth();
	console.log(isAuth);
	return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
