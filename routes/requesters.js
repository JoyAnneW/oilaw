const express = require("express");
const router = express.Router();
const db = require("../model/helper");

// create new requester
// /api/requesters
router.post("/", async (req, res) => {
	const { first_name, last_name, email, phone, description, contact_pref } =
		req.body;

	// requesters table has fks from users and requests. insert into those first, then get the id from those tables using max(id)
	// description, first and last name are wrapped in double quotes because apostrophes in submission throw an error.
	const sqlInsert = `INSERT INTO users (first_name, last_name, email, phone, role, password) VALUES ("${first_name}", "${last_name}", '${email}', '${phone}', 'requester', 'N/A'); INSERT INTO requests (description, created_at) VALUES ("${description}", now()); INSERT INTO requesters (user_id, request_id, contact_pref) VALUES ((SELECT max(id) FROM users), (SELECT max(id) from requests), '${contact_pref}');`;

	try {
		let results = await db(sqlInsert);
		results = await db("SELECT * FROM requesters");
		if (results.data.length) {
			res.status(200).send(results.data);
		} else {
			res.status(404).send({ error: "Resource not found" });
		}
	} catch (error) {
		res.status(500).send({ Error: error });
	}
});
module.exports = router;
