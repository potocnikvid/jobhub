const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/* USER ROLE SCHEMA */
/**
 * @swagger
 * components:
 *  schemas:
 *   UserRole:
 *    type: object
 *    properties:
 *     key:
 *      type: string
 *     created_at:
 *      type: string
 *      format: date-time
 *     updated_at:
 *      type: string
 *      format: date-time
 *    required:
 *     - key
 */
const userRoleSchema = new mongoose.Schema({
	key: { type: String, required: true },
	created_at: { type: Date, auto: true },
	updated_at: { type: Date, auto: true },
});

/* INDUSTRY SCHEMA */
/**
 * @swagger
 * components:
 *  schemas:
 *   Industry:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *     created_at:
 *      type: string
 *      format: date-time
 *     updated_at:
 *      type: string
 *      format: date-time
 *    required:
 *     - name
 */
const industrySchema = new mongoose.Schema({
	name: { type: String, required: true },
	created_at: { type: Date, auto: true },
	updated_at: { type: Date, auto: true },
});

/* COUNTRY SCHEMA */
/**
 * @swagger
 * components:
 *  schemas:
 *   Country:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *     country:
 *       type: string
 *     created_at:
 *      type: string
 *      format: date-time
 *     updated_at:
 *      type: string
 *      format: date-time
 *    required:
 *     - name
 *     - country
 */
const countrySchema = new mongoose.Schema({
	name: { type: String, required: true },
	country: { type: String, required: true },
	created_at: { type: Date, auto: true },
	updated_at: { type: Date, auto: true },
});

/* GENDER SCHEMA */
/**
 * @swagger
 * components:
 *  schemas:
 *   Gender:
 *    type: object
 *    properties:
 *     key:
 *      type: string
 *     created_at:
 *      type: string
 *      format: date-time
 *     updated_at:
 *      type: string
 *      format: date-time
 *    required:
 *     - key
 */
const genderSchema = new mongoose.Schema({
	key: { type: String, required: true },
	created_at: { type: Date, auto: true },
	updated_at: { type: Date, auto: true },
});

/* JOB OFFER SCHEMA */
/**
 * @swagger
 * components:
 *  schemas:
 *   JobOffer:
 *    type: object
 *    properties:
 *     title:
 *      type: string
 *     description:
 *      type: string
 *     expectations:
 *      type: array
 *      items:
 *       type: string
 *     other:
 *      type: string
 *     active:
 *       type: boolean
 *     created_at:
 *      type: string
 *      format: date-time
 *     updated_at:
 *      type: string
 *      format: date-time
 *    required:
 *     - title
 *     - description
 *     - expectations
 */
const jobOfferSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	expectations: { type: [String], required: true },
	other: { type: String },
	active: { type: Boolean },
	created_at: { type: Date, auto: true },
	updated_at: { type: Date, auto: true },
});

/* RESUME SCHEMA */
/**
 * @swagger
 * components:
 *  schemas:
 *   Resume:
 *    type: object
 *    properties:
 *     about:
 *      type: string
 *     education:
 *      type: array
 *      items:
 *       type: string
 *     experience:
 *      type: array
 *      items:
 *       type: string
 *     projects:
 *      type: array
 *      items:
 *       type: string
 *     skills:
 *      type: array
 *      items:
 *       type: string
 *     description:
 *      type: string
 *     created_at:
 *      type: string
 *      format: date-time
 *     updated_at:
 *      type: string
 *      format: date-time
 *    required:
 *     - about
 */
const resumeSchema = new mongoose.Schema({
	about: { type: String, required: true },
	education: {
		type: [{ key: String, description: String, from: Date, to: Date }],
	},
	experience: {
		type: [
			{
				company: String,
				title: String,
				description: [String],
				from: Date,
				to: Date,
			},
		],
	},
	projects: {
		type: [{ name: String, description: String }],
	},
	skills: {
		type: [{ name: String }],
	},
	description: { type: String },
	created_at: { type: Date, auto: true },
	updated_at: { type: Date, auto: true },
});

/* RESULT SCHEMA */
/**
 * @swagger
 * components:
 *  schemas:
 *   Result:
 *    type: object
 *    properties:
 *     result:
 *      type: number
 *     shown_id:
 *       type: string
 *    required:
 *     - result
 *     - shown_id
 */
const resultsSchema = new mongoose.Schema({
	result: { type: Number, required: true },
	shown_id: { type: String, required: true },
});

/* USER SCHEMA */
/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *     user_role:
 *      type: UserRole
 *     first_name:
 *      type: string
 *     last_name:
 *      type: string
 *     username:
 *      type: string
 *     gender:
 *      type: Gender
 *     email:
 *      type: string
 *     phone_number:
 *      type: string
 *     country:
 *      type: string
 *     industry:
 *      type: array
 *      items:
 *       type: Industry
 *     date_of_birth:
 *      type: string
 *      format: date-time
 *     resume:
 *      type: Resume
 *     job_offers:
 *      type: array
 *      items:
 *       type: JobOffer
 *     results:
 *      type: array
 *      items:
 *       type: Result
 *     created_at:
 *      type: string
 *      format: date-time
 *     updated_at:
 *      type: string
 *      format: date-time
 *     hashed_value:
 *      type: string
 *     random_value:
 *      type: string
 *    required:
 *     - key
 *     - user_role
 *     - email
 *     - hashed_value
 *     - random_value
 */
const userSchema = new mongoose.Schema({
	user_role: { type: userRoleSchema, required: true },
	first_name: { type: String },
	last_name: { type: String },
	username: { type: String },
	gender: { type: genderSchema },
	email: { type: String, required: true },
	phone_number: { type: String },
	country: { type: countrySchema },
	industry: { type: [industrySchema] },
	date_of_birth: { type: Date },
	resume: { type: resumeSchema },
	job_offers: { type: [jobOfferSchema] },
	results: { type: [resultsSchema] },
	created_at: { type: Date, auto: true },
	updated_at: { type: Date, auto: true },
	hashed_value: { type: String, required: true },
	random_value: { type: String, required: true },
});

