const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const checkRole = require("../auth/checkRole");
const validateToken = require("../auth/validateToken");

// get all assignments
router.get("/", validateToken, checkRole(["admin"]), async (req, res) => {
	try {
		const sqlJoin = `select * from lawyer_assignments inner join lawyers on lawyer_assignments.lawyer_id=lawyers.id inner join requests on requests.id=lawyer_assignments.request_id order by lawyers.id;`;
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

			// get a full table with all lawyer details and assignments
			const sqlJoin = `select * from lawyer_assignments inner join lawyers on lawyer_assignments.lawyer_id=lawyers.id inner join requests on requests.id=lawyer_assignments.request_id order by lawyers.id;`;
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
