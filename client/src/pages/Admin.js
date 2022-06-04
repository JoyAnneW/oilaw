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
	// keeps track of what object from the table is clicked on
	const [selectedCase, setSelectedCase] = useState({});

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

	// gets the object from the table that's clicked on
	const getSelectedCase = (index) => {
		const selected = caseData[index];
		setSelectedCase(selected);
	};

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

	const handleAccept = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/admin/${selectedCase.id}/accepted`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ accepted: "true" }),
				}
			);
			const jsonResponse = await response.json();
			setCaseData(jsonResponse);
		} catch (error) {
			console.log(error);
		}
	};

	// onclick of these table rows, I get the requestid and the lawyerid to pass to the backend to make the assignments
	const caseTableRows = caseData.map((request, index) => {
		return (
			<tr
				key={request.id}
				onClick={(event) => {
					// on click, get the specific case from caseData at the index of the clicked item
					getSelectedCase(index);
					// start building the assignment object to send to the server
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
						<span className="bg-red-100 rounded px-2 ">not accepted</span>
					) : (
						<span className="bg-yellow-100 rounded px-2 ">pending</span>
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

	return (
		<div>
			<div>
				<div className="flex">
					<div className="w-1/2">
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
					</div>
					<div className="w-1/2 p-6 ">
						<div className="border border-orange-50 shadow w-min p-3 ">
							<div className="flex flex-col gap-2">
								<span className="font-bold">
									Case ID:{" "}
									{/* can also get this from selectCase.id but I'd like to keep it consistent. I'm sending assignment to the backend */}
									<span className="font-normal">{assignment.request_id}</span>{" "}
								</span>
								<span className="font-bold">
									Description:{" "}
									<span className="font-normal">
										{selectedCase.description}
									</span>
								</span>
							</div>
							<div className="">
								<div>Lawyer ID: {assignment.lawyer_id} </div>
							</div>
							<div className="flex gap-2 mt-2">
								<button onClick={handleAccept}>Accept</button>
								<button onClick={makeAssignment}>Assign</button>
								<button>Resolved</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
