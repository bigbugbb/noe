import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing
import { AppRoutingModule } from './app.routing';

// Services
import { AlertService, UserService } from './_services/index';

// Guards
import { AuthGuard } from './_guards/auth.guard';

// Layouts
import { AppLayoutComponent } from './_layouts/app-layout.component';
import { AuthComponent } from './auth';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AuthComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [
    AuthGuard,
    AlertService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
