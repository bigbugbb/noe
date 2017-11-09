import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home.component';
import { BusinessListComponent } from './business-list.component';
import { BusinessItemComponent } from './business-item.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    BusinessListComponent,
    BusinessItemComponent
  ]
})
export class HomeModule { }
