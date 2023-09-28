import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { authGuard } from "../guards/auth.guard";
import { adminGuard } from "../guards/admin.guard";

import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { Charts1Component } from "./charts1/charts1.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DoctorComponent } from "./doctor/doctor.component";
import { DoctorsComponent } from "./doctors/doctors.component";
import { HospitalsComponent } from "./hospitals/hospitals.component";
import { MainComponent } from "./main/main.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromisesComponent } from "./promises/promises.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { SearchesComponent } from "./searches/searches.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account settings' } },
      { path: 'charts1', component: Charts1Component, data: { title: 'Dounut Charts' } },
      { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Doctor' } },
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors' } },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress bar' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
      { path: 'searches/:query', component: SearchesComponent, data: { title: 'Searches' } },
      { path: 'users', canActivate: [adminGuard], component: UsersComponent, data: { title: 'Users' } }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule {}
