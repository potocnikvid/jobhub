const mongoose = require('mongoose');
const User = mongoose.model('User');

const dbGetUsers = (req, res) => {
	if (req.payload.user_role !== 'ADMIN') {
		res.status(401).json({ message: 'Unauthorized!' });
	}
	User.find({}, (error, response) => {
		if (error) {
			res.status(500).json(error);
		} else {
			res.status(201).json(response);
		}
	});
};

const dbDelJobOffer = (req, res) => {
	if (req.payload.user_role !== 'ADMIN') {
		res.status(401).json({ message: 'Unauthorized!' });
	}
	console.log(req.query.id);
	User.findOneAndUpdate(
		{ _id: req.query.id },
		{ $pull: { job_offers: { _id: req.query.idJ } } },
		(error) => {
			if (error) {
				res.status(500).json(error);
			} else {
				res.status(201).json();
			}
		},
	);
};

const dbDelUser = (req, res) => {
	if (req.payload.user_role !== 'ADMIN') {
		res.status(401).json({ message: 'Unauthorized!' });
	}
	User.findByIdAndDelete({ _id: req.query.id }, (error) => {
		if (error) {
			res.status(500).json(error);
		} else {
			res.status(201).json();
		}
	});
};

module.exports = { dbGetUsers, dbDelUser, dbDelJobOffer };
