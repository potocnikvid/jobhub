const mongoose = require('mongoose');
const User = mongoose.model('User');

const getUser = (req, res) => {
	User.findById({ _id: req.query.idUser }, (error, response) => {
		if (error) {
			res.status(500).json(error);
		} else {
			res.status(200).json(response);
		}
	});
};

const postResume = (req, res) => {
	if (req.payload.user_role !== 'USER' && req.payload.user_role !== 'ADMIN') {
		res.status(401).json({ message: 'Unauthorized!' });
	}

	const { about, education, experience, projects, skills, other } = req.body;

	let idUser = req.query.idUser;
	if (idUser == undefined) {
		return res.status(400).json('No user');
	}

	User.findById({ _id: idUser })
		.select('resume')
		.exec((error, user) => {
			if (!user) {
				return res.status(404).json({ message: 'No user with this id found' });
			} else if (error) {
				console.log('fail');
				return res.status(500).json(error);
			}
			var educationS = education.split(';');
			var experienceS = experience.split(';');
			var projectsS = projects.split(';');
			var skillsS = skills.split(';');
			var otherS = other.split(';');

			user.resume = {};
			user.resume.other = [];
			user.resume.about = about;

			for (var i = 0; i < educationS.length; i = i + 1) {
				user.resume.education.push({ key: '', description: educationS[i] });
			}

			for (i = 0; i < experienceS.length; i = i + 1) {
				user.resume.experience.push({
					company: '',
					title: experienceS[i],
					description: '',
				});
			}

			for (i = 0; i < projectsS.length; i = i + 1) {
				user.resume.projects.push({ name: projectsS[i], description: '' });
			}

			for (i = 0; i < skillsS.length; i = i + 1) {
				user.resume.skills.push({ name: skillsS[i] });
			}

			for (i = 0; i < otherS.length; i = i + 1) {
				user.resume.other.push({ description: otherS[i] });
			}

			User.updateOne(
				{ _id: idUser },
				{
					$set: {
						resume: user.resume,
					},
					$currentDate: { lastModified: true },
				},
				(error, user) => {
					if (error) {
						console.log(error);
						res.status(404).json(error);
					} else {
						res.status(200).json(user);
					}
				},
			);
		});
};

const updateResume = (req, res) => {
	if (req.payload.user_role !== 'USER' && req.payload.user_role !== 'ADMIN') {
		res.status(401).json({ message: 'Unauthorized!' });
	}

	const { about, education, experience, projects, skills, other } = req.body;

	let idUser = req.params.idUser;
	if (idUser == undefined) {
		return res.status(400).json('No user');
	}

	User.findById({ _id: idUser })
		.select('resume')
		.exec((error, user) => {
			if (!user) {
				return res.status(404).json({ message: 'No user with this id found' });
			} else if (error) {
				console.log('fail');
				return res.status(500).json(error);
			}

			user.resume = {};
			user.resume.other = [];
			user.resume.about = about;
			user.resume.education.push({ key: '', description: education });
			user.resume.experience.push({
					company: '',
					title: '',
					description: experience,
			});
			user.resume.projects.push({ name: '', description: projects });
			user.resume.skills.push({ name: skills });
			user.resume.other.push({ description: other });

			console.log(user.resume)
			User.updateOne(
				{ _id: idUser },
				{
					$set: {
						resume: user.resume,
					},
					$currentDate: { lastModified: true },
				},
				(error, user) => {
					if (error) {
						console.log(error);
						res.status(404).json(error);
					} else {
						res.status(200).json(user);
					}
				},
			);
		});
};

module.exports = { getUser, postResume, updateResume };
