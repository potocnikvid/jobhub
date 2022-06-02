import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeSl from '@angular/common/locales/sl';
registerLocaleData(localeSl);
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';

import { ResumePreviewComponent } from './common/components/resume-preview/resume-preview.component';
import { JobPreviewComponent } from './common/components/job-preview/job-preview.component';
import { CompanyMainComponent } from './common/components/company-main/company-main.component';
import { UserMainComponent } from './common/components/user-main/user-main.component';
import { SignUpComponent } from './common/components/sign-up/sign-up.component';
import { SignInComponent } from './common/components/sign-in/sign-in.component';
import { IndexComponent } from './common/components/index/index.component';
import { DbComponent } from './common/components/db/db.component';
import { AdminDashboardComponent } from './common/components/admin-dashboard/admin-dashboard.component';
import { AdminSignInComponent } from './common/components/admin-sign-in/admin-sign-in.component';
import { CompanyProfileComponent } from './common/components/company-profile/company-profile.component';
import { UserProfileComponent } from './common/components/user-profile/user-profile.component';
// import { Error404Component } from './common/components/error404/error404.component';
// import { Error502Component } from './common/components/error502/error502.component';
import { WrapperComponent } from './common/components/wrapper/wrapper.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FooterComponent } from './common/components/footer/footer.component';

@NgModule({
	declarations: [
		ResumePreviewComponent,
		JobPreviewComponent,
		CompanyMainComponent,
		UserMainComponent,
		SignUpComponent,
		SignInComponent,
		IndexComponent,
		DbComponent,
		AdminDashboardComponent,
		AdminSignInComponent,
		CompanyProfileComponent,
		UserProfileComponent,
		// Error404Component,
		// Error502Component,
		WrapperComponent,
  	FooterComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
  ServiceWorkerModule.register('ngsw-worker.js', {
    enabled: environment.production,
    // Register the ServiceWorker as soon as the app is stable
    // or after 30 seconds (whichever comes first).
    registrationStrategy: 'registerWhenStable:30000'
  }),
	],
	providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
	bootstrap: [WrapperComponent],
})
export class AppModule {}
