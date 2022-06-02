import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JobhubDataService } from '../../services/jobhub-data.service';

@Component({
	selector: 'app-user-main',
	templateUrl: './user-main.component.html',
	styleUrls: ['./user-main.component.css'],
})
export class UserMainComponent /*implements OnInit*/ {
	constructor(private jobhubDataService: JobhubDataService) {}

	public shownOfferId = '0';

	public company = ''
	public email = ''
	public phone = ''
	public country = ''
	public title = ''
	public description = ''
	public expectations = ''
	public other = ''
	
	ngOnInit(): void {
		this.getJobOffer()
	}
	// ngAfterViewInit() {
	// 	const s = document.createElement('script');
	// 	s.type = 'text/javascript';
	// 	s.src = '../../../../assets/scripts/main-page.js';
	// 	this.elementRef.nativeElement.appendChild(s);
	// }

	onSignOut() {
		localStorage.clear();
	}

	getJobOffer() {
		let thisClass = this
		this.jobhubDataService.autofindJob().subscribe({next(offer: any) {
			thisClass.company = ''
			thisClass.email = ''
			thisClass.phone = ''
			thisClass.country = ''
			thisClass.title = ''
			thisClass.description = ''
			thisClass.expectations = ''
			thisClass.other = ''
			if(offer.offer_id === undefined) {
				thisClass.shownOfferId = '0';
				thisClass.showFail();
			} else {
				thisClass.unfail();
				thisClass.shownOfferId = offer.offer_id;
				thisClass.title = offer.title;
				thisClass.description = offer.description;
				thisClass.expectations = offer.expectations;
				thisClass.other = offer.other;
				thisClass.company = offer.username;
				thisClass.email = offer.email;
				thisClass.phone = offer.phone_number;
				thisClass.country = offer.country;
			}
		}})
	}

	showFail() {
		let block = document.getElementById('fail');
		if(block !== null) {
			block.style.display = 'block'
		}
		block = document.getElementById('title-desc');
		if(block !== null) {
			block.style.display = 'none';
		}
		block = document.getElementById('title-expectations');
		if(block !== null) {
			block.style.display = 'none';
		}
		block = document.getElementById('title-other');
		if(block !== null) {
			block.style.display = 'none';
		}
	}

	unfail() {
		let block = document.getElementById('fail');
		if(block !== null) {
			block.style.display = 'none'
		}
		block = document.getElementById('title-desc');
		if(block !== null) {
			block.style.display = 'block';
		}
		block = document.getElementById('title-expectations');
		if(block !== null) {
			block.style.display = 'block';
		}
		block = document.getElementById('title-other');
		if(block !== null) {
			block.style.display = 'block';
		}
	}

	postResult(res: number) {
		let thisClass = this;
		this.jobhubDataService.sendResult(res, this.shownOfferId).subscribe({next(res) {
			console.log(res)
		}})
	}

	onAccept() {
		if (this.shownOfferId !== '0') this.postResult(1);
		this.getJobOffer();
	}

	onDecline() {
		if (this.shownOfferId !== '0') this.postResult(0);
		this.getJobOffer();
	}
}