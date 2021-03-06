import React, { useState, useEffect } from "react";
import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineMail } from "react-icons/hi";
import { BsCheckCircle } from "react-icons/bs";
import { IoBanOutline } from "react-icons/io5";
import Table from "../components/Table";
import {
	caseTableHeadings,
	lawyerTableHeadings,
	allAssignmentHeadings,
} from "../helper/table";

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
	// currently this only gives me access to lawyer ids
	const [assignedLawyers, setAssignedLawyers] = useState([]);

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

	const getAllAssignments = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/assignments/", {
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			if (response.ok) {
				const jsonResponse = await response.json();

				setAllAssignments(jsonResponse);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCaseData();
		getLawyers();
	}, []);

	useEffect(() => {
		getAllAssignments();
	}, []);

	console.log({ caseData });
	console.log({ allLawyers });
	console.log({ allAssignments });

	// gets the object from the table that's clicked on
	const getSelectedCase = (index) => {
		const selected = caseData[index];
		setSelectedCase(selected);
	};

	const getAssignedLawyers = (request) => {
		const assigned = allAssignments.filter((assignment) => {
			// return all the objects that have the same request id
			return assignment.request_id === request.id;
		});
		console.log({ assigned });
		setAssignedLawyers(assigned);
	};

	const assignedLawyersSpan = assignedLawyers.map((lawyer, index) => {
		return <span key={index}> Lawyer ID: {lawyer.lawyer_id} || </span>;
	});

	const updateAcceptedProperty = async () => {
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

	const makeAssignment = async () => {
		try {
			const response = await fetch("http://localhost:5000/api/assignments", {
				method: "POST",
				headers: {
					authorization: `Bearer ${localStorage.getItem("token")}`,
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

	const updateAssignedProperty = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/api/admin/${selectedCase.id}/assigned`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ assigned: "true" }),
				}
			);
			const jsonResponse = await response.json();
			setCaseData(jsonResponse);
		} catch (error) {
			console.log(error);
		}
	};

	console.log({ assignment });
	console.log({ selectedCase });

	const getStatus = (request) => {
		if (request.accepted === 0) {
			return <span className="bg-red-100 rounded px-2 ">not accepted</span>;
		} else if (request.accepted === 1 && request.assigned === 0) {
			return <span className="bg-yellow-100 rounded px-2 ">pending</span>;
		} else if (request.assigned === 1 && request.completed === 0) {
			return <span className="bg-orange-200 rounded px-2 ">assigned</span>;
		} else if (request.completed === 1) {
			return <span className="bg-green-200 rounded px-2 ">resolved</span>;
		}
	};
	// onclick of these table rows, I get the requestid and the lawyerid to pass to the backend to make the assignments
	const caseTableRows = caseData.map((request, index) => {
		return (
			<tr
				className={request.completed === 1 ? "hover:bg-green-200" : ""}
				key={request.id}
				onClick={(event) => {
					// on click, get the specific case from caseData at the index of the clicked item
					getSelectedCase(index);
					// start building the assignment object to send to the server
					setAssignment({ ...assignment, request_id: request.id });
					getAssignedLawyers(request);
				}}
			>
				<td className="sticky left-0 bg-white">{request.id}</td>
				<td>
					{request.first_name} {request.last_name}
				</td>
				<td> {request.description}</td>
				<td className="text-lg">
					{request.contact_pref === "email" && (
						<a href={`mailto:${request.email}`}>
							{" "}
							<HiOutlineMail />
						</a>
					)}

					{request.contact_pref === "phone" && (
						<a href={`tel:${request.phone}`}>
							{" "}
							<HiOutlinePhone />
						</a>
					)}
				</td>
				<td>{getStatus(request)}</td>
				<td>{request.created_at}</td>
			</tr>
		);
	});

	const lawyerTableRows = allLawyers.map((lawyer) => {
		return (
			<tr
				className={lawyer.available === 0 ? "hover:bg-red-50" : ""}
				key={lawyer.id}
				onClick={() => {
					if (lawyer.available) {
						setAssignment({ ...assignment, lawyer_id: lawyer.id });
					} else {
						// to prevent unavailable lawyer from being assigned
						setAssignment({ ...assignment, lawyer_id: "" });
					}
				}}
			>
				<td className="sticky left-0 bg-white">{lawyer.id}</td>
				<td>
					{lawyer.first_name} {lawyer.last_name}
				</td>
				<td>{lawyer.specialty}</td>
				<td>
					{lawyer.available === 1 ? (
						<BsCheckCircle className="text-lg font-bold text-green-900" />
					) : (
						<IoBanOutline className="text-lg font-bold text-red-900" />
					)}
				</td>
				<td>
					<div className="flex gap-2 items-center">
						<HiOutlinePhone /> {lawyer.phone}
					</div>
					<div className="flex gap-2 items-center">
						<HiOutlineMail /> {lawyer.email}
					</div>
				</td>
			</tr>
		);
	});

	const allAssignmentRows = allAssignments.map((assignmentObj, index) => {
		return (
			<tr key={index}>
				<td>{assignmentObj.lawyer_id}</td>
				<td>
					{assignmentObj.lusers_fname} {assignmentObj.lusers_lname}
				</td>
				<td>{assignmentObj.request_id}</td>
				<td>
					{assignmentObj.rusers_fname} {assignmentObj.rusers_lname}
				</td>
			</tr>
		);
	});

	return (
		<div className="w-full">
			<div className="flex p-3 pt-7 gap-3 ">
				{/* need to add the class scrollbar to access tailwind utilities to style scrollbar */}
				<div className="w-2/6 overflow-auto scrollbar">
					<Table
						caption="Lawyer Details"
						tableHeadings={lawyerTableHeadings}
						tableRows={lawyerTableRows}
						captionStyles="text-left"
					/>
				</div>
				<div className="w-3/6 overflow-auto scrollbar">
					<Table
						caption="Case Details"
						tableHeadings={caseTableHeadings}
						tableRows={caseTableRows}
						captionStyles="text-left"
					/>
				</div>
				{/* ****************************CASE MANAGEMENT SECTION************************************ */}
				<div className="border border-orange-50 shadow w-min p-3 text-sm self-start">
					<div className="flex flex-col gap-2">
						<span className="font-bold">
							Case ID:{" "}
							{/* can also get this from selectCase.id but I'd like to keep it consistent. I'm sending assignment to the backend */}
							<span className="font-normal">{assignment.request_id}</span>{" "}
						</span>
						<span className="font-bold">
							Description:{" "}
							<span className="font-normal">{selectedCase.description}</span>
						</span>
					</div>
					<div className="">
						<div>
							<span className="font-bold">Lawyer ID: </span>
							{assignment.lawyer_id}{" "}
						</div>
						{selectedCase.assigned ? (
							<div className="my-4">
								<span className="bg-orange-100 rounded px-2 ">
									<span className="font-bold"> Current Assignments:</span>
									{assignedLawyersSpan}
								</span>
							</div>
						) : (
							""
						)}
					</div>
					<div className="flex gap-2 mt-2">
						<button
							onClick={updateAcceptedProperty}
							disabled={selectedCase.accepted === 1}
						>
							Accept
						</button>
						<button
							onClick={() => {
								makeAssignment();
								updateAssignedProperty();
								setAssignment({
									lawyer_id: "",
									request_id: "",
								});
								// this makes sure the assignments table will populate as soon as an assignment has been made
								getAllAssignments();
							}}
							disabled={selectedCase.accepted === 0}
						>
							Assign
						</button>
					</div>
				</div>
			</div>

			<div className="p-6 mx-auto w-min">
				<Table
					caption="All Assignments"
					tableHeadings={allAssignmentHeadings}
					tableRows={allAssignmentRows}
					captionStyles={"text-base font-bold "}
				/>
			</div>
		</div>
	);
}
