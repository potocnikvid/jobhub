const mongoose = require('mongoose');
const { validateEmail } = require('../helpers/validateEmail');
const { validateName } = require('../helpers/validateName');
const jwtHelpers = require('../helpers/jwt-helpers');
const User = mongoose.model('User');

/* Sign in */
const signIn = (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: 'Invalid credentials!' });
	}

	if (!validateEmail(email)) {
		res.status(400).json({ message: 'Invalid email!' });
		return;
	}

	User.findOne({ email: email }).exec((error, user) => {
		if (error) {
			res.status(500).json(error);
		}

		if (!user) {
			res.status(401).json({ message: 'User does not exist!' });
		}

		// Compare hashed passwords
		if (user.checkPassword(user.hashed_value, user.random_value, password)) {
			res.status(200).json({
				access_token: user.generateJWT(
					user._id,
					user.email,
					user.user_role.key,
				),
			});
		} else {
			res.status(401).json({ message: 'Unauthorized!' });
		}
	});
};

/* Sign up user */
const signUpUser = (req, res) => {
	const { first_name, last_name, email, industry, password } = req.body;

	if (!validateName(first_name) || !validateName(last_name)) {
		res.status(400).json({ message: 'Invalid name' });
		return;
	}

	if (!validateEmail(email)) {
		res.status(400).json({ message: 'Invalid email!' });
		return;
	}

	// Check if user exists
	User.findOne({ email: email }).exec((error, user) => {
		if (error) {
			res.status(500).json(error);
			return;
		}

		if (user) {
			res.status(409).json({ message: 'User already exists!' });
			return;
		}
	});

	const user = new User();
	user.first_name = first_name;
	user.last_name = last_name;
	user.email = email;
	user.user_role = {
		key: 'USER',
		created_at: new Date(),
		updated_at: new Date(),
	};
	user.industry = [
		{
			name: industry,
			created_at: new Date(),
			updated_at: new Date(),
		},
	];
	user.created_at = new Date();
	user.updated_at = new Date();
	const { random_value, hashed_value } = user.setPassword(password);
	user.random_value = random_value;
	user.hashed_value = hashed_value;

	User.create(user, (error, user) => {
		if (error) {
			res.status(400).json(error);
		} else {
			res.status(201).json({
				access_token: user.generateJWT(
					user._id,
					user.email,
					user.user_role.key,
				),
			});
		}
	});
};

/* Sign up company */
const signUpCompany = (req, res) => {
	const { username, email, industry, password, password_confirm } = req.body;

	if (password !== password_confirm) {
		res.status(400).json({ message: 'Passwords do not match!' });
		return;
	}

	if (!validateEmail(email)) {
		res.status(400).json({ message: 'Invalid email!' });
		return;
	}

	// Check if company exists
	User.findOne({ email: email }).exec((error, user) => {
		if (error) {
			res.status(500).json(error);
			return;
		}

		if (user) {
			res.status(409).json({ message: 'Company already exists' });
			return;
		}
	});

	const user = new User();
	user.username = username;
	user.email = email;
	user.user_role = {
		key: 'COMPANY',
		created_at: new Date(),
		updated_at: new Date(),
	};
	user.industry = [
		{
			name: industry,
			created_at: new Date(),
			updated_at: new Date(),
		},
	];
	user.created_at = new Date();
	user.updated_at = new Date();
	const { random_value, hashed_value } = user.setPassword(password);
	user.random_value = random_value;
	user.hashed_value = hashed_value;


	User.create(user, (error, user) => {
		if (error) {
			res.status(400).json(error);
		} else {
			res.status(201).json({
				access_token: user.generateJWT(
					user._id,
					user.email,
					user.user_role.key,
				),
			});
		}
	});
};

const jwtDecode = (req, res) => {
	let jwt = req.headers.authorization;
	if (jwt === undefined) {
		res.status(400).json(error);
	} else {
		res.status(200).json(jwtHelpers.parseJwt(jwt));
	}
};

module.exports = { signIn, signUpUser, signUpCompany, jwtDecode };