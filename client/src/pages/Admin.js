import React, { useState, useEffect } from "react";
import Table from "../components/Table";

export default function Admin() {
	const [caseData, setCaseData] = useState([]);
	const [allLawyers, setAllLawyers] = useState([]);

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

	const logout = () => {
		localStorage.removeItem("token");
	};

	const caseTableHeadings = [
		"ID",
		"Name",
		"Description",
		"Contact By",
		"Status",
	].map((heading) => <th>{heading}</th>);

	const caseTableRows = caseData.map((issue) => {
		return (
			<tr key={issue.id}>
				<td>{issue.id}</td>
				<td>
					{issue.first_name} {issue.last_name}
				</td>
				<td> {issue.description}</td>
				<td>{issue.contact_pref}</td>
				<td>Conditional Rendering Based on State</td>
			</tr>
		);
	});

	const lawyerTableHeadings = ["ID", "Name", "Specialty", "Available"].map(
		(heading) => <th>{heading}</th>
	);

	const lawyerTableRows = allLawyers.map((lawyer) => {
		return (
			<tr key={lawyer.id}>
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

			<button onClick={logout}>Log Out</button>
		</div>
	);
}
