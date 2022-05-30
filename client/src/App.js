import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

function App() {
	return (
		<div className="">
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route exact path="/login" element={<Login />} />
					{/* this protects the admin view */}
					<Route path="/private/admin" element={<PrivateRoute />}>
						<Route path="" element={<Admin />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
