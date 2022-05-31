import React, { useState, useEffect } from "react";

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
			<button onClick={logout}>Log Out</button>
			{caseData.map((issue) => {
				return (
					<div key={issue.id}>
						{issue.id}, {issue.first_name} {issue.last_name},{" "}
						{issue.description}
					</div>
				);
			})}
			LAWYERS
			{allLawyers.map((lawyer) => {
				return (
					<div key={lawyer.id}>
						{lawyer.id}, {lawyer.first_name} {lawyer.last_name},
						{lawyer.specialty}
					</div>
				);
			})}
		</div>
	);
}
