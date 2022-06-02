require('dotenv').config();

var api = {
	server: process.env.API_URL,
};

if (process.env.NODE_ENV === 'production') {
	api.server = process.env.HEROKU_URL;
}

const axios = require('axios').create({
	baseURL: api.server,
	timeout: 5000,
});

/* GET home page */
const index = (req, res) => {
	res.render('index');
};

/* GET sign up page */
const signUp = (req, res) => {
	res.render('sign-up/sign-up');
};

const getUserProfile = (req, res) => {
	res.render('user-profile', {
		title: 'User profile preview',
	});
};

const getCompanyProfile = (req, res) => {
	res.render('company-profile', {
		title: 'Company profile preview',
	});
};

const postCompanyProfile = (req, _res) => {
	axios({
		method: 'post',
		url: '/api/',
		data: {
			naziv: req.body.naziv,
			ocena: req.body.ocena,
			komentar: req.body.komentar,
		},
	});
};

const postUserProfile = (req, _res) => {
	axios({
		method: 'post',
		url: '/api/',
		data: {
			naziv: req.body.naziv,
			ocena: req.body.ocena,
			komentar: req.body.komentar,
		},
	});
};

/* POST sign up page */
const signUpUser = (req, res) => {
	const user_role = req.body.user_role;

	if (user_role == 'USER') {
		const {
			first_name,
			last_name,
			email,
			industry,
			password,
			password_confirm,
		} = req.body;

		if (password !== password_confirm) {
			res.redirect('sign-up');
		}

		axios
			.post('/api/sign-up-user', {
				first_name: first_name,
				last_name: last_name,
				email: email,
				industry: industry,
				password: password,
			})
			.then(
				(_response) => {
					res.redirect('user-profile'); // TODO: Redirect to user profile
				},
				(_error) => {
					res.redirect('sign-up');
				},
			)
			.catch((_error) => {
				// Invalid credentials
				res.redirect('sign-up');
			});
	} else if (user_role == 'COMPANY') {
		const { username, email, industry, password, password_confirm } = req.body;

		if (password !== password_confirm) {
			res.redirect('sign-up');
		}

		axios
			.post('/api/sign-up-company', {
				username: username,
				email: email,
				industry: industry,
				password: password,
			})
			.then(
				(_response) => {
					res.redirect('company-profile');
				},
				(_error) => {
					res.redirect('sign-up');
				},
			)
			.catch((_error) => {
				// Invalid credentials
				res.redirect('sign-up');
			});
	}
};

/* GET sign in page */
const signIn = (req, res) => {
	res.render('sign-in/sign-in');
};

/* POST sign in user */
const signInUser = (req, res) => {
	const { email, password } = req.body;
	axios
		.post('/api/sign-in', {
			email: email,
			password: password,
		})
		.then(
			(response) => {
				const user_role = response.data.user_role.key;
				switch (user_role) {
					case 'USER':
						res.redirect('user-main');
						break;
					case 'COMPANY':
						res.redirect('company-main');
						break;
					default:
						res.redirect('/');
						break;
				}
			},
			(_error) => {
				res.redirect('sign-in');
			},
		)
		.catch((_error) => {
			// Invalid email or password
			res.redirect('sign-in');
		});
};

/* GET admin sign in page */
const adminSignIn = (req, res) => {
	res.render('admin-sign-in/admin-sign-in');
};

/* POST admin sign in */
const adminSignInUser = (req, res) => {
	const { email, password } = req.body;
	axios
		.post('/api/sign-in', {
			email: email,
			password: password,
		})
		.then(
			(response) => {
				const user_role = response.data.user_role.key;
				if (user_role === 'ADMIN') {
					res.redirect('admin-dashboard');
				} else {
					res.redirect('admin-sign-in');
				}
			},
			(_error) => {
				res.redirect('admin-sign-in');
			},
		)
		.catch((_error) => {
			// Invalid email or password
			res.redirect('admin-sign-in');
		});
};

