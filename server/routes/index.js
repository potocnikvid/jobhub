var express = require('express');
var router = express.Router();
const controllerResume = require('../controllers/resume');
const controllerJob = require('../controllers/job');
const controllerMain = require('../controllers/main');
const controllerUser = require('../controllers/profile-user');
const controllerCompany = require('../controllers/profile-company');

/* GET + POST home page. */
router.route('/').get(controllerMain.index).post(controllerMain.signInUser);

/* GET + POST sign up page */
router
	.route('/sign-up')
	.get(controllerMain.signUp)
	.post(controllerMain.signUpUser);
/* GET sign up page */
router.get('/sign-up', controllerMain.signUp);

/* GET + POST sign in page */
router
	.route('/sign-in')
	.get(controllerMain.signIn)
	.post(controllerMain.signInUser);

/* GET + POST admin sign in page */
router
	.route('/admin-sign-in')
	.get(controllerMain.adminSignIn)
	.post(controllerMain.adminSignInUser);

/* GET admin dashboard page */
router
	.route('/admin-dashboard/delete/:id')
	.get(controllerMain.adminDashboardDelete);
router
	.route('/admin-dashboard/deleteJobOffer/:id/:idJ')
	.get(controllerMain.adminDashboardJobOfferDelete);
router.route('/admin-dashboard').get(controllerMain.adminDashboard);

// /* GET user main page */
router.route('/user-main').get(controllerMain.userMain);

// /* GET company main page */
router.route('/company-main').get(controllerMain.companyMain);

// /* GET user profile page */
// router.route('/user-profile').get(controllerMain.userProfile);

// /* GET company profile page */
// router.route('/company-profile').get(controllerMain.companyProfile);

/* GET + POST database page */
router.route('/db').get(controllerMain.db);
router.route('/db-insert').post(controllerMain.dbInsert);
router.route('/db-delete').post(controllerMain.dbDelete);
router.route('/db-reset').post(controllerMain.dbReset);

/* GET + POST resume preview */
router.route('/resume-preview/:idUser').get(controllerResume.getResume);
router.route('/resume-preview/:idUser').post(controllerResume.postResume);

/* GET + POST job offer preview */
router.route('/job-preview/:idUser/:idOffer').get(controllerJob.getJob);
router.route('/job-preview/:idUser/:idOffer').post(controllerJob.postJob);

/* GET home page. */

router.get('/user-profile', controllerUser.getUserProfile);
router.post('/user-profile/postUserProfile', controllerUser.postUserProfile);
router.get('/company-profile', controllerCompany.getCompanyProfile);
router.post(
	'/company-profile/postCompanyProfile',
	controllerCompany.postCompanyProfile,
);

module.exports = router;
