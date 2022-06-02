var shownCvId = 0;

function upperCaseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function getCV() {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.cv_id == undefined) {
				resetForm();
				shownCvId = 0;
			} else {
				shownCvId = res.cv_id;
				document.getElementById('name').innerHTML =
					res.first_name + ' ' + res.last_name;
				document.getElementById('gender').innerHTML = upperCaseFirstLetter(
					res.gender.key.toLowerCase(),
				);
				document.getElementById('email').innerHTML = res.email;
				document.getElementById('phone').innerHTML = res.phone_number;
				document.getElementById('about').innerHTML = res.about;
				if (res.experience.length === 0) {
					document.getElementById('experience').style.display = 'none';
				} else {
					let first = true;
					document.getElementById('experience').style.display = 'block';
					res.experience.forEach((item) => {
						console.log(item.company);
						if (!first) {
							document.getElementById('experience').append(',');
						}
						document.getElementById('experience').append(' ' + item.company);
						first = false;
					});
				}
				if (res.projects.length === 0) {
					document.getElementById('projects').style.display = 'none';
				} else {
					let first = true;
					document.getElementById('projects').style.display = 'block';
					res.projects.forEach((item) => {
						if (!first) {
							document.getElementById('projects').append(',');
						}
						document.getElementById('projects').append(' ' + item.name);
						first = false;
					});
				}
				if (res.skills.length === 0) {
					document.getElementById('skills').style.display = 'none';
				} else {
					let first = true;
					document.getElementById('skills').style.display = 'block';
					res.skills.forEach((item) => {
						if (!first) {
							document.getElementById('skills').append(',');
						}
						document.getElementById('skills').append(' ' + item.name);
						first = false;
					});
				}
				if (res.education.length === 0) {
					document.getElementById('education').style.display = 'none';
				} else {
					let first = true;
					document.getElementById('education').style.display = 'block';
					res.education.forEach((item) => {
						if (!first) {
							document.getElementById('education').append(',');
						}
						document.getElementById('education').append(' ' + item.description);
						first = false;
					});
				}
			}
		}
	};
	xhttp.open('GET', 'http://localhost:3000/api/cvs/autofind', true);
	xhttp.send();
}

function postResult(result) {
	let xhttp = new XMLHttpRequest();
	let reqBody = {
		result: result,
		shown_id: shownCvId,
	};
	xhttp.open('POST', 'http://localhost:3000/api/results', true);
	xhttp.setRequestHeader('Content-Type', 'application/json');
	xhttp.send(JSON.stringify(reqBody));
}

function resetForm() {
	document.getElementById('experience').innerHTML = 'Experience:';
	document.getElementById('projects').innerHTML = 'Projects:';
	document.getElementById('skills').innerHTML = 'Skills:';
	document.getElementById('education').innerHTML = 'Education:';
	document.getElementById('name').innerHTML = '';
	document.getElementById('gender').innerHTML = '';
	document.getElementById('email').innerHTML = '';
	document.getElementById('phone').innerHTML = '';
	document.getElementById('about').innerHTML = '';
	document.getElementById('description').innerHTML = '';
}

window.onload = () => {
	document
		.getElementById('cfa-accept')
		.addEventListener('click', (_element, _event) => {
			if (shownCvId !== 0) postResult(1);
			getCV();
		});

	document
		.getElementById('cfa-decline')
		.addEventListener('click', (_element, _event) => {
			if (shownCvId !== 0) postResult(0);
			getCV();
		});

	getCV();
};
