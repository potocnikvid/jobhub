var _createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

require('./api/models/jobhub-db');
require('./api/config/passport');

var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'JobHub',
			version: '1.0.0',
			description: 'JobHub REST API',
		},
		license: {
			name: 'GNU LGPLv3',
			url: 'https://choosealicense.com/licenses/lgpl-3.0',
		},
		contact: {
			name: 'Rok Mokotar',
			url: '',
			email: 'rm6551@student.uni-lj.si',
		},
		servers: [
			{ url: 'http://localhost:3000/api' },
			{ url: 'https://jobhub-sp.herokuapp.com/api' },
		],
	},
	apis: [
		'./api/models/user.js',
		'./api/routes/index.js',
		'./api/controllers/userController.js',
		'./api/controllers/jobofferController.js',
		'./api/controllers/resultsController.js',
		'./api/controllers/cvController.js',
	],
};
const swaggerDocument = swaggerJsdoc(swaggerOptions);

// var indexRouter = require('./server/routes/index');
var indexApi = require('./api/routes/index');

var app = express();

if (process.env.NODE_ENV === 'production') {
	app.use((req, res, next) => {
		if (req.header('x-forwarded-proto') !== 'https')
			res.redirect(`https://${req.header('host')}${req.url}`);
		else next();
	});
}

// view engine setup
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'hbs');

// helpers
require('./server/helpers/helper-hbs');
require('./server/helpers/admin-dashboard');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'build')));

app.use('/api', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept',
	);
	next();
});

app.use(passport.initialize());

app.use('/api', (_req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization',
	);
	next();
});

// app.use('/', indexRouter);
app.use('/api', indexApi);
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});

indexApi.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
indexApi.get('/swagger.json', (req, res) => {
	res.status(200).json(swaggerDocument);
});

// catch 404 and forward to error handler
app.use(function (req, res, _next) {
	// next(createError(404));
	res.render('error/404');
});

app.use((err, req, res, _next) => {
	if (err.name == 'UnauthorizedError')
		res.status(401).json({ message: err.name + ': ' + err.message + '.' });
});

// error handler
app.use(function (err, req, res, _next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error/502'); // temporary always return 502 page
});

module.exports = app;
