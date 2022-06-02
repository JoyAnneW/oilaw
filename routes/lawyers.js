const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const bcrypt = require("bcrypt");
const validateToken = require("../auth/validateToken");

// create lawyer account
// "/api/lawyers"
router.post("/", async (req, res, next) => {
	const { first_name, last_name, email, phone, password, specialty } = req.body;
	console.log(req.body);
	try {
		// to hash the password provided in req.body, pass it to the bcrypt.hash fn with the number of salt rounds - higher = more secure
		const hashedPassword = await bcrypt.hash(password, 10);
		console.log({ hashedPassword });
		const sqlInsert = `INSERT INTO users (first_name, last_name, email, phone, role,password) VALUES ("${first_name}","${last_name}","${email}","${phone}","lawyer",'${hashedPassword}'); INSERT INTO lawyers (specialty, user_id) VALUES ("${specialty}", (SELECT max(id) FROM users where role="lawyer"));`;
		let results = await db(sqlInsert);

		//* need to add assignments here too. Different syntax to achieve sql join
		results = await db(
			"SELECT * FROM users, lawyers WHERE role='lawyer' AND users.id=lawyers.user_id;"
		);
		if (results.data.length) {
			res.status(200).send(results.data);
		} else {
			res.status(404).send({ error: "Resource not found" });
		}
	} catch (error) {
		res.status(500).send({ Error: error });
	}
});

// Get account details
router.get("/profile", validateToken, async (req, res) => {
	const { first_name, last_name, email, role } = req.user;
	console.log(first_name, last_name, role);

	try {
		const sqlJoin = `SELECT * FROM lawyer_assignments INNER JOIN lawyers ON lawyers.id=lawyer_assignments.lawyer_id INNER JOIN users ON users.id=lawyers.user_id AND email='${email}' INNER JOIN requests ON requests.id=lawyer_assignments.request_id;`;

		const results = await db(sqlJoin);

		if (results.data.length) {
			console.log("results.data", results.data);
			res.status(200).send(results.data);
		} else {
			res.status(404).send({ error: "Resource not found" });
		}
	} catch (err) {
		res.status(500).send({ Error: err });
	}
});
module.exports = router;
