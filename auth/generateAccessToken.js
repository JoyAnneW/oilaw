require("dotenv").config();
const jwt = require("jsonwebtoken");

// this fn generates token for the user passed
const generateAccessToken = async (user) => {
	console.log(process.env.ACCESS_TOKEN_SECRET);

	// adding curly braces around user solved the error: Expected payload to be a plain object.
	return await jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
	// safer to also have an expiry here, and implement refresh tokens
};

module.exports = generateAccessToken;
