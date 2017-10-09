import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { AuthRoutingModule } from './auth.routing';

import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent
  ]
})
export class AuthModule { }
