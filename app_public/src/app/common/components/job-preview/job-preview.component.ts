import { Component, OnInit } from '@angular/core';
import { JobhubDataService } from '../../services/jobhub-data.service';
import { userRole, jobOffer, resume, results, user } from '../../classes/user';
import { Router } from '@angular/router';
import { SignInService } from '../../services/sign-in.service';

@Component({
	selector: 'app-job-preview',
	templateUrl: './job-preview.component.html',
	styleUrls: ['./job-preview.component.css'],
})
export class JobPreviewComponent implements OnInit {
	public user = {
		username: '',
		email: '',
		country: '',
		industry: '',
		phone: '',
	};

	public job = {
		title: '',
		description: '',
		expectations: '',
		other: '',
	};

	public getUser(callback: any): any {
		this.getUserEmail((email: any)=>{
			console.log(email)
			this.jobhubDataService.getUser(email).subscribe({
				next(user) {
					callback(user)
				},
			});
		});

	}

	public getUserEmail(callback: any): any {
		this.jobhubDataService.decodeToken().subscribe({
			next(token) {
				let email = JSON.parse(JSON.stringify(token)).email;
				callback(email);
			},
		});
	}

	public getUserId(callback: any): any {
		this.jobhubDataService.decodeToken().subscribe({
			next(token) {
				let id = JSON.parse(JSON.stringify(token))._id;
				callback(id);
			},
		});
	}

	public submit() {
		this.job = {
			title: this.job.title,
			description: this.job.description,
			expectations: this.job.expectations,
			other: this.job.other,
		};
		this.getUserId((id: any)=>{
			this.jobhubDataService
			.submitJob(id, this.job)
			.subscribe(() => {
				this.router.navigateByUrl('/job-preview');
			});
		});
	}
	
	public pageInfo(): any {
		this.getUser((user: any)=>{
			if(user.country == undefined) {
				this.user = {
					username: user.username,
					email: user.email,
					country: '',
					industry: user.industry,
					phone: '',
				};
			} else {
				this.user = {
					username: user.username,
					email: user.email,
					country: user.country.name,
					industry: user.industry,
					phone: user.phone_number,
				};
			}
			
			if(user.job_offers[0] == undefined) {
				this.job = {
					title: '',
					description: '',
					expectations: '',
					other: '',
				};
			} else {
				this.job = {
					title: user.job_offers[0].title,
					description: user.job_offers[0].description,
					expectations: user.job_offers[0].expectations[0],
					other: user.job_offers[0].other,
				};
			}

		});
	}
	ngOnInit(): void {
		this.pageInfo()
	}

	constructor(
		private jobhubDataService: JobhubDataService,
		private router: Router,
		private service: SignInService,
	) {}

	onSignOut() {
		localStorage.clear();
	}
}
