import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { AboutMyselfComponent } from './about-myself.component';
import { MyOrdersComponent } from './my-orders.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'about-myself', pathMatch: 'full' },
      { path: 'about-myself', component: AboutMyselfComponent },
      { path: 'my-orders', component: MyOrdersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
