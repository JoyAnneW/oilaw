const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = (req, res, next) => {
	// the token is sent in the req header when I try to access a restricted route. the req header has an autorization property
	const authHeader = req.headers.authorization;
	// if there's an authHeader then return the token portion of it, otherwise return undefined
	// authHeader= "Bearer TOKEN", where token is the access token generated. to extract just the token without the bearer keyword split the value into an array of [bearer, token] and get the value at [1]
	const token = authHeader && authHeader.split(" ")[1];
	console.log({ token });
	if (!token)
		res.status(401).send({ message: "Please provide an access token." });

	// verify token.
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		// if there's an error, send 403, which means you have a token, but it's not valid, so no access
		if (err) res.status(403).send({ message: "Token is not valid" });
		// if past this check, then we have a valid user. Set req.user to that now authenticated user. now I can use req.user in the get request to get the details of this user
		req.user = decoded.user;
		console.log(req.user, { decoded });

		next();
	});
};

module.exports = validateToken;
