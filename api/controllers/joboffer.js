const mongoose = require('mongoose');
const User = mongoose.model('User');

/*
router.get('/', (req, res) => {
	// get all job offers
	db.getJobOffers((err, data) => {
		if (err) res.send(err);
		else res.send(data);
	});
});

router.get('/int:id', (req, res) => {
	res.send('job offer with id ' + req.params.id);
});

router.post('/', (req, res) => {
	let loggedUserEmail = req.cookies.logged;
	if (loggedUserEmail == undefined) {
		res.send('no user logged in');
	} else {
		db.addJobOffer(loggedUserEmail, req.body, (err) => {
			if (err) res.send(err);
			else res.send('ok');
		});
	}
});

router.put('/:id', (req, res) => {
	db.updateJobOffer(req.params.id, req.body, (err) => {
		if (err) res.send(err);
		else res.send('ok');
	});
});

router.delete('/:id', (req, res) => {
	// delete this job offer in db
	res.send('ok');
});

router.get('/autofind', (req, res) => {
	let loggedUserEmail = req.cookies.logged;
	if (loggedUserEmail == undefined) {
		res.send('no user logged in');
	} else {
		db.autoFindJobOffer(loggedUserEmail, (err, data) => {
			if (err) res.send(err);
			else res.send(data);
		});
	}
});

*/

const getJob = (req, res) => {
	User.findById({ _id: req.query.idUser }, (error, response) => {
		if (error) {
			res.status(500).json(error);
		} else {
			res.status(200).json(response);
		}
	});
};

const postJob = (req, res) => {
	const { title, description, expectations, other } = req.body;

	let idUser = req.query.idUser;
	let idOffer = req.query.idOffer;

	if (idUser == undefined) {
		return res.status(400).json('No user');
	}

	User.findById({ _id: idUser })
		.select('job_offers')
		.exec((error, user) => {
			if (!user) {
				return res.status(404).json({ message: 'No user with this id found' });
			} else if (error) {
				return res.status(500).json(error);
			}

			for (var i = 0; i < user.job_offers.length; i = i + 1) {
				if (user.job_offers[i]._id == idOffer) {
					user.job_offers[i].title = title;
					user.job_offers[i].description = description;
					user.job_offers[i].expectations = expectations.split(';');
					user.job_offers[i].other = other;
				}
			}

			User.updateOne(
				{ _id: idUser },
				{
					$set: {
						job_offers: user.job_offers,
					},
					$currentDate: { lastModified: true },
				},
				(error, user) => {
					if (error) {
						res.status(404).json(error);
					} else {
						res.status(200).json(user);
					}
				},
			);
		});
};

const updateJob = (req, res) => {
	const { title, description, expectations, other } = req.body;
	let idUser = req.params.idUser;
	if (idUser == undefined) {
		return res.status(400).json('No user');
	}

	User.findById({ _id: idUser })
		.select('job_offers')
		.exec((error, user) => {
			if (!user) {
				return res.status(404).json({ message: 'No user with this id found' });
			} else if (error) {
				return res.status(500).json(error);
			}


			user.job_offers[0].title = title;
			user.job_offers[0].description = description;
			user.job_offers[0].expectations = expectations.split(';');
			user.job_offers[0].other = other;

			console.log(user.job_offers[0])
			User.updateOne(
				{ _id: idUser },
				{
					$set: {
						job_offers: user.job_offers,
					},
					$currentDate: { lastModified: true },
				},
				(error, user) => {
					if (error) {
						res.status(404).json(error);
					} else {
						res.status(200).json(user);
					}
				},
			);
		});
};
module.exports = { getJob, postJob, updateJob };
