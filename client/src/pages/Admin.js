import React, { useState, useEffect } from "react";
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import Table from "../components/Table";
import { caseTableHeadings, lawyerTableHeadings } from "../helper/table";

export default function Admin() {
	const [caseData, setCaseData] = useState([]);
	const [allLawyers, setAllLawyers] = useState([]);
	const [assignment, setAssignment] = useState({
		lawyer_id: "",
		request_id: "",
	});
	const [allAssignments, setAllAssignments] = useState([]);
	const getCaseData = async () => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/admin/requests/",
				{
					headers: {
						authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			if (response.ok) {
				const jsonResponse = await response.json();

				setCaseData(jsonResponse);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getLawyers = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/admin/lawyers/", {
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			if (response.ok) {
				const jsonResponse = await response.json();

				setAllLawyers(jsonResponse);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCaseData();
		getLawyers();
		console.log({ caseData });
		console.log({ allLawyers });
	}, []);

	// onclick of these table rows, I get the requestid and the lawyerid to pass to the backend to make the assignments
	const caseTableRows = caseData.map((request) => {
		return (
			<tr
				key={request.id}
				onClick={() => {
					setAssignment({ ...assignment, request_id: request.id });
				}}
			>
				<td>{request.id}</td>
				<td>
					{request.first_name} {request.last_name}
				</td>
				<td> {request.description}</td>
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
					{request.accepted === 0 ? (
						<span className="bg-red-100 rounded px-2">not accepted</span>
					) : (
						""
					)}
				</td>
				<td>{request.created_at}</td>
			</tr>
		);
	});

	const lawyerTableRows = allLawyers.map((lawyer) => {
		return (
			<tr
				key={lawyer.id}
				onClick={() => {
					setAssignment({ ...assignment, lawyer_id: lawyer.id });
				}}
			>
				<td>{lawyer.id}</td>
				<td>
					{lawyer.first_name} {lawyer.last_name}
				</td>
				<td>{lawyer.specialty}</td>
				<td>{lawyer.available}</td>
			</tr>
		);
	});

	console.log({ assignment });

	const makeAssignment = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/assignments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(assignment),
			});
			if (response.ok) {
				const jsonResponse = await response.json();

				setAllAssignments(jsonResponse);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className="flex flex-col">
				<Table
					caption="Case Details"
					tableHeadings={caseTableHeadings}
					tableRows={caseTableRows}
				/>

				<Table
					caption="Lawyer Details"
					tableHeadings={lawyerTableHeadings}
					tableRows={lawyerTableRows}
				/>

				<div className="mx-auto">
					<div>Case ID: {assignment.request_id} </div>
					<div>Lawyer ID: {assignment.lawyer_id} </div>
					<button onClick={makeAssignment}>Assign</button>
				</div>
			</div>
		</div>
	);
}
