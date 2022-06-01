const express = require("express");
const router = express.Router();
const db = require("../model/helper");

// create new requester and request
// /api/requesters
router.post("/", async (req, res) => {
	const { first_name, last_name, email, phone, description, contact_pref } =
		req.body;

	// requesters table has fks from users and requests. insert into those first, then get the id from those tables using max(id)
	// description, first and last name are wrapped in double quotes because apostrophes in submission throw an error.
	const sqlInsert = `INSERT INTO users (first_name, last_name, email, phone, role, password) VALUES ("${first_name}", "${last_name}", '${email}', '${phone}', 'requester', 'N/A'); INSERT INTO requesters (user_id, contact_pref) VALUES ((SELECT max(id) FROM users), '${contact_pref}'); INSERT INTO requests (requester_id, description, created_at) VALUES ((SELECT max(id) FROM requesters), "${description}", now());`;

	try {
		let results = await db(sqlInsert);
		// return a combined object from the 3 tables with all info about a request
		const sqlJoin = `SELECT users.id AS users_id, users.first_name, users.last_name, users.email, users.phone, requesters.id AS requesters_id, requesters.contact_pref, requests.* FROM requesters INNER JOIN users ON requesters.user_id=users.id INNER JOIN requests ON requesters.id=requests.requester_id;`;
		results = await db(sqlJoin);
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
