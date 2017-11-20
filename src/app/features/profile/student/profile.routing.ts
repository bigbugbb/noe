import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { AboutMyselfComponent } from './about-myself.component';
import { MyOrdersComponent } from './my-orders.component';
import { OrderDetailComponent } from './order-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'me', pathMatch: 'full' },
  { path: 'me', component: ProfileComponent },
  { path: 'me/orders/:id', component: OrderDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
