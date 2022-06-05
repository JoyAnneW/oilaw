import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ token, setToken, setRole }) {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		setToken(null);
		setRole(null);
		navigate("/login");
	};
	console.log({ token });
	return (
		<nav className="flex justify-between bg-orange-50  px-6 py-4 mb-4 rounded-t-lg">
			<Link to="/">
				<h1 className="tracking-tighter text-green-900" onClick={logout}>
					Oilaw
				</h1>
			</Link>
			<div className="flex items-center ">
				{localStorage.getItem("token") ? (
					<button onClick={logout}>Log Out</button>
				) : (
					<div className="flex items-center gap-2 text-lg tracking-wide">
						<Link
							to="/login"
							className="block py-2 px-3 border-b-4 border-transparent hover:border-b-4 hover:border-orange-700 "
						>
							Login
						</Link>
						<Link
							to="/signup"
							className="block py-2 px-4  bg-orange-500 text-orange-50 hover:bg-orange-600 border-b-4 border-orange-700"
						>
							Volunteer
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
}
