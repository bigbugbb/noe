import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { ProfileRoutingModule } from './profile.routing';

import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export class ProfileModule {}