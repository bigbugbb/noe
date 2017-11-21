import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { BusinessEditComponent } from './business/business-edit.component';
import { BusinessPreviewComponent } from './business/business-preview.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'businesses/:id', component: BusinessEditComponent },
  { path: 'businesses/:id/preview', component: BusinessPreviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
