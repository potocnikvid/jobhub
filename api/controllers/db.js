const mongoose = require('mongoose');
const User = mongoose.model('User');
const fs = require('fs');
const path = require('path');

const data = JSON.parse(
	fs.readFileSync(path.resolve(__dirname, '../models/test-data.json')),
);

/* Insert data in database */
const dbInsert = (req, res) => {
	if (req.payload.user_role !== 'ADMIN') {
		res.status(401).json({ message: 'Unauthorized!' });
	}

	User.collection.find().forEach(function (document) {
		if (document) {
			return;
		}
	});
	User.collection.insertMany(data, (error) => {
		if (error) {
			res.status(409).json(error);
		}
	});
	User.collection.find().forEach(function (document) {
		document.user_role._id = new mongoose.Types.ObjectId();
		if (document.gender) {
			document.gender._id = new mongoose.Types.ObjectId();
		}
		if (document.country) {
			document.country._id = new mongoose.Types.ObjectId();
		}
		if (document.industry) {
			document.industry.forEach(
				(industry) => (industry._id = new mongoose.Types.ObjectId()),
			);
		}
		if (document.resume) {
			document.resume._id = new mongoose.Types.ObjectId();
		}
		if (document.job_offers) {
			document.job_offers.forEach(
				(job_offer) => (job_offer._id = new mongoose.Types.ObjectId()),
			);
		}
		User.collection.replaceOne({ _id: document._id }, document, (error) => {
			if (error) {
				res.status(500).json(error);
			} else {
				res.status(201).json();
			}
		});
	});
};

/* Delete data from database */
const dbDelete = (req, res) => {
	if (req.payload.user_role !== 'ADMIN') {
		res.status(401).json({ message: 'Unauthorized!' });
	}

	User.deleteMany({}, (error) => {
		if (error) {
			res.status(500).json(error);
		} else {
			res.status(201).json();
		}
	});
};

module.exports = { dbInsert, dbDelete };
