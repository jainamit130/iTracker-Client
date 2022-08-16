import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { RecruiterDashboardComponent } from './components/recruiter-dashboard/recruiter-dashboard.component';
import { MainPageComponent } from './components/main-page/main-page.component';



const routes: Routes = [
  {path:'',redirectTo:'signin',pathMatch:'full'},
  {path:'signin', component:SigninComponent},
  {path:'main-page', component:MainPageComponent},
  {path:'recruiter-dashboard', component:RecruiterDashboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