/* DELETE job offer from admin dashboard page */
const adminDashboardJobOfferDelete = (req, res) => {
	let ids = req.url.split('/');
	let id = ids[3];
	let idJ = ids.length > 4 ? ids[4] : '';
	axios
		.get('/api/admin-dashboard/deleteJobOffer', {
			params: { id: id, idJ: idJ },
		})
		.then((_response) => {
			res.redirect('/admin-dashboard');
		})
		.catch(() => {
			res.redirect('/admin-dashboard');
		});
};

/* DELETE user from admin dashboard page */
const adminDashboardDelete = (req, res) => {
	let ids = req.url.split('/');
	let id = ids[3];
	axios
		.get('/api/admin-dashboard/delete', {
			params: { id: id },
		})
		.then((_response) => {
			res.redirect('/admin-dashboard');
		})
		.catch(() => {
			res.render('admin-sign-in/admin-sign-in');
		});
};

/* GET admin dashboard page */
const adminDashboard = (req, res) => {
	axios
		.get('/api/admin-dashboard', {})
		.then((response) => {
			var formatedResponse = { users: response.data };
			res.render('admin-dashboard/admin-dashboard', formatedResponse);
		})
		.catch(() => {
			res.render('admin-sign-in/admin-sign-in');
		});
};

/* GET user main page */
const userMain = (req, res) => {
	res.render('main/user-main');
};

/* GET company main page */
const companyMain = (req, res) => {
	res.render('main/company-main');
};

/* GET user profile */
const userProfile = (req, res) => {
	res.render('user-profile/user-profile');
};

/* GET company profile */
const companyProfile = (req, res) => {
	res.render('company-profile/company-profile');
};

/* GET database page */
const db = (req, res) => {
	res.render('db');
};

/* POST insert data in database */
const dbInsert = (req, res) => {
	axios
		.post('/api/db-insert')
		.then((_response) => {
			res.redirect('db');
		})
		.catch((_error) => {
			// Invalid email or password
			res.redirect('db');
		});
};

/* DELETE erase data in database */
const dbDelete = (req, res) => {
	axios
		.delete('/api/db-delete')
		.then((_response) => {
			res.redirect('db');
		})
		.catch((_error) => {
			// Invalid email or password
			res.redirect('db');
		});
};

/* DELETE + POST data in database */
const dbReset = (req, res) => {
	// Delete data firs
	axios
		.delete('/api/db-delete')
		.then((_response) => {
			axios
				.post('/api/db-insert')
				.then((_response) => {
					res.redirect('db');
				})
				.catch((_error) => {
					// Invalid email or password
					res.redirect('db');
				});
		})
		.catch((_error) => {
			// Invalid email or password
			res.redirect('db');
		});
};

var daviddb = require('../../api/models/jobhub-db');

function main(req, res) {
	let loggedUserEmail = req.cookies.logged;
	console.log(loggedUserEmail);
	if (loggedUserEmail == undefined) {
		index(req, res);
	} else {
		daviddb.getUser(loggedUserEmail, (err, data) => {
			if (data.user_role == undefined) {
				index(req, res);
			} else if (data.user_role.key == 'USER') {
				res.render('user-main', { title: 'JobHub' });
			} else if (data.user_role.key == 'COMPANY') {
				res.render('company-main', { title: 'JobHub' });
			} else {
				index(req, res);
			}
		});
	}
}

module.exports = {
	index,
	signUp,
	signUpUser,
	signIn,
	signInUser,
	adminSignIn,
	adminSignInUser,
	adminDashboard,
	adminDashboardDelete,
	adminDashboardJobOfferDelete,
	userMain,
	companyMain,
	userProfile,
	companyProfile,
	db,
	dbInsert,
	dbDelete,
	dbReset,
	main,
	getCompanyProfile,
	getUserProfile,
	postCompanyProfile,
	postUserProfile,
};
