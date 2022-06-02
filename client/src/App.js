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

function App() {
	return (
		<div className="">
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<ContactForm />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/signup" element={<SignUp />} />

					<Route path="/private/admin" element={<PrivateAdminRoute />}>
						<Route path="" element={<Admin />} />
					</Route>

					<Route path="/profile" element={<PrivateLawyersRoute />}>
						<Route path="" element={<Profile />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
