import { Component, OnInit } from '@angular/core';
import { JobhubDataService } from '../../services/jobhub-data.service';

@Component({
	selector: 'app-db',
	templateUrl: './db.component.html',
	styleUrls: ['./db.component.css'],
})
export class DbComponent /*implements OnInit*/ {
	constructor(private jobhubDataService: JobhubDataService) {}

	insert() {
		this.jobhubDataService.dbInsert().subscribe(() => {
			alert('Database populated');
		});
	}

	delete() {
		this.jobhubDataService.dbDelete().subscribe(() => {
			alert('Database cleaned');
		});
	}

	reset() {
		this.jobhubDataService.dbDelete();
		this.jobhubDataService.dbInsert().subscribe(() => {
			alert('Database reset');
		});
	}

	//ngOnInit(): void {}
}
