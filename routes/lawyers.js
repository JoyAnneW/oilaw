const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const bcrypt = require("bcrypt");

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

		//* need to add assignments here too
		results = await db("SELECT * FROM users WHERE role='lawyer';");
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
