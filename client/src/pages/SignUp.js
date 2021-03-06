import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
	const [lawyerDetails, setLawyerDetails] = useState({
		first_name: "",
		last_name: "",
		phone: "",
		email: "",
		password: "",
		specialty: "",
	});
	// managing checked state of radio buttons
	const [checkedValue, setCheckedValue] = useState("");
	const navigate = useNavigate();

	const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setLawyerDetails({ ...lawyerDetails, [name]: value });
	};

	const createLawyerAccount = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/lawyers", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(lawyerDetails),
			});
			if (response.ok) {
				toast.success(
					"Your account has been successfully created! Please login."
				);
				const jsonResponse = await response.json();
				console.log(jsonResponse);
				// after successful signup, navigate to login page
				navigate("/login");
			} else {
				// if response is not ok, then I need to redefine the response object and await it.
				// error comes in as an object with a prop called error
				const { error } = await response.json();
				console.log(error.errno);
				if (error.errno === 1062) {
					toast.error("A user with this email address already exists.");
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		createLawyerAccount();
		// reset form
		setLawyerDetails({
			first_name: "",
			last_name: "",
			phone: "",
			email: "",
			password: "",
			specialty: "",
		});
		// reset radio buttons
		setCheckedValue("");
	};

	return (
		<div className="p-6 w-64 mx-auto ">
			<form
				method="POST"
				action="http://localhost:5000/api/lawyers"
				onSubmit={(event) => handleSubmit(event)}
				className="flex flex-col gap-4"
			>
				<div className="flex flex-col gap-1">
					<label htmlFor="first_name">First Name</label>
					<input
						type="text"
						name="first_name"
						id="first_name"
						value={lawyerDetails.first_name}
						onChange={(event) => handleInputChange(event)}
						required
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="last_name">Last Name</label>
					<input
						type="text"
						name="last_name"
						id="last_name"
						value={lawyerDetails.last_name}
						onChange={(event) => handleInputChange(event)}
						required
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="phone">Phone Number</label>
					<input
						type="phone"
						name="phone"
						id="phone"
						value={lawyerDetails.phone}
						onChange={(event) => handleInputChange(event)}
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="email">Email Address</label>
					<input
						type="email"
						name="email"
						id="email"
						value={lawyerDetails.email}
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
						value={lawyerDetails.password}
						onChange={(event) => handleInputChange(event)}
						required
					/>
				</div>

				<div className="flex gap-1 items-center">
					<label htmlFor="immigration">Immigration Law</label>
					<input
						type="radio"
						name="specialty"
						id="immigration"
						value="immigration"
						onChange={(event) => {
							handleInputChange(event);
							setCheckedValue(event.target.value);
						}}
						required
						// this will evaluate to true or false as state changes, thus turning on or off the checked attribute
						checked={checkedValue === "immigration"}
						className="ml-auto"
					/>
				</div>
				<div className="flex  gap-1 items-center">
					<label htmlFor="criminal">Criminal Law</label>
					<input
						type="radio"
						name="specialty"
						id="criminal"
						value="criminal"
						onChange={(event) => {
							handleInputChange(event);
							setCheckedValue(event.target.value);
						}}
						required
						checked={checkedValue === "criminal"}
						className="ml-auto"
					/>
				</div>
				<div className="flex gap-1 items-center">
					<label htmlFor="family">Family Law</label>
					<input
						type="radio"
						name="specialty"
						id="family"
						value="family"
						onChange={(event) => {
							handleInputChange(event);
							setCheckedValue(event.target.value);
						}}
						required
						checked={checkedValue === "family"}
						className="ml-auto"
					/>
				</div>

				<button className="bg-orange-500" type="submit">
					Sign Up
				</button>
			</form>
		</div>
	);
}
