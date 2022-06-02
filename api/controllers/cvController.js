var express = require('express');
var router = express.Router();
var db = require('../models/jobhub-db');
var jwt_helpers = require('../helpers/jwt-helpers');

/**
 * @swagger
 *  /cvs:
 *   get:
 *    summary: Get all resumes
 *    tags: [Resume and Job Offer]
 *    responses:
 *     "200":
 *      description: Resumes returned.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Resume"
 *     "404":
 *      description: Resumes not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.get('/', (req, res) => {
	// get all cvs
	res.send('all cvs');
});

/**
 * @swagger
 *  /cvs/{id}:
 *   get:
 *    summary: Get specific resume
 *    tags: [Resume and Job Offer]
 *    parameters:
 *     - in: path
 *       name: id
 *       description: resume id
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: Resume returned.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Resume"
 *     "404":
 *      description: Resume not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.get('/int:id', (req, res) => {
	res.send('cv with id ' + req.params.id);
});

/**
 * @swagger
 *  /cvs:
 *   post:
 *    summary: Resume created
 *    tags: [Resume and Job Offer]
 *    security:
 *        - jwt: []
 *    requestBody:
 *         description: Sign in data
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/Resume"
 *    responses:
 *     "200":
 *      description: Created resume returned.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Resume"
 *     "404":
 *      description: Resume not found.
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
		db.addCv(loggedUserEmail, req.body, (err) => {
			if (err) res.send(err);
			else res.send('ok');
		});
	}
});

/**
 * @swagger
 *  /cvs/{id}:
 *   put:
 *    summary: User updated
 *    tags: [Resume and Job Offer]
 *    security:
 *        - jwt: []
 *    parameters:
 *     - in: path
 *       name: id
 *       description: resume id
 *       schema:
 *        type: string
 *       required: true
 *    requestBody:
 *         description: Sign in data
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/Resume"
 *    responses:
 *     "200":
 *      description: Updated resume returned.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Resume"
 *     "404":
 *      description: Resume not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.put('/:id', (req, res) => {
	// change this cv in db
	res.send('ok');
});

/**
 * @swagger
 *  /cvs/{id}:
 *   delete:
 *    summary: Resume deleted
 *    tags: [Resume and Job Offer]
 *    security:
 *        - jwt: []
 *    parameters:
 *     - in: path
 *       name: id
 *       description: resume id
 *       schema:
 *        type: string
 *       required: true
 *    responses:
 *     "200":
 *      description: Resume deleted.
 *     "404":
 *      description: Resume not found.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.delete('/:id', (req, res) => {
	// delete this cv in db
	res.send('ok');
});

router.get('/autofind', (req, res) => {
	// res.send({
	// 	cv_id: 1,
	// 	name: 'Arthur Dent',
	// 	gender: 'Male',
	// 	email: 'test@example.si',
	// 	about: 'Ich Bin Arthur Dent...',
	// 	description:
	// 		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
	// 	expirience: [
	// 		{
	// 			company: 'Google',
	// 			title: 'Internship',
	// 			from: new Date(),
	// 			to: new Date(),
	// 		},
	// 	],
	// 	projects: [
	// 		{
	// 			name: 'JobHub',
	// 			description: 'Tinder + LinkedIn',
	// 		},
	// 	],
	// 	skills: [
	// 		{
	// 			name: 'dobr pucem wc',
	// 		},
	// 	],
	// 	education: {
	// 		key: 'High School',
	// 		description: '1. Gimnazija v Celju',
	// 		from: new Date(),
	// 		to: new Date(),
	// 	},
	// });
	let jwt = req.headers.authorization;
	let loggedUserEmail = jwt_helpers.getEmailFromJwt(jwt);
	if (loggedUserEmail == undefined) {
		res.send('no user logged in');
	} else {
		db.autoFindCv(loggedUserEmail, (err, data) => {
			if (err) res.send(err);
			else res.send(data);
		});
	}
});

module.exports = router;
