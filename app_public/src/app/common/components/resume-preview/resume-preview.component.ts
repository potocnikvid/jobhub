import { Component, OnInit } from '@angular/core';
import { JobhubDataService } from '../../services/jobhub-data.service';
import { userRole, jobOffer, resume, results, user } from '../../classes/user';
import { Router } from '@angular/router';
import { SignInService } from '../../services/sign-in.service';

@Component({
	selector: 'app-resume-preview',
	templateUrl: './resume-preview.component.html',
	styleUrls: ['./resume-preview.component.css'],
})
export class ResumePreviewComponent implements OnInit {
	public user = {
		first_name: '',
		last_name: '',
		gender: '',
		email: '',
		phone: '',
		country: '',
	};

	public resume = {
		about: '',
		education: '',
		experience: '',
		projects: '',
		skills: '',
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
		this.resume = {
			about: this.resume.about,
			education: this.resume.education,
			experience: this.resume.experience,
			projects: this.resume.projects,
			skills: this.resume.skills,
			other: this.resume.other,
		};
		console.log(this.resume);

		this.getUserId((id: any)=>{

			this.jobhubDataService
			.submitResume(id, this.resume)
			.subscribe((ret) => {
				console.log(ret)
				this.pageInfo();
				this.router.navigateByUrl('/resume-preview');
			});
		});
	}

	public pageInfo(): any {
		this.getUser((user: any)=>{
			this.user = {
				first_name: user.first_name,
				last_name: user.last_name,
				gender: user.gender.key,
				email: user.email,
				phone: user.phone_number,
				country: user.country.name,
			};
			this.resume = {
				about: user.resume.about,
				education: user.resume.education[0].description,
				experience: user.resume.experience[1].description,
				projects: user.resume.projects[1].description,
				skills: user.resume.skills[0].name,
				other: user.resume.other[0].description,
			};
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
