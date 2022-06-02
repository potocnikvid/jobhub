import { Component, OnInit } from '@angular/core';
import { JobhubDataService } from '../../services/jobhub-data.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent /*implements OnInit*/ {
	constructor(
		private jobhubDataService: JobhubDataService,
		private router: Router
		) {}

	public signUpDataUser = {
		first_name: '',
		last_name: '',
		email: '',
		industry: '',
		password: '',
		confirm_password: '',
	};

	public signUpDataCompany = {
		company_name: '',
		email: '',
		industry: '',
		password: '',
		confirm_password: '',
	};

	onSignUpUser() {
		this.jobhubDataService.signUpUser(this.signUpDataUser).subscribe(() => {
			// console.log(this.signUpDataUser);
			this.router.navigateByUrl('/user-main');
		});
	}

	onSignUpCompany() {
		console.log(this.signUpDataCompany)	
		this.jobhubDataService
			.signUpCompany(this.signUpDataCompany)
			.subscribe(() => {
				// console.log(this.signUpDataCompany);
				this.router.navigateByUrl('/company-main');

			});
	}

	public isDataUser(): boolean {
		if (this.validateMailUser() && this.validatePasswordUser()) return false;
		return true;
	}

	public validateMailUser(): boolean {
		const form = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
		if (form.test(this.signUpDataUser.email)) {
			return true;
		} else {
			return false;
		}
	}
	public validatePasswordUser(): boolean {
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
		if (
			passwordRegex.test(this.signUpDataUser.password) &&
			this.signUpDataUser.password === this.signUpDataUser.confirm_password
		) {
			return true;
		} else {
			return false;
		}
	}
	public isDataCompany(): boolean {
		if (this.validateMailCompany() && this.validatePasswordCompany())
			return false;
		return true;
	}

	public validateMailCompany(): boolean {
		const form = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
		if (form.test(this.signUpDataCompany.email)) {
			return true;
		} else {
			return false;
		}
	}
	public validatePasswordCompany(): boolean {
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
		if (
			passwordRegex.test(this.signUpDataCompany.password) &&
			this.signUpDataCompany.password ===
				this.signUpDataCompany.confirm_password
		) {
			return true;
		} else {
			return false;
		}
	}
	//ngOnInit(): void {}
}
