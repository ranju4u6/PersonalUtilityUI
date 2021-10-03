import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilityRoutingModule } from './utility-routing.module';
import { TodoutilityComponent } from './todoutility/todoutility.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable'

@NgModule({
  declarations: [TodoutilityComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UtilityRoutingModule,
    DataTableModule
  ]
})
export class UtilityModule { }
