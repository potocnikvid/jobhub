const hbs = require('hbs');

hbs.registerHelper('compare', function (number1, string, number2) {
	if (string == '<') return number1 < number2;
	if (string == '<=') return number1 <= number2;
	if (string == '==') return number1 == number2;
	if (string == '>=') return number1 >= number2;
	if (string == '>') return number1 > number2;
});
