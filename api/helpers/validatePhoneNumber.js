const validatePhoneNumber = (phone_number) => {
	return String(phone_number).match(
		/^\+?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/,
	);
};

module.exports = { validatePhoneNumber };
