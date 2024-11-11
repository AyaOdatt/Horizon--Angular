import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { FirstErrorComponent } from './first-error/first-error.component';
import { SecondErrorComponent } from './second-error/second-error.component';
import { authenticationGuard } from './Guards/authentication.guard';
import { ThirdErrorComponent } from './third-error/third-error.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authenticationGuard],
  },
  { path: 'logout', component: LogoutComponent },
  { path: 'notFound', component: FirstErrorComponent },
  { path: 'unauthorized', component: SecondErrorComponent },
  { path: 'wrongdata', component: ThirdErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
