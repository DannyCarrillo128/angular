import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { Charts1Component } from './charts1/charts1.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsersComponent } from './users/users.component';
import { DoctorComponent } from './doctor/doctor.component';
import { SearchesComponent } from './searches/searches.component';


@NgModule({
  declarations: [
    AccountSettingsComponent,
    Charts1Component,
    DashboardComponent,
    DoctorsComponent,
    HospitalsComponent,
    MainComponent,
    ProgressComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    DoctorComponent,
    SearchesComponent
  ],
  exports: [
    AccountSettingsComponent,
    Charts1Component,
    DashboardComponent,
    MainComponent,
    ProgressComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    PipesModule,
    SharedModule
  ]
})
export class PagesModule { }
