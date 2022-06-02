import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// Outlet allows us to render children wrapped inside this route component

export default function PrivateLawyersRoute({ token, role }) {
	const checkAuth = () => {
		// is token in LS?

		return token && role === "lawyer" ? true : false;
	};

	console.log("lawyers", { checkAuth });
	// if user is authenticated, then render all children of this component, otherwise navigate to login page

	return checkAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
