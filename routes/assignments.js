const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const checkRole = require("../auth/checkRole");
const validateToken = require("../auth/validateToken");

// get all assignments
router.get("/", validateToken, checkRole(["admin"]), async (req, res) => {
	try {
		const sqlJoin = `SELECT rusers.first_name AS rusers_fname, rusers.last_name AS rusers_lname, lusers.first_name AS lusers_fname, lusers.last_name AS lusers_lname, lawyers.*, lawyers.id AS lawyer_id, requests.*, requests.id AS request_id, requesters.* from lawyer_assignments INNER JOIN lawyers ON lawyer_assignments.lawyer_id=lawyers.id INNER JOIN requests ON requests.id=lawyer_assignments.request_id INNER JOIN requesters ON requests.requester_id=requesters.id INNER JOIN users lusers ON lusers.id=lawyers.user_id INNER JOIN users rusers ON rusers.id=requesters.user_id ORDER BY requests.id;`;
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

			// get a full table with all lawyer details and assignments. Aliases for table name and table columns because i'm inner joining from the same table twice. everything should be unique
			const sqlJoin = `SELECT rusers.first_name AS rusers_fname, rusers.last_name AS rusers_lname, lusers.first_name AS lusers_fname, lusers.last_name AS lusers_lname, lawyers.*, lawyers.id AS lawyer_id, requests.*, requests.id AS request_id, requesters.* from lawyer_assignments INNER JOIN lawyers ON lawyer_assignments.lawyer_id=lawyers.id INNER JOIN requests ON requests.id=lawyer_assignments.request_id INNER JOIN requesters ON requests.requester_id=requesters.id INNER JOIN users lusers ON lusers.id=lawyers.user_id INNER JOIN users rusers ON rusers.id=requesters.user_id ORDER BY requests.id;`;
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
