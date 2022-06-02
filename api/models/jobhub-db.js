const mongoose = require('mongoose');
require('dotenv').config();

var dbURI = 'mongodb://localhost/jobhub';
if (process.env.NODE_ENV === 'production') {
	dbURI = process.env.DATABASE_CLOUD_URI;
} else if (process.env.NODE_ENV === 'docker') {
	dbURI = 'mongodb://jobhub-mongodb/jobhub';
}
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
	console.log(`Mongoose is connected on ${dbURI}.`);
});

mongoose.connection.on('error', (napaka) => {
	console.log('Mongoose connection error: ', napaka);
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose is not connected.');
});

const dbStop = (message, callback) => {
	mongoose.connection.close(() => {
		console.log(`Mongoose closed '${message}'.`);
		callback();
	});
};

// Nodemon
process.once('SIGUSR2', () => {
	dbStop('nodemon', () => {
		process.kill(process.pid, 'SIGUSR2');
	});
});

// Exit local
process.on('SIGINT', () => {
	dbStop('exit local', () => {
		process.exit(0);
	});
});

// Exit Heroku
process.on('SIGTERM', () => {
	dbStop('exit Heroku', () => {
		process.exit(0);
	});
});

var User = require('./user');

function getJobOffers(callback) {
	User.find({}).select('job_offers').exec(callback);
}

function getJobOffer(id, callback) {
	User.find({ job_offers: { _id: id } })
		.select('job_offers')
		.exec(callback);
}

function addJobOffer(userEmail, offer, callback) {
	User.updateOne(
		{ email: userEmail },
		{ $push: { job_offers: offer } },
		callback,
	);
}

function updateJobOffer(id, offer, callback) {
	User.updateOne(
		{ job_offers: { _id: id } },
		{ $set: { 'job_offers.$': offer } },
		callback,
	);
}

function getUsers(callback) {
	User.find({}).exec(callback);
}

function getUser(email, callback) {
	User.findOne({ email: email }).exec(callback);
}

function updateUser(userEmail, newUser, callback) {
	User.updateOne({ email: userEmail }, newUser, callback);
}

function addUser(user, callback) {
	let obj = new User(user);
	obj.save(callback);
}

function autoFindJobOffer(userEmail, callback) {
	User.find({ email: userEmail })
		.select('results')
		.exec((err, resultsData) => {
			if (err) callback(err, null);
			else {
				resultsData = resultsData[0].results;
				resultsData = resultsData.map((a) => a.shown_id);
				User.find({}).exec((err, data) => {
					let notSent = true;
					if (data.length > 0) {
						let BreakException = {};
						try {
							data.forEach((company) => {
								if (
									company.job_offers != undefined &&
									company.job_offers.length > 0
								) {
									company.job_offers.forEach((offer) => {
										if (!resultsData.includes(offer._id.toString())) {
											let returned = {
												offer_id: offer._id.toString(),
												username: company.username,
												email: company.email,
												phone_number: company.phone_number,
												title: offer.title,
												description: offer.description,
												country: 'Slovenia',
												expectations: offer.expectations,
												other: offer.other,
											};
											callback(err, returned);
											throw BreakException;
										}
									});
								}
							});
						} catch (e) {
							if (e !== BreakException) throw e;
							notSent = false;
						}
					}
					if (notSent) callback(err, {});
				});
			}
		});
}

function autoFindCv(email, callback) {
	User.find({ email: email })
		.select('results')
		.exec((err, resultsData) => {
			if (err) callback(err, null);
			else {
				resultsData = resultsData[0].results;
				resultsData = resultsData.map((a) => a.shown_id);
				User.find({}).exec((err, data) => {
					let notSent = true;
					if (data.length > 0) {
						let BreakException = {};
						try {
							data.forEach((user) => {
								if (user.resume != undefined) {
									let cv = user.resume;
									if (!resultsData.includes(cv._id.toString())) {
										let returned = {
											cv_id: cv._id.toString(),
											first_name: user.first_name,
											last_name: user.last_name,
											gender: user.gender,
											phone_number: user.phone_number,
											email: user.email,
											about: cv.about,
											description: cv.description,
											experience: cv.experience,
											projects: cv.projects,
											skills: cv.skills,
											education: cv.education,
										};
										callback(err, returned);
										throw BreakException;
									}
								}
							});
						} catch (e) {
							if (e !== BreakException) throw e;
							notSent = false;
						}
					}
					if (notSent) callback(err, {});
				});
			}
		});
}

function addResult(email, body, callback) {
	User.updateOne({ email: email }, { $push: { results: body } }, callback);
}

function addCv(email, cv, callback) {
	User.updateOne({ email: email }, { resume: cv }, callback);
}

module.exports = {
	getJobOffers,
	getJobOffer,
	addJobOffer,
	updateJobOffer,
	addUser,
	getUsers,
	getUser,
	updateUser,
	autoFindJobOffer,
	autoFindCv,
	addResult,
	addCv,
};
