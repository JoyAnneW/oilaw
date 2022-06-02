import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogOutBtn({ logout }) {
	return <button onClick={logout}>Log Out</button>;
}

// git commit -m "logout button is not conditionally rendered in the navbar based on whether there's a token or not. Login and Volunteer buttons are shown if no token. State for token and role
// is managed in App.js and set in Login.js. cleaned up unused imports in Admin.js. simplified function that checks auth status of the user in both private routes."
