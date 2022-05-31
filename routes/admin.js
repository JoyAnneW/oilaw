const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const bcrypt = require("bcrypt");

const generateAccessToken = require("../auth/generateAccessToken");
const validateToken = require("../auth/validateToken");

// create admin account
// "/api/admin"
router.post("/", async (req, res, next) => {
	const { first_name, last_name, email, phone, password } = req.body;
	console.log(req.body);
	try {
		// to hash the password provided in req.body, pass it to the bcrypt.hash fn with the number of salt rounds - higher = more secure
		const hashedPassword = await bcrypt.hash(password, 10);
		console.log({ hashedPassword });
		const sqlInsert = `INSERT INTO users (first_name, last_name, email, phone, role,password) VALUES ("${first_name}","${last_name}","${email}","${phone}","admin",'${hashedPassword}');`;
		let results = await db(sqlInsert);
		results = await db("SELECT * FROM users WHERE role='admin';");
		if (results.data.length) {
			res.status(200).send(results.data);
		} else {
			res.status(404).send({ error: "Resource not found" });
		}
	} catch (error) {
		res.status(500).send({ Error: error });
	}
});

// admin login
// api/admin/login

router.post("/login", async (req, res, next) => {
	const { email, password } = req.body;
	// first authenticate user. find user
	console.log(req.body);
	try {
		// find the user with the email from req.body and the admin role
		const sqlSearch = `SELECT * FROM users WHERE email='${email}' AND role='admin';`;
		let results = await db(sqlSearch);

		if (results.data.length) {
			// results.data is an Array. this will return one object which i can access at [0]
			const user = results.data[0];
			console.log({ user });

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
			res.send({ accessToken, message: "Login Successful!" });
		} else {
			res.status(404).send({ error: "User does not exist" });
		}
		// console.log({ user });
	} catch (error) {
		res.status(500).send({ Error: error });
	}
});

// get all requests
router.get("/requests", validateToken, async (req, res) => {
	const { first_name, last_name, role } = req.user;
	console.log(first_name, last_name, role);

	try {
		const sqlJoin = `SELECT  users.id, users.first_name, users.last_name, users.email, users.phone, requesters.id, requesters.contact_pref, requests.* FROM requesters INNER JOIN users ON requesters.user_id=users.id INNER JOIN requests ON requesters.id=requests.requester_id;`;
		const results = await db(sqlJoin);
		if (results.data.length) {
			res.status(200).send(results.data);
		} else {
			res.status(404).send({ error: "Resource not found" });
		}
	} catch (err) {
		res.status(500).send({ Error: err });
	}
});
// get all lawyers
router.get("/lawyers", validateToken, async (req, res) => {
	const { first_name, last_name, role } = req.user;
	console.log(first_name, last_name, role);

	try {
		//* need to add assignments here too. Different syntax to achieve sql join

		const results = await db(
			"SELECT * FROM users, lawyers WHERE role='lawyer' AND users.id=lawyers.user_id;"
		);
		if (results.data.length) {
			res.status(200).send(results.data);
		} else {
			res.status(404).send({ error: "Resource not found" });
		}
	} catch (err) {
		res.status(500).send({ Error: err });
	}
});
// get all requesters
module.exports = router;
