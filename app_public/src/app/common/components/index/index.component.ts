import { Component, OnInit } from '@angular/core';
import { JobhubDataService } from '../../services/jobhub-data.service';
import { SignInService } from '../../services/sign-in.service';
import { Chart, registerables } from 'chart.js';
import { ConnectionService } from '../../services/connection.service';

Chart.register(...registerables);

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css'],
})
export class IndexComponent /*implements OnInit*/ {
	public signInData = {
		email: '',
		password: '',
	};

	public joke = '';

	onSignIn() {
		const service = this.signInService; // else it wont compile for some wierd reason if i do this inside next
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
		private connectinService: ConnectionService,
	) {}

	public isConnected(): boolean {
		return this.connectinService.isConnected;
	}

	ngOnInit(): void {
		this.signInService.checkIfSignedIn();
		this.jobhubDataService.getJoke().subscribe((joke: any) => {
			this.joke = joke.contents.jokes[0].joke.text;
		});
		console.log(this.joke);

		const jobChart = new Chart('jobChart', {
			type: 'bar',
			data: {
				labels: [
					'Full Stack Web Developer',
					'Back End Web Developer',
					'Front End Web Developer',
					'Other',
					'Desktop Developer',
					'Team Leader',
					'Chief Technology Officer',
					'Mobile Developer',
					'Project Manager',
					'DevOps',
					'Embedded Developer',
					'Machine Learning Specialist',
					'Consultant',
					'System Administrator',
					'Developer',
					'System Integrator',
					'Data Administrator',
					'UI/UX Developer',
					'Game Developer',
				],
				datasets: [
					{
						label: 'jobs',
						data: [
							364, 276, 148, 87, 70, 63, 50, 68, 43, 42, 37, 34, 31, 28, 22, 21,
							17, 15, 14,
						],
						backgroundColor: ['#16396b4d', '#ea2e644d'],
						borderColor: ['#16396b', '#ea2e64'],
						borderWidth: 3,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							display: false,
						},
					},
					x: {
						grid: {
							display: false,
						},
					},
				},
			},
		});

		const languageChart = new Chart('languageChart', {
			type: 'bar',
			data: {
				labels: [
					'SQL',
					'JavaScript',
					'HTML/CSS',
					'Python',
					'Java',
					'C#',
					'TypeScript',
					'PHP',
					'Bash',
					'C++',
					'C',
					'Go',
					'Kotlin',
					'Swift',
					'Objective C',
					'Ruby',
					'Perl',
					'Scala',
				],
				datasets: [
					{
						label: 'languages',
						data: [
							1053, 978, 975, 613, 590, 515, 464, 445, 307, 261, 233, 131, 94,
							60, 49, 38, 26, 26,
						],
						backgroundColor: ['#ea2e644d', '#16396b4d'],
						borderColor: ['#ea2e64', '#16396b'],
						borderWidth: 3,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							display: false,
						},
					},
					x: {
						grid: {
							display: false,
						},
					},
				},
			},
		});

		const salaryChart = new Chart('salaryChart', {
			type: 'bar',
			data: {
				labels: [
					'< 1024.25 €',
					'1024.26 € - 1499.99 €',
					'1500.00 € - 1999.99 €',
					'2000.00 € - 2499.99 €',
					'3000.00 € - 3499.99 €',
					'3500.00 € - 3999.99 €',
					'4000.00 € - 4499.99 €',
					'4500.00 € - 4999.99 €',
					'5000.00 € - 5499.99 €',
					'5500.00 € - 6499.99 €',
					'6500.00 € - 7499.99 €',
					'7500.00 € - 7999.99 €',
					'8000.00 € - 8499.99 €',
					'> 8500.00 €',
				],
				datasets: [
					{
						label: 'gross salary',
						data: [14, 31, 124, 203, 200, 156, 96, 66, 54, 23, 12, 5, 5, 19],
						backgroundColor: ['#ea2e644d', '#16396b4d'],
						borderColor: ['#ea2e64', '#16396b'],
						borderWidth: 3,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							display: false,
						},
					},
					x: {
						grid: {
							display: false,
						},
					},
				},
			},
		});

		const ageChart = new Chart('ageChart', {
			type: 'bar',
			data: {
				labels: [
					'< 18 y.o.',
					'19 y.o. - 25 y.o.',
					'26 y.o. - 30 y.o.',
					'31 y.o. - 40 y.o.',
					'41 y.o. - 50 y.o.',
					'> 50 y.o.',
				],
				datasets: [
					{
						label: 'age',
						data: [3, 302, 473, 532, 103, 18],
						backgroundColor: ['#16396b4d', '#ea2e644d'],
						borderColor: ['#16396b', '#ea2e64'],
						borderWidth: 3,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							display: false,
						},
					},
					x: {
						grid: {
							display: false,
						},
					},
				},
			},
		});
	}
}
