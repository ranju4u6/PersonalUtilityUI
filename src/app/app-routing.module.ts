import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuardService } from './user/auth-guard.service';
import { TodoutilityComponent } from './utility/todoutility/todoutility.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './welcome/home/home.component';

const routes: Routes = [
  {path:"login", component:UserComponent},
  {path:"welcome", component:WelcomeComponent,children:[
    {path:'home', component:HomeComponent},
    {path:'utility/todoutility', component:TodoutilityComponent},
    {path:'settings', component:SettingsComponent}
  ] ,canActivate:[AuthGuardService]},
  {path:"", redirectTo:"welcome", pathMatch:"full"},
  {path:"**", redirectTo:"welcome", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
