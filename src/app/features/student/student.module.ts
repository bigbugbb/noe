import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { StudentRoutingModule } from './student.routing';
import { StudentComponent } from './student.component';
import { StudentListComponent } from './student-list.component';
import * as Filters from './filters';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ],
  declarations: [
    StudentComponent,
    StudentListComponent,
    Filters.ApplyingFilterComponent,
    Filters.KeywordsFilterComponent,
    Filters.GenderFilterComponent,
    Filters.GpaFilterComponent,
    Filters.GradeFilterComponent,
    Filters.StdTestScoreRangeComponent,
    Filters.StdTestScoreFilterComponent,
    Filters.SchoolPreferredFilterComponent
  ]
})
export class StudentModule { }
