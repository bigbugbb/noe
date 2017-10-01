import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

// Routing
import { AppRoutingModule } from './app.routing';

// Services
import { AlertService, AuthenticationService, UserService } from './_services/index';

// Guards
import { AuthGuard } from './_guards/auth.guard';

// Layouts
import { AppLayoutComponent } from './_layouts/app-layout.component';
import { AuthComponent } from './auth';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard, 
    AlertService, 
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
