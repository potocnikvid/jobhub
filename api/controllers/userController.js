var express = require('express');
var router = express.Router();
var db = require('../models/jobhub-db');

/**
 * @swagger
 *  /users:
 *   get:
 *    summary: Get all users
 *    tags: [User]
 *    responses:
 *     "200":
 *      description: Users returned.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/User"
 *     "404":
 *      description: Users not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.get('/', (req, res) => {
	db.getUsers((err, data) => {
		if (err) res.send(err);
		else res.send(data);
	});
});

/**
 * @swagger
 *  /users/{email}:
 *   get:
 *    summary: Get specific user
 *    tags: [User]
 *    parameters:
 *     - in: path
 *       name: email
 *       description: user email
 *       schema:
 *        type: string
 *       required: true
 *       example: arthur.dent@galaxy.com
 *    responses:
 *     "200":
 *      description: User returned.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/User"
 *     "404":
 *      description: User not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.get('/:email', (req, res) => {
	db.getUser(req.params.email, (err, data) => {
		if (err) res.send(err);
		else res.send(data);
	});
});

/**
 * @swagger
 *  /users:
 *   post:
 *    summary: User created
 *    tags: [User]
 *    security:
 *        - jwt: []
 *    requestBody:
 *         description: Sign in data
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *    responses:
 *     "200":
 *      description: Created user returned.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/User"
 *     "404":
 *      description: User not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.post('/', (req, res) => {
	db.addUser(req.body, (err) => {
		if (err) res.send(err);
		else res.send('ok');
	});
});

/**
 * @swagger
 *  /users:
 *   put:
 *    summary: User updated
 *    tags: [User]
 *    security:
 *        - jwt: []
 *    requestBody:
 *         description: Sign in data
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UserProfile"
 *    responses:
 *     "200":
 *      description: Updated user returned.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/User"
 *     "404":
 *      description: User not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.put('/', (req, res) => {
	let loggedUserEmail = req.cookies.logged;
	if (loggedUserEmail == undefined) {
		res.send('no user logged in');
	} else {
		db.updateUser(loggedUserEmail, req.body, (err) => {
			if (err) res.send(err);
			else res.send('ok');
		});
	}
});

/**
 * @swagger
 *  /users/{id}:
 *   delete:
 *    summary: User deleted
 *    tags: [User]
 *    security:
 *        - jwt: []
 *    parameters:
 *     - in: path
 *       name: id
 *       description: user id
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: User deleted.
 *     "404":
 *      description: User not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.delete('/:id', (req, res) => {
	// delete this user in db
	res.send('ok');
});

router.post('/login', (req, res) => {
	let email = req.body.email;
	res.cookie('logged', email, { maxAge: 900000 });
	res.send(email);
});

module.exports = router;
