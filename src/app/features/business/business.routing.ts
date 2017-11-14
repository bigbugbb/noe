import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessComponent } from './business.component';
import { BusinessDetailComponent } from './business-detail.component';

const routes: Routes = [
  { path: '', component: BusinessComponent },
  { path: ':id', component: BusinessDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule {}
