import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SectionComponent } from '../_directives/section.component';
import { StudentComponent } from './student.component';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ],
  declarations: [
    SectionComponent,
    StudentComponent
  ]
})
export class StudentModule { }
