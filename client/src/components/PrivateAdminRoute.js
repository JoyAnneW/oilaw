import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// Outlet allows us to render children wrapped inside this route component
// hook determines authentication state

export default function PrivateAdminRoute({ token, role }) {
	const checkAuth = () => {
		// is token in LS?

		return token && role === "admin" ? true : false;
	};

	console.log("admin", { checkAuth });

	// if user is authenticated, then render all children of this component, otherwise navigate to login page
	return checkAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
