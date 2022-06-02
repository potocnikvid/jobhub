var express = require('express');
var router = express.Router();
var db = require('../models/jobhub-db');
var jwt_helpers = require('../helpers/jwt-helpers');

/**
 * @swagger
 *  /results:
 *   post:
 *    summary: Get all users
 *    tags: [Other]
 *    security:
 *        - jwt: []
 *    requestBody:
 *         description: Add result
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/Result"
 *    responses:
 *     "200":
 *      description: Users returned.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Result"
 *     "401":
 *      description: Result is not created.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.post('/', (req, res) => {
	let jwt = req.headers.authorization;
	let loggedUserEmail = jwt_helpers.getEmailFromJwt(jwt);
	if (loggedUserEmail == undefined) {
		res.send('no user logged in');
	} else {
		db.addResult(loggedUserEmail, req.body, (err) => {
			if (err) res.send(err);
			else res.send('ok');
		});
	}
});

module.exports = router;
