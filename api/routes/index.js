var express = require('express');
var router = express.Router();
const controllerAuth = require('../controllers/auth');
const controllerDB = require('../controllers/db');
const controllerUser = require('../controllers/user');
const controllerJobOffer = require('../controllers/joboffer.js');
const controllerAdmin = require('../controllers/admin');
const controllerProfile = require('../controllers/profile');

require('dotenv').config();
const jwt = require('express-jwt');
const auth = jwt({
	secret: process.env.JWT_PRIVATE_KEY,
	userProperty: 'payload',
	algorithms: ['HS256'],
});

/**
 * Endpoints Category
 * @swagger
 * tags:
 *  - name: Authentication
 *    description: User Control
 *  - name: Database
 *    description: Database Control
 *  - name: Resume and Job Offer
 *    description: User Resume and Job Offer Control
 *  - name: Profile
 *    description: User Profile Control
 *  - name: Admin
 *    description: Admin User Control
 *  - name: User
 *    description: User Control
 *  - name: Other
 */

/**
 * Security Access Scheme
 * @swagger
 * components:
 *  securitySchemes:
 *   jwt:
 *    type: http
 *    scheme: bearer
 *    in: header
 *    bearerFormat: JWT
 */

/* Sign in */
/**
 * @swagger
 *   /sign-in:
 *     post:
 *       summary: Sign in new user
 *       description: Sign in user with email and password
 *       tags: [Authentication]
 *       requestBody:
 *         description: Sign in data
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/SignIn"
 *       responses:
 *         "200":
 *           description: Successful sign in, returns JWT.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AccessToken"
 *         "400":
 *           description: No email or password provided.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/ErrorMessage"
 *             example:
 *               message: Invalid credentials!
 *         "500":
 *           description: Server error!
 */
router.route('/sign-in').post(controllerAuth.signIn);

/* Sign up user */
/**
 * @swagger
 *   /sign-up-user:
 *     post:
 *       summary: Sign up new user (user role = USER)
 *       description: Sign up new user with required credentials
 *       tags: [Authentication]
 *       requestBody:
 *         description: User sign up data
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/UserSignUp"
 *       responses:
 *         "200":
 *           description: Successful sign up, returns JWT.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AccessToken"
 *         "400":
 *           description: No required credentials provided.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/ErrorMessage"
 *             example:
 *               message: Invalid credentials!
 *         "500":
 *           description: Server error!
 */
router.route('/sign-up-user').post(controllerAuth.signUpUser);

/* Sign up company */
/**
 * @swagger
 *   /sign-up-company:
 *     post:
 *       summary: Sign up new company (user role = COMPANY)
 *       description: Sign up new company with required credentials
 *       tags: [Authentication]
 *       requestBody:
 *         description: Company sign up data
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               $ref: "#/components/schemas/CompanySignUp"
 *       responses:
 *         "200":
 *           description: Successful sign up, returns JWT.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/AccessToken"
 *         "400":
 *           description: No required credentials provided.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/ErrorMessage"
 *             example:
 *               message: Invalid credentials!
 *         "500":
 *           description: Server error!
 */
router.route('/sign-up-company').post(controllerAuth.signUpCompany);

/* Insert and delete database */
/**
 * @swagger
 *   /db-insert:
 *     post:
 *       summary: Fill database with seeds
 *       tags: [Database]
 *       security:
 *        - jwt: []
 *       responses:
 *         "200":
 *           description: Database filled with seeds.
 *         "401":
 *           description: User which is not ADMIN wants to insert seeds.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/ErrorMessage"
 *             example:
 *               message: Unauthorized!
 *         "500":
 *           description: Server error!
 */
router.route('/db-insert').post(auth,controllerDB.dbInsert);
/**
 * @swagger
 *   /db-insert:
 *     delete:
 *       summary: Empty the database
 *       tags: [Database]
 *       security:
 *        - jwt: []
 *       responses:
 *         "201":
 *           description: Database successfully emptied.
 *         "401":
 *           description: User which is not ADMIN wants to insert seeds.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/ErrorMessage"
 *             example:
 *               message: Unauthorized!
 *         "500":
 *           description: Server error!
 */
router.route('/db-delete').delete(auth,controllerDB.dbDelete);

// decode jwt
/**
 * @swagger
 *   /token-decode:
 *     get:
 *       summary: Decode JWT token and return user payload
 *       tags: [Other]
 *       security:
 *        - jwt: []
 *       responses:
 *         "201":
 *           description: User payload returned.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/UserPayload"
 *         "400":
 *           description: Undefined access token.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/ErrorMessage"
 *             example:
 *               message: Unauthorized!
 *         "500":
 *           description: Server error!
 */
router.route('/token-decode').get(auth, controllerAuth.jwtDecode);

// TODO: DAVID OZ KDO JE TO DELU NAJ FIXA SPODNJE

const jobofferController = require('../controllers/jobofferController');
const cvController = require('../controllers/cvController');
const resultsController = require('../controllers/resultsController');
const userController = require('../controllers/userController');

