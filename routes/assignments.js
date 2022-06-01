const express = require("express");
const router = express.Router();
const db = require("../model/helper");

// PUT assign lawyers to requests
// api/assignments/
router.post("/", async (req, res, next) => {
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
});

module.exports = router;
