import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { BusinessListComponent } from './business/business-list.component';
import { BusinessEditComponent } from './business/business-edit.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'businesses/:id', component: BusinessEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
