var express = require('express');
var router = express.Router();
var db = require('../models/jobhub-db');
var jwt_helpers = require('../helpers/jwt-helpers');

/**
 * @swagger
 *  /joboffers:
 *   get:
 *    summary: Get all job offers
 *    tags: [Resume and Job Offer]
 *    responses:
 *     "200":
 *      description: Job offers returned.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/JobOffer"
 *     "404":
 *      description: Job offers not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.get('/', (req, res) => {
	// get all job offers
	db.getJobOffers((err, data) => {
		if (err) res.send(err);
		else res.send(data);
	});
});

/**
 * @swagger
 *  /joboffers/{id}:
 *   get:
 *    summary: Get specific user
 *    tags: [Resume and Job Offer]
 *    parameters:
 *     - in: path
 *       name: id
 *       description: job offer id
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: Job offer returned.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/JobOffer"
 *     "404":
 *      description: Job offer not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.get('/int:id', (req, res) => {
	res.send('job offer with id ' + req.params.id);
});

/**
 * @swagger
 *  /joboffers:
 *   post:
 *    summary: Job offer created
 *    tags: [Resume and Job Offer]
 *    security:
 *        - jwt: []
 *    requestBody:
 *         description: Job offer data
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/JobOffer"
 *    responses:
 *     "200":
 *      description: Created job offer returned.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/JobOffer"
 *     "404":
 *      description: Job offers not found.
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
		db.addJobOffer(loggedUserEmail, req.body, (err) => {
			if (err) res.send(err);
			else res.send('ok');
		});
	}
});

/**
 * @swagger
 *  /joboffers/{id}:
 *   put:
 *    summary: Job offer updated
 *    tags: [Resume and Job Offer]
 *    security:
 *        - jwt: []
 *    parameters:
 *     - in: path
 *       name: id
 *       description: job offer id
 *       schema:
 *        type: string
 *       required: true
 *    requestBody:
 *         description: Job offer data
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/JobOffer"
 *    responses:
 *     "200":
 *      description: Updated job offer returned.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/JobOffer"
 *     "404":
 *      description: Job offer not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.put('/:id', (req, res) => {
	db.updateJobOffer(req.params.id, req.body, (err) => {
		if (err) res.send(err);
		else res.send('ok');
	});
});

/**
 * @swagger
 *  /joboffers/{id}:
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
 *      description: Users not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.delete('/:id', (req, res) => {
	// delete this job offer in db
	res.send('ok');
});

router.get('/autofind', (req, res) => {
	let jwt = req.headers.authorization;
	let loggedUserEmail = jwt_helpers.getEmailFromJwt(jwt);
	if (loggedUserEmail == undefined) {
		res.send('no user logged in');
	} else {
		db.autoFindJobOffer(loggedUserEmail, (err, data) => {
			if (err) res.send(err);
			else res.send(data);
		});
	}
});

module.exports = router;
