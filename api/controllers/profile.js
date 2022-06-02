const mongoose = require('mongoose');
const { validateEmail } = require('../helpers/validateEmail');
const { validateName } = require('../helpers/validateName');
const { validateGender } = require('../helpers/validateGender');
const { validateDate } = require('../helpers/validateDate');
const { validatePhoneNumber } = require('../helpers/validatePhoneNumber');
const User = mongoose.model('User');

/* Update user */
const updateUser = (req, res) => {
	if (req.payload.user_role !== 'USER') {
		res.status(401).json({ message: 'Unauthorized!' });
	}
	const {
		first_name,
		last_name,
		email,
		gender,
		date_of_birth,
		phone_number,
		_industry,
		country,
		new_password,
		new_password_confirm,
	} = req.body;

	if (new_password !== new_password_confirm) {
		res.status(400).json({ message: 'Passwords do not match' });
		return;
	}

	if (!validateName(first_name) || !validateName(last_name)) {
		res.status(400).json({ message: 'Invalid name' });
		return;
	}

	if (!validateEmail(email) || !email) {
		res.status(400).json({ message: 'Invalid email!' });
		return;
	}

	if (!validateGender(gender)) {
		res.status(400).json({ message: 'Invalid gender!' });
		return;
	}

	if (!validateDate(date_of_birth)) {
		res.status(400).json({ message: 'Invalid date of birth!' });
		return;
	}

	if (!validatePhoneNumber(phone_number)) {
		res.status(400).json({ message: 'Invalid phone number!' });
		return;
	}

	User.findOne({ email: email }, (error, user) => {
		if (error) {
			res.status(500).json(error);
		}

		if (!user) {
			res.status(409).json({ message: 'User does not exists!' });
		}

		let user_password = user.hashed_value;
		if (new_password) {
			user_password = user.updatePassword(new_password, user.random_value);
		}

		User.updateOne(
			{ email: email },
			{
				$set: {
					first_name: first_name || user.first_name,
					last_name: last_name || user.last_name,
					email: email || user.email,
					'gender.key': gender || user.gender.key,
					date_of_birth: date_of_birth || user.date_of_birth,
					phone_number: phone_number || user.phone_number,
					'country.name': country || user.country.name,
					hashed_value: user_password,
				},
				$currentDate: { lastModified: true },
			},
			(error, user) => {
				if (error) {
					res.status(400).json(error);
				} else {
					res.status(201).json(user);
				}
			},
		);
	});
};

/* Update company */
const updateCompany = (req, res) => {
	console.log(req.payload);
	if (req.payload.user_role !== 'COMPANY') {
		res.status(401).json({ message: 'Unauthorized!' });
	}
	const {
		username,
		email,
		phone_number,
		country,
		_industry,
		new_password,
		new_password_confirm,
	} = req.body;

	if (new_password !== new_password_confirm) {
		res.status(400).json({ message: 'Passwords do not match' });
		return;
	}

	if (!validateEmail(email) || !email) {
		res.status(400).json({ message: 'Invalid email!' });
		return;
	}

	if (!validatePhoneNumber(phone_number)) {
		res.status(400).json({ message: 'Invalid phone number!' });
		return;
	}

	User.findOne({ email: email }, (error, user) => {
		if (error) {
			res.status(500).json(error);
		}

		if (!user) {
			res.status(409).json({ message: 'Company does not exists!' });
		}

		let user_password = user.hashed_value;
		if (new_password) {
			user_password = user.updatePassword(new_password, user.random_value);
		}

		User.updateOne(
			{ email: email },
			{
				$set: {
					username: username || user.username,
					email: email || user.email,
					phone_number: phone_number || user.phone_number,
					'country.name': country || user.country.name,
					hashed_value: user_password,
				},
				$currentDate: { lastModified: true },
			},
			(error, user) => {
				if (error) {
					res.status(400).json(error);
				} else {
					res.status(201).json(user);
				}
			},
		);
	});
};

module.exports = { updateUser, updateCompany };
