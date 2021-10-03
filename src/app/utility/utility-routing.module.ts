import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoutilityComponent } from './todoutility/todoutility.component';
import { AuthGuardService } from '../user/auth-guard.service';

const routes: Routes = [
  {path:'utility/todoutility', component:TodoutilityComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilityRoutingModule { }
