import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<nav className="flex justify-between bg-orange-50 p-6">
			<Link to="/">
				<h1 className="tracking-tighter text-green-900">Oilaw</h1>
			</Link>
			<div className="flex items-center gap-2 text-xl tracking-wide">
				<Link
					to="/login"
					className="block py-2 px-3 border-b-4 border-transparent hover:border-b-4 hover:border-orange-700 "
				>
					Login
				</Link>

				<a className="block py-2 px-4 rounded bg-orange-500 text-orange-50 hover:bg-orange-600 border-b-4 border-orange-700">
					Volunteer
				</a>
			</div>
		</nav>
	);
}
