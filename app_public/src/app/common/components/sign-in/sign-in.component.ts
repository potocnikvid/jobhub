import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JobhubDataService } from '../../services/jobhub-data.service';
import { Router } from '@angular/router';
import { userRole, jobOffer, resume, results, user } from '../../classes/user';
import { SignInService } from '../../services/sign-in.service';
@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent /*implements OnInit*/ {
	public signInData = {
		email: '',
		password: '',
	};

	onSignIn() {
		let service = this.signInService; // else it wont compile for some wierd reason if i do this inside next
		this.jobhubDataService.signIn(this.signInData).subscribe({
			next(res) {
				service.saveToken(JSON.stringify(res));
				service.checkIfSignedIn();
			},
		});
	}


	constructor(
		private jobhubDataService: JobhubDataService,
		private router: Router,
		private signInService: SignInService,
	) {}
	ngOnInit(): void {}
}
