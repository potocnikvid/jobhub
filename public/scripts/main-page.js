var shownOfferId = 0;

function getJobOffer() {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let res = JSON.parse(this.responseText);
			if (res.offer_id == undefined) {
				resetForm();
				shownOfferId = 0;
			} else {
				shownOfferId = res.offer_id;
				document.getElementById('title').innerHTML = res.title;
				document.getElementById('description').innerHTML = res.description;
				document.getElementById('expectations').innerHTML = res.expectations;
				document.getElementById('other').innerHTML = res.other;
				document.getElementById('comp_name').innerHTML = res.username;
				document.getElementById('email').innerHTML = res.email;
				document.getElementById('phone').innerHTML = res.phone_number;
				document.getElementById('country').innerHTML = res.country;
			}
		}
	};
	xhttp.open('GET', 'http://localhost:3000/api/joboffers/autofind', true);
	xhttp.send();
}

function postResult(result) {
	let xhttp = new XMLHttpRequest();
	let reqBody = {
		result: result,
		shown_id: shownOfferId,
	};
	xhttp.open('POST', 'http://localhost:3000/api/results', true);
	xhttp.setRequestHeader('Content-Type', 'application/json');
	xhttp.send(JSON.stringify(reqBody));
}

function resetForm() {
	document.getElementById('title').innerHTML = '';
	document.getElementById('description').innerHTML = '';
	document.getElementById('expectations').innerHTML = '';
	document.getElementById('other').innerHTML = '';
	document.getElementById('comp_name').innerHTML = '';
	document.getElementById('email').innerHTML = '';
	document.getElementById('phone').innerHTML = '';
	document.getElementById('country').innerHTML = '';
}

window.onload = () => {
	document
		.getElementById('cfa-accept')
		.addEventListener('click', (_element, _event) => {
			if (shownOfferId !== 0) {
				postResult(1);
			}
			getJobOffer();
		});

	document
		.getElementById('cfa-decline')
		.addEventListener('click', (_element, _event) => {
			if (shownOfferId !== 0) {
				postResult(0);
			}
			getJobOffer();
		});

	getJobOffer();
};
