import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Injectable({
	providedIn: 'root',
})
export class JobhubDataService {
	constructor(private http: HttpClient) {}
	public apiReturn: any;
	private apiUrl = environment.apiUrl;

	public getUser(email: any) {
		const url: string = `${this.apiUrl}/users/${email.replace('@', '%40')}`;
		let hdr = new HttpHeaders().append('authorization', this.getToken());
		return this.http.get(url, {headers: hdr}).pipe(retry(1), catchError(this.handleError));
	}

	public submitJob(id: string, job: any) {
		const url: string = `${this.apiUrl}/update-job/${id}`;
		const hdr = new HttpHeaders().append('authorization', this.getToken());
		return this.http
			.put(url, job,
			{
				headers: hdr
			})
			.pipe(retry(1), catchError(this.handleError));
	}


	public submitResume(id: string, resume: any) {
		const url: string = `${this.apiUrl}/update-resume/${id}`;
		const hdr = new HttpHeaders().append('authorization', this.getToken());
		return this.http
			.put(url, resume, 
			{
				headers: hdr
			}
			)
			.pipe(retry(1), catchError(this.handleError));
	}

	public signIn(signInData: any){
		const url = `${this.apiUrl}/sign-in`;
		return this.http
			.post(url, signInData)
			.pipe(retry(1), catchError(this.handleError));
	}
	public signUpUser(signUpDataUser: any){
		const url = `${this.apiUrl}/sign-up-user`;
		return this.http
			.post(url, {
				first_name: signUpDataUser.first_name,
				last_name: signUpDataUser.last_name,
				email: signUpDataUser.email,
				industry: signUpDataUser.industry,
				password: signUpDataUser.password,
				password_confirm: signUpDataUser.confirm_password,
			})
			.pipe(retry(1), catchError(this.handleError));
	}

	public signUpCompany(signUpDataCompany: any){
		const url = `${this.apiUrl}/sign-up-company`;
		return this.http
			.post(url, {
				username: signUpDataCompany.company_name,
				email: signUpDataCompany.email,
				industry: signUpDataCompany.industry,
				password: signUpDataCompany.password,
				password_confirm: signUpDataCompany.confirm_password,
			})
			.pipe(retry(1), catchError(this.handleError));
	}

	public saveUser(signInDataUser: any): Observable<unknown> {
		const hdr = new HttpHeaders().append('authorization', this.getToken());
		const url = `${this.apiUrl}/user-profile`;
		//console.log(signInDataUser);
		return this.http
			.put(
				url,
				{
					first_name: signInDataUser.first_name,
					last_name: signInDataUser.last_name,
					email: signInDataUser.email,
					gender: signInDataUser.gender,
					date_of_birth: signInDataUser.date_of_birth,
					phone_number: signInDataUser.phone_number,
					industry: signInDataUser._industry,
					country: signInDataUser.country,
					new_password: signInDataUser.new_password,
					new_password_confirm: signInDataUser.new_password_confirm,
				},
				{
					headers: hdr,
				},
			)

			.pipe(retry(1), catchError(this.handleError));
	}

	public decodeToken() {
		const url = `${this.apiUrl}/token-decode`;
		const hdr = new HttpHeaders().append('authorization', this.getToken());

		return this.http
			.get(url, { headers: hdr })
			.pipe(retry(1), catchError(this.handleError));
	}

	public getUsersAdminDashboard(): Observable<unknown> {
		const hdr = new HttpHeaders().append('authorization', this.getToken());

		const url = `${this.apiUrl}/admin-dashboard`;
		return this.http
			.get(url, { headers: hdr })
			.pipe(retry(1), catchError(this.handleError));
	}

	private getToken(): string {
		let token = localStorage.getItem('jobhub_token');
		if (token === null) return '';
		return token;
	}

	public autofindJob() {
		const url = `${this.apiUrl}/joboffers/autofind`;
		const hdr = new HttpHeaders().append('authorization', this.getToken());

		return this.http
			.get(url, { headers: hdr })
			.pipe(retry(1), catchError(this.handleError));
	}

	public autofindCV() {
		const url = `${this.apiUrl}/cvs/autofind`;
		const hdr = new HttpHeaders().append('authorization', this.getToken());

		return this.http
			.get(url, { headers: hdr })
			.pipe(retry(1), catchError(this.handleError));
	}

	public sendResult(result: number, shownOfferId: string) {
		const url = `${this.apiUrl}/results`;
		const hdr = new HttpHeaders().append('authorization', this.getToken());
		let reqBody = {
			result: result,
			shown_id: shownOfferId,
		};

		return this.http
			.post(url, reqBody, { headers: hdr })
			.pipe(retry(0), catchError(this.handleError));
	}

	public dbInsert(): Observable<unknown> {
		const url: string = `${this.apiUrl}/db-insert`;
		return this.http.post(url, '').pipe(retry(1), catchError(this.handleError));
	}

	public dbDelete(): Observable<unknown> {
		const url: string = `${this.apiUrl}/db-delete`;
		return this.http.delete(url).pipe(retry(1), catchError(this.handleError));
	}
	private handleError(error: HttpErrorResponse) {
		return throwError(
			() =>
				`Error '${error.status}' with description:'${
					error.error.message || error.statusText
				}'`,
		);
	}

	public getJoke() {
		const hdr = new HttpHeaders();

		return this.http.get('https://api.jokes.one/jod', { headers: hdr });
	}

	public saveCompany(signInDataCompany: any): Observable<unknown> {
		const url = `${this.apiUrl}/company-profile`;
		const hdr = new HttpHeaders().append('authorization', this.getToken());
		return this.http
			.put(
				url,
				{
					username: signInDataCompany.name,
					email: signInDataCompany.email,
					phone_number: signInDataCompany.phone_number,
					industry: signInDataCompany.industry,
					country: signInDataCompany.country,
					new_password: signInDataCompany.new_password,
					new_password_confirm: signInDataCompany.new_password_confirm,
				},
				{
					headers: hdr,
				},
			)
			.pipe(retry(1), catchError(this.handleError));
	}


}
