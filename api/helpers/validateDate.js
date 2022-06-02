const validateDate = (date) => {
	return !isNaN(new Date(date));
};

module.exports = { validateDate };
