import { Component, OnInit } from '@angular/core';
import { JobhubDataService } from '../../services/jobhub-data.service';
import { ElementRef } from '@angular/core';

@Component({
	selector: 'app-company-profile',
	templateUrl: './company-profile.component.html',
	styleUrls: ['./company-profile.component.css'],
})
export class CompanyProfileComponent /*implements OnInit*/ {
	constructor(
		private elementRef: ElementRef,
		private jobhubDataService: JobhubDataService,
	) {}

	public user = {
		name: '',
		email: '',
		country: '',
		industry: '',
		phone_number: '',
	};

	public signInDataCompany = {
		name: '',
		email: '',
		phone_number: '',
		industry: '',
		country: '',
		new_password: '',
		new_password_confirm: '',
	};

	public getUser(callback: any): any {
		this.getUserEmail((email: any) => {
			console.log(email);
			this.jobhubDataService.getUser(email).subscribe({
				next(user) {
					callback(user);
				},
			});
		});
	}

	public getUserEmail(callback: any): any {
		this.jobhubDataService.decodeToken().subscribe({
			next(token) {
				const email = JSON.parse(JSON.stringify(token)).email;
				callback(email);
			},
		});
	}

	public pageInfo(): any {
		this.getUser((user: any) => {
			if (user.phone_number === undefined) {
				this.user.name = user.username;
				this.user.email = user.email;
			} else {
				this.user = {
					name: user.username,
					email: user.email,
					phone_number: user.phone_number,
					country: user.country.name,
					industry: user.industry,
				};
			}
		});
	}

	ngOnInit(): void {
		this.pageInfo();
	}

	onSaveChanges() {
		if (this.regexCheckCompany()) {
			//console.log("PODATKI POSLANI");
			this.jobhubDataService
				.saveCompany(this.signInDataCompany)
				.subscribe(() => {
					console.log('PODATKI POSLANI');
				});
			//console.log(this.signInDataCompany.company_name);
		}
	}

	//ngOnInit(): void {}

	//ngAfterViewInit() {
	//	const s = document.createElement('script');
	//	s.type = 'text/javascript';
	//	s.src = '../../../../assets/scripts/company-profile.js';
	//	this.elementRef.nativeElement.appendChild(s);
	//}
	onSignOut() {
		localStorage.clear();
	}

	regexCheckCompany() {
		const name = this.signInDataCompany.name;
		const email = this.signInDataCompany.email;
		const phone_number = this.signInDataCompany.phone_number;
		const industry = this.signInDataCompany.industry;
		const country = this.signInDataCompany.country;
		const new_password = this.signInDataCompany.new_password;
		const _newPassword = this.signInDataCompany.new_password_confirm;

		//let companyNameReg = /^(?=.{1,50}$)[A-z]+(?:['_.\s][A-z]+)*$/i
		const emailReg = /\S+@\S+\.\S+/;
		const phoneReg =
			/^\+?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
		const passReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

		//let validCompanyName = companyNameReg.test(firstName)
		const validEmail = emailReg.test(email);
		const validPhone = phoneReg.test(phone_number);
		const validPass = passReg.test(new_password);

		let matchPasswords = false;

		if (new_password === _newPassword) {
			matchPasswords = true;
		}

		const alert =
			'Please fill in all required fields and use the correct form.\nThe correct form for phone number is +123 45 678 123.\nThe correct form for email is default@default.default.\nNew password and confirm password fields must match!\nPassword must contain 8 characters!';

		if (
			!validPass ||
			!matchPasswords ||
			name == '' ||
			!validEmail ||
			!validPhone ||
			country == '' ||
			industry == '' ||
			new_password == ''
		) {
			window.alert(alert);
			return false;
			//dogodek.preventDefault();
		}
		return true;
	}
}
