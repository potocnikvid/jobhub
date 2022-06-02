import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from 'src/app/common/components/index/index.component';
import { SignInComponent } from 'src/app/common/components/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/common/components/sign-up/sign-up.component';
import { UserMainComponent } from 'src/app/common/components/user-main/user-main.component';
import { CompanyMainComponent } from 'src/app/common/components/company-main/company-main.component';
import { JobPreviewComponent } from 'src/app/common/components/job-preview/job-preview.component';
import { ResumePreviewComponent } from 'src/app/common/components/resume-preview/resume-preview.component';
import { UserProfileComponent } from 'src/app/common/components/user-profile/user-profile.component';
import { CompanyProfileComponent } from 'src/app/common/components/company-profile/company-profile.component';
import { AdminDashboardComponent } from 'src/app/common/components/admin-dashboard/admin-dashboard.component';
import { AdminSignInComponent } from 'src/app/common/components/admin-sign-in/admin-sign-in.component';
import { DbComponent } from 'src/app/common/components/db/db.component';
// import { Error404Component } from 'src/app/common/components/error404/error404.component';
// import { Error502Component } from 'src/app/common/components/error502/error502.component';

const routes: Routes = [
	{ path: '', component: IndexComponent },
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'sign-up', component: SignUpComponent },
	{ path: 'user-main', component: UserMainComponent },
	{ path: 'company-main', component: CompanyMainComponent },
	{ path: 'job-preview', component: JobPreviewComponent },
	{ path: 'resume-preview', component: ResumePreviewComponent },
	{ path: 'user-profile', component: UserProfileComponent },
	{ path: 'company-profile', component: CompanyProfileComponent },
	{ path: 'admin-dashboard', component: AdminDashboardComponent },
	{ path: 'admin-sign-in', component: AdminSignInComponent },
	{ path: 'db', component: DbComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
