import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { StudentRoutingModule } from './student.routing';

import { StudentComponent } from './student.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ],
  declarations: [
    StudentComponent
  ]
})
export class StudentModule { }
