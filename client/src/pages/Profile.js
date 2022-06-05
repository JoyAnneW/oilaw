import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgProfile } from "react-icons/cg";

export default function Profile() {
	// only name and lawyer id, availability
	const [personalDetails, setPersonalDetails] = useState({});
	const [caseDetails, setCaseDetails] = useState([]);
	const [checkedValue, setCheckedValue] = useState("");
	const [isAvailable, setIsAvailable] = useState(1);

	const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setIsAvailable();
	};
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
		<div className="p-6">
			<div>
				Logged in as: {personalDetails.first_name} {personalDetails.last_name}
			</div>
			<div>
				You are currently{" "}
				{personalDetails.available === 1 ? "available" : "not available"}
				to take on cases.
			</div>
			{personalDetails.available}
			<Table
				caption="Your Cases"
				tableHeadings={profileTableHeadings}
				tableRows={profileTableRows}
				captionStyles={"text-base font-bold"}
			/>
			{/* <label htmlFor="available">available</label>
			<input
				type="radio"
				name="availability"
				id="available"
				value="available"
				onChange={(event) => {
					handleInputChange(event);
					setCheckedValue(event.target.value);
				}}
				required
				checked={checkedValue === "available"}
				className="ml-auto"
			/>{" "} */}
		</div>
	);
}
