import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SchoolComponent } from './school.component';
import { SchoolRoutingModule } from './school-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SchoolRoutingModule
  ],
  declarations: [
    SchoolComponent   
  ]
})
export class SchoolModule { }
