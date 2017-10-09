import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';

// Routing
import { AppRoutingModule } from './app.routing';

import { CoreModule } from './core';
import { SharedModule } from './shared'
import { FeaturesSharedModule } from './features-shared';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    FeaturesSharedModule,
    TabsModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
