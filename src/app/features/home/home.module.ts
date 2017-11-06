import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home.component';
import { ActivityListComponent } from './activity-list.component';
import { ActivityItemComponent } from './activity-item.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    ActivityListComponent,
    ActivityItemComponent
  ]
})
export class HomeModule { }
