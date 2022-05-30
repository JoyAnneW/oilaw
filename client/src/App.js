import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Login from "./pages/Login";

function App() {
	return (
		<div className="">
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" />
					<Route exact path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
