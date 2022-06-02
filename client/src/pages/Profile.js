import React, { useState, useEffect } from "react";
import LogOutBtn from "../components/LogOutBtn";
import Table from "../components/Table";
export default function Profile() {
	const [profileDetails, setProfileDetails] = useState([]);

	const getProfile = async () => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/lawyers/profile/",
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			if (response.ok) {
				const jsonResponse = await response.json();
				console.log({ jsonResponse });
				// respose is an array with one obj in it.
				setProfileDetails(jsonResponse);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getProfile();
	}, []);
	console.log(profileDetails);

	const profileTableHeadings = ["Case Id", "Description"].map((heading) => (
		<th>{heading}</th>
	));
	const profileTableRows = profileDetails.map((profile) => {
		return (
			<tr key={profile.id}>
				<td>{profile.id}</td>
				<td> {profile.description}</td>
			</tr>
		);
	});

	return (
		<div>
			<h2>Welcome back {profileDetails.first_name}!</h2>
			<Table
				caption="Your Cases"
				tableHeadings={profileTableHeadings}
				tableRows={profileTableRows}
			/>
			<LogOutBtn />
		</div>
	);
}
