import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaymentsComponent } from './payments.component';
import { PaymentsRoutingModule } from './payments-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaymentsRoutingModule
  ],
  declarations: [
    PaymentsComponent
  ]
})
export class PaymentsModule {}