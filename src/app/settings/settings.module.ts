import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule {}