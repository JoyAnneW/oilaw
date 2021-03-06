import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ setToken, setRole }) {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	let navigate = useNavigate();

	const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setCredentials({ ...credentials, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		authenticateUser();
		setCredentials({
			email: "",
			password: "",
		});
	};

	//Handle Login based on role
	const authenticateUser = async () => {
		try {
			// this fetch returns an object with accessToken property
			const response = await fetch("http://localhost:5000/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
			});
			console.log(response);
			// need to convert response to readable object
			if (response.ok) {
				const jsonResponse = await response.json();
				console.log({ jsonResponse });
				const { accessToken, role, user_id } = jsonResponse;
				// the token is saved in local storage
				localStorage.setItem("token", accessToken);
				localStorage.setItem("role", role);
				setToken(accessToken);
				setRole(role);
				console.log({ accessToken });
				// After successful login, navigate to admin page if role is admin
				if (role === "admin") navigate("/private/admin");
				// navigate to profile if role is profile
				if (role === "lawyer") navigate("/profile");
			} else {
				// if response is not ok, then I need to redefine the response object and await it. It will be the object with the error message.
				const error = await response.json();
				console.log(error);
				// use message sent from server in toast.
				toast.error(error.message);
			}
		} catch (error) {
			// this will either be "incorrect credentials" or "user doesn't exist" depending on where in the backend login failed.
			toast.error(error.message);
			console.log({ error });
		}
	};

	return (
		<div className="p-6 w-64 mx-auto ">
			<form
				method="POST"
				action="http://localhost:5000/api/login"
				onSubmit={(event) => handleSubmit(event)}
				className="flex flex-col gap-4"
			>
				<div className="flex flex-col gap-1">
					<label htmlFor="email">Email Address</label>
					<input
						type="email"
						name="email"
						id="email"
						value={credentials.email}
						onChange={(event) => handleInputChange(event)}
						required
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						value={credentials.password}
						onChange={(event) => handleInputChange(event)}
						required
					/>
				</div>
				<button className="bg-orange-500" type="submit">
					Login
				</button>
			</form>
		</div>
	);
}
