const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const bcrypt = require("bcrypt");

const generateAccessToken = require("../auth/generateAccessToken");

// api/login

router.post("/", async (req, res, next) => {
	const { email, password } = req.body;
	// first authenticate user. find user
	console.log(req.body);
	try {
		// find the user with the email from req.body and the admin/lawyer role
		const sqlSearch = `SELECT * FROM users WHERE email='${email}' AND role='admin' OR role='lawyer';`;
		let results = await db(sqlSearch);

		if (results.data.length) {
			// results.data is an Array. this will return one object which i can access at [0]
			const user = results.data[0];
			console.log("from login.js:", { user });
			//user: {
			// 	id: 3,
			// 	first_name: 'Joy',
			// 	last_name: 'Williams',
			// 	email: 'dummyemailforcode@gmail.com',
			// 	phone: '9998887766',
			// 	role: 'admin',
			// 	password: '$2b$10$9rkN8M0mA7QLzhVjgUXvh.jaTFyfB33ZscQnACX1Syoq1DVDXGiwO'
			// }

			// checks whether plain text password and hashed password are the same. returns true or false
			const passwordIsCorrect = await bcrypt.compare(password, user.password);

			if (!passwordIsCorrect) {
				res
					.status(401)
					.send({ accessToken: null, message: "Incorrect password." });
			}
			// generate access token. need to await here as well or an empty object will be returned since this code is sync, but the token from the async jwt.sign hasn't arrived yet
			const accessToken = await generateAccessToken(user);
			console.log({ accessToken });
			res.send({
				accessToken,
				message: "Login Successful!",
				role: user.role,
				user_id: user.id,
			});
		} else {
			res.status(404).send({ error: "User does not exist" });
		}
		// console.log({ user });
	} catch (error) {
		res.status(500).send({ Error: error });
	}
});

module.exports = router;
