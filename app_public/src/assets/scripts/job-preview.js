window.addEventListener('load', function () {
	let generate = document.getElementById('generateJob');
	generate.addEventListener('click', function (dogodek) {
		let title = document.getElementById('title').value;
		let expectations = document.getElementById('expectations').value;
		let description = document.getElementById('description').value;
		let other = document.getElementById('other').value;
		if (!title || !expectations || !description || !other) {
			window.alert('Please fill in all job offer fields');
			dogodek.preventDefault();
		}
	});
});
