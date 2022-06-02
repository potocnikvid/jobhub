window.onload = () => {
	document.getElementById('cfa-signin').addEventListener('click', () => {
		let email = document.getElementById('indexInputEmail').value;
		email = email.replace('@', '%40');
		// let email = 'test'
		document.cookie =
			'logged=' + email + '; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/';
	});
};
