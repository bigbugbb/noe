import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { AuthRoutingModule } from './auth.routing';

import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ]
})
export class AuthModule { }