router.use('/joboffers', auth, jobofferController);

router.use('/results', auth, resultsController);

router.use('/cvs', auth, cvController);

router.use('/users', auth, userController);

//router.post('/resume-preview/postResume/:email',auth, controllerUser.postResume);
//router.post('/job-preview/postJob/:email',auth, controllerUser.postJob);

// TODO: DAVID OZ KDO JE TO DELU NAJ FIXA ZGORNJE

/**
 * @swagger
 *  /admin-dashboard/deleteJobOffer/{id}:
 *   delete:
 *    summary: Delete specific job offer
 *    tags: [Admin]
 *    security:
 *        - jwt: []
 *    parameters:
 *     - in: path
 *       name: id
 *       description: job offer id
 *       schema:
 *        type: string
 *       required: true
 *       example: 5ded18eb51386c3799833191
 *    responses:
 *     "201":
 *      description: Deletion successful.
 *     "401":
 *      description: User which is not ADMIN wants to delete job offer.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.get(
	'/admin-dashboard/deleteJobOffer',
	auth,
	controllerAdmin.dbDelJobOffer,
);
/**
 * @swagger
 *  /admin-dashboard/delete/{id}:
 *   delete:
 *    summary: Delete specific user
 *    tags: [Admin]
 *    security:
 *        - jwt: []
 *    parameters:
 *     - in: path
 *       name: id
 *       description: user id
 *       schema:
 *        type: string
 *       required: true
 *       example: 5ded18eb51386c3799833191
 *    responses:
 *     "201":
 *      description: Deletion successful.
 *     "401":
 *      description: User which is not ADMIN wants to delete user.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.get('/admin-dashboard/delete', auth, controllerAdmin.dbDelUser);
/**
 * @swagger
 *  /admin-dashboards:
 *   get:
 *    summary: Get a list of all users
 *    tags: [Admin]
 *    security:
 *        - jwt: []
 *    responses:
 *     "201":
 *      description: Deletion successful.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/User"
 *     "401":
 *      description: User which is not ADMIN wants to get a list of all user.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.get('/admin-dashboard', auth, controllerAdmin.dbGetUsers);

/**
 * @swagger
 *  /resume-preview:
 *   get:
 *    summary: Get user resume
 *    tags: [Resume and Job Offer]
 *    security:
 *        - jwt: []
 *    responses:
 *     "201":
 *      description: Get resume successful.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Resume"
 *     "401":
 *      description: User which is not USER wants to get a resume.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.get('/resume-preview', auth, controllerUser.getUser);
/**
 * @swagger
 *  /post-resume:
 *   post:
 *    summary: Create user resume
 *    tags: [Resume and Job Offer]
 *    security:
 *        - jwt: []
 *    responses:
 *     "201":
 *      description: Resume successfully created.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Resume"
 *     "401":
 *      description: User which is not USER wants to create a resume.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.post('/post-resume', auth, controllerUser.postResume);
router.put('/update-resume/:idUser', auth, controllerUser.updateResume);

// router.post('/post-job/:id', auth, controllerUser.postJob);

/**
 * @swagger
 *  /job-preview:
 *   get:
 *    summary: Get company job offer
 *    tags: [Resume and Job Offer]
 *    security:
 *        - jwt: []
 *    responses:
 *     "201":
 *      description: Get job offer successful.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/JobOffer"
 *     "401":
 *      description: User which is not COMPANY wants to get a job offer.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.get('/job-preview', auth, controllerJobOffer.getJob);
/**
 * @swagger
 *  /post-job:
 *   post:
 *    summary: Create company job offer
 *    tags: [Resume and Job Offer]
 *    security:
 *        - jwt: []
 *    responses:
 *     "201":
 *      description: Job offer successfully created.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/JobOffer"
 *     "401":
 *      description: User which is not COMPANY wants to create a job offer.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.post('/post-job', auth, controllerJobOffer.postJob);
router.put('/update-job/:idUser', auth, controllerJobOffer.updateJob);

/* Profile */
/**
 * @swagger
 *  /user-profile:
 *   put:
 *    summary: Update user profile
 *    tags: [Profile]
 *    security:
 *        - jwt: []
 *    responses:
 *     "201":
 *      description: User profile successfully updated.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/UserProfile"
 *     "401":
 *      description: User which is not USER wants to update a USER.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.route('/user-profile').put(auth, controllerProfile.updateUser);
/**
 * @swagger
 *  /company-profile:
 *   put:
 *    summary: Update company profile
 *    tags: [Profile]
 *    security:
 *        - jwt: []
 *    responses:
 *     "201":
 *      description: Company profile successfully updated.
 *      content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/CompanyProfile"
 *     "401":
 *      description: User which is not COMPANY wants to update a COMPANY.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/ErrorMessage"
 *     "500":
 *      description: Server error!
 */
router.route('/company-profile').put(auth, controllerProfile.updateCompany);

module.exports = router;