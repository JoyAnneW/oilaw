import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import {
	caseTableHeadings,
	caseTableRows,
	lawyerTableHeadings,
	lawyerTableRows,
} from "../helper/table";

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

	return (
		<div>
			<Table
				caption="Case Details"
				tableHeadings={caseTableHeadings}
				tableRows={caseTableRows}
				array={caseData}
			/>

			<Table
				caption="Lawyer Details"
				tableHeadings={lawyerTableHeadings}
				tableRows={lawyerTableRows}
				array={allLawyers}
			/>

			<button onClick={logout}>Log Out</button>
		</div>
	);
}
