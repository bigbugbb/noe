import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// Routing
import { AppRoutingModule } from './app.routing';

// Layouts
import { AppLayoutComponent } from './layouts/app-layout.component';

@NgModule({
  declarations: [
    AppComponent,    
    AppLayoutComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
