import React, { useState, useEffect } from "react";

export default function Admin() {
	const [caseData, setCaseData] = useState([]);

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

	useEffect(() => {
		getCaseData();
		console.log(caseData);
	}, []);

	return (
		<div>
			{caseData.map((issue) => {
				return (
					<div>
						{issue.id}, {issue.first_name} {issue.last_name},{" "}
						{issue.description}
					</div>
				);
			})}
		</div>
	);
}
