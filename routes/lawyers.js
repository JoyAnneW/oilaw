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
			res.status(404).send({ message: "Resource not found" });
		}
	} catch (error) {
		console.log(error);
		// sending just the error object to simplify route to properties in the frontend
		res.status(500).send({ error });
	}
});

// Get user id, name and lawyer id from lawyers table, availability
router.get("/profile", validateToken, async (req, res) => {
	// this is users.id from users table.
	const { id, first_name, last_name, email, role } = req.user;
	// console.log(first_name, last_name, role);

	try {
		const sqlJoin = `SELECT users.id AS user_id, users.first_name, users.last_name, lawyers.id AS lawyer_id, available FROM users INNER JOIN lawyers ON lawyers.user_id=${id} AND users.email='${email}';`;

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

router.get("/profile/cases/:lawyer_id", validateToken, async (req, res) => {
	const { first_name, last_name, email, role } = req.user;
	const { lawyer_id } = req.params;
	console.log("req params", req.params);
	if (!req.params) return res.send("NO PARAMS PASSED");
	try {
		// const sqlJoin = `SELECT * from lawyer_assignments INNER JOIN lawyers ON lawyers.id=lawyer_assignments.lawyer_id INNER JOIN users ON users.id=lawyers.user_id AND users.email='${email}'INNER JOIN requests ON requests.id=lawyer_assignments.request_id;`;

		const sqlJoin = `SELECT * from lawyer_assignments INNER JOIN lawyers ON lawyers.id=lawyer_assignments.lawyer_id INNER JOIN requests ON requests.id=lawyer_assignments.request_id AND lawyer_id=${lawyer_id} INNER JOIN requesters ON requesters.id=requests.requester_id INNER JOIN users ON users.id=requesters.user_id;`;
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

router.put(
	"/:user_id/available/:lawyer_id",
	validateToken,
	async (req, res, next) => {
		const { email } = req.user;
		const { user_id, lawyer_id } = req.params;
		const { available } = req.body;
		console.log(req.body);
		if (!req.params) return res.send("NO PARAMS PASSED");
		try {
			// find the specific lawyer
			let results = await db(
				`SELECT * FROM lawyers WHERE lawyers.id=${lawyer_id}`
			);
			if (results.data.length) {
				const sql = `UPDATE lawyers SET available=${available} WHERE id=${lawyer_id};`;
				// this updates the specified item
				await db(sql);

				const sqlJoin = `SELECT users.id AS user_id, users.first_name, users.last_name, lawyers.id AS lawyer_id, available FROM users INNER JOIN lawyers ON lawyers.user_id=${user_id} AND users.email='${email}';`;
				console.log({ sqlJoin });
				// make another call to db to get personaldetails
				results = await db(sqlJoin);
				if (results.data.length) {
					// console.log(results.data);
					res.status(200).send(results.data);
				} else {
					res.status(404).send({ error: "Resource not found" });
				}
			}
		} catch (error) {
			res.status(500).send({ error });
		}
	}
);

module.exports = router;
