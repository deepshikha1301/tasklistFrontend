import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { List } from './components/list/list';

export const routes: Routes = [
	{ path: '', component: LandingComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'list', component: List },
	{ path: '**', redirectTo: '' }
];
