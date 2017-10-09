import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsComponent } from './questions.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionsComponent,
    data: {
      title: ''
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule {}