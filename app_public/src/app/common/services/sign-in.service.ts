import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JobhubDataService } from './jobhub-data.service';

@Injectable({
	providedIn: 'root',
})
export class SignInService {
	constructor(
		private router: Router,
		private jobhubDataService: JobhubDataService,
	) {}

	public saveToken(token: string) {
		let json = JSON.parse(token);
		localStorage.setItem('jobhub_token', 'Bearer ' + json.access_token);
	}

	public checkIfSignedIn() {
		if (localStorage.getItem('jobhub_token')) {
			let service = this.router;
			this.jobhubDataService.decodeToken().subscribe({
				next(res) {
					let json = JSON.parse(JSON.stringify(res)); // dont even ask, compiler was angry at me
					if (json.user_role === 'USER') {
						service.navigateByUrl('user-main');
					} else if (json.user_role === 'COMPANY') {
						service.navigateByUrl('company-main');
					} else if (json.user_role === 'ADMIN') {
						service.navigateByUrl('admin-dashboard');
					}
				},
			});
		}
	}
}
