import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MessagingComponent } from './messaging.component';
import { MessagingRoutingModule } from './messaging-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MessagingRoutingModule
  ],
  declarations: [
    MessagingComponent
  ]
})
export class MessagingModule {}