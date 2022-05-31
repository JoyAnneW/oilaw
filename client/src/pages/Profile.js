import React, { useState, useEffect } from "react";

export default function Profile() {
	const [profileDetails, setProfileDetails] = useState({});

	useEffect(() => {
		return () => {};
	}, []);

	return <div>Welcome back {profileDetails.first_name}</div>;
}
