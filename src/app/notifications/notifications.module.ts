import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NotificationsComponent } from './notifications.component';
import { NotificationsRoutingModule } from './notifications-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotificationsRoutingModule
  ],
  declarations: [
    NotificationsComponent
  ]
})
export class NotificationsModule {}