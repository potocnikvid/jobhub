import { Component, OnInit } from '@angular/core';
import { JobhubDataService } from '../../services/jobhub-data.service';
import { SignInService } from '../../services/sign-in.service';

@Component({
	selector: 'app-admin-sign-in',
	templateUrl: './admin-sign-in.component.html',
	styleUrls: ['./admin-sign-in.component.css'],
})
export class AdminSignInComponent implements OnInit {
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
		private signInService: SignInService,
	) {}
	ngOnInit(): void {}
}
