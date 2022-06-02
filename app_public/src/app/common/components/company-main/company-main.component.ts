import { Component, ElementRef, OnInit } from '@angular/core';
import { JobhubDataService } from '../../services/jobhub-data.service';

@Component({
	selector: 'app-company-main',
	templateUrl: './company-main.component.html',
	styleUrls: ['./company-main.component.css'],
})
export class CompanyMainComponent /*implements OnInit*/ {
	constructor(private jobhubDataService: JobhubDataService) {}
	ngOnInit(): void {
		this.getCV();
	}

	shownCvId = '0';

	public name = '';
	public gender = '';
	public email = '';
	public phone = '';
	public about = '';
	public expirience =  '';
	public projects =  '';
	public skills =  '';
	public education =  '';
	// ngAfterViewInit() {
	// 	const s = document.createElement('script');
	// 	s.type = 'text/javascript';
	// 	s.src = '../../../../assets/scripts/main-page-company.js';
	// 	this.elementRef.nativeElement.appendChild(s);
	// }

	onSignOut() {
		localStorage.clear();
	}


	getCV() {
		let thisClass = this
		this.jobhubDataService.autofindCV().subscribe({next(offer: any) {
			thisClass.name = '';
			thisClass.gender = '';
			thisClass.email = '';
			thisClass.phone = '';
			thisClass.about = '';
			if(offer.cv_id === undefined) {
				thisClass.shownCvId = '0';
				thisClass.showFail();
			} else {
				thisClass.unFail();
				thisClass.shownCvId = offer.cv_id;
				thisClass.name = offer.first_name + ' ' + offer.last_name;
				thisClass.gender = thisClass.upperCaseFirstLetter(offer.gender.key.toLowerCase());
				thisClass.email = offer.email;
				thisClass.phone = offer.phone_number;
				thisClass.about = offer.about;
				let first = true;
				thisClass.expirience = '';
				offer.experience.forEach((item: any) => {
					if (!first) {
						thisClass.expirience += ',';
					}
					thisClass.expirience += ' ' + item.company;
					first = false;
				});
				first = true;
				thisClass.projects = '';
				offer.projects.forEach((item: any) => {
					if (!first) {
						thisClass.projects += ',';
					}
					thisClass.projects += ' ' + item.name;
					first = false;
				});
				first = true;
				thisClass.skills = '';
				offer.skills.forEach((item: any) => {
					if (!first) {
						thisClass.skills += ',';
					}
					thisClass.skills += ' ' + item.name;
					first = false;
				});
				first = true;
				thisClass.education = '';
				offer.education.forEach((item: any) => {
					if (!first) {
						thisClass.education += ',';
					}
					thisClass.education += ' ' + item.description;
					first = false;
				});
			}
		}})
		
	}

	showFail() {
		let block = document.getElementById('experience');
		if(block !== null) {
			block.style.display = 'none';
		}
		block = document.getElementById('projects');
		if(block !== null) {
			block.style.display = 'none';
		}
		block = document.getElementById('skills');
		if(block !== null) {
			block.style.display = 'none';
		}
		block = document.getElementById('education');
		if(block !== null) {
			block.style.display = 'none';
		}
		block = document.getElementById('fail');
		if(block !== null) {
			block.style.display = 'block';
		}
	}

	unFail() {
		let block = document.getElementById('experience');
		if(block !== null) {
			block.style.display = 'block';
		}
		block = document.getElementById('projects');
		if(block !== null) {
			block.style.display = 'block';
		}
		block = document.getElementById('skills');
		if(block !== null) {
			block.style.display = 'block';
		}
		block = document.getElementById('education');
		if(block !== null) {
			block.style.display = 'block';
		}
		block = document.getElementById('fail');
		if(block !== null) {
			block.style.display = 'none';
		}
	}

	postResult(res: number) {
		this.jobhubDataService.sendResult(res, this.shownCvId).subscribe({next(res) {
			console.log(res)
		}})
	}

	onAccept() {
		console.log(this.shownCvId)
		if (this.shownCvId !== '0') this.postResult(1);
		this.getCV();
	}

	onDecline() {
		if (this.shownCvId !== '0') this.postResult(0);
		this.getCV();
	}

	upperCaseFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}