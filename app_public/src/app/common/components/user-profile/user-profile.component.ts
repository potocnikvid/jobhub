import { Component, OnInit } from '@angular/core';
import { JobhubDataService } from '../../services/jobhub-data.service';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent /*implements OnInit*/ {
	constructor(
		private elementRef: ElementRef,
		private jobhubDataService: JobhubDataService,
		private router: Router,
	) {}

	public user = {
		first_name: '',
		last_name: '',
		gender: '',
		email: '',
		phone_number: '',
		country: '',
		date_of_birth: '',
		industry: '',
	};

	public signInDataUser = {
		first_name: '',
		last_name: '',
		email: '',
		gender: '',
		date_of_birth: '',
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

	/*public submit() {
        console.log("submit");
        this.getUserId((id: any)=>{
            this.jobhubDataService
            .sumbitResume(id, this.resume)
            .subscribe((ret) => {
                console.log(ret)
                this.pageInfo();
                this.router.navigateByUrl('/user-main');
            });
        });
    }*/

	public pageInfo(): any {
		this.getUser((user: any) => {
			if (user.phone_number === undefined) {
				this.user.first_name = user.first_name;
				this.user.last_name = user.last_name;
				this.user.email = user.email;
			} else {
				this.user = {
					first_name: user.first_name,
					last_name: user.last_name,
					gender: null || user.gender.key,
					email: user.email,
					industry: user.industry,
					phone_number: null || user.phone_number,
					date_of_birth: null || user.date_of_birth,
					country: null || user.country.name,
				};
			}
		});
	}

	ngOnInit(): void {
		this.pageInfo();
	}

	onSaveChanges() {
		if (this.regexCheckUser()) {
			//console.log("PODATKI POSLANI")
			this.jobhubDataService.saveUser(this.signInDataUser).subscribe(() => {
				console.log('PODATKI POSLANI');
			});
		}
		//console.log(this.signInDataUser.first_name);
	}

	//ngOnInit(): void {}

	/*ngAfterViewInit() {
		const s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = '../../../../assets/scripts/user-profile.js';
		this.elementRef.nativeElement.appendChild(s);
	}*/

	onSignOut() {
		localStorage.clear();
	}

	regexCheckUser() {
		const firstName = this.signInDataUser.first_name;
		const lastName = this.signInDataUser.last_name;
		const email = this.signInDataUser.email;
		const gender = this.signInDataUser.gender;
		const date_of_birth = this.signInDataUser.date_of_birth;
		const phone_number = this.signInDataUser.phone_number;
		const industry = this.signInDataUser.industry;
		const country = this.signInDataUser.country;
		const new_password = this.signInDataUser.new_password;
		const _newPassword = this.signInDataUser.new_password_confirm;

		const firstNameReg = /^(?=.{1,50}$)[A-z]+(?:['_.\s][A-z]+)*$/i;
		const lastNameReg = /^(?=.{1,50}$)[a-zA-Z]+(?:['_.\s][a-zA-Z]+)*$/i;
		const emailReg = /\S+@\S+\.\S+/;
		const phoneReg =
			/^\+?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
		const passReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

		const validName = firstNameReg.test(firstName);
		const validLastName = lastNameReg.test(lastName);
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
			!validName ||
			!validLastName ||
			!validEmail ||
			!validPhone ||
			country == '' ||
			gender == '' ||
			industry == '' ||
			date_of_birth == '' ||
			new_password == ''
		) {
			window.alert(alert);
			return false;
			//dogodek.preventDefault();
		}
		return true;
	}
}