/* ERROR MESSAGE */
/**
 * @swagger
 * components:
 *  schemas:
 *   ErrorMessage:
 *    type: object
 *    properties:
 *     message:
 *      type: string
 */
const errorMessage = new mongoose.Schema({
	message: { type: String },
});

/* ACCESS TOKEN - JWT */
/**
 * @swagger
 * components:
 *  schemas:
 *   AccessToken:
 *    type: object
 *    properties:
 *     access_token:
 *      type: string
 *    required:
 *     - access_token
 */
const accessToken = new mongoose.Schema({
	access_token: { type: String, required: true },
});

/* USER PAYLOAD */
/**
 * @swagger
 * components:
 *  schemas:
 *   UserPayload:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *     email:
 *      type: string
 *     user_role:
 *      type: string
 *    required:
 *     - _id
 *     - email
 *     - user_role
 */
const userPayload = new mongoose.Schema({
	_id: { type: String, required: true },
	email: { type: String, required: true },
	user_role: { type: String, required: true },
});

/* SIGN IN */
/**
 * @swagger
 * components:
 *  schemas:
 *   SignIn:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *     password:
 *      type: string
 *    required:
 *     - email
 *     - password
 */
const signIn = new mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
});

/* SIGN UP USER */
/**
 * @swagger
 * components:
 *  schemas:
 *   UserSignUp:
 *    type: object
 *    properties:
 *     first_name:
 *      type: string
 *     last_name:
 *      type: string
 *     email:
 *      type: string
 *     industry:
 *      type: string
 *     password:
 *      type: string
 *     confirm_password:
 *      type: string
 *    required:
 *     - email
 *     - password
 *     - confirm_password
 */
const userSignUp = new mongoose.Schema({
	first_name: { type: String },
	last_name: { type: String },
	email: { type: String, required: true },
	industry: { type: String },
	password: { type: String, required: true },
	confirm_password: { type: String, required: true },
});

/* SIGN UP COMPANY */
/**
 * @swagger
 * components:
 *  schemas:
 *   CompanySignUp:
 *    type: object
 *    properties:
 *     username:
 *      type: string
 *     email:
 *      type: string
 *     industry:
 *      type: string
 *     password:
 *      type: string
 *     confirm_password:
 *      type: string
 *    required:
 *     - email
 *     - password
 *     - confirm_password
 */
const companySignUp = new mongoose.Schema({
	username: { type: String },
	email: { type: String, required: true },
	industry: { type: String },
	password: { type: String, required: true },
	confirm_password: { type: String, required: true },
});

/* USER PROFILE */
/**
 * @swagger
 * components:
 *  schemas:
 *   UserProfile:
 *    type: object
 *    properties:
 *     first_name:
 *      type: string
 *     last_name:
 *      type: string
 *     email:
 *      type: string
 *     gender:
 *      type: string
 *     date_of_birth:
 *      type: string
 *      format: date-time
 *     phone_number:
 *      type: string
 *     industry:
 *      type: string
 *     country:
 *      type: string
 *     password:
 *      type: string
 *     confirm_password:
 *      type: string
 *    required:
 *     - email
 *     - password
 *     - confirm_password
 */
const userProfile = new mongoose.Schema({
	first_name: { type: String },
	last_name: { type: String },
	email: { type: String, required: true },
	gender: { type: String },
	date_of_birth: { type: Date },
	phone_number: { type: String },
	industry: { type: String },
	country: { type: String },
	password: { type: String, required: true },
	confirm_password: { type: String, required: true },
});

/* COMPANY PROFILE */
/**
 * @swagger
 * components:
 *  schemas:
 *   CompanyProfile:
 *    type: object
 *    properties:
 *     username:
 *      type: string
 *     email:
 *      type: string
 *     phone_number:
 *      type: string
 *     industry:
 *      type: string
 *     country:
 *      type: string
 *     password:
 *      type: string
 *     confirm_password:
 *      type: string
 *    required:
 *     - email
 *     - password
 *     - confirm_password
 */
 const companyProfile = new mongoose.Schema({
	username: { type: String },
	email: { type: String, required: true },
	phone_number: { type: String },
	industry: { type: String },
	country: { type: String },
	password: { type: String, required: true },
	confirm_password: { type: String, required: true },
});

userSchema.methods.setPassword = (password) => {
	const random_value = crypto.randomBytes(16).toString('hex');
	const hashed_value = crypto
		.pbkdf2Sync(password, random_value, 1000, 64, 'sha512')
		.toString('hex');
	return { random_value, hashed_value };
};

userSchema.methods.updatePassword = (password, random_value) => {
	return crypto
		.pbkdf2Sync(password, random_value, 1000, 64, 'sha512')
		.toString('hex');
};

userSchema.methods.checkPassword = (hashed_value, random_value, password) => {
	return (
		hashed_value ==
		crypto
			.pbkdf2Sync(password, random_value, 1000, 64, 'sha512')
			.toString('hex')
	);
};

userSchema.methods.generateJWT = (id, email, user_role) => {
	const expire_date = new Date();
	expire_date.setDate(expire_date.getDate() + 7);

	return jwt.sign(
		{
			_id: id,
			email: email,
			user_role: user_role,
			exp: parseInt(expire_date.getTime() / 1000),
		},
		process.env.JWT_PRIVATE_KEY,
		{ algorithm: 'HS256' },
	);
};

var User = mongoose.model('User', userSchema, 'User');

module.exports = User;
