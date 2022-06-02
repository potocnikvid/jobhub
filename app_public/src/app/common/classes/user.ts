export class userRole {
	'key': string;
	'created_at': Date;
	'updated_at': Date;
}

export class industry {
	'name': string;
	'created_at': Date;
	'updated_at': Date;
}

export class country {
	'name': string;
	'country': string;
	'created_at': Date;
	'updated_at': Date;
}

export class gender {
	'key': string;
	'created_at': Date;
	'updated_at': Date;
}

export class jobOffer {
	'title': string;
	'description': string;
	'expectations': string[];
	'other': string;
	'active': boolean;
	'created_at': Date;
	'updated_at': Date;
}

export class resume {
	'about': string;
	'education': { key: string; description: string; from: Date; to: Date }[];
	'experience': {
		company: string;
		title: string;
		description: string[];
		from: Date;
		to: Date;
	}[];
	'projects': { name: string; description: string }[];
	'skills': { name: string }[];
	'description': string;
	'created_at': Date;
	'updated_at': Date;
}

export class results {
	'result': number;
	'shown_id': string;
}

export class user {
	'user_role': userRole;
	'first_name': string;
	'last_name': string;
	'username': string;
	'gender': gender;
	'email': string;
	'phone_number': string;
	'country': country;
	'industry': industry[];
	'date_of_birth': Date;
	'resume': resume;
	'job_offers': jobOffer;
	'results': results;
	'password': string;
	'created_at': Date;
	'updated_at': Date;
}

// /* USER ROLE SCHEMA */
// const userRoleSchema = new mongoose.Schema({
// 	key: { type: String, required: true },
// 	created_at: { type: Date, auto: true },
// 	updated_at: { type: Date, auto: true },
// });
// /* INDUSTRY SCHEMA */
// const industrySchema = new mongoose.Schema({
// 	name: { type: String, required: true },
// 	created_at: { type: Date, auto: true },
// 	updated_at: { type: Date, auto: true },
// });
// /* COUNTRY SCHEMA */
// const countrySchema = new mongoose.Schema({
// 	name: { type: String, required: true },
// 	country: { type: String, required: true },
// 	created_at: { type: Date, auto: true },
// 	updated_at: { type: Date, auto: true },
// });
// /* GENDER SCHEMA */
// const genderSchema = new mongoose.Schema({
// 	key: { type: String, required: true },
// 	created_at: { type: Date, auto: true },
// 	updated_at: { type: Date, auto: true },
// });
// /* JOB OFFER SCHEMA */
// const jobOfferSchema = new mongoose.Schema({
// 	title: { type: String, required: true },
// 	description: { type: String, required: true },
// 	expectations: { type: [String], required: true },
// 	other: { type: String },
// 	active: { type: Boolean },
// 	created_at: { type: Date, auto: true },
// 	updated_at: { type: Date, auto: true },
// });
// /* RESUME SCHEMA */
//const resumeSchema = new mongoose.Schema({
// 	about: { type: String, required: true },
// 	education: {
// 		type: [{ key: String, description: String, from: Date, to: Date }],
// 	},
// 	experience: {
// 		type: [
// 			{
// 				company: String,
// 				title: String,
// 				description: [String],
// 				from: Date,
// 				to: Date,
// 			},
// 		],
// 	},
// 	projects: {
// 		type: [{ name: String, description: String }],
// 	},
// 	skills: {
// 		type: [{ name: String }],
// 	},
// 	description: { type: String },
// 	created_at: { type: Date, auto: true },
// 	updated_at: { type: Date, auto: true },
// });
// const resultsSchema = new mongoose.Schema({
// 	result: { type: Number, required: true },
// 	shown_id: { type: String, required: true },
// });
// /* USER SCHEMA */
// const userSchema = new mongoose.Schema({
// 	user_role: { type: userRoleSchema },
// 	first_name: { type: String },
// 	last_name: { type: String },
// 	username: { type: String },
// 	gender: { type: genderSchema },
// 	email: { type: String, required: true },
// 	phone_number: { type: String },
// 	country: { type: countrySchema },
// 	industry: { type: [industrySchema] },
// 	date_of_birth: { type: Date },
// 	resume: { type: resumeSchema },
// 	job_offers: { type: [jobOfferSchema] },
// 	results: { type: [resultsSchema] },
// 	password: { type: String, required: true },
// 	created_at: { type: Date, auto: true },
// 	updated_at: { type: Date, auto: true },
// });
