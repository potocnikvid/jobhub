import { Component, ElementRef, OnInit } from '@angular/core';
import { JobhubDataService } from '../../services/jobhub-data.service';

@Component({
	selector: 'app-admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent /*implements OnInit*/ {
	constructor(private dataService: JobhubDataService, private elementRef: ElementRef) {}

	public users: any = {
		user: [],
		company: []
	};

	ngAfterViewInit() {
    const s = document.createElement('script');
  	s.type = 'text/javascript';
    s.src = '../../../../assets/scripts/admin-dashboard.js';
    this.elementRef.nativeElement.appendChild(s);
  }

	private getUsers(): void {
		let thisClass = this.users;

		this.dataService.getUsersAdminDashboard().subscribe({
			next(users: any) {
				for(let i = 0; i < users.length; i++){
					const tempUser = users[i];
					if( tempUser.user_role.key == 'COMPANY'){
						thisClass.company.push({
							_id: tempUser._id,
							username: tempUser.username,
							email: tempUser.email,
							phone_number: tempUser.phone_number,
							country: tempUser.country.name,
							industry: tempUser.industry,
							job_offer: tempUser.job_offers,
						});
					} else if (tempUser.user_role.key == 'USER'){
						thisClass.user.push({
							_id: tempUser._id,
							first_name: tempUser.first_name,
							last_name: tempUser.last_name,
							date_of_birth: tempUser.date_of_birth,
							gender: tempUser.gender.key,
							email: tempUser.email,
							phone_number: tempUser.phone_number,
							country: tempUser.country.name,
							industry: tempUser.industry,
						});
					}
				}
				console.log(thisClass);
			},
		});
	}

	ngOnInit(): void {
		this.getUsers();
	}
}
