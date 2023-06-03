import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { EmployeedashboardComponent } from './component/employeedashboard/employeedashboard.component';

const routes: Routes = [
  { path: '', redirectTo:'login',pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: EmployeedashboardComponent }
];

@NgModule({
  declarations: [],
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
  
})
export class AppRoutingModule { }
