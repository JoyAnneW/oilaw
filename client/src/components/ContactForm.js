import React, { useState } from "react";

export default function ContactForm() {
	const [request, setRequest] = useState({});
	const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setRequest({ ...request, [name]: value });
	};
	const handleSubmit = (event) => {
		event.preventDefault();
	};
	return (
		<div className="p-6 w-64 mx-auto ">
			<form
				method="POST"
				action="http://localhost:5000"
				onSubmit={(event) => handleSubmit(event)}
				className="flex flex-col gap-4"
			>
				<div className="flex flex-col gap-1">
					<label htmlFor="first_name">First Name</label>
					<input
						type="text"
						name="first_name"
						id="first_name"
						value={request.first_name}
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
						value={request.last_name}
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
						value={request.phone}
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
						value={request.email}
						onChange={(event) => handleInputChange(event)}
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="password">Describe your issue</label>
					<textarea
						name="description"
						id="description"
						value={request.description}
						onChange={(event) => handleInputChange(event)}
						required
					/>
				</div>
				<button className="bg-orange-500" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}
