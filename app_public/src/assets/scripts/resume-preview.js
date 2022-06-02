window.addEventListener('load', function () {
	let generate = document.getElementById('generateResume');
	generate.addEventListener('click', function (dogodek) {
		let about = document.getElementById('about').value;
		let education = document.getElementById('education').value;
		let experience = document.getElementById('experience').value;
		let projects = document.getElementById('projects').value;
		let skills = document.getElementById('skills').value;
		if (!about || !education || !experience || !projects || !skills) {
			window.alert('Please fill in all resume fields');
			dogodek.preventDefault();
		}
	});
	// function postResult(result) {
	// 	let xhttp = new XMLHttpRequest();
	// 	let reqBody = {
	// 		email: result,
	// 		shown_id: shownOfferId,
	// 	};
	// 	xhttp.open('POST', 'http://localhost:3000/api/results', true);
	// 	xhttp.setRequestHeader('Content-Type', 'application/json');
	// 	xhttp.send(JSON.stringify(reqBody));
	// }
});
