const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		(email, password, callback) => {
			User.findOne({ email: email }, (error, user) => {
				if (error) return callback(error);
				if (!user)
					return callback(null, false, {
						message: 'Invalid email!',
					});
				if (!user.checkPassword(password))
					return callback(null, false, { message: 'Invalid password!' });
				return callback(null, user);
			});
		},
	),
);
