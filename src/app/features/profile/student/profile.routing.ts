import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { AboutMyselfComponent } from './about-myself.component';
import { MyOrdersComponent } from './my-orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'me', pathMatch: 'full' },
  { path: 'me', component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'about-myself', outlet: 'about' },
      { path: 'about-myself', component: AboutMyselfComponent, outlet: 'about' },
      { path: 'my-orders', component: MyOrdersComponent, outlet: 'orders' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
