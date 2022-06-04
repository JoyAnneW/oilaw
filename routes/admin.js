const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const bcrypt = require("bcrypt");
const checkRole = require("../auth/checkRole");
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

// get all requests. checkRole middleware receives an array of all the roles allowed to access this data.
router.get(
	"/requests",
	validateToken,
	checkRole(["admin"]),
	async (req, res) => {
		const { first_name, last_name, role } = req.user;
		console.log(first_name, last_name, role);

		try {
			const sqlJoin = `SELECT  users.id AS users_id, users.first_name, users.last_name, users.email, users.phone, requesters.id, requesters.contact_pref, requests.*, requests.id AS requests_id FROM requesters INNER JOIN users ON requesters.user_id=users.id INNER JOIN requests ON requesters.id=requests.requester_id;`;
			const results = await db(sqlJoin);
			if (results.data.length) {
				res.status(200).send(results.data);
			} else {
				res.status(404).send({ error: "Resource not found" });
			}
		} catch (err) {
			res.status(500).send({ Error: err });
		}
	}
);

// get all lawyers
router.get(
	"/lawyers",
	validateToken,
	checkRole(["admin"]),
	async (req, res) => {
		const { first_name, last_name, email, phone, role } = req.user;
		console.log(first_name, last_name, email, phone, role);

		try {
			//* need to add assignments here too. Different syntax to achieve sql join

			const results = await db(
				"SELECT users.first_name, users.last_name, users.email, users.phone, lawyers.* FROM lawyers INNER JOIN users ON lawyers.user_id=users.id;"
			);
			if (results.data.length) {
				res.status(200).send(results.data);
			} else {
				res.status(404).send({ error: "Resource not found" });
			}
		} catch (err) {
			res.status(500).send({ Error: err });
		}
	}
);
// update accepted
router.put("/:id/accepted", async (req, res, next) => {
	const { id } = req.params;
	const { accepted } = req.body;

	try {
		// find the specific request
		let results = await db(`SELECT * FROM requests WHERE id=${id}`);
		// if it is found,  use the sql instructions for updating this item
		if (results.data.length) {
			const sql = `UPDATE requests SET accepted=${accepted} WHERE id=${id};`;
			// this replaces the specified item
			await db(sql);

			const sqlJoin = `SELECT  users.id AS users_id, users.first_name, users.last_name, users.email, users.phone, requesters.id, requesters.contact_pref, requests.*, requests.id AS requests_id FROM requesters INNER JOIN users ON requesters.user_id=users.id INNER JOIN requests ON requesters.id=requests.requester_id;`;
			// make another call to db to get the object with all case details. Same obj from get req
			results = await db(sqlJoin);
			if (results.data.length) {
				// console.log(results.data);
				res.status(200).send(results.data);
			} else {
				res.status(404).send({ error: "Resource not found" });
			}
		}
	} catch (err) {
		console.log(err);
		res.status(500).send({ Error: err });
	}
});
module.exports = router;
