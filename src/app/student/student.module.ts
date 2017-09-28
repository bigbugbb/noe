import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StudentComponent } from './student.component';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ],
  declarations: [
    StudentComponent   
  ]
})
export class StudentModule { }
