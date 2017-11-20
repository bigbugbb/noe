import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { FeaturesSharedModule } from '@app/features/shared';
import { BusinessRoutingModule } from './business.routing';
import { BusinessComponent } from './business.component';
import { BusinessDetailComponent } from './business-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FeaturesSharedModule,
    ReactiveFormsModule,
    BusinessRoutingModule
  ],
  declarations: [
    BusinessComponent,
    BusinessDetailComponent
  ]
})
export class BusinessModule { }
