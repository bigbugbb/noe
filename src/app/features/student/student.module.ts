import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { StudentRoutingModule } from './student.routing';
import { StudentComponent } from './student.component';
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
    Filters.ApplyingFilterComponent,
    Filters.KeywordsFilterComponent,
    Filters.GpaFilterComponent,
    Filters.GradeFilterComponent,
    Filters.StdTestScoreRangeComponent,
    Filters.StdTestScoreFilterComponent,
    Filters.SchoolPreferredFilterComponent
  ]
})
export class StudentModule { }
