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

const getResume = (req, res) => {
	let ids = req.url.split('/');
	let idUser = ids[2];
	axios
		.get('/api/resume-preview/', { params: { idUser: idUser } })
		.then((response) => {
			var formatedResponse = { title: 'Resume preview', user: response.data };
			res.render('resume-preview', formatedResponse);
		})
		.catch(() => {
			res.redirect('/blank');
		});
};

/*
const _getUserInfo = (req, res, callback) => {
	// let loggedUserEmail = req.cookies.logged;
	// console.log(loggedUserEmail);
	// let fakeEmail = loggedUserEmail.replace('@', '%40');
	// console.log(fakeEmail);
	// if (loggedUserEmail == undefined) {
	// 	res.redirect('index', {
	// 		title: 'Ma',
	// 	});
	// } else {
	// 	axios({
	// 		method: 'get',
	// 		url: '/api/users/' + fakeEmail, //namesto 0 id oz cookie userja
	// 	}).then((response) => {
	// 		if (response.data.user_role.key == 'USER') {
	// 			callback(req, res, response.data);
	// 		} else {
	// 			res.render('index');
	// 		}
	// 	});
	// }
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
		phone_number: '+386 12 345 678',
		country: {
			name: 'SLOVENIA',
			country: 'SI',
			created_at: '2021-11-27T22:25:55.123Z',
			updated_at: '2021-11-27T22:25:55.123Z',
		},
		industry: [
			{
				name: 'SOFTWARE DEVELOPMENT',
				created_at: '2021-11-27T22:25:55.123Z',
				updated_at: '2021-11-27T22:25:55.123Z',
			},
		],
		date_of_birth: '1972-12-24T00:00:00.000Z',
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

const _showUserInfo = (req, res, data) => {
	res.render('resume-preview', {
		title: 'Resume preview',
		user: {
			firstName: data.first_name,
			lastName: data.last_name,
			gender: data.gender.key,
			email: data.email,
			phone: data.phone_number,
			country: data.country.name,
		},
		resume: {
			about: data.resume.about,
			education: data.resume.education,
			experience: data.resume.experience,
			projects: data.resume.projects,
			skills: data.resume.skills,
			other: data.resume.other,
		},
	});
};
*/

const postResume = (req, res) => {
	let ids = req.url.split('/');
	let idUser = ids[2];

	if (idUser == undefined) {
		console.log('Error');
		res.redirect('/resume-preview/' + idUser);
	} else {
		axios({
			method: 'post',
			url: '/api/post-resume/',
			params: {
				idUser: idUser,
			},
			data: {
				about: req.body.about,
				education: req.body.education,
				experience: req.body.experience,
				projects: req.body.projects,
				skills: req.body.skills,
				other: req.body.other,
			},
		})
			.then(() => {
				res.redirect('/resume-preview/' + idUser);
			})
			.catch(() => {
				res.redirect('/resume-preview/' + idUser);
			});
	}
};

module.exports = {
	getResume,
	postResume,
};
