import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent   
  ]
})
export class HomeModule { }
