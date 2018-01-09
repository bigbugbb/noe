import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppIntroComponent } from './app-intro.component';

const routes: Routes = [
  { path: '', component: AppIntroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppIntroRoutingModule {}
