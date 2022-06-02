window.addEventListener('load', function () {
	let gumb = document.querySelector('#saveData');
	gumb.addEventListener('click', (dogodek) => regexCheckCompany(dogodek));
});

function regexCheckCompany(dogodek) {
	let companyName = document.getElementById('CompanyNameInput').value;
	let email = document.getElementById('emailInput').value;
	//let date = document.getElementById("dateOfFoundationInput").value;
	let phone = document.getElementById('PhoneNumberInput').value;
	let industry = document.getElementById('IndustrySelect').value;
	let country = document.getElementById('countryInput').value;
	let oldPassword = document.getElementById('oldPasswordInput').value;
	let _newPassword = document.getElementById('inputPasswordNew').value;

	//let companyNameReg = /^(?=.{1,50}$)[A-z]+(?:['_.\s][A-z]+)*$/i
	let emailReg = /\S+@\S+\.\S+/;
	let phoneReg = /00386-\d\d\d-\d\d\d-\d\d\d/i;

	//let validCompanyName = companyNameReg.test(firstName)
	let validEmail = emailReg.test(email);
	let validPhone = phoneReg.test(phone);

	let alert =
		'Please fill in all required fields and use the correct form.\nThe correct form for phone number is 00386-123-456-789.\nThe correct form for email is default@default.default.';

	if (
		companyName == '' ||
		!validEmail ||
		!validPhone ||
		country == '' ||
		industry == '' ||
		oldPassword == ''
	) {
		window.alert(alert);
		dogodek.preventDefault();
	}
}
