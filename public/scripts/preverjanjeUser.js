window.addEventListener('load', function () {
	let gumb = document.querySelector('#saveData');
	gumb.addEventListener('click', (dogodek) => regexCheckUser(dogodek));
});

function regexCheckUser(dogodek) {
	let firstName = document.getElementById('nameInput').value;
	let lastName = document.getElementById('lastNameInput').value;
	let email = document.getElementById('emailInput').value;
	let gender = document.getElementById('genderInput').value;
	let date = document.getElementById('dateOfBirth').value;
	let phone = document.getElementById('phoneInput').value;
	let industry = document.getElementById('industryInput').value;
	let country = document.getElementById('countryInput').value;
	let oldPassword = document.getElementById('inputPasswordOld').value;
	let _newPassword = document.getElementById('inputPasswordNew').value;

	let firstNameReg = /^(?=.{1,50}$)[A-z]+(?:['_.\s][A-z]+)*$/i;
	let lastNameReg = /^(?=.{1,50}$)[a-zA-Z]+(?:['_.\s][a-zA-Z]+)*$/i;
	let emailReg = /\S+@\S+\.\S+/;
	let phoneReg = /00386-\d\d\d-\d\d\d-\d\d\d/i;

	let validName = firstNameReg.test(firstName);
	let validLastName = lastNameReg.test(lastName);
	let validEmail = emailReg.test(email);
	let validPhone = phoneReg.test(phone);

	let alert =
		'Please fill in all required fields and use the correct form.\nThe correct form for phone number is 00386-123-456-789.\nThe correct form for email is default@default.default.';
	if (
		!validName ||
		!validLastName ||
		!validEmail ||
		!validPhone ||
		country == '' ||
		gender == '' ||
		industry == '' ||
		date == '' ||
		oldPassword == ''
	) {
		window.alert(alert);
		dogodek.preventDefault();
	}
}
