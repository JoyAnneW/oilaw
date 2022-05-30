import React, { useState } from "react";

export default function Login() {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setCredentials({ ...credentials, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		authenticateUser();
	};

	//Handle Login
	const authenticateUser = async () => {
		try {
			// this fetch returns an object with accessToken property
			const response = await fetch("http://localhost:5000/api/admin/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
			});
			// need to convert response to readable object
			if (response.ok) {
				const jsonResponse = await response.json();
				console.log(jsonResponse);
				const token = jsonResponse.accessToken;
				// the token is saved in local storage
				localStorage.setItem("token", token);
			}
		} catch (error) {
			console.log({ error });
		}
	};

	return (
		<div className="p-6 w-64 mx-auto ">
			<form
				method="POST"
				action="http://localhost:5000/api/admin/login"
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
					/>
				</div>
				<button className="bg-orange-500" type="submit">
					Login
				</button>
			</form>
		</div>
	);
}
