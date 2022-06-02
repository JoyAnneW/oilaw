import React, { useState, useEffect } from "react";
import LogOutBtn from "../components/LogOutBtn";
import Table from "../components/Table";
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";

export default function Profile() {
	// only name and lawyer id
	const [personalDetails, setPersonalDetails] = useState({});
	const [caseDetails, setCaseDetails] = useState([]);

	const getPersonalDetails = async () => {
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
				// response is an array with one obj in it.
				setPersonalDetails(jsonResponse[0]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getCaseDetails = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/lawyers/profile/cases/${personalDetails.lawyer_id}`,
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			console.log(response);
			if (response.ok) {
				const jsonResponse = await response.json();
				console.log({ jsonResponse });

				setCaseDetails(jsonResponse);
			}
		} catch (error) {
			console.log({ error });
		}
	};
	useEffect(() => {
		getPersonalDetails();
	}, []);

	useEffect(() => {
		getCaseDetails();
	}, [personalDetails]);

	console.log({ personalDetails });
	console.log({ caseDetails });

	const profileTableHeadings = [
		"Case Id",
		"Description",
		"Client Name",
		"Contact By",
	].map((heading) => <th>{heading}</th>);
	const profileTableRows = caseDetails.map((request) => {
		return (
			<tr key={request.request_id}>
				<td>{request.request_id}</td>
				<td> {request.description}</td>
				<td>
					{request.first_name} {request.last_name}
				</td>
				<td className="text-lg">
					{request.contact_pref === "email" ? (
						<a href={`mailto:${request.email}`}>
							{" "}
							<HiOutlineMail />
						</a>
					) : (
						<a href={`tel:${request.phone}`}>
							{" "}
							<HiOutlinePhone />
						</a>
					)}
				</td>
			</tr>
		);
	});

	return (
		<div>
			<h2>Welcome back {personalDetails.first_name}!</h2>
			<Table
				caption="Your Cases"
				tableHeadings={profileTableHeadings}
				tableRows={profileTableRows}
			/>
			<LogOutBtn />
		</div>
	);
}
