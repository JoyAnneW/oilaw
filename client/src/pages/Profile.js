import React, { useState, useEffect } from "react";
import LogOutBtn from "../components/LogOutBtn";
import Table from "../components/Table";
export default function Profile() {
	const [profileDetails, setProfileDetails] = useState({});

	const getProfile = async () => {
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
				// respose is an array with one obj in it.
				setProfileDetails(jsonResponse[0]);
				console.log(profileDetails);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getProfile();
	}, []);

	const profileTableRows = (caseData) => {
		// return caseData.map((issue) => {
		//   return (
		//     <tr key={issue.id}>
		//       <td>{issue.id}</td>
		//       <td>
		//         {issue.first_name} {issue.last_name}
		//       </td>
		//       <td> {issue.description}</td>
		//       <td>{issue.contact_pref}</td>
		//       <td>Conditional Rendering Based on State</td>
		//     </tr>
		//   );
		// });
	};

	return (
		<div>
			<h2>Welcome back {profileDetails.first_name}!</h2>
			<Table
				caption="Your Cases"
				tableHeadings={[]}
				tableRows={profileTableRows}
				array={[]}
			/>
			<LogOutBtn />
		</div>
	);
}
