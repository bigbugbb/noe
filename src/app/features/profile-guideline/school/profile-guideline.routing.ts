import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileGuidelineComponent } from './profile-guideline.component';

const routes: Routes = [
  {
    path: '', component: ProfileGuidelineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileGuidelineRoutingModule {}
