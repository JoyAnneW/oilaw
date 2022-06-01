import React, { useState } from "react";

export default function ContactForm() {
	const [requestDetails, setRequestDetails] = useState({
		first_name: "",
		last_name: "",
		phone: "",
		email: "",
		description: "",
		contact_pref: "",
	});

	const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setRequestDetails({ ...requestDetails, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch("http://localhost:5000/api/requesters", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestDetails),
			});
			if (response.ok) {
				const jsonResponse = await response.json();

				console.log({ jsonResponse });
			}
		} catch (error) {
			console.log(error);
		}

		resetContactForm();
	};

	const resetContactForm = () => {
		setRequestDetails({
			first_name: "",
			last_name: "",
			phone: "",
			email: "",
			description: "",
			contact_pref: "",
		});
	};

	return (
		<div className="p-6 w-6/12 mx-auto ">
			<form
				method="POST"
				action="http://localhost:5000/api/requesters"
				onSubmit={(event) => handleSubmit(event)}
				className="w-ull"
			>
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-1">
						<label htmlFor="first_name">First Name</label>
						<input
							type="text"
							name="first_name"
							id="first_name"
							value={requestDetails.first_name}
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
							value={requestDetails.last_name}
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
							value={requestDetails.phone}
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
							value={requestDetails.email}
							onChange={(event) => handleInputChange(event)}
							required
						/>
					</div>
					<div className="flex flex-col gap-1 col-span-2">
						<label htmlFor="description">Describe your issue</label>
						<textarea
							name="description"
							id="description"
							value={requestDetails.description}
							onChange={(event) => handleInputChange(event)}
							required
						/>
					</div>
				</div>

				<div className="flex gap-4 py-4">
					<div>Contact me by:</div>
					<div className="flex gap-2 items-center">
						<label htmlFor="phonePref">Phone</label>
						<input
							type="radio"
							name="contact_pref"
							id="phonePref"
							value="phone"
							onChange={(event) => handleInputChange(event)}
							required
							className="ml-auto"
						/>
					</div>
					<div className="flex gap-2 items-center">
						<label htmlFor="emailPref">Email</label>
						<input
							type="radio"
							name="contact_pref"
							id="emailPref"
							value="email"
							onChange={(event) => handleInputChange(event)}
							required
							className="ml-auto"
						/>
					</div>
				</div>
				<button className="bg-orange-500 w-32 " type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}
