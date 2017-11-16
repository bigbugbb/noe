import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrderRoutingModule
  ],
  declarations: [
    OrderComponent
  ]
})
export class OrderModule {}
