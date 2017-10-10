import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { ProfileRoutingModule } from './profile.routing';

import { ProfileComponent } from './profile.component';
import { IntroDialogComponent } from './dialogs';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent,
    IntroDialogComponent
  ]
})
export class ProfileModule {}