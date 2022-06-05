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
				// console.log({ jsonResponse });
				// response is an array with one obj in it.
				setPersonalDetails(jsonResponse[0]);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getPersonalDetails();
	}, []);

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
			// console.log(response);
			if (response.ok) {
				const jsonResponse = await response.json();
				// console.log({ jsonResponse });

				setCaseDetails(jsonResponse);
			}
		} catch (error) {
			console.log({ error });
		}
	};

	useEffect(() => {
		getCaseDetails();
	}, [personalDetails]);

	console.log({ personalDetails });
	console.log({ caseDetails });

	// this effectively toggles availability based on the 1 or 0 that returns from the db.
	let availability;
	if (personalDetails.available - 1 === 0) {
		availability = "false";
	} else if (personalDetails.available - 1 === -1) {
		availability = "true";
	}
	console.log({ availability });

	const handleAvailabilityChange = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/lawyers/${personalDetails.user_id}/available/${personalDetails.lawyer_id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({ available: availability }),
				}
			);
			if (response.ok) {
				const jsonResponse = await response.json();
				// response comes in as array
				setPersonalDetails(jsonResponse[0]);
				// console.log({ jsonResponse });
			} else {
				const error = await response.json();
				console.log({ error });
			}
		} catch (error) {
			console.log({ error });
		}
	};

	const updateCompletedProperty = async (request) => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/lawyers/${request.request_id}/completed/${request.lawyer_id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						authorization: `Bearer ${localStorage.getItem("token")}`,
					},
					body: JSON.stringify({ completed: "true" }),
				}
			);
			const jsonResponse = await response.json();
			console.log({ jsonResponse });
			setCaseDetails(jsonResponse);
		} catch (error) {
			console.log(error);
		}
	};

	const profileTableHeadings = [
		"Case Id",
		"Description",
		"Client Name",
		"Contact By",
		"Mark As Resolved",
	].map((heading, index) => <th key={index}>{heading}</th>);

	const profileTableRows = caseDetails.map((request) => {
		return (
			<tr
				key={request.request_id}
				className={request.completed === 1 ? "hover:bg-green-200" : ""}
			>
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
				<td>
					{" "}
					<button
						onClick={() => updateCompletedProperty(request)}
						disabled={request.completed === 1}
					>
						{request.completed === 0 ? "Resolve" : "Resolved"}
					</button>
				</td>
			</tr>
		);
	});

	return (
		<div className="p-6 flex gap-4 ">
			<div className="border border-orange-50 shadow flex flex-col justify-center  gap-2 p-6 ">
				<CgProfile className="text-6xl font-bold text-green-900 self-center" />{" "}
				<div>
					Logged in as: {personalDetails.first_name} {personalDetails.last_name}
				</div>
				<div className="">
					<span>You are currently</span>
					<br />
					{personalDetails.available === 1 ? (
						<span className="font-bold bg-green-300 rounded px-2">
							available
						</span>
					) : (
						<span className="font-bold bg-red-300 rounded px-2">
							not available
						</span>
					)}
					to take on cases.
				</div>
				<button
					onClick={() => {
						handleAvailabilityChange();
					}}
				>
					Change Availability
				</button>
			</div>
			<Table
				id="lawyers"
				caption="Your Cases"
				tableHeadings={profileTableHeadings}
				tableRows={profileTableRows}
				captionStyles={"text-base font-bold"}
				lawyerTableFontSize={"text-base"}
			/>
		</div>
	);
}
