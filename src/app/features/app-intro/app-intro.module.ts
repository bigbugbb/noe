import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { FeaturesSharedModule } from '@app/features/shared';
import { AppIntroRoutingModule } from './app-intro.routing';
import { AppIntroComponent } from './app-intro.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FeaturesSharedModule,
    ReactiveFormsModule,
    AppIntroRoutingModule
  ],
  declarations: [
    AppIntroComponent
  ]
})
export class AppIntroModule { }
