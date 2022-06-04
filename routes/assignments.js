const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const checkRole = require("../auth/checkRole");
const validateToken = require("../auth/validateToken");

// get all assignments
router.get("/", validateToken, checkRole(["admin"]), async (req, res) => {
	try {
		const results = await db(
			`SELECT * FROM users JOIN lawyers ON users.id=lawyers.user_id JOIN lawyer_assignments ON lawyers.id=lawyer_assignments.lawyer_id;`
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

// PUT assign lawyers to requests
// api/assignments/
router.post(
	"/",
	validateToken,
	checkRole(["admin"]),
	async (req, res, next) => {
		const { lawyer_id, request_id } = req.body;
		console.log(req.body);
		const sqlInsert = `INSERT INTO lawyer_assignments (lawyer_id, request_id) VALUES (${lawyer_id}, ${request_id})`;
		try {
			// add assignment
			let results = await db(sqlInsert);

			// get a full table with all lawyer details and assignments
			const sqlJoin = `SELECT * FROM users JOIN lawyers ON users.id=lawyers.user_id JOIN lawyer_assignments ON lawyers.id=lawyer_assignments.lawyer_id;`;
			results = await db(sqlJoin);

			if (results.data.length) {
				console.log(results);
				res.status(200).send(results.data);
			} else {
				res.status(404).send({ error: "Resource not found" });
			}
		} catch (error) {
			res.status(500).send({ Error: error });
		}
	}
);

module.exports = router;
