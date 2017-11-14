import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { BusinessRoutingModule } from './business.routing';
import { BusinessComponent } from './business.component';
import { BusinessListComponent } from './business-list.component';
import { BusinessItemComponent } from './business-item.component';
import { BusinessDetailComponent } from './business-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    BusinessRoutingModule
  ],
  declarations: [
    BusinessComponent,
    BusinessListComponent,
    BusinessItemComponent,
    BusinessDetailComponent
  ]
})
export class BusinessModule { }
