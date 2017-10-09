import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { QuestionsComponent } from './questions.component';
import { QuestionsRoutingModule } from './questions.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuestionsRoutingModule
  ],
  declarations: [
    QuestionsComponent
  ]
})
export class QuestionsModule {}