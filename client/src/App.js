import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import PrivateLawyersRoute from "./components/PrivateLawyersRoute";
import NavBar from "./components/NavBar";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ContactForm from "./components/ContactForm";
import Profile from "./pages/Profile";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [token, setToken] = useState(null);
	const [role, setRole] = useState(null);

	console.log({ token });
	return (
		<div className="">
			<ToastContainer
				position="top-center"
				transition={Slide}
				autoClose={2000}
			/>
			<BrowserRouter>
				<NavBar token={token} setToken={setToken} setRole={setRole} />
				<Routes>
					<Route path="/" element={<ContactForm />} />
					<Route
						exact
						path="/login"
						element={<Login setToken={setToken} setRole={setRole} />}
					/>
					<Route exact path="/signup" element={<SignUp />} />

					<Route
						path="/private/admin"
						element={<PrivateAdminRoute token={token} role={role} />}
					>
						<Route path="" element={<Admin />} />
					</Route>

					<Route
						path="/profile"
						element={<PrivateLawyersRoute token={token} role={role} />}
					>
						<Route path="" element={<Profile />} />
					</Route>
				</Routes>{" "}
			</BrowserRouter>
		</div>
	);
}

export default App;
