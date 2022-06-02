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

const getJob = (req, res) => {
	let ids = req.url.split('/');
	let idUser = ids[2];
	let idOffer = ids[3];
	axios
		.get('/api/job-preview/', { params: { idUser: idUser, idOffer: idOffer } })
		.then((response) => {
			var formatedResponse = {
				title: 'Job offer preview',
				user: response.data,
				jobOffer: undefined,
				jobID: idOffer,
			};
			for (let i = 0; i < response.data.job_offers.length; i = i + 1) {
				if (response.data.job_offers[i]._id == idOffer) {
					formatedResponse = {
						title: 'Job offer preview',
						user: response.data,
						jobOffer: response.data.job_offers[i],
						jobID: idOffer,
					};
					break;
				}
			}
			res.render('job-preview', formatedResponse);
		})
		.catch(() => {
			res.redirect('/blank');
		});
};

const postJob = (req, res) => {
	let ids = req.url.split('/');
	let idUser = ids[2];
	let idOffer = ids[3];
	if (idUser == undefined) {
		console.log('Error');
		res.redirect('/job-preview/' + idUser);
	} else {
		axios({
			method: 'post',
			url: '/api/post-job',
			params: {
				idUser: idUser,
				idOffer: idOffer,
			},
			data: {
				title: req.body.title,
				description: req.body.description,
				expectations: req.body.expectations,
				other: req.body.other,
			},
		})
			.then(() => {
				res.redirect('/job-preview/' + idUser + '/' + idOffer);
			})
			.catch(() => {
				res.redirect('/job-preview/' + idUser + '/' + idOffer);
			});
	}
};

module.exports = { getJob, postJob };
