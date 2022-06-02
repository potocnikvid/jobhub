let nameSearch = document.getElementById('nameSearch');
let saveFilterButton = document.getElementById('saveChangesButton');

nameSearch.addEventListener('input', startFilers);
saveFilterButton.addEventListener('click', startFilers);

function startFilers() {
	let showUserCompany = document.getElementById('showUserCompany').value;
	let industryChoice = document.getElementById('selectIndustry').value;
	let countryChoice = document.getElementById('selectCountry').value;
	let searchKey = new RegExp(nameSearch.value.toUpperCase());
	let countryKey = new RegExp(countryChoice.toUpperCase());
	let industryKey = new RegExp(industryChoice.toUpperCase());

	let usersToSort = document.getElementsByClassName('usersInHTML');
	let companiesToSort = document.getElementsByClassName('companiesInHTML');
	// search
	for (var i = 0; i < usersToSort.length; i++) {
		if (!searchKey.test(usersToSort[i].childNodes[1].innerText.toUpperCase())) {
			usersToSort[i].hidden = true;
		} else {
			usersToSort[i].hidden = false;
		}
	}
	for (i = 0; i < companiesToSort.length; i++) {
		if (
			!searchKey.test(companiesToSort[i].childNodes[1].innerText.toUpperCase())
		) {
			companiesToSort[i].hidden = true;
		} else {
			companiesToSort[i].hidden = false;
		}
	}

	// hide wrong industries
	if (industryChoice != '0') {
		for (i = 0; i < usersToSort.length; i++) {
			let child =
				usersToSort[i].children[1].children[0].children[5].childNodes[1].data;
			if (!industryKey.test(child.toUpperCase())) {
				usersToSort[i].hidden = true;
			}
		}
		for (i = 0; i < companiesToSort.length; i++) {
			let child =
				companiesToSort[i].children[1].children[0].childNodes[1].childNodes[1]
					.data;
			if (!industryKey.test(child.toUpperCase())) {
				companiesToSort[i].hidden = true;
			}
		}
	}

	// hide wrong countries
	if (countryChoice != '0') {
		for (i = 0; i < usersToSort.length; i++) {
			let child =
				usersToSort[i].children[1].children[0].children[4].childNodes[1].data;
			if (!countryKey.test(child.toUpperCase())) {
				usersToSort[i].hidden = true;
			}
		}
		for (i = 0; i < companiesToSort.length; i++) {
			let child =
				companiesToSort[i].children[1].children[0].children[1].childNodes[2]
					.data;
			if (!countryKey.test(child.toUpperCase())) {
				companiesToSort[i].hidden = true;
			}
		}
	}

	// hide users or companies
	if (showUserCompany == 0) {
		document.getElementById('Users').hidden = false;
		document.getElementById('Companies').hidden = false;
	} else if (showUserCompany == 1) {
		document.getElementById('Users').hidden = false;
		document.getElementById('Companies').hidden = true;
	} else {
		document.getElementById('Users').hidden = true;
		document.getElementById('Companies').hidden = false;
	}
}
