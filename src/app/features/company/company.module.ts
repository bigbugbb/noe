import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyComponent } from './company.component';
import { CompanyRoutingModule } from './company.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CompanyRoutingModule
  ],
  declarations: [
    CompanyComponent
  ]
})
export class CompanyModule { }
