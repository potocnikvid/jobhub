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

const getUserProfile = (req, res) => {
	getUserInfo(req, res, (req, res, data) => {
		showUserInfo(req, res, data);
	});
};

const getUserInfo = (req, res, callback) => {
	// axios
	//   .get("/api/user/" + req.params.idUser) //namesto 0 id oz cookie userja
	//   .then((data) => {
	//     callback(req, res, data);
	//   });
	let data = {
		user_role: {
			key: 'USER',
			created_at: '2021-11-27T22:25:55.123Z',
			updated_at: '2021-11-27T22:25:55.123Z',
		},
		first_name: 'Arthur',
		last_name: 'Dent',
		gender: {
			key: 'MALE',
			created_at: '2021-11-27T22:25:55.123Z',
			updated_at: '2021-11-27T22:25:55.123Z',
		},
		email: 'arthur.dent@galaxy.com',
		phone_number: '00386-123-456-789',
		country: {
			name: 'SLOVENIA',
			country: 'SI',
			created_at: '2021-11-27T22:25:55.123Z',
			updated_at: '2021-11-27T22:25:55.123Z',
		},
		industry: {
			name: 'SOFTWARE DEVELOPMENT',
			created_at: '2021-11-27T22:25:55.123Z',
			updated_at: '2021-11-27T22:25:55.123Z',
		},
		date_of_birth: '1972-12-24',
		resume: {
			about:
				'I am Arthur Dent, 20 years old computer and information science student, interested in computer communications, operating systems (Linux particular), computer vision, machine learning, decision problems, etc. In my free time, I like to play basketball, go hiking, play computer games and read science fiction books (The Hitchhiker’s Guide to the Galaxy fan club :D).',
			education:
				'Šolski center Slovenske Konjice – Zreče, Gimnazija Slovenske Konjice',
			experience:
				'Software Development Engineer Intern: Getting to know and learn programming in Python, help on various projects.',
			projects:
				'A simple Linux shell. It will soon be the default Linux shell XD.',
			skills:
				'Technology: Git, ORM/ODM, AWS, GCP, Azure, Docker, Nginx, Apache, Latex, Jira, Notion, Trello',
			other:
				'Hackathon: Participation in the largest online hackathon (EU vs Virus) in the world with the topic of Coronavirus.',
		},
		password: 'ArthurDent123',
		created_at: '2021-11-27T22:25:55.123Z',
		updated_at: '2021-11-27T22:25:55.123Z',
	};
	callback(req, res, data);
};

const showUserInfo = (req, res, data) => {
	res.render('user-profile', {
		title: 'User profile',
		user: {
			idUser: data._id,
			firstName: data.first_name,
			lastName: data.last_name,
			gender: data.gender.key,
			date_of_birth: data.date_of_birth,
			industry: data.industry.name,
			email: data.email,
			phone: data.phone_number,
			country: data.country.name,
		},
	});
};

const postUserProfile = (req, res) => {
	axios({
		method: 'post',
		url: '/api/user/postUserProfile/' + req.params.idUser, //namesto 0 id oz cookie userja
		user: {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			gender: req.body.gender,
			date_of_birth: req.body.date_of_birth,
			industry: req.body.industry,
			email: req.body.email,
			phone: req.body.phone,
			country: req.body.country,
		},
	}).then(() => {
		res.redirect('/user-profile', {
			title: 'User profile',
		});
	});
};

module.exports = { getUserProfile, postUserProfile };
