const hbs = require('hbs');

/* Return current hear */
hbs.registerHelper('getYear', () => {
	return new Date().getUTCFullYear();
});
