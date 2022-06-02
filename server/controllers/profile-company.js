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

const getCompanyProfile = (req, res) => {
	getCompanyInfo(req, res, (req, res, data) => {
		showCompanyInfo(req, res, data);
	});
};

const getCompanyInfo = (req, res, callback) => {
	// axios
	//   .get("/api/user/" + req.params.idUser) //namesto 0 id oz cookie userja
	//   .then((data) => {
	//     callback(req, res, data);
	//   });
	let data = {
		user_role: {
			key: 'COMPANY',
			created_at: '2021-11-27T22:25:55.123Z',
			updated_at: '2021-11-27T22:25:55.123Z',
		},
		username: 'Google',
		email: 'info@google.com',
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
		job_offers: {
			title: 'Senior Full Stack developer',
			description:
				'Google helps companies around the world with development of the software and hardware for advanced, innovative and cost-effective products. Our customers come from a wide variety of industries from the automotive industry to the medical device industry. Due to the increased volume of work, we are looking for new experts to help us achieve our goals. The Full Stack team takes care of the planning, development and maintenance of web services or solutions. Team members work with members of other development teams or develop the entire solution themselves. Because our company offers services to different clients, the work of developers is very diverse and with that team members gain knowledge from different industries. In development, we follow the guidelines of agile methods of software development. Our solutions use technologies such as Node.js (specifically NestJS), Angular, React, React Native, Postgres, Redis, Minio, Docker and Firebase. We use Jira for scheduling tasks and recording time, and Confluence for documentation.',
			expectations:
				'knowledge of principles such as REST, MVC, OOP and CI / CD, minimum 3 years of experience in the development of back-end systems and web applications, knowledge of databases, knowledge of Docker architecture',
			other:
				'We offer work in a team of young developers who are eager to progress and strive to develop quality software solutions for customers around the world, work on interesting projects, a relaxed work environment with the possibility of personal and career growth in the company, competitive pay, office work in the center of Slovenske Konjice or from home, flexible working hours and many other benefits, such as participation in conferences abroad, teambuildings or weekend team vacations in remote Slovenian destinations.',
			active: true,
		},
		password: 'GoogleJobHub',
		created_at: '2021-11-27T22:25:55.123Z',
		updated_at: '2021-11-27T22:25:55.123Z',
	};
	callback(req, res, data);
};

const showCompanyInfo = (req, res, data) => {
	res.render('company-profile', {
		title: 'Company profile',
		user: {
			username: data.username,
			email: data.email,
			phone: data.phone_number,
			country: data.country.name,
			industry: data.industry.name,
		},
	});
};

const postCompanyProfile = (req, res) => {
	axios({
		method: 'post',
		url: '/api/company/postCompanyProfile/' + req.params.idUser, //namesto 0 id oz cookie userja
		company: {
			username: req.body.username,
			email: req.body.email,
			phone: req.body.phone_number,
			country: req.body.country.name,
			industry: req.body.industry.name,
		},
	}).then(() => {
		res.redirect('/company-profile', {
			title: 'Company profile',
		});
	});
};

module.exports = { getCompanyProfile, postCompanyProfile };
