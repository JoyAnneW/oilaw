import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogOutBtn() {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem("token");

		navigate("/login");
	};
	return <button onClick={logout}>Log Out</button>;
}
