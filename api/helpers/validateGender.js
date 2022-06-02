const validateGender = (gender) => {
	return gender === 'MALE' || gender === 'FEMALE' || gender === 'OTHER';
};

module.exports = { validateGender };
