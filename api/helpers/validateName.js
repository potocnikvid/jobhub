const validateName = (name) => {
	const matches = String(name).match('[a-zA-Z]+');
	return matches[0] === matches.input;
};

module.exports = { validateName };
