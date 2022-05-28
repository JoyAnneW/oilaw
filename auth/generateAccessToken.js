require("dotenv").config();
const jwt = require("jsonwebtoken");

// this fn generates token for the user passed
const generateAccessToken = async (user) => {
	console.log(process.env.ACCESS_TOKEN_SECRET);

	// adding curly braces around user solved the error: Expected payload to be a plain object.
	return await jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15s",
	});
	// expiry should be like 10/15mins
};

module.exports = generateAccessToken;
